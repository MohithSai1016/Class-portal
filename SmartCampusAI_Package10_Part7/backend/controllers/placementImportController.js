const fs = require("fs");
const readline = require("readline");

const { getPool } =
    require("../config/db");

function clean(value) {
    return String(value || "").trim();
}

function parseCsvLine(line) {
    const result = [];
    let current = "";
    let quoted = false;

    for (let i=0; i<line.length; i++) {
        const char=line[i];

        if (char === '"') {
            if (
                quoted &&
                line[i+1] === '"'
            ) {
                current += '"';
                i++;
            } else {
                quoted=!quoted;
            }
        } else if (
            char === "," &&
            !quoted
        ) {
            result.push(current.trim());
            current="";
        } else {
            current += char;
        }
    }

    result.push(current.trim());
    return result;
}

async function importCsv(req,res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success:false,
                message:"CSV file is required."
            });
        }

        const pool=getPool();
        const input=fs.createReadStream(
            req.file.path
        );

        const rl=readline.createInterface({
            input,
            crlfDelay:Infinity
        });

        let headers=null;
        let imported=0;
        let skipped=0;

        for await (const line of rl) {
            if (!line.trim()) continue;

            const values=
                parseCsvLine(line);

            if (!headers) {
                headers=
                    values.map(
                        h=>clean(h).toLowerCase()
                    );
                continue;
            }

            const row={};

            headers.forEach(
                (header,index)=>{
                    row[header]=clean(
                        values[index]
                    );
                }
            );

            if (
                !row.company_name ||
                !row.role_title
            ) {
                skipped++;
                continue;
            }

            /*
             * company_name is resolved first.
             * Existing company is reused.
             */
            const [
                companies
            ] = await pool.execute(
                `SELECT id
                 FROM placement_companies
                 WHERE company_name=?
                 LIMIT 1`,
                [row.company_name]
            );

            let companyId;

            if (companies.length) {
                companyId=companies[0].id;
            } else {
                const [
                    result
                ] = await pool.execute(
                    `INSERT INTO
                     placement_companies
                     (company_name)
                     VALUES (?)`,
                    [row.company_name]
                );

                companyId=result.insertId;
            }

            await pool.execute(
                `INSERT INTO placement_drives
                (
                    company_id,
                    role_title,
                    package_lpa,
                    application_deadline,
                    drive_status
                )
                VALUES (?,?,?,?,?)`,
                [
                    companyId,
                    row.role_title,
                    row.package_lpa || null,
                    row.application_deadline || null,
                    row.drive_status || "Open"
                ]
            );

            imported++;
        }

        fs.unlink(
            req.file.path,
            ()=>{}
        );

        res.status(201).json({
            success:true,
            imported,
            skipped
        });
    } catch(error) {
        if (req.file?.path) {
            fs.unlink(
                req.file.path,
                ()=>{}
            );
        }

        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

module.exports={
    importCsv
};

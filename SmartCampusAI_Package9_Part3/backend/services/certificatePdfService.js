const fs = require("fs");
const path = require("path");

const PDFDocument = require("pdfkit");

const repository =
    require("../models/CertificateRepository");

const {
    uploadDirectory
} = require("../config/upload");

function safeName(value) {
    return String(value || "certificate")
        .replace(/[^a-z0-9-_ ]/gi, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 80) || "certificate";
}

function generate(certificate) {
    return new Promise((resolve, reject) => {
        fs.mkdirSync(uploadDirectory, {
            recursive: true
        });

        const filename =
            `${Date.now()}-${safeName(
                certificate.title
            )}.pdf`;

        const filePath =
            path.join(
                uploadDirectory,
                filename
            );

        const document =
            new PDFDocument({
                size: "A4",
                margin: 50
            });

        const stream =
            fs.createWriteStream(filePath);

        stream.on("finish", async () => {
            try {
                const relativePath =
                    `/storage/certificates/${filename}`;

                const pool =
                    require("../config/db")
                        .getPool();

                await pool.execute(
                    `UPDATE certificates
                     SET file_path=?
                     WHERE id=?`,
                    [
                        relativePath,
                        certificate.id
                    ]
                );

                resolve(relativePath);
            } catch (error) {
                reject(error);
            }
        });

        stream.on("error", reject);

        document.pipe(stream);

        document
            .fontSize(28)
            .text(
                "SMART CAMPUS AI",
                {
                    align: "center"
                }
            );

        document.moveDown(1);

        document
            .fontSize(22)
            .text(
                "CERTIFICATE",
                {
                    align: "center"
                }
            );

        document.moveDown(1.5);

        document
            .fontSize(14)
            .text(
                "This certificate is proudly presented to",
                {
                    align: "center"
                }
            );

        document.moveDown(0.7);

        document
            .fontSize(24)
            .text(
                certificate.student_name ||
                "Student",
                {
                    align: "center"
                }
            );

        document.moveDown(1);

        document
            .fontSize(14)
            .text(
                certificate.description ||
                certificate.title,
                {
                    align: "center"
                }
            );

        document.moveDown(1);

        document
            .fontSize(12)
            .text(
                `Certificate Type: ${certificate.certificate_type}`,
                {
                    align: "center"
                }
            );

        document
            .text(
                `Issued by: ${certificate.issuing_organization}`,
                {
                    align: "center"
                }
            );

        document
            .text(
                `Issue Date: ${certificate.issue_date}`,
                {
                    align: "center"
                }
            );

        document.moveDown(2);

        document
            .fontSize(10)
            .text(
                `Certificate Number: ${
                    certificate.certificate_number ||
                    "N/A"
                }`,
                {
                    align: "center"
                }
            );

        document
            .text(
                `Verification Code: ${
                    certificate.verification_code
                }`,
                {
                    align: "center"
                }
            );

        document.moveDown(3);

        document
            .fontSize(10)
            .text(
                "Verify this certificate through the Smart Campus AI portal.",
                {
                    align: "center"
                }
            );

        document.end();
    });
}

async function generateForId(id) {
    const certificate =
        await repository.findById(id);

    if (!certificate) {
        throw new Error(
            "Certificate not found"
        );
    }

    return generate(certificate);
}

module.exports = {
    generateForId
};

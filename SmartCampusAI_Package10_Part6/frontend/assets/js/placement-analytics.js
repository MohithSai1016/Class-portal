const token=
    localStorage.getItem("token");

const headers={
    Authorization:`Bearer ${token}`
};

function esc(value){
    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

function table(
    columns,
    rows
){
    if(!rows.length){
        return "<p>No data available.</p>";
    }

    return `
    <table>
        <thead>
            <tr>
                ${
                    columns.map(
                        c=>`<th>${esc(c.label)}</th>`
                    ).join("")
                }
            </tr>
        </thead>
        <tbody>
            ${
                rows.map(
                    row=>`
                    <tr>
                        ${
                            columns.map(
                                c=>`
                                <td>
                                    ${esc(
                                        row[c.key] ?? 0
                                    )}
                                </td>
                                `
                            ).join("")
                        }
                    </tr>
                    `
                ).join("")
            }
        </tbody>
    </table>
    `;
}

async function load(){
    try{
        const response=
            await fetch(
                "http://localhost:5000/api/placement-analytics/overview",
                {headers}
            );

        const data=
            await response.json();

        if(!data.success){
            throw new Error(
                data.message
            );
        }

        const a=data.analytics;
        const o=a.overview;

        document.getElementById(
            "summary"
        ).innerHTML=`
            <div class="card">
                Applications
                <h2>
                    ${esc(o.totalApplications)}
                </h2>
            </div>

            <div class="card">
                Selected
                <h2>
                    ${esc(o.selected)}
                </h2>
            </div>

            <div class="card">
                Shortlisted
                <h2>
                    ${esc(o.shortlisted)}
                </h2>
            </div>

            <div class="card">
                Interviews
                <h2>
                    ${esc(o.interviews)}
                </h2>
            </div>

            <div class="card">
                Open Drives
                <h2>
                    ${esc(o.openDrives)}
                </h2>
            </div>
        `;

        document.getElementById(
            "companies"
        ).innerHTML=
            table(
                [
                    {
                        key:"company_name",
                        label:"Company"
                    },
                    {
                        key:"applications",
                        label:"Applications"
                    },
                    {
                        key:"shortlisted",
                        label:"Shortlisted"
                    },
                    {
                        key:"selected",
                        label:"Selected"
                    }
                ],
                a.companies
            );

        document.getElementById(
            "departments"
        ).innerHTML=
            table(
                [
                    {
                        key:"department",
                        label:"Department"
                    },
                    {
                        key:"applications",
                        label:"Applications"
                    },
                    {
                        key:"selected",
                        label:"Selected"
                    }
                ],
                a.departments
            );

        document.getElementById(
            "statuses"
        ).innerHTML=
            table(
                [
                    {
                        key:"application_status",
                        label:"Status"
                    },
                    {
                        key:"total",
                        label:"Total"
                    }
                ],
                a.statuses
            );
    }catch(error){
        document.getElementById(
            "message"
        ).textContent=
            error.message;
    }
}

load();

const token=
    localStorage.getItem("token");

const headers={
    Authorization:`Bearer ${token}`
};

const message=
    document.getElementById(
        "message"
    );

function esc(value){
    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

async function loadDrives(){
    const search=
        document.getElementById(
            "search"
        ).value.trim();

    const query=
        search
            ? `?search=${encodeURIComponent(search)}`
            : "";

    const response=
        await fetch(
            `http://localhost:5000/api/placement-drives/open${query}`,
            {headers}
        );

    const data=
        await response.json();

    if(!data.success){
        throw new Error(
            data.message
        );
    }

    const container=
        document.getElementById(
            "drives"
        );

    if(!data.drives.length){
        container.innerHTML=
            "<p>No open placement drives found.</p>";
        return;
    }

    container.innerHTML=
        data.drives.map(
            drive=>`
            <article class="drive">
                <h2>
                    ${esc(drive.drive_title)}
                </h2>

                <p>
                    <strong>
                        ${esc(drive.company_name)}
                    </strong>
                </p>

                <p>
                    Role:
                    ${esc(drive.role_title)}
                </p>

                ${
                    drive.description
                        ? `<p>${esc(drive.description)}</p>`
                        : ""
                }

                <div class="meta">
                    <div>
                        Package:
                        ${
                            drive.package_lpa
                                ? esc(
                                    drive.package_lpa
                                )+" LPA"
                                : "Not specified"
                        }
                    </div>

                    <div>
                        Location:
                        ${esc(
                            drive.job_location ||
                            "Not specified"
                        )}
                    </div>

                    <div>
                        Drive:
                        ${esc(
                            drive.drive_date
                        )}
                    </div>

                    <div>
                        Deadline:
                        ${esc(
                            drive.application_deadline
                        )}
                    </div>
                </div>

                <p>
                    Minimum CGPA:
                    ${
                        drive.eligibility_min_cgpa ??
                        "Not specified"
                    }
                </p>

                <p>
                    Departments:
                    ${
                        esc(
                            drive.eligibility_departments ||
                            "As specified by college"
                        )
                    }
                </p>

                <button
                    data-id="${esc(drive.id)}"
                    class="applyButton">
                    Apply
                </button>
            </article>
        `
        ).join("");

    document
        .querySelectorAll(
            ".applyButton"
        )
        .forEach(button=>{
            button.onclick=()=>
                applyToDrive(
                    button.dataset.id
                );
        });
}

async function applyToDrive(id){
    if(!confirm(
        "Apply to this placement drive?"
    )){
        return;
    }

    try{
        const response=
            await fetch(
                `http://localhost:5000/api/placement-drives/${encodeURIComponent(id)}/apply`,
                {
                    method:"POST",
                    headers
                }
            );

        const data=
            await response.json();

        if(!data.success){
            throw new Error(
                data.message
            );
        }

        message.textContent=
            "Successfully applied to the drive.";

        await loadMyApplications();
    }catch(error){
        message.textContent=
            error.message;
    }
}

async function loadMyApplications(){
    const response=
        await fetch(
            "http://localhost:5000/api/placement-drives/mine/applications",
            {headers}
        );

    const data=
        await response.json();

    if(!data.success){
        throw new Error(
            data.message
        );
    }

    const container=
        document.getElementById(
            "myApplications"
        );

    if(!data.applications.length){
        container.innerHTML=
            "<p>You have not applied to a drive yet.</p>";
        return;
    }

    container.innerHTML=
        data.applications.map(
            application=>`
            <article class="drive">
                <h3>
                    ${esc(
                        application.company_name
                    )}
                    -
                    ${esc(
                        application.role_title
                    )}
                </h3>

                <p>
                    Drive:
                    ${esc(
                        application.drive_title
                    )}
                </p>

                <p>
                    Status:
                    <strong>
                        ${esc(
                            application.application_status
                        )}
                    </strong>
                </p>

                <p>
                    Applied:
                    ${esc(
                        application.applied_at
                    )}
                </p>
            </article>
        `
        ).join("");
}

document
    .getElementById(
        "refresh"
    )
    .onclick=async()=>{
        try{
            await loadDrives();
            await loadMyApplications();
        }catch(error){
            message.textContent=
                error.message;
        }
    };

document
    .getElementById(
        "search"
    )
    .addEventListener(
        "input",
        loadDrives
    );

Promise.all([
    loadDrives(),
    loadMyApplications()
]).catch(error=>{
    message.textContent=
        error.message;
});

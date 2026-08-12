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

function value(v){
    return Number(v || 0);
}

async function loadDashboard(){
    const response=
        await fetch(
            "http://localhost:5000/api/placement-dashboard/mine",
            {headers}
        );

    const data=
        await response.json();

    if(!data.success){
        throw new Error(
            data.message
        );
    }

    const d=data.dashboard;
    const s=d.stats;

    const apps=s.applications || {};
    const drives=s.driveApplications || {};

    document.getElementById(
        "stats"
    ).innerHTML=`
        <div class="card stat">
            <strong>Applications</strong>
            <h2>${value(apps.total)}</h2>
        </div>

        <div class="card stat">
            <strong>Applied</strong>
            <h2>${value(apps.applied)}</h2>
        </div>

        <div class="card stat">
            <strong>Shortlisted</strong>
            <h2>${value(apps.shortlisted)}</h2>
        </div>

        <div class="card stat">
            <strong>Interviews</strong>
            <h2>${value(s.upcomingInterviews)}</h2>
        </div>

        <div class="card stat">
            <strong>Selected</strong>
            <h2>${value(apps.selected)}</h2>
        </div>

        <div class="card stat">
            <strong>Open Drives</strong>
            <h2>${value(s.openDrives)}</h2>
        </div>
    `;

    document.getElementById(
        "notifications"
    ).innerHTML=
        d.notifications.length
            ? d.notifications.map(
                notification=>`
                <article class="item">
                    <strong>
                        ${esc(notification.title)}
                    </strong>

                    <p>
                        ${esc(notification.message)}
                    </p>

                    <div class="small">
                        ${esc(
                            notification.created_at
                        )}
                    </div>

                    ${
                        notification.is_read
                            ? ""
                            : `
                            <button
                                data-id="${esc(notification.id)}"
                                class="readButton">
                                Mark read
                            </button>
                            `
                    }
                </article>
                `
            ).join("")
            : "<p>No notifications.</p>";

    document.getElementById(
        "interviews"
    ).innerHTML=
        d.upcomingInterviews.length
            ? d.upcomingInterviews.map(
                interview=>`
                <article class="item">
                    <strong>
                        ${esc(
                            interview.company_name
                        )}
                    </strong>

                    <p>
                        ${esc(
                            interview.role_title
                        )}
                    </p>

                    <p>
                        ${esc(
                            interview.interview_round
                        )}
                    </p>

                    <p>
                        ${esc(
                            interview.scheduled_at
                        )}
                    </p>

                    <strong>
                        ${esc(
                            interview.interview_status
                        )}
                    </strong>
                </article>
                `
            ).join("")
            : "<p>No upcoming interviews.</p>";

    document.getElementById(
        "drives"
    ).innerHTML=
        d.openDrives.length
            ? d.openDrives.map(
                drive=>`
                <article class="item">
                    <strong>
                        ${esc(
                            drive.company_name
                        )}
                    </strong>

                    <p>
                        ${esc(
                            drive.role_title
                        )}
                    </p>

                    <p>
                        Package:
                        ${
                            drive.package_lpa
                                ? esc(
                                    drive.package_lpa
                                )+" LPA"
                                : "Not specified"
                        }
                    </p>

                    <p>
                        Deadline:
                        ${esc(
                            drive.application_deadline
                        )}
                    </p>
                </article>
                `
            ).join("")
            : "<p>No open drives.</p>";

    document.getElementById(
        "progress"
    ).innerHTML=`
        <p>
            Regular applications:
            <strong>${value(apps.total)}</strong>
        </p>

        <p>
            Drive applications:
            <strong>${value(drives.total)}</strong>
        </p>

        <p>
            Drive shortlisted:
            <strong>${value(drives.shortlisted)}</strong>
        </p>

        <p>
            Drive interviews:
            <strong>${value(drives.interview)}</strong>
        </p>

        <p>
            Drive selected:
            <strong>${value(drives.selected)}</strong>
        </p>
    `;

    document
        .querySelectorAll(".readButton")
        .forEach(button=>{
            button.onclick=async()=>{
                await markRead(
                    button.dataset.id
                );
            };
        });
}

async function markRead(id){
    const response=
        await fetch(
            `http://localhost:5000/api/placement-notifications/mine/${encodeURIComponent(id)}/read`,
            {
                method:"PATCH",
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

    await loadDashboard();
}

document.getElementById(
    "readAll"
).onclick=async()=>{
    try{
        const response=
            await fetch(
                "http://localhost:5000/api/placement-notifications/mine/read-all",
                {
                    method:"PATCH",
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

        await loadDashboard();
    }catch(error){
        document.getElementById(
            "message"
        ).textContent=
            error.message;
    }
};

loadDashboard().catch(error=>{
    document.getElementById(
        "message"
    ).textContent=
        error.message;
});

const token =
    localStorage.getItem("token");

const authHeaders = {
    Authorization:
        `Bearer ${token}`
};

const message =
    document.getElementById(
        "message"
    );

function esc(value) {
    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

async function loadSummary() {
    const response =
        await fetch(
            "http://localhost:5000/api/placement-applications/mine/summary",
            { headers: authHeaders }
        );

    const data =
        await response.json();

    if (!data.success) {
        throw new Error(
            data.message
        );
    }

    const s =
        data.summary || {};

    document.getElementById(
        "summary"
    ).innerHTML = `
        <div class="card">
            <strong>Total</strong>
            <h2>${esc(s.total || 0)}</h2>
        </div>

        <div class="card">
            <strong>Applied</strong>
            <h2>${esc(s.applied || 0)}</h2>
        </div>

        <div class="card">
            <strong>Shortlisted</strong>
            <h2>${esc(s.shortlisted || 0)}</h2>
        </div>

        <div class="card">
            <strong>Interviews</strong>
            <h2>${esc(s.interview || 0)}</h2>
        </div>

        <div class="card">
            <strong>Selected</strong>
            <h2>${esc(s.selected || 0)}</h2>
        </div>

        <div class="card">
            <strong>Rejected</strong>
            <h2>${esc(s.rejected || 0)}</h2>
        </div>
    `;
}

async function loadApplications() {
    const query =
        new URLSearchParams();

    const search =
        document.getElementById(
            "search"
        ).value.trim();

    const status =
        document.getElementById(
            "filterStatus"
        ).value;

    if (search) {
        query.set(
            "search",
            search
        );
    }

    if (status) {
        query.set(
            "status",
            status
        );
    }

    const response =
        await fetch(
            `http://localhost:5000/api/placement-applications/mine?${query}`,
            { headers: authHeaders }
        );

    const data =
        await response.json();

    if (!data.success) {
        throw new Error(
            data.message
        );
    }

    const container =
        document.getElementById(
            "applications"
        );

    if (!data.applications.length) {
        container.innerHTML =
            "<p>No applications found.</p>";
        return;
    }

    container.innerHTML =
        data.applications.map(
            application => `
            <article class="card">
                <h3>
                    ${esc(
                        application.company_name
                    )}
                </h3>

                <p>
                    <strong>Role:</strong>
                    ${esc(
                        application.role_title
                    )}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${esc(
                        application.application_date
                    )}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${esc(
                        application.application_status
                    )}
                </p>

                ${
                    application.job_url
                        ? `
                        <p>
                            <a
                                href="${esc(application.job_url)}"
                                target="_blank"
                                rel="noopener">
                                Open Job
                            </a>
                        </p>
                        `
                        : ""
                }

                ${
                    application.notes
                        ? `
                        <p>
                            ${esc(
                                application.notes
                            )}
                        </p>
                        `
                        : ""
                }

                <button
                    data-id="${esc(application.id)}"
                    class="deleteApplication">
                    Delete
                </button>
            </article>
        `
        ).join("");

    document
        .querySelectorAll(
            ".deleteApplication"
        )
        .forEach(button => {
            button.addEventListener(
                "click",
                () =>
                    deleteApplication(
                        button.dataset.id
                    )
            );
        });
}

async function deleteApplication(id) {
    if (!confirm(
        "Delete this application?"
    )) {
        return;
    }

    try {
        const response =
            await fetch(
                `http://localhost:5000/api/placement-applications/mine/${encodeURIComponent(id)}`,
                {
                    method: "DELETE",
                    headers: authHeaders
                }
            );

        const data =
            await response.json();

        if (!data.success) {
            throw new Error(
                data.message
            );
        }

        await Promise.all([
            loadSummary(),
            loadApplications()
        ]);
    } catch (error) {
        message.textContent =
            error.message;
    }
}

document
    .getElementById(
        "applicationForm"
    )
    .addEventListener(
        "submit",
        async event => {
            event.preventDefault();

            try {
                const response =
                    await fetch(
                        "http://localhost:5000/api/placement-applications/mine",
                        {
                            method: "POST",
                            headers: {
                                ...authHeaders,
                                "Content-Type":
                                    "application/json"
                            },
                            body:
                                JSON.stringify({
                                    companyName:
                                        document
                                        .getElementById(
                                            "companyName"
                                        ).value.trim(),

                                    roleTitle:
                                        document
                                        .getElementById(
                                            "roleTitle"
                                        ).value.trim(),

                                    applicationDate:
                                        document
                                        .getElementById(
                                            "applicationDate"
                                        ).value,

                                    applicationStatus:
                                        document
                                        .getElementById(
                                            "applicationStatus"
                                        ).value,

                                    jobUrl:
                                        document
                                        .getElementById(
                                            "jobUrl"
                                        ).value.trim(),

                                    notes:
                                        document
                                        .getElementById(
                                            "notes"
                                        ).value.trim()
                                })
                        }
                    );

                const data =
                    await response.json();

                if (!data.success) {
                    throw new Error(
                        data.message
                    );
                }

                event.target.reset();

                message.textContent =
                    "Application added.";

                await Promise.all([
                    loadSummary(),
                    loadApplications()
                ]);
            } catch (error) {
                message.textContent =
                    error.message;
            }
        }
    );

document
    .getElementById(
        "filterButton"
    )
    .addEventListener(
        "click",
        loadApplications
    );

Promise.all([
    loadSummary(),
    loadApplications()
]).catch(error => {
    message.textContent =
        error.message;
});

const token =
    localStorage.getItem("token");

const result =
    document.getElementById(
        "results"
    );

function esc(value) {
    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

document
.getElementById("load")
.addEventListener(
    "click",
    async () => {
        const id =
            document.getElementById(
                "certificateId"
            ).value;

        if (!id) return;

        try {
            const response =
                await fetch(
                    `http://localhost:5000/api/certificate-audit/${id}/audit`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const data =
                await response.json();

            if (!data.success) {
                throw new Error(
                    data.message
                );
            }

            if (!data.logs.length) {
                result.innerHTML =
                    "<p>No audit records.</p>";
                return;
            }

            result.innerHTML =
                data.logs.map(log => `
                    <article
                        style="padding:12px;margin:10px 0;border:1px solid #ddd">
                        <strong>
                            ${esc(log.action)}
                        </strong>

                        <p>
                            Actor:
                            ${esc(
                                log.actor_user_id ||
                                "System"
                            )}
                        </p>

                        <p>
                            Time:
                            ${esc(
                                log.created_at
                            )}
                        </p>

                        <pre>${esc(
                            typeof log.details === "string"
                                ? log.details
                                : JSON.stringify(
                                    log.details,
                                    null,
                                    2
                                )
                        )}</pre>
                    </article>
                `).join("");
        } catch (error) {
            result.textContent =
                "Unable to load audit history.";
        }
    }
);

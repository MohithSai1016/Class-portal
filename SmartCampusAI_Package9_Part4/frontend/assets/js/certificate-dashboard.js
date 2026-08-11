const token =
    localStorage.getItem("token");

const headers = {
    Authorization:
        `Bearer ${token}`
};

function esc(value) {
    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

async function load() {
    try {
        const response =
            await fetch(
                "http://localhost:5000/api/certificates/mine",
                { headers }
            );

        const data =
            await response.json();

        if (!data.success) {
            throw new Error(
                data.message
            );
        }

        const certificates =
            data.certificates;

        const issued =
            certificates.filter(
                c => c.status === "Issued"
            ).length;

        const revoked =
            certificates.filter(
                c => c.status === "Revoked"
            ).length;

        document.getElementById(
            "summary"
        ).innerHTML = `
            <p>
                Total certificates:
                <strong>
                    ${certificates.length}
                </strong>
            </p>

            <p>
                Issued:
                <strong>${issued}</strong>
            </p>

            <p>
                Revoked:
                <strong>${revoked}</strong>
            </p>
        `;

        const container =
            document.getElementById(
                "certificates"
            );

        if (!certificates.length) {
            container.innerHTML =
                "<p>No certificates available.</p>";
            return;
        }

        container.innerHTML =
            certificates.map(c => `
                <article
                    style="padding:16px;margin:12px 0;border:1px solid #ddd">
                    <h2>
                        ${esc(c.title)}
                    </h2>

                    <p>
                        ${esc(
                            c.description || ""
                        )}
                    </p>

                    <p>
                        ${esc(
                            c.certificate_type
                        )}
                        ·
                        ${esc(c.status)}
                    </p>

                    <p>
                        Issued by:
                        ${esc(
                            c.issuing_organization
                        )}
                    </p>

                    <p>
                        Verification:
                        ${esc(
                            c.verification_code
                        )}
                    </p>

                    <a
                      href="../../shared/certificate-view.html?id=${encodeURIComponent(c.id)}">
                      View Certificate
                    </a>
                </article>
            `).join("");
    } catch (error) {
        document.getElementById(
            "certificates"
        ).textContent =
            "Unable to load certificates.";
    }
}

load();

const token =
    localStorage.getItem("token");

const container =
    document.getElementById("certificates");

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

async function loadCertificates() {
    try {
        const response = await fetch(
            "http://localhost:5000/api/certificates/mine",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        if (!data.certificates.length) {
            container.innerHTML =
                "<p>No certificates available.</p>";
            return;
        }

        container.innerHTML =
            data.certificates.map(certificate => `
                <article
                    style="padding:16px;margin:12px 0;border:1px solid #ddd"
                >
                    <h2>
                        ${escapeHtml(certificate.title)}
                    </h2>

                    <p>
                        ${escapeHtml(
                            certificate.description || ""
                        )}
                    </p>

                    <p>
                        <strong>Type:</strong>
                        ${escapeHtml(
                            certificate.certificate_type
                        )}
                    </p>

                    <p>
                        <strong>Issued by:</strong>
                        ${escapeHtml(
                            certificate.issuing_organization
                        )}
                    </p>

                    <p>
                        <strong>Issue date:</strong>
                        ${escapeHtml(
                            certificate.issue_date
                        )}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${escapeHtml(
                            certificate.status
                        )}
                    </p>

                    <p>
                        <strong>Verification:</strong>
                        ${escapeHtml(
                            certificate.verification_code || "N/A"
                        )}
                    </p>

                    ${
                        certificate.file_path
                            ? `<a href="${escapeHtml(
                                certificate.file_path
                              )}"
                              target="_blank"
                              rel="noopener">
                              View Certificate
                              </a>`
                            : ""
                    }
                </article>
            `).join("");
    } catch (error) {
        container.textContent =
            "Unable to load certificates.";
    }
}

loadCertificates();

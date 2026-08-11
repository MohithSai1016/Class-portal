const params =
    new URLSearchParams(
        window.location.search
    );

const id =
    params.get("id");

const container =
    document.getElementById(
        "certificate"
    );

const token =
    localStorage.getItem("token");

function esc(value) {
    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

async function load() {
    if (!id || !token) {
        container.textContent =
            "Certificate access requires login.";
        return;
    }

    try {
        const response =
            await fetch(
                `http://localhost:5000/api/certificates/${encodeURIComponent(id)}`,
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

        const c =
            data.certificate;

        let qr = "";

        try {
            const qrResponse =
                await fetch(
                    `http://localhost:5000/api/certificate-qr/${encodeURIComponent(id)}/qr`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const qrData =
                await qrResponse.json();

            if (qrData.success) {
                qr = `
                    <img
                        class="qr"
                        src="${qrData.qrDataUrl}"
                        alt="Certificate verification QR">
                `;
            }
        } catch (_) {}

        container.innerHTML = `
            <h1>SMART CAMPUS AI</h1>
            <h2>CERTIFICATE</h2>

            <p>This certificate is presented to</p>

            <h1>
                ${esc(
                    c.student_name ||
                    "Student"
                )}
            </h1>

            <p>
                ${esc(
                    c.description ||
                    c.title
                )}
            </p>

            <p>
                <strong>Certificate Type:</strong>
                ${esc(c.certificate_type)}
            </p>

            <p>
                <strong>Issued By:</strong>
                ${esc(c.issuing_organization)}
            </p>

            <p>
                <strong>Issue Date:</strong>
                ${esc(c.issue_date)}
            </p>

            <p>
                <strong>Certificate Number:</strong>
                ${esc(
                    c.certificate_number ||
                    "N/A"
                )}
            </p>

            <p>
                <strong>Verification Code:</strong>
                ${esc(
                    c.verification_code
                )}
            </p>

            ${qr}

            <p>
                <a
                    href="http://localhost:5000/api/certificates/${encodeURIComponent(id)}/download"
                    target="_blank"
                    rel="noopener">
                    Download PDF
                </a>
            </p>
        `;
    } catch (error) {
        container.textContent =
            "Unable to load certificate.";
    }
}

load();

const form =
    document.getElementById("verifyForm");

const result =
    document.getElementById("result");

function esc(value) {
    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

form.addEventListener("submit", async event => {
    event.preventDefault();

    const code =
        document.getElementById("code")
        .value.trim();

    if (!code) return;

    try {
        const response = await fetch(
            `http://localhost:5000/api/certificates/verify/${encodeURIComponent(code)}`
        );

        const data = await response.json();

        if (!data.success) {
            result.textContent =
                data.message;
            return;
        }

        if (!data.valid) {
            result.innerHTML =
                "<h2>Certificate is not valid.</h2>";
            return;
        }

        const c = data.certificate;

        result.innerHTML = `
            <h2>Certificate Verified ✓</h2>
            <p>
                <strong>Title:</strong>
                ${esc(c.title)}
            </p>
            <p>
                <strong>Type:</strong>
                ${esc(c.certificate_type)}
            </p>
            <p>
                <strong>Issued by:</strong>
                ${esc(c.issuing_organization)}
            </p>
            <p>
                <strong>Issue date:</strong>
                ${esc(c.issue_date)}
            </p>
            <p>
                <strong>Certificate number:</strong>
                ${esc(c.certificate_number || "N/A")}
            </p>
        `;
    } catch (error) {
        result.textContent =
            "Unable to verify certificate.";
    }
});

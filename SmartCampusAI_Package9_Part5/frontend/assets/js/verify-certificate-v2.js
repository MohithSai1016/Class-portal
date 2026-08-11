const form =
    document.getElementById("verifyForm");

const codeInput =
    document.getElementById("code");

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

const params =
    new URLSearchParams(
        window.location.search
    );

const initialCode =
    params.get("code");

if (initialCode) {
    codeInput.value =
        initialCode;
}

async function verify(code) {
    const response =
        await fetch(
            `http://localhost:5000/api/certificate-verification/${encodeURIComponent(code)}`
        );

    const data =
        await response.json();

    if (!data.success) {
        throw new Error(
            data.message
        );
    }

    if (!data.valid) {
        result.innerHTML = `
            <div class="invalid">
                <h2>Certificate Not Valid</h2>
                <p>
                    ${esc(
                        data.reason ||
                        "Verification failed."
                    )}
                </p>
            </div>
        `;
        return;
    }

    const c =
        data.certificate;

    result.innerHTML = `
        <div class="valid">
            <h2>✓ Certificate Verified</h2>

            <p>
                <strong>Title:</strong>
                ${esc(c.title)}
            </p>

            <p>
                <strong>Type:</strong>
                ${esc(c.certificate_type)}
            </p>

            <p>
                <strong>Organization:</strong>
                ${esc(
                    c.issuing_organization
                )}
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
                <strong>Status:</strong>
                ${esc(c.status)}
            </p>
        </div>
    `;
}

form.addEventListener(
    "submit",
    async event => {
        event.preventDefault();

        const code =
            codeInput.value.trim();

        if (!code) return;

        result.textContent =
            "Verifying...";

        try {
            await verify(code);
        } catch (error) {
            result.innerHTML = `
                <div class="invalid">
                    Unable to complete verification.
                </div>
            `;
        }
    }
);

if (initialCode) {
    verify(initialCode).catch(() => {});
}

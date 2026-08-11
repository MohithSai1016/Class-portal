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

async function loadStatistics() {
    const response =
        await fetch(
            "http://localhost:5000/api/certificate-admin/statistics",
            { headers }
        );

    const data =
        await response.json();

    if (!data.success) {
        throw new Error(
            data.message
        );
    }

    document.getElementById(
        "statistics"
    ).innerHTML = `
        <div class="card">
            <strong>Total:</strong>
            ${esc(data.total)}
            &nbsp; | &nbsp;
            <strong>Issued:</strong>
            ${esc(data.issued)}
            &nbsp; | &nbsp;
            <strong>Pending:</strong>
            ${esc(data.pending)}
            &nbsp; | &nbsp;
            <strong>Revoked:</strong>
            ${esc(data.revoked)}
        </div>
    `;
}

async function searchCertificates() {
    const query =
        new URLSearchParams();

    const search =
        document.getElementById(
            "search"
        ).value.trim();

    const status =
        document.getElementById(
            "status"
        ).value;

    const type =
        document.getElementById(
            "type"
        ).value.trim();

    if (search) query.set(
        "search",
        search
    );

    if (status) query.set(
        "status",
        status
    );

    if (type) query.set(
        "type",
        type
    );

    const response =
        await fetch(
            `http://localhost:5000/api/certificate-admin/search?${query}`,
            { headers }
        );

    const data =
        await response.json();

    const results =
        document.getElementById(
            "results"
        );

    if (!data.success) {
        results.textContent =
            data.message;
        return;
    }

    if (!data.certificates.length) {
        results.innerHTML =
            "<p>No certificates found.</p>";
        return;
    }

    results.innerHTML =
        data.certificates.map(c => `
            <article class="card">
                <h2>
                    ${esc(c.title)}
                </h2>

                <p>
                    Type:
                    ${esc(c.certificate_type)}
                </p>

                <p>
                    Issued:
                    ${esc(c.issue_date)}
                </p>

                <p>
                    Organization:
                    ${esc(
                        c.issuing_organization
                    )}
                </p>

                <p>
                    Status:
                    ${esc(c.status)}
                </p>

                <p>
                    Verification:
                    ${esc(
                        c.verification_code
                    )}
                </p>

                ${
                    c.file_path
                        ? `
                        <a
                          href="http://localhost:5000${esc(c.file_path)}"
                          target="_blank"
                          rel="noopener">
                          View PDF
                        </a>
                        `
                        : "<span>PDF not uploaded</span>"
                }
            </article>
        `).join("");
}

document
    .getElementById("searchButton")
    .addEventListener(
        "click",
        searchCertificates
    );

Promise.all([
    loadStatistics(),
    searchCertificates()
]).catch(() => {
    document.getElementById(
        "results"
    ).textContent =
        "Unable to load certificate data.";
});

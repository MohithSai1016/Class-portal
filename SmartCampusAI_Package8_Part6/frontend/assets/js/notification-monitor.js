const token =
    localStorage.getItem("token");

const headers = {
    Authorization: `Bearer ${token}`
};

function esc(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

async function loadStatistics() {
    const response = await fetch(
        "http://localhost:5000/api/notification-admin/statistics",
        { headers }
    );

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    document.getElementById("statistics").innerHTML = `
        <p>Total: ${esc(data.totals.total)}</p>
        <p>Unread: ${esc(data.totals.unread || 0)}</p>
        <p>Read: ${esc(data.totals.read_count || 0)}</p>

        <h3>By Type</h3>
        <ul>
            ${data.byType.map(item => `
                <li>
                    ${esc(item.notification_type)}:
                    ${esc(item.count)}
                </li>
            `).join("")}
        </ul>

        <h3>Delivery</h3>
        <ul>
            ${data.delivery.map(item => `
                <li>
                    ${esc(item.channel)} /
                    ${esc(item.status)}:
                    ${esc(item.count)}
                </li>
            `).join("")}
        </ul>
    `;
}

async function search() {
    const type =
        document.getElementById("type").value;

    const status =
        document.getElementById("status").value;

    const query = new URLSearchParams();

    if (type) query.set("type", type);
    if (status) query.set("status", status);

    const response = await fetch(
        `http://localhost:5000/api/notification-admin/search?${query}`,
        { headers }
    );

    const data = await response.json();

    const results =
        document.getElementById("results");

    if (!data.success) {
        results.textContent = data.message;
        return;
    }

    results.innerHTML = data.notifications.map(n => `
        <article style="margin:12px 0;padding:12px;border:1px solid #ddd">
            <strong>${esc(n.title)}</strong>
            <p>${esc(n.message)}</p>
            <small>
                User: ${esc(n.recipient_user_id)}
                · ${esc(n.notification_type)}
                · ${esc(n.priority)}
                · ${n.is_read ? "Read" : "Unread"}
            </small>
        </article>
    `).join("") || "<p>No results.</p>";
}

document
    .getElementById("search")
    .addEventListener("click", search);

document
    .getElementById("cleanup")
    .addEventListener("click", async () => {
        const days =
            document.getElementById("days").value;

        const response = await fetch(
            "http://localhost:5000/api/notification-admin/cleanup",
            {
                method: "POST",
                headers: {
                    ...headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ days })
            }
        );

        const data = await response.json();

        document.getElementById("status").textContent =
            data.success
                ? `Deleted ${data.deleted} old notifications.`
                : data.message;

        loadStatistics();
    });

loadStatistics().catch(() => {
    document.getElementById("statistics").textContent =
        "Unable to load statistics.";
});

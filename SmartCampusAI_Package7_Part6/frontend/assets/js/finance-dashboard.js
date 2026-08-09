const token = localStorage.getItem("token");

async function loadDashboard() {
    try {
        const response = await fetch(
            "http://localhost:5000/api/finance/dashboard",
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await response.json();
        if (!data.success) throw new Error(data.message);

        const s = data.summary;

        document.getElementById("summary").innerHTML = `
            <div><strong>Total Assigned:</strong> ₹${Number(s.total_assigned).toFixed(2)}</div>
            <div><strong>Total Collected:</strong> ₹${Number(s.total_collected).toFixed(2)}</div>
            <div><strong>Total Due:</strong> ₹${Number(s.total_due).toFixed(2)}</div>
            <div><strong>Paid:</strong> ${s.paid_students || 0}</div>
            <div><strong>Partial:</strong> ${s.partial_students || 0}</div>
            <div><strong>Pending:</strong> ${s.pending_students || 0}</div>
        `;

        document.getElementById("collections").innerHTML =
            data.monthlyCollections.map(item => `
                <tr><td>${item.month}</td>
                <td>₹${Number(item.collected).toFixed(2)}</td></tr>
            `).join("") ||
            `<tr><td colspan="2">No collections found.</td></tr>`;

        document.getElementById("overdue").innerHTML =
            data.overdue.map(item => `
                <tr>
                    <td>${item.student_id}</td>
                    <td>${item.due_date}</td>
                    <td>₹${Number(item.due_amount).toFixed(2)}</td>
                </tr>
            `).join("") ||
            `<tr><td colspan="3">No overdue fees.</td></tr>`;
    } catch (error) {
        document.getElementById("summary").textContent =
            "Unable to load finance dashboard.";
    }
}

document.getElementById("generateReminders").addEventListener("click", async () => {
    const message = document.getElementById("message");

    try {
        const response = await fetch(
            "http://localhost:5000/api/fee-reminders/generate",
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        const data = await response.json();
        message.textContent = data.success
            ? `${data.created} reminder(s) generated.`
            : data.message;
    } catch (error) {
        message.textContent = "Unable to generate reminders.";
    }
});

loadDashboard();

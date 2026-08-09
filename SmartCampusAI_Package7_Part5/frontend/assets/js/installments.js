const token = localStorage.getItem("token");
const studentFeeId = localStorage.getItem("studentFeeId");

async function loadInstallments() {
    const body =
        document.getElementById("installmentRows");

    if (!studentFeeId) {
        body.innerHTML =
            `<tr><td colspan="4">Student fee ID is not available.</td></tr>`;
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:5000/api/fee-plans/installments/${studentFeeId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        body.innerHTML = data.installments.map(item => `
            <tr>
                <td>${item.installment_number}</td>
                <td>${item.due_date}</td>
                <td>₹${Number(item.amount).toFixed(2)}</td>
                <td>${item.status}</td>
            </tr>
        `).join("");

        if (!data.installments.length) {
            body.innerHTML =
                `<tr><td colspan="4">No installment plan found.</td></tr>`;
        }
    } catch (error) {
        body.innerHTML =
            `<tr><td colspan="4">Unable to load installments.</td></tr>`;
    }
}

loadInstallments();

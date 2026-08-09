const token = localStorage.getItem("token");
const studentId = localStorage.getItem("studentId");

async function loadReceipts() {
    const body = document.getElementById("receiptRows");

    if (!studentId) {
        body.innerHTML =
            `<tr><td colspan="5">Student ID is not available.</td></tr>`;
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:5000/api/receipts/student/${studentId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        body.innerHTML = "";

        data.receipts.forEach(receipt => {
            body.innerHTML += `
                <tr>
                    <td>${receipt.receipt_number}</td>
                    <td>${new Date(receipt.issued_at).toLocaleString()}</td>
                    <td>${receipt.transaction_reference}</td>
                    <td>₹${Number(receipt.amount).toFixed(2)}</td>
                    <td>${receipt.payment_method}</td>
                </tr>
            `;
        });

        if (!data.receipts.length) {
            body.innerHTML =
                `<tr><td colspan="5">No receipts found.</td></tr>`;
        }
    } catch (error) {
        body.innerHTML =
            `<tr><td colspan="5">Unable to load receipts.</td></tr>`;
    }
}

loadReceipts();

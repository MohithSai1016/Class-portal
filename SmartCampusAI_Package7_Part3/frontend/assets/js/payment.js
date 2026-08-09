const token = localStorage.getItem("token");

document.getElementById("createOrder").addEventListener("click", async () => {
    const studentFeeId =
        Number(document.getElementById("feeId").value);

    const amount =
        Number(document.getElementById("amount").value);

    const result =
        document.getElementById("result");

    if (!studentFeeId || !amount || amount <= 0) {
        result.textContent = "Enter a valid fee ID and amount.";
        return;
    }

    try {
        const response = await fetch(
            "http://localhost:5000/api/payment-gateway/orders",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    studentFeeId,
                    amount,
                    currency: "INR"
                })
            }
        );

        const data = await response.json();
        result.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        result.textContent = "Unable to create payment order.";
    }
});

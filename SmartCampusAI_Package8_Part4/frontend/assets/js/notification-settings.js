const token =
    localStorage.getItem("token");

const ids = {
    inApp: "inApp",
    email: "email",
    push: "push",
    attendance: "attendance",
    fees: "fees",
    academic: "academic",
    placement: "placement",
    announcement: "announcement"
};

function setCheckbox(id, value) {
    document.getElementById(id).checked = Boolean(value);
}

async function loadPreferences() {
    const response = await fetch(
        "http://localhost:5000/api/notification-preferences",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    const p = data.preferences;

    Object.entries(ids).forEach(([key, id]) => {
        setCheckbox(id, p[`${key}_enabled`]);
    });
}

document
    .getElementById("preferences")
    .addEventListener("submit", async event => {
        event.preventDefault();

        const payload = {};

        Object.entries(ids).forEach(([key, id]) => {
            payload[`${key}_enabled`] =
                document.getElementById(id).checked;
        });

        const status =
            document.getElementById("status");

        try {
            const response = await fetch(
                "http://localhost:5000/api/notification-preferences",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            status.textContent = data.success
                ? "Notification preferences saved."
                : data.message;
        } catch (error) {
            status.textContent =
                "Unable to save notification preferences.";
        }
    });

loadPreferences().catch(() => {
    document.getElementById("status").textContent =
        "Unable to load notification preferences.";
});

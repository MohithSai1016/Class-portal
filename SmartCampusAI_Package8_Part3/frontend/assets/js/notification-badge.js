const notificationToken = localStorage.getItem("token");

async function updateNotificationBadge() {
    const badge =
        document.querySelector("[data-notification-count]");

    if (!badge || !notificationToken) return;

    try {
        const response = await fetch(
            "http://localhost:5000/api/notifications/unread-count",
            {
                headers: {
                    Authorization:
                        `Bearer ${notificationToken}`
                }
            }
        );

        const data = await response.json();

        if (!data.success) return;

        badge.textContent =
            data.count > 99 ? "99+" : String(data.count);

        badge.hidden = data.count === 0;
    } catch (error) {
        // Notification badge failure must not break the dashboard.
    }
}

updateNotificationBadge();
setInterval(updateNotificationBadge, 30000);

const notificationRepository =
    require("../models/NotificationRepository");

const preferenceRepository =
    require("../models/NotificationPreferenceRepository");

const delivery =
    require("./notificationDeliveryService");

const providers =
    require("../config/notificationProviders");

function preferenceField(type) {
    const map = {
        Attendance: "attendance_enabled",
        Fees: "fees_enabled",
        Academic: "academic_enabled",
        Placement: "placement_enabled",
        Announcement: "announcement_enabled",
        General: "in_app_enabled",
        System: "in_app_enabled"
    };

    return map[type] || "in_app_enabled";
}

async function dispatch(notificationId) {
    const poolNotification =
        await notificationRepository.findById(notificationId);

    if (!poolNotification) {
        throw new Error("Notification not found");
    }

    const preferences =
        await preferenceRepository.get(
            poolNotification.recipient_user_id
        );

    const typeField =
        preferenceField(poolNotification.notification_type);

    if (!preferences[typeField]) {
        return {
            notificationId,
            status: "Skipped",
            reason: "Disabled by user preference"
        };
    }

    const channels = [];

    if (preferences.in_app_enabled) {
        const logId = await delivery.queue(
            notificationId,
            "InApp",
            "internal"
        );

        await delivery.markSent(logId);
        channels.push("InApp");
    }

    if (preferences.email_enabled) {
        const provider = providers.getEmailProvider();

        try {
            const logId = await delivery.queue(
                notificationId,
                "Email",
                provider.name
            );

            await provider.send(poolNotification);
            await delivery.markSent(logId);
            channels.push("Email");
        } catch (error) {
            channels.push("EmailFailed");
        }
    }

    if (preferences.push_enabled) {
        const provider = providers.getPushProvider();

        try {
            const logId = await delivery.queue(
                notificationId,
                "Push",
                provider.name
            );

            await provider.send(poolNotification);
            await delivery.markSent(logId);
            channels.push("Push");
        } catch (error) {
            channels.push("PushFailed");
        }
    }

    return {
        notificationId,
        status: "Processed",
        channels
    };
}

module.exports = { dispatch };

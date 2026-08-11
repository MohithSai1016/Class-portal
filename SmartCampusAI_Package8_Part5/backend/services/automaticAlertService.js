const notificationService =
    require("./notificationService");

async function sendAttendanceAlert(data) {
    return notificationService.send({
        recipientUserId: data.studentUserId,
        title: data.title || "Attendance Alert",
        message: data.message,
        notificationType: "Attendance",
        priority: data.priority || "High"
    });
}

async function sendFeeAlert(data) {
    return notificationService.send({
        recipientUserId: data.studentUserId,
        title: data.title || "Fee Alert",
        message: data.message,
        notificationType: "Fees",
        priority: data.priority || "High"
    });
}

async function sendAcademicAlert(data) {
    return notificationService.send({
        recipientUserId: data.studentUserId,
        title: data.title || "Academic Alert",
        message: data.message,
        notificationType: "Academic",
        priority: data.priority || "Normal"
    });
}

async function sendPlacementAlert(data) {
    return notificationService.send({
        recipientUserId: data.studentUserId,
        title: data.title || "Placement Alert",
        message: data.message,
        notificationType: "Placement",
        priority: data.priority || "Normal"
    });
}

module.exports = {
    sendAttendanceAlert,
    sendFeeAlert,
    sendAcademicAlert,
    sendPlacementAlert
};

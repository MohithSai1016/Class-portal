const alerts =
    require("../services/automaticAlertService");

async function attendance(req, res) {
    try {
        const id =
            await alerts.sendAttendanceAlert(req.body);

        res.status(201).json({
            success: true,
            notificationId: id
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function fees(req, res) {
    try {
        const id =
            await alerts.sendFeeAlert(req.body);

        res.status(201).json({
            success: true,
            notificationId: id
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function academic(req, res) {
    try {
        const id =
            await alerts.sendAcademicAlert(req.body);

        res.status(201).json({
            success: true,
            notificationId: id
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function placement(req, res) {
    try {
        const id =
            await alerts.sendPlacementAlert(req.body);

        res.status(201).json({
            success: true,
            notificationId: id
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    attendance,
    fees,
    academic,
    placement
};

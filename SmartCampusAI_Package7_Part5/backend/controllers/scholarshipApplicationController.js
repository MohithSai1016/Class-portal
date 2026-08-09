const service =
    require("../services/scholarshipApplicationService");

async function apply(req, res) {
    try {
        const id = await service.apply(req.body);

        res.status(201).json({
            success: true,
            applicationId: id
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function list(req, res) {
    try {
        const applications =
            await service.list(req.params.studentId);

        res.json({
            success: true,
            applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    apply,
    list
};

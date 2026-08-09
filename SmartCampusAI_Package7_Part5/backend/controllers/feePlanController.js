const service = require("../services/feePlanService");

async function installments(req, res) {
    try {
        const rows = await service.getInstallments(
            req.params.studentFeeId
        );

        res.json({
            success: true,
            installments: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function create(req, res) {
    try {
        const id = await service.createInstallment(req.body);

        res.status(201).json({
            success: true,
            installmentId: id
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    installments,
    create
};

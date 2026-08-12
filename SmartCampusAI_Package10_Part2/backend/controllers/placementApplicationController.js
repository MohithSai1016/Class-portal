const service =
    require("../services/placementApplicationService");

async function listMine(req, res) {
    try {
        const applications =
            await service.list(
                req.user.id,
                req.query
            );

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

async function getMine(req, res) {
    try {
        const application =
            await service.get(
                Number(req.params.id),
                req.user.id
            );

        res.json({
            success: true,
            application
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}

async function createMine(req, res) {
    try {
        const id =
            await service.create(
                req.user.id,
                req.body
            );

        const application =
            await service.get(
                id,
                req.user.id
            );

        res.status(201).json({
            success: true,
            application
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function updateMine(req, res) {
    try {
        const application =
            await service.update(
                Number(req.params.id),
                req.user.id,
                req.body
            );

        res.json({
            success: true,
            application
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteMine(req, res) {
    try {
        await service.remove(
            Number(req.params.id),
            req.user.id
        );

        res.json({
            success: true
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}

async function summaryMine(req, res) {
    try {
        const summary =
            await service.summary(
                req.user.id
            );

        res.json({
            success: true,
            summary
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    listMine,
    getMine,
    createMine,
    updateMine,
    deleteMine,
    summaryMine
};

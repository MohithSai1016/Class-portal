const lifecycle =
    require("../services/certificateLifecycleService");

async function issue(req, res) {
    try {
        const id =
            await lifecycle.issue(
                req.body,
                req.user.id
            );

        res.status(201).json({
            success: true,
            certificateId: id
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function revoke(req, res) {
    try {
        await lifecycle.revoke(
            Number(req.params.id),
            req.user.id
        );

        res.json({
            success: true
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    issue,
    revoke
};

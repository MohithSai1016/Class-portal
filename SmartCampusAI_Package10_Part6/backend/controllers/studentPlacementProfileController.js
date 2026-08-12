const service =
    require("../services/studentPlacementProfileService");

const readiness =
    require("../services/placementReadinessService");

async function mine(req,res) {
    try {
        res.json({
            success:true,
            profile:
                await service.get(
                    req.user.id
                )
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

async function save(req,res) {
    try {
        const profile =
            await service.save(
                req.user.id,
                req.body
            );

        res.json({
            success:true,
            profile
        });
    } catch(error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

async function calculateReadiness(
    req,
    res
) {
    try {
        res.json({
            success:true,
            readiness:
                await readiness.calculate(
                    req.user.id
                )
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports = {
    mine,
    save,
    calculateReadiness
};

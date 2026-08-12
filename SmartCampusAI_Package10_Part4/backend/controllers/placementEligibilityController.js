const service =
    require("../services/placementEligibilityService");

async function checkMine(req,res) {
    try {
        const result =
            await service.check(
                Number(req.params.driveId),
                req.user.id
            );

        res.json({
            success:true,
            ...result
        });
    } catch(error) {
        res.status(404).json({
            success:false,
            message:error.message
        });
    }
}

module.exports = {
    checkMine
};

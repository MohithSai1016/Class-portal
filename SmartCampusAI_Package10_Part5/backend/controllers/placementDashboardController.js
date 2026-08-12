const service =
    require("../services/placementDashboardService");

async function mine(req,res) {
    try {
        res.json({
            success:true,
            dashboard:
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

module.exports={mine};

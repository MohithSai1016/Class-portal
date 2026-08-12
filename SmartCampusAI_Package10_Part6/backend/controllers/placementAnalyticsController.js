const service =
    require("../services/placementAnalyticsService");

async function overview(req,res) {
    try {
        res.json({
            success:true,
            analytics:
                await service.get()
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports={overview};

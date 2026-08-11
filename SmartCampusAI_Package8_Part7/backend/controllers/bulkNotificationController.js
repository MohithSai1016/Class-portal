const service =
    require("../services/bulkNotificationService");

async function send(req,res) {
    try {
        const result =
            await service.sendBulk(req.body);

        res.status(201).json({
            success:true,
            ...result
        });
    } catch(error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

module.exports={send};

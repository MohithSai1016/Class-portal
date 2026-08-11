const service =
    require("../services/notificationTemplateService");

async function list(req,res) {
    try {
        res.json({
            success:true,
            templates:await service.list()
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

async function create(req,res) {
    try {
        const id = await service.create(req.body);

        res.status(201).json({
            success:true,
            templateId:id
        });
    } catch(error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

module.exports={list,create};

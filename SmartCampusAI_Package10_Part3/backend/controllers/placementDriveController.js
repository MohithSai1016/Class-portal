const service =
    require("../services/placementDriveService");

async function listOpen(req,res) {
    try {
        res.json({
            success:true,
            drives:
                await service.listOpen(
                    req.query
                )
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

async function getDrive(req,res) {
    try {
        res.json({
            success:true,
            drive:
                await service.get(
                    Number(req.params.id)
                )
        });
    } catch(error) {
        res.status(404).json({
            success:false,
            message:error.message
        });
    }
}

async function createDrive(req,res) {
    try {
        const drive =
            await service.createDrive(
                req.body
            );

        res.status(201).json({
            success:true,
            drive
        });
    } catch(error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

async function apply(req,res) {
    try {
        const result =
            await service.apply(
                Number(req.params.id),
                req.user.id
            );

        res.status(201).json({
            success:true,
            application:result
        });
    } catch(error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

async function myApplications(req,res) {
    try {
        res.json({
            success:true,
            applications:
                await service.myApplications(
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
    listOpen,
    getDrive,
    createDrive,
    apply,
    myApplications
};

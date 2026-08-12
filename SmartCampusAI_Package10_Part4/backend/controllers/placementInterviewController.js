const service =
    require("../services/placementInterviewService");

async function listMine(req,res) {
    try {
        res.json({
            success:true,
            interviews:
                await service.list(
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

async function upcomingMine(req,res) {
    try {
        res.json({
            success:true,
            interviews:
                await service.upcoming(
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

async function getMine(req,res) {
    try {
        res.json({
            success:true,
            interview:
                await service.get(
                    Number(req.params.id),
                    req.user.id
                )
        });
    } catch(error) {
        res.status(404).json({
            success:false,
            message:error.message
        });
    }
}

/*
 * Interview creation is restricted to HOD/admin.
 * The drive_application_id supplied by the caller
 * must belong to a valid placement application.
 */
async function create(req,res) {
    try {
        const id =
            await service.create(
                req.body
            );

        res.status(201).json({
            success:true,
            id
        });
    } catch(error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

module.exports = {
    listMine,
    upcomingMine,
    getMine,
    create
};

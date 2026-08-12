const service =
    require("../services/placementNotificationService");

async function listMine(req,res) {
    try {
        res.json({
            success:true,
            notifications:
                await service.list(
                    req.user.id,
                    req.query.limit
                )
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

async function unreadMine(req,res) {
    try {
        res.json({
            success:true,
            count:
                await service.unreadCount(
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

async function markRead(req,res) {
    try {
        await service.markRead(
            Number(req.params.id),
            req.user.id
        );

        res.json({
            success:true
        });
    } catch(error) {
        res.status(404).json({
            success:false,
            message:error.message
        });
    }
}

async function markAllRead(req,res) {
    try {
        const count =
            await service.markAllRead(
                req.user.id
            );

        res.json({
            success:true,
            updated:count
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

/*
 * HOD/admin can create targeted placement
 * notifications. The frontend can later expose
 * a richer notification composer.
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
    unreadMine,
    markRead,
    markAllRead,
    create
};

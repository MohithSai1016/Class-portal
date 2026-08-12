const repository =
    require("../models/PlacementOfferRepository");

async function mine(req,res) {
    try {
        res.json({
            success:true,
            offers:
                await repository.listByStudent(
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

async function create(req,res) {
    try {
        const offer =
            await repository.create(
                req.body
            );

        res.status(201).json({
            success:true,
            offer
        });
    } catch(error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

async function update(req,res) {
    try {
        const existing =
            await repository.findById(
                Number(req.params.id)
            );

        if (!existing) {
            return res.status(404).json({
                success:false,
                message:"Offer not found."
            });
        }

        const offer =
            await repository.update(
                Number(req.params.id),
                req.body
            );

        res.json({
            success:true,
            offer
        });
    } catch(error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

async function all(req,res) {
    try {
        res.json({
            success:true,
            offers:
                await repository.listAll()
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
    create,
    update,
    all
};

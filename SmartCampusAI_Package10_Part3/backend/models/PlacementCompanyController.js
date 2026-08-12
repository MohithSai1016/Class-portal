const repository =
    require("./PlacementCompanyRepository");

async function list(req,res) {
    try {
        res.json({
            success:true,
            companies:
                await repository.list()
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
        if (!req.body.companyName) {
            return res.status(400).json({
                success:false,
                message:"companyName is required"
            });
        }

        const id =
            await repository.create(
                req.body
            );

        res.status(201).json({
            success:true,
            id,
            company:
                await repository.findById(id)
        });
    } catch(error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

module.exports={list,create};

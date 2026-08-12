const service = require("../services/placementProfileService");

async function getMine(req,res) {
    try {
        res.json({success:true,profile:await service.get(req.user.id)});
    } catch(error) {
        res.status(500).json({success:false,message:error.message});
    }
}

async function updateMine(req,res) {
    try {
        res.json({success:true,profile:await service.update(req.user.id,req.body)});
    } catch(error) {
        res.status(400).json({success:false,message:error.message});
    }
}

module.exports = {getMine,updateMine};

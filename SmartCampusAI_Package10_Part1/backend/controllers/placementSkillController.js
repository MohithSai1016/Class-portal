const service = require("../services/placementSkillService");

async function listMine(req,res) {
    try {
        res.json({success:true,skills:await service.list(req.user.id)});
    } catch(error) {
        res.status(500).json({success:false,message:error.message});
    }
}

async function addMine(req,res) {
    try {
        res.status(201).json({success:true,skills:await service.add(req.user.id,req.body)});
    } catch(error) {
        res.status(400).json({success:false,message:error.message});
    }
}

async function removeMine(req,res) {
    try {
        res.json({success:true,removed:await service.remove(req.user.id,req.params.skillName)});
    } catch(error) {
        res.status(400).json({success:false,message:error.message});
    }
}

module.exports = {listMine,addMine,removeMine};

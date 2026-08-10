const service=require("../services/announcementService");

async function create(req,res){
    try{
        const id=await service.create({
            ...req.body,
            publishedBy:req.user.id
        });
        res.status(201).json({success:true,announcementId:id});
    }catch(e){
        res.status(400).json({success:false,message:e.message});
    }
}

async function list(req,res){
    try{
        res.json({success:true,announcements:await service.list()});
    }catch(e){
        res.status(500).json({success:false,message:e.message});
    }
}

async function archive(req,res){
    try{
        await service.archive(req.params.id);
        res.json({success:true});
    }catch(e){
        res.status(404).json({success:false,message:e.message});
    }
}

module.exports={create,list,archive};

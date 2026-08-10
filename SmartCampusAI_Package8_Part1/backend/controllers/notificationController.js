const service=require("../services/notificationService");

async function list(req,res){
    try { res.json({success:true,notifications:await service.list(req.user.id,req.query.limit)}); }
    catch(e){ res.status(500).json({success:false,message:e.message}); }
}
async function unread(req,res){
    try { res.json({success:true,count:await service.unread(req.user.id)}); }
    catch(e){ res.status(500).json({success:false,message:e.message}); }
}
async function markRead(req,res){
    try { await service.markRead(req.params.id,req.user.id); res.json({success:true}); }
    catch(e){ res.status(404).json({success:false,message:e.message}); }
}
async function markAllRead(req,res){
    try { res.json({success:true,updated:await service.markAllRead(req.user.id)}); }
    catch(e){ res.status(500).json({success:false,message:e.message}); }
}
async function create(req,res){
    try { res.status(201).json({success:true,notificationId:await service.send(req.body)}); }
    catch(e){ res.status(400).json({success:false,message:e.message}); }
}
module.exports={list,unread,markRead,markAllRead,create};

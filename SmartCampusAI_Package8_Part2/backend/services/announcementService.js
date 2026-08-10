const repository=require("../models/AnnouncementRepository");
const notificationService=require("./notificationService");

async function create(data){
    if(!data.title || !data.message || !data.publishedBy)
        throw new Error("title, message and publishedBy are required");

    const id=await repository.create(data);

    // Recipient resolution is delegated to the user directory in the
    // next integration part. For now the announcement is persisted.
    return id;
}

async function list(){
    return repository.list("Published");
}

async function archive(id){
    if(!await repository.updateStatus(id,"Archived"))
        throw new Error("Announcement not found");
    return true;
}

module.exports={create,list,archive};

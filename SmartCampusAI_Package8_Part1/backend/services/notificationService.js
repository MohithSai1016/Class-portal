const repository=require("../models/NotificationRepository");

async function send(data) {
    if (!data.recipientUserId || !data.title || !data.message)
        throw new Error("recipientUserId, title and message are required");
    return repository.create(data);
}
async function list(userId,limit){ return repository.findByUser(userId,limit); }
async function unread(userId){ return repository.unreadCount(userId); }
async function markRead(id,userId){
    if(!await repository.markRead(id,userId))
        throw new Error("Notification not found");
    return true;
}
async function markAllRead(userId){ return repository.markAllRead(userId); }

module.exports={send,list,unread,markRead,markAllRead};

const { getPool } = require("../config/db");

async function create(data) {
    const pool = getPool();
    const [result] = await pool.execute(
        `INSERT INTO notifications
        (recipient_user_id,title,message,notification_type,priority)
        VALUES (?,?,?,?,?)`,
        [data.recipientUserId,data.title,data.message,
         data.notificationType || "General",data.priority || "Normal"]
    );
    return result.insertId;
}

async function findByUser(userId, limit = 50) {
    const pool = getPool();
    const safeLimit = Math.min(Math.max(Number(limit) || 50,1),100);
    const [rows] = await pool.query(
        `SELECT * FROM notifications
         WHERE recipient_user_id=?
         ORDER BY created_at DESC LIMIT ${safeLimit}`, [userId]);
    return rows;
}

async function unreadCount(userId) {
    const pool = getPool();
    const [rows] = await pool.execute(
        `SELECT COUNT(*) AS count FROM notifications
         WHERE recipient_user_id=? AND is_read=FALSE`, [userId]);
    return Number(rows[0].count);
}

async function markRead(notificationId,userId) {
    const pool = getPool();
    const [result] = await pool.execute(
        `UPDATE notifications SET is_read=TRUE,read_at=NOW()
         WHERE id=? AND recipient_user_id=?`,
        [notificationId,userId]);
    return result.affectedRows > 0;
}

async function markAllRead(userId) {
    const pool = getPool();
    const [result] = await pool.execute(
        `UPDATE notifications SET is_read=TRUE,read_at=NOW()
         WHERE recipient_user_id=? AND is_read=FALSE`, [userId]);
    return result.affectedRows;
}

module.exports={create,findByUser,unreadCount,markRead,markAllRead};

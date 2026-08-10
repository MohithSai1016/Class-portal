CREATE TABLE IF NOT EXISTS notifications (
 id INT AUTO_INCREMENT PRIMARY KEY,
 recipient_user_id INT NOT NULL,
 title VARCHAR(180) NOT NULL,
 message TEXT NOT NULL,
 notification_type ENUM('General','Attendance','Fees','Academic','Placement','System','Announcement') NOT NULL DEFAULT 'General',
 priority ENUM('Low','Normal','High','Urgent') NOT NULL DEFAULT 'Normal',
 is_read BOOLEAN NOT NULL DEFAULT FALSE,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 read_at DATETIME NULL,
 INDEX idx_notifications_recipient (recipient_user_id),
 INDEX idx_notifications_read (recipient_user_id, is_read)
);

CREATE TABLE IF NOT EXISTS announcements (
 id INT AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(180) NOT NULL,
 message TEXT NOT NULL,
 audience ENUM('All','Students','Faculty','HOD') NOT NULL DEFAULT 'All',
 priority ENUM('Low','Normal','High','Urgent') NOT NULL DEFAULT 'Normal',
 published_by INT NOT NULL,
 published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 expires_at DATETIME NULL,
 status ENUM('Draft','Published','Archived') NOT NULL DEFAULT 'Published'
);

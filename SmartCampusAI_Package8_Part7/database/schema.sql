CREATE TABLE IF NOT EXISTS notification_templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    template_key VARCHAR(80) NOT NULL UNIQUE,
    title_template VARCHAR(180) NOT NULL,
    message_template TEXT NOT NULL,
    notification_type ENUM(
        'General','Attendance','Fees','Academic',
        'Placement','System','Announcement'
    ) NOT NULL DEFAULT 'General',
    priority ENUM(
        'Low','Normal','High','Urgent'
    ) NOT NULL DEFAULT 'Normal',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_template_active
ON notification_templates(is_active);

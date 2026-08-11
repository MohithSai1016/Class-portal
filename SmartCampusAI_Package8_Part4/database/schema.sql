CREATE TABLE IF NOT EXISTS notification_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    in_app_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    email_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    push_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    attendance_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    fees_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    academic_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    placement_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    announcement_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_notification_preferences_user (user_id)
);

CREATE TABLE IF NOT EXISTS notification_delivery_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    notification_id INT NOT NULL,
    channel ENUM('InApp','Email','Push') NOT NULL,
    status ENUM('Queued','Sent','Failed','Skipped') NOT NULL DEFAULT 'Queued',
    provider VARCHAR(80) NULL,
    error_message TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sent_at DATETIME NULL,
    FOREIGN KEY (notification_id)
        REFERENCES notifications(id)
        ON DELETE CASCADE
);

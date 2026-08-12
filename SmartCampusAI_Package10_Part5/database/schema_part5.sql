CREATE TABLE IF NOT EXISTS placement_notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_user_id INT NOT NULL,
    notification_type ENUM(
        'Drive',
        'Application',
        'Interview',
        'Eligibility',
        'Placement',
        'System'
    ) DEFAULT 'System',
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    reference_type VARCHAR(80),
    reference_id INT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at DATETIME NULL,

    INDEX idx_notification_student (
        student_user_id
    ),
    INDEX idx_notification_read (
        student_user_id,
        is_read
    ),
    INDEX idx_notification_created (
        created_at
    )
);

CREATE TABLE IF NOT EXISTS placement_interviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drive_application_id INT NOT NULL,
    interview_round VARCHAR(120) NOT NULL,
    interview_type ENUM(
        'Online',
        'Offline',
        'Phone',
        'Technical',
        'HR',
        'Assessment',
        'Other'
    ) DEFAULT 'Other',
    scheduled_at DATETIME NOT NULL,
    venue VARCHAR(255),
    meeting_url VARCHAR(500),
    interviewer_name VARCHAR(180),
    interview_status ENUM(
        'Scheduled',
        'Completed',
        'Rescheduled',
        'Cancelled',
        'Passed',
        'Failed'
    ) DEFAULT 'Scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_interview_drive_application
        FOREIGN KEY (drive_application_id)
        REFERENCES placement_drive_applications(id)
        ON DELETE CASCADE,

    INDEX idx_interview_schedule (scheduled_at),
    INDEX idx_interview_status (interview_status)
);

CREATE TABLE IF NOT EXISTS placement_worker_runs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_name VARCHAR(120) NOT NULL,
    started_at DATETIME NOT NULL,
    finished_at DATETIME NULL,
    status ENUM('running','completed','failed') DEFAULT 'running',
    processed_count INT DEFAULT 0,
    message VARCHAR(500) NULL,
    INDEX idx_worker_job (job_name, started_at)
);

CREATE TABLE IF NOT EXISTS placement_notification_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_key VARCHAR(180) NOT NULL UNIQUE,
    student_user_id INT NOT NULL,
    event_type VARCHAR(80) NOT NULL,
    reference_type VARCHAR(80) NULL,
    reference_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

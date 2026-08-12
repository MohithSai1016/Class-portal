CREATE TABLE IF NOT EXISTS placement_offers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drive_application_id INT NOT NULL,
    offer_title VARCHAR(200),
    offer_letter_file_name VARCHAR(255),
    offer_letter_file_path VARCHAR(500),
    offer_date DATE NULL,
    joining_date DATE NULL,
    salary_lpa DECIMAL(10,2) NULL,
    offer_status ENUM(
        'Draft',
        'Issued',
        'Accepted',
        'Declined',
        'Withdrawn'
    ) DEFAULT 'Draft',
    joining_status ENUM(
        'Pending',
        'Joined',
        'Not Joined',
        'Deferred'
    ) DEFAULT 'Pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_offer_application (
        drive_application_id
    ),
    INDEX idx_offer_status (
        offer_status
    ),
    INDEX idx_joining_status (
        joining_status
    )
);

CREATE TABLE IF NOT EXISTS placement_report_snapshots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_name VARCHAR(200) NOT NULL,
    generated_by_user_id INT NULL,
    total_students INT DEFAULT 0,
    total_applications INT DEFAULT 0,
    total_selected INT DEFAULT 0,
    total_joined INT DEFAULT 0,
    total_companies INT DEFAULT 0,
    average_salary_lpa DECIMAL(10,2) NULL,
    highest_salary_lpa DECIMAL(10,2) NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

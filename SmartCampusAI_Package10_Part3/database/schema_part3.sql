CREATE TABLE IF NOT EXISTS placement_companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(180) NOT NULL UNIQUE,
    industry VARCHAR(120),
    website_url VARCHAR(500),
    description TEXT,
    contact_email VARCHAR(180),
    contact_phone VARCHAR(40),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS placement_drives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    drive_title VARCHAR(180) NOT NULL,
    role_title VARCHAR(180) NOT NULL,
    description TEXT,
    eligibility_min_cgpa DECIMAL(4,2),
    eligibility_departments VARCHAR(500),
    eligibility_backlogs INT DEFAULT 0,
    package_lpa DECIMAL(8,2),
    job_location VARCHAR(180),
    drive_date DATETIME NOT NULL,
    application_deadline DATETIME NOT NULL,
    drive_status ENUM(
        'Draft',
        'Open',
        'Closed',
        'Completed',
        'Cancelled'
    ) DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_drive_company
        FOREIGN KEY (company_id)
        REFERENCES placement_companies(id)
        ON DELETE CASCADE,
    INDEX idx_drive_status (drive_status),
    INDEX idx_drive_date (drive_date),
    INDEX idx_drive_deadline (application_deadline)
);

CREATE TABLE IF NOT EXISTS placement_drive_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drive_id INT NOT NULL,
    student_user_id INT NOT NULL,
    application_status ENUM(
        'Applied',
        'Shortlisted',
        'Interview',
        'Selected',
        'Rejected',
        'Withdrawn'
    ) DEFAULT 'Applied',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_drive_application_drive
        FOREIGN KEY (drive_id)
        REFERENCES placement_drives(id)
        ON DELETE CASCADE,
    UNIQUE KEY uq_drive_student (
        drive_id,
        student_user_id
    ),
    INDEX idx_drive_student (
        student_user_id
    ),
    INDEX idx_drive_application_status (
        application_status
    )
);

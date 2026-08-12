CREATE TABLE IF NOT EXISTS student_placement_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_user_id INT NOT NULL UNIQUE,
    resume_file_name VARCHAR(255),
    resume_file_path VARCHAR(500),
    resume_uploaded_at DATETIME NULL,
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    portfolio_url VARCHAR(500),
    skills TEXT,
    certifications TEXT,
    projects_count INT DEFAULT 0,
    internships_count INT DEFAULT 0,
    placement_ready BOOLEAN DEFAULT FALSE,
    readiness_score DECIMAL(5,2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_profile_ready (
        placement_ready
    ),
    INDEX idx_profile_score (
        readiness_score
    )
);

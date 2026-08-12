CREATE TABLE IF NOT EXISTS placement_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_user_id INT NOT NULL UNIQUE,
    career_goal VARCHAR(255),
    resume_path VARCHAR(500),
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    portfolio_url VARCHAR(500),
    preferred_role VARCHAR(150),
    preferred_location VARCHAR(150),
    placement_status ENUM('Not Started','Preparing','Eligible','Applied','Interviewing','Selected','Not Selected') DEFAULT 'Not Started',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_placement_status (placement_status)
);

CREATE TABLE IF NOT EXISTS placement_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_user_id INT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    proficiency ENUM('Beginner','Intermediate','Advanced','Expert') DEFAULT 'Beginner',
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_student_skill (student_user_id, skill_name),
    INDEX idx_skill_student (student_user_id)
);

CREATE TABLE IF NOT EXISTS placement_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_user_id INT NOT NULL,
    company_name VARCHAR(180) NOT NULL,
    role_title VARCHAR(180) NOT NULL,
    application_date DATE NOT NULL,
    application_status ENUM('Saved','Applied','Shortlisted','Interview','Selected','Rejected','Withdrawn') DEFAULT 'Saved',
    job_url VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_application_student (student_user_id),
    INDEX idx_application_status (application_status)
);

CREATE TABLE IF NOT EXISTS placement_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_user_id INT NOT NULL,
    application_id INT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_title VARCHAR(180) NOT NULL,
    event_date DATETIME NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_event_student (student_user_id),
    INDEX idx_event_date (event_date)
);

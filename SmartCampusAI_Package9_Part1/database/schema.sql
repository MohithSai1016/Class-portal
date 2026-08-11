CREATE TABLE IF NOT EXISTS certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_user_id INT NOT NULL,
    certificate_type VARCHAR(100) NOT NULL,
    title VARCHAR(180) NOT NULL,
    description TEXT NULL,
    issuing_organization VARCHAR(180) NOT NULL,
    issue_date DATE NOT NULL,
    certificate_number VARCHAR(100) NULL UNIQUE,
    file_path VARCHAR(500) NULL,
    verification_code VARCHAR(120) NULL UNIQUE,
    status ENUM('Pending','Issued','Revoked') NOT NULL DEFAULT 'Issued',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cert_student (student_user_id),
    INDEX idx_cert_type (certificate_type),
    INDEX idx_cert_status (status)
);

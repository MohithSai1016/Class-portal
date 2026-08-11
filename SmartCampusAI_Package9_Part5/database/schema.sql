CREATE TABLE IF NOT EXISTS certificate_audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    certificate_id INT NOT NULL,
    actor_user_id INT NULL,
    action VARCHAR(60) NOT NULL,
    details JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_cert_audit_certificate (certificate_id),
    INDEX idx_cert_audit_actor (actor_user_id),
    INDEX idx_cert_audit_created (created_at)
);

CREATE INDEX IF NOT EXISTS idx_cert_verification
ON certificates(verification_code);

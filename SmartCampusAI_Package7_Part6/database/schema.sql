CREATE TABLE IF NOT EXISTS finance_notification_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_fee_id INT NOT NULL,
    notification_type ENUM('DueSoon','Overdue') NOT NULL,
    channel ENUM('InApp','Email','SMS') NOT NULL DEFAULT 'InApp',
    status ENUM('Pending','Sent','Failed') NOT NULL DEFAULT 'Pending',
    message TEXT NOT NULL,
    sent_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_fee_id) REFERENCES student_fees(id)
);

CREATE TABLE IF NOT EXISTS finance_dashboard_snapshots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    snapshot_date DATE NOT NULL UNIQUE,
    total_assigned DECIMAL(14,2) NOT NULL DEFAULT 0,
    total_collected DECIMAL(14,2) NOT NULL DEFAULT 0,
    total_due DECIMAL(14,2) NOT NULL DEFAULT 0,
    paid_students INT NOT NULL DEFAULT 0,
    partial_students INT NOT NULL DEFAULT 0,
    pending_students INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

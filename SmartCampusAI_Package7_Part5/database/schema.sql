CREATE TABLE IF NOT EXISTS fee_installment_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_fee_id INT NOT NULL,
    installment_number INT NOT NULL,
    due_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('Pending','Paid','Overdue') NOT NULL DEFAULT 'Pending',
    UNIQUE(student_fee_id, installment_number),
    FOREIGN KEY (student_fee_id) REFERENCES student_fees(id)
);

CREATE TABLE IF NOT EXISTS fee_reminders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_fee_id INT NOT NULL,
    reminder_type ENUM('DueSoon','Overdue') NOT NULL,
    scheduled_for DATE NOT NULL,
    sent_at DATETIME NULL,
    status ENUM('Pending','Sent','Failed') NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (student_fee_id) REFERENCES student_fees(id)
);

CREATE TABLE IF NOT EXISTS scholarship_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    scholarship_id INT NOT NULL,
    application_note TEXT,
    status ENUM('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at DATETIME NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (scholarship_id) REFERENCES scholarships(id)
);

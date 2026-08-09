CREATE TABLE IF NOT EXISTS payment_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_fee_id INT NOT NULL,
    gateway_order_id VARCHAR(120) NOT NULL UNIQUE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    status ENUM('Created','Paid','Failed','Cancelled') NOT NULL DEFAULT 'Created',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_fee_id) REFERENCES student_fees(id)
);

CREATE TABLE IF NOT EXISTS payment_webhook_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gateway_event_id VARCHAR(160) NOT NULL UNIQUE,
    event_type VARCHAR(100) NOT NULL,
    payload JSON NOT NULL,
    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

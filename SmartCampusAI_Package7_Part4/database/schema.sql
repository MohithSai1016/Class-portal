CREATE TABLE IF NOT EXISTS fee_receipts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fee_transaction_id INT NOT NULL UNIQUE,
    receipt_number VARCHAR(80) NOT NULL UNIQUE,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fee_transaction_id) REFERENCES fee_transactions(id)
);

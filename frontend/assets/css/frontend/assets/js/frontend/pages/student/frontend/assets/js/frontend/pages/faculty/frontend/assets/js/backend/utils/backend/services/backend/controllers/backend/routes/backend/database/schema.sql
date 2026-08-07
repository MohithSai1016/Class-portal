CREATE TABLE scholarships (

    id INT AUTO_INCREMENT PRIMARY KEY,

    scholarship_name VARCHAR(120),

    provider VARCHAR(120),

    amount DECIMAL(10,2),

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
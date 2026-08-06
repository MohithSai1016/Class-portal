CREATE TABLE semester_results (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT NOT NULL,

    semester INT NOT NULL,

    total_credits DECIMAL(5,2),

    earned_credits DECIMAL(5,2),

    gpa DECIMAL(4,2),

    cgpa DECIMAL(4,2),

    result_status ENUM(
        'PASS',
        'FAIL'
    ),

    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(student_id, semester),

    FOREIGN KEY(student_id)
        REFERENCES students(id)

);
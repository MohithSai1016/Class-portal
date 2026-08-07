CREATE TABLE student_scholarships (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT NOT NULL,

    scholarship_id INT NOT NULL,

    approved_amount DECIMAL(10,2),

    status ENUM(

        'Pending',

        'Approved',

        'Rejected'

    ),

    FOREIGN KEY(student_id)

    REFERENCES students(id),

    FOREIGN KEY(scholarship_id)

    REFERENCES scholarships(id)

);
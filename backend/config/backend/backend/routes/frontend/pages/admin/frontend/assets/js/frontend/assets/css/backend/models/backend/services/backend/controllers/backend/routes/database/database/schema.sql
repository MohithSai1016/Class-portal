CREATE TABLE student_fees (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT NOT NULL,

    fee_structure_id INT NOT NULL,

    total_fee DECIMAL(10,2),

    paid_amount DECIMAL(10,2) DEFAULT 0,

    due_amount DECIMAL(10,2),

    payment_status ENUM(

        'Pending',

        'Partial',

        'Paid'

    ) DEFAULT 'Pending',

    due_date DATE,

    FOREIGN KEY(student_id)
        REFERENCES students(id),

    FOREIGN KEY(fee_structure_id)
        REFERENCES fee_structures(id)

);
CREATE TABLE fee_transactions (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_fee_id INT NOT NULL,

    transaction_reference VARCHAR(120),

    payment_method ENUM(

        'UPI',

        'Card',

        'NetBanking',

        'Cash'

    ),

    amount DECIMAL(10,2),

    transaction_date DATETIME,

    status ENUM(

        'Success',

        'Pending',

        'Failed'

    ),

    FOREIGN KEY(student_fee_id)

    REFERENCES student_fees(id)

);
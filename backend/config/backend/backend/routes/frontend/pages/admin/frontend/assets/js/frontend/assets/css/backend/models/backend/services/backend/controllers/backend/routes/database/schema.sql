CREATE TABLE fee_structures (

    id INT AUTO_INCREMENT PRIMARY KEY,

    department_id INT NOT NULL,

    semester INT NOT NULL,

    academic_year VARCHAR(20),

    tuition_fee DECIMAL(10,2),

    examination_fee DECIMAL(10,2),

    laboratory_fee DECIMAL(10,2),

    library_fee DECIMAL(10,2),

    miscellaneous_fee DECIMAL(10,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(department_id)
        REFERENCES departments(id)

);
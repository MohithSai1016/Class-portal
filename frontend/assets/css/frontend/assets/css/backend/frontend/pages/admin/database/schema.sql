CREATE TABLE students (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL UNIQUE,

    roll_number VARCHAR(20) NOT NULL UNIQUE,

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50),

    gender ENUM('Male','Female','Other'),

    phone VARCHAR(20),

    email VARCHAR(100),

    address TEXT,

    semester INT DEFAULT 1,

    section VARCHAR(10),

    face_registered BOOLEAN DEFAULT FALSE,

    department_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (department_id)
        REFERENCES departments(id)
);
CREATE TABLE faculty (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNIQUE,

    employee_id VARCHAR(20) UNIQUE,

    first_name VARCHAR(50),

    last_name VARCHAR(50),

    designation VARCHAR(50),

    department_id INT,

    FOREIGN KEY(user_id)
        REFERENCES users(id),

    FOREIGN KEY(department_id)
        REFERENCES departments(id)

);
CREATE TABLE subjects (

    id INT AUTO_INCREMENT PRIMARY KEY,

    subject_code VARCHAR(20) UNIQUE,

    subject_name VARCHAR(100),

    credits INT,

    semester INT,

    department_id INT,

    FOREIGN KEY(department_id)
        REFERENCES departments(id)

);
CREATE TABLE enrollments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT,

    subject_id INT,

    academic_year VARCHAR(20),

    FOREIGN KEY(student_id)
        REFERENCES students(id),

    FOREIGN KEY(subject_id)
        REFERENCES subjects(id)

);
CREATE TABLE assessments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    subject_id INT NOT NULL,

    assessment_name VARCHAR(100) NOT NULL,

    assessment_type ENUM(
        'Assignment',
        'Quiz',
        'Lab',
        'Mid1',
        'Mid2',
        'EndSemester'
    ) NOT NULL,

    max_marks INT NOT NULL,

    weightage DECIMAL(5,2) DEFAULT 100.00,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(subject_id)
        REFERENCES subjects(id)

);
CREATE TABLE marks (

    id INT AUTO_INCREMENT PRIMARY KEY,

    enrollment_id INT NOT NULL,

    assessment_id INT NOT NULL,

    marks_obtained DECIMAL(5,2) NOT NULL,

    remarks VARCHAR(255),

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE(enrollment_id, assessment_id),

    FOREIGN KEY(enrollment_id)
        REFERENCES enrollments(id),

    FOREIGN KEY(assessment_id)
        REFERENCES assessments(id)

);
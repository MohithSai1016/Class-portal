CREATE TABLE faculty_subjects(

    id INT AUTO_INCREMENT PRIMARY KEY,

    faculty_id INT NOT NULL,

    subject_id INT NOT NULL,

    semester INT NOT NULL,

    section VARCHAR(10),

    academic_year VARCHAR(20),

    UNIQUE(
        faculty_id,
        subject_id,
        semester,
        section,
        academic_year
    ),

    FOREIGN KEY(faculty_id)
        REFERENCES faculty(id),

    FOREIGN KEY(subject_id)
        REFERENCES subjects(id)

);
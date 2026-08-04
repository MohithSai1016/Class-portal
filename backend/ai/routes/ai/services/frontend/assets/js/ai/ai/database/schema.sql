ALTER TABLE attendance
ADD COLUMN recognized_by_ai BOOLEAN DEFAULT FALSE;

ALTER TABLE attendance
ADD CONSTRAINT unique_daily_attendance
UNIQUE(student_id, attendance_date);

CREATE TABLE attendance_logs(

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT,

    confidence DECIMAL(5,4),

    event_time TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    source VARCHAR(30),

    FOREIGN KEY(student_id)
        REFERENCES users(id)

);
CREATE TABLE classrooms (

    id INT AUTO_INCREMENT PRIMARY KEY,

    room_number VARCHAR(20) UNIQUE,

    building VARCHAR(100),

    capacity INT DEFAULT 60,

    floor INT DEFAULT 1

);
CREATE TABLE timetable (

    id INT AUTO_INCREMENT PRIMARY KEY,

    department_id INT NOT NULL,

    semester INT NOT NULL,

    section VARCHAR(10) NOT NULL,

    subject_id INT NOT NULL,

    faculty_id INT NOT NULL,

    classroom_id INT NOT NULL,

    day_of_week ENUM(
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ),

    start_time TIME,

    end_time TIME,

    FOREIGN KEY(department_id)
        REFERENCES departments(id),

    FOREIGN KEY(subject_id)
        REFERENCES subjects(id),

    FOREIGN KEY(faculty_id)
        REFERENCES faculty(id),

    FOREIGN KEY(classroom_id)
        REFERENCES classrooms(id)
);
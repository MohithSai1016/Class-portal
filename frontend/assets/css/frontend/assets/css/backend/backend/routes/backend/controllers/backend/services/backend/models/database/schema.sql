CREATE TABLE attendance(

id INT AUTO_INCREMENT PRIMARY KEY,

student_id INT NOT NULL,

attendance_date DATE NOT NULL,

status ENUM(
'Present',
'Absent',
'Late'
) DEFAULT 'Present',

check_in TIME,

created_at TIMESTAMP
DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY(student_id)
REFERENCES users(id)

);
INSERT INTO attendance
(

student_id,

attendance_date,

status,

check_in

)

VALUES

(

2,

CURDATE(),

'Present',

'09:01:00'

),

(

2,

DATE_SUB(CURDATE(),INTERVAL 1 DAY),

'Present',

'09:00:00'

),

(

2,

DATE_SUB(CURDATE(),INTERVAL 2 DAY),

'Absent',

NULL

);
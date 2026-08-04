USE smartcampus;

INSERT INTO departments(name)
VALUES
('Computer Science & AI'),
('Electronics'),
('Mechanical');

INSERT INTO users
(
username,
password,
full_name,
email,
role,
department_id
)

VALUES
(
'admin',

'$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',

'System Administrator',

'admin@campus.edu',

'admin',

1
),

(
'student1',

'$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',

'Mohith Sai',

'mohith@student.edu',

'student',

1
);
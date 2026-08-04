from database import get_connection

def mark_attendance(student_id):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT IGNORE INTO attendance
        (
            student_id,
            attendance_date,
            status,
            recognized_by_ai
        )
        VALUES
        (
            %s,
            CURDATE(),
            'Present',
            TRUE
        )
        """,
        (student_id,)
    )

    connection.commit()

    cursor.close()

    connection.close()
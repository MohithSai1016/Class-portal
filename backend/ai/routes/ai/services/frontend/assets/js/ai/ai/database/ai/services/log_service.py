from database import get_connection

def log_event(student_id, confidence):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO attendance_logs
        (
            student_id,
            confidence,
            source
        )
        VALUES
        (
            %s,
            %s,
            'FaceRecognition'
        )
        """,
        (
            student_id,
            confidence
        )
    )

    connection.commit()

    cursor.close()
    connection.close()
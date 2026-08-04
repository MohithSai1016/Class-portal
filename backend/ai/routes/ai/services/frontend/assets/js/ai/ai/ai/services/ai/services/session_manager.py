from datetime import datetime

CONFIRM_FRAMES = 10

class SessionManager:

    def __init__(self):

        self.buffer = {}

    def verify(self, student_id):

        self.buffer.setdefault(student_id, 0)

        self.buffer[student_id] += 1

        if self.buffer[student_id] >= CONFIRM_FRAMES:

            self.buffer[student_id] = 0

            return True

        return False

    def clear(self):

        self.buffer.clear()
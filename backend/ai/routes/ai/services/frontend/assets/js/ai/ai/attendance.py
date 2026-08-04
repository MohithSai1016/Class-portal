import cv2

from recognizer import FaceRecognizer

recognizer = FaceRecognizer()

recognizer.load()

camera = cv2.VideoCapture(0)

while True:

    ok, frame = camera.read()

    if not ok:
        break

    faces = recognizer.recognize(frame)

    for face in faces:

        top, right, bottom, left = face["location"]

        cv2.rectangle(
            frame,
            (left, top),
            (right, bottom),
            (0,255,0),
            2
        )

        cv2.putText(
            frame,
            face["student_id"],
            (left, top-10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0,255,0),
            2
        )

    cv2.imshow(
        "Smart Campus AI",
        frame
    )

    if cv2.waitKey(1) == 27:
        break

camera.release()

cv2.destroyAllWindows()
from services.attendance_database import mark_attendance

...

if face["student_id"] != "Unknown":
    mark_attendance(face["student_id"])
    
from services.session_manager import SessionManager
from services.recognition_service import recognize_face
from services.liveness_service import basic_liveness

session = SessionManager()

...

if basic_liveness(len(locations)):

    result = recognize_face(
        recognizer.encodings,
        recognizer.labels,
        vector
    )

    if result:

        confirmed = session.verify(
            result["student_id"]
        )

        if confirmed:

            mark_attendance(
                result["student_id"]
            )
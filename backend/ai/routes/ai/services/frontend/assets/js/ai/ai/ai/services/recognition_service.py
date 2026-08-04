from unittest import result

import face_recognition
import numpy as np

MATCH_THRESHOLD = 0.45

def recognize_face(known_encodings, labels, encoding):

    if len(known_encodings) == 0:
        return None

    distances = face_recognition.face_distance(
        known_encodings,
        encoding
    )

    best = np.argmin(distances)

    confidence = 1.0 - float(distances[best])

    if distances[best] <= MATCH_THRESHOLD:
        return {
            "student_id": labels[best],
            "confidence": round(confidence, 3)
        }

    return None
log_event(
    result["student_id"],
    result["confidence"]
)
import os
import pickle
import face_recognition
import numpy as np

ENCODING_DIR = "encodings"

class FaceRecognizer:

    def __init__(self):
        self.encodings = []
        self.labels = []

    def load(self):
        enc_file = os.path.join(
            ENCODING_DIR,
            "encodings.pkl"
        )

        label_file = os.path.join(
            ENCODING_DIR,
            "labels.pkl"
        )

        if os.path.exists(enc_file):
            with open(enc_file, "rb") as f:
                self.encodings = pickle.load(f)

        if os.path.exists(label_file):
            with open(label_file, "rb") as f:
                self.labels = pickle.load(f)

    def recognize(self, frame):

        rgb = frame[:, :, ::-1]

        locations = face_recognition.face_locations(rgb)

        vectors = face_recognition.face_encodings(
            rgb,
            locations
        )

        results = []

        for vector, location in zip(vectors, locations):

            matches = face_recognition.compare_faces(
                self.encodings,
                vector,
                tolerance=0.45
            )

            name = "Unknown"

            if True in matches:

                index = matches.index(True)

                name = self.labels[index]

            results.append({

                "student_id": name,

                "location": location

            })

        return results
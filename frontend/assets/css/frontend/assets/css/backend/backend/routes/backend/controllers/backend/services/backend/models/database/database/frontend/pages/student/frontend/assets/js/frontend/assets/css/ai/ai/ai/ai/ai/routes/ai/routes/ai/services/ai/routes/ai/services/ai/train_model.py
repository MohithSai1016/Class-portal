import os
import pickle
import face_recognition

DATASET = "dataset"
ENCODINGS = "encodings"

os.makedirs(ENCODINGS, exist_ok=True)

for student in os.listdir(DATASET):

    folder = os.path.join(DATASET, student)

    encoding_list = []

    for image in os.listdir(folder):

        path = os.path.join(folder, image)

        img = face_recognition.load_image_file(path)

        faces = face_recognition.face_encodings(img)

        if len(faces):

            encoding_list.append(faces[0])

    with open(

        os.path.join(
            ENCODINGS,
            f"{student}.pkl"
        ),

        "wb"

    ) as file:

        pickle.dump(
            encoding_list,
            file
        )

print("Training Complete")
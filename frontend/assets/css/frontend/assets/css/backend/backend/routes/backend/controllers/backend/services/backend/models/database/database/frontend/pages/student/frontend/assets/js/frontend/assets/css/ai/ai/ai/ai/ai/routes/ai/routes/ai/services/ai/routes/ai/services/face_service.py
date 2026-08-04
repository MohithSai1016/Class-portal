import os
import shutil

DATASET = "dataset"

async def save_student_images(student_id, files):

    folder = os.path.join(DATASET, student_id)

    os.makedirs(folder, exist_ok=True)

    count = 0

    for file in files:

        filename = os.path.join(
            folder,
            file.filename
        )

        with open(filename, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        count += 1

    return count
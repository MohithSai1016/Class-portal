import os

DATASET = "dataset"


async def save_student_images(student_id, images):

    folder = os.path.join(
        DATASET,
        student_id
    )

    os.makedirs(
        folder,
        exist_ok=True
    )

    existing = len(os.listdir(folder))

    for filename, content in images:

        path = os.path.join(
            folder,
            f"{existing}.jpg"
        )

        with open(path, "wb") as file:

            file.write(content)

        existing += 1

    return len(images)
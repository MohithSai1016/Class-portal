from fastapi import APIRouter, UploadFile, File, Form
import cv2
import numpy as np

from services.face_service import save_student_images
from services.detection_service import detect_faces
from services.quality_service import image_quality

router = APIRouter(prefix="/register")


@router.post("/")
async def register(
    student_id: str = Form(...),
    files: list[UploadFile] = File(...)
):

    accepted = []

    rejected = []

    for upload in files:

        data = await upload.read()

        image = cv2.imdecode(
            np.frombuffer(data, np.uint8),
            cv2.IMREAD_COLOR
        )

        faces = detect_faces(image)

        if len(faces) != 1:

            rejected.append({
                "file": upload.filename,
                "reason": "Exactly one face required."
            })

            continue

        quality = image_quality(image)

        if not quality["good_blur"]:

            rejected.append({
                "file": upload.filename,
                "reason": "Image is blurry."
            })

            continue

        if not quality["good_light"]:

            rejected.append({
                "file": upload.filename,
                "reason": "Poor lighting."
            })

            continue

        accepted.append(
            (
                upload.filename,
                data
            )
        )

    saved = await save_student_images(
        student_id,
        accepted
    )

    return {

        "saved": saved,

        "accepted": len(accepted),

        "rejected": rejected

    }
from fastapi import APIRouter, UploadFile, File, Form
from services.face_service import save_student_images

router = APIRouter(prefix="/register")

@router.post("/")
async def register_student(
    student_id: str = Form(...),
    files: list[UploadFile] = File(...)
):
    total = await save_student_images(student_id, files)

    return {
        "success": True,
        "student_id": student_id,
        "images_saved": total
    }
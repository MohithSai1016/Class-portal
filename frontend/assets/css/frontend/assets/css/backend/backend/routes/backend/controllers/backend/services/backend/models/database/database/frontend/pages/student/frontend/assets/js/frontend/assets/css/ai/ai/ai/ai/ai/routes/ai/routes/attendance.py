from fastapi import APIRouter

router = APIRouter(prefix="/attendance")

@router.get("/")
def attendance_status():
    return {
        "module": "AI Attendance",
        "status": "Ready"
    }
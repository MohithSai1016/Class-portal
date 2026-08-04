from fastapi import APIRouter

router = APIRouter(prefix="/register")

@router.get("/")
def register_status():
    return {
        "module": "Face Registration",
        "status": "Ready"
    }
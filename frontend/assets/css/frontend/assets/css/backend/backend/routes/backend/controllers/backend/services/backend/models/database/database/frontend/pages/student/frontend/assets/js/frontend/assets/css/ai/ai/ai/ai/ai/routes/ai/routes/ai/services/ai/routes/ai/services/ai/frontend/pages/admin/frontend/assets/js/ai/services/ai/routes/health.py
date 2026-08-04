from fastapi import APIRouter

router=APIRouter(prefix="/health")

@router.get("/")
def health():

    return{

        "server":"online",

        "camera":"ready",

        "face_ai":"ready"

    }
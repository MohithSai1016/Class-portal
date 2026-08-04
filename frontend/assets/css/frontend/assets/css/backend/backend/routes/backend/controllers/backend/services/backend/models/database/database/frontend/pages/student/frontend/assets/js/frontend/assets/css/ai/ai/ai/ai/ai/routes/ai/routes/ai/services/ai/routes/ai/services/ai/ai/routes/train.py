from fastapi import APIRouter
import subprocess

router = APIRouter(prefix="/train")

@router.post("/")
def train():

    subprocess.run(

        ["python","train_model.py"]

    )

    return {

        "success":True,

        "message":"Training Finished"

    }
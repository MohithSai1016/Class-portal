from fastapi import FastAPI

from routes.register import router as registerRouter
from routes.attendance import router as attendanceRouter
from routes.train import router as trainRouter

app = FastAPI(title="Smart Campus AI")

app.include_router(registerRouter)
app.include_router(attendanceRouter)
app.include_router(trainRouter)

@app.get("/")
def home():

    return{

        "application":"Smart Campus AI",

        "version":"1.0",

        "status":"Running"

    }
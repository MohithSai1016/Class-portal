from fastapi import FastAPI

from routes.register import router as registerRouter
from routes.attendance import router as attendanceRouter

app = FastAPI(title="Smart Campus AI")

app.include_router(registerRouter)
app.include_router(attendanceRouter)

@app.get("/")
def home():
    return {
        "application": "Smart Campus AI",
        "status": "Running"
    }
from routes.health import router as healthRouter

app.include_router(healthRouter)
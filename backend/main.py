from fastapi import FastAPI
import models, database
from routers import users, flashcards, exercises, progress

app = FastAPI(title="DIFIN Backend")

models.Base.metadata.create_all(bind=database.engine)

app.include_router(users.router)
app.include_router(flashcards.router)
app.include_router(exercises.router)
app.include_router(progress.router)

@app.get("/")
def home():
    return {"message": "🚀 DIFIN Backend is running!"}

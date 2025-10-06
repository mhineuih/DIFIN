from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas, models, database

router = APIRouter(prefix="/exercises", tags=["Exercises"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.ExerciseOut])
def get_exercises(db: Session = Depends(get_db)):
    return db.query(models.Exercise).all()

@router.post("/", response_model=schemas.ExerciseOut)
def create_exercise(exercise: schemas.ExerciseCreate, db: Session = Depends(get_db)):
    new_ex = models.Exercise(
        type=exercise.type,
        question=exercise.question,
        answer=exercise.answer,
        user_id=exercise.user_id
    )
    db.add(new_ex)
    db.commit()
    db.refresh(new_ex)
    return new_ex

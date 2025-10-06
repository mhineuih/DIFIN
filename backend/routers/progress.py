from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import schemas, models, database

router = APIRouter(prefix="/progress", tags=["Progress"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.ProgressOut])
def get_progress(db: Session = Depends(get_db)):
    return db.query(models.Progress).all()

@router.post("/", response_model=schemas.ProgressOut)
def create_progress(p: schemas.ProgressCreate, db: Session = Depends(get_db)):
    new_p = models.Progress(user_id=p.user_id, exercise_id=p.exercise_id, score=p.score)
    db.add(new_p)
    db.commit()
    db.refresh(new_p)
    return new_p

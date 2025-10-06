from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas, models, database

router = APIRouter(prefix="/flashcards", tags=["Flashcards"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.FlashcardOut])
def get_flashcards(db: Session = Depends(get_db)):
    return db.query(models.Flashcard).all()

@router.post("/", response_model=schemas.FlashcardOut)
def create_flashcard(card: schemas.FlashcardCreate, db: Session = Depends(get_db)):
    new_card = models.Flashcard(front=card.front, back=card.back, owner_id=1)
    db.add(new_card)
    db.commit()
    db.refresh(new_card)
    return new_card

from pydantic import BaseModel, constr
from typing import Optional
from datetime import datetime

# ---------------- USERS ----------------
class UserCreate(BaseModel):
    email: str
    password: constr(max_length=72)
    fullname: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    fullname: Optional[str] = None

    class Config:
        orm_mode = True

# ---------------- FLASHCARDS ----------------
class FlashcardCreate(BaseModel):
    front: str
    back: str

class FlashcardOut(BaseModel):
    id: int
    front: str
    back: str

    class Config:
        orm_mode = True

# ---------------- EXERCISES ----------------
class ExerciseCreate(BaseModel):
    type: str
    question: str
    answer: Optional[str] = None
    user_id: int

class ExerciseOut(ExerciseCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# ---------------- PROGRESS ----------------
class ProgressCreate(BaseModel):
    user_id: int
    exercise_id: int
    score: int

class ProgressOut(ProgressCreate):
    id: int
    completed_at: datetime

    class Config:
        orm_mode = True

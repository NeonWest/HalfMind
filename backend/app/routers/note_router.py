from fastapi import APIRouter, Depends, HTTPException

from app.security.auth import get_current_user
from app.schemas.notedto import NoteRequest, NoteResponse
from app.services.note_service import create_note, get_single_note, get_user_notes
from sqlalchemy.exc import IntegrityError


router = APIRouter()



@router.post("/app", response_model=NoteResponse, status_code=201)
def createNote(
    note_data: NoteRequest,
    user=Depends(get_current_user)):
    try:
        return create_note(note_data,user)
    
    except IntegrityError:
        raise HTTPException(
            status_code=500,
            detail="Failed to create note"
        )

@router.get("/app/notes/{id}", response_model=NoteResponse)
def get_note(id: int, user=Depends(get_current_user)):
    return get_single_note(user, id)

@router.get("/app/notes", response_model=list[NoteResponse])
def get_notes(user=Depends(get_current_user)):
    return get_user_notes(user)
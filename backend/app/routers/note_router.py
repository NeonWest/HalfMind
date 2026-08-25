from fastapi import APIRouter, Depends, HTTPException

from app.security.auth import get_current_user
from app.schemas.notedto import NoteRequest, NoteResponse
from app.services.note_service import create_note
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
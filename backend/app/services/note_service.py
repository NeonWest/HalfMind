from sqlalchemy.exc import IntegrityError
from app.schemas.notedto import NoteRequest
from app.models.note import Note
from datetime import datetime
from sqlalchemy.orm import Session
from app.database.database import engine

def create_note(note_data: NoteRequest, user):

    # TODO: Use timezone-aware UTC datetime for createdAt/updatedAt.
    note = Note(
        userid = user.userid,
        title = note_data.title,
        body = note_data.body,
        createdAt = datetime.now(),
        updatedAt = datetime.now()
    )

    with Session(engine) as session:
        session.add(note)
        try:
            session.commit()
        except IntegrityError:
            session.rollback()
            raise

        session.refresh(note)

    return note
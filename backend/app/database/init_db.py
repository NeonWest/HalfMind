from app.database.database import Base, engine
from app.models.user import User
from app.models.note import Note

Base.metadata.create_all(engine)
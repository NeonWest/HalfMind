from datetime import datetime
from app.schemas.userdto import UserRequest
from sqlalchemy.orm import Session
from app.database.database import engine
from app.models.user import User
from app.security.password_hasher import hash_password
from sqlalchemy.exc import IntegrityError

def register_user(user_data: UserRequest):
    hashed_password = hash_password(user_data.password)
    user = User(
        username = user_data.username,
        email = user_data.email,
        password_hash = hashed_password,
        createdAt = datetime.now()
    )

    with Session(engine) as session:
        session.add(user)
        try:
            session.commit()
        except IntegrityError as e:
            session.rollback()
            raise

            
        session.refresh(user)

    return user
    


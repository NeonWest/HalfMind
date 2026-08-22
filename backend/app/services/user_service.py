from app.security.token import create_access_token
from app.security.password_hasher import verify_password
from app.schemas.userdto import LoginRequest
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
    

def login_user(user_data: LoginRequest):
    with Session(engine) as session:
        user = session.query(User).filter(User.email == user_data.email).first()
        if not user:
            raise Exception("Invalid credentials")

        if not verify_password(user_data.password, user.password_hash):
            raise Exception("Invalid credentials")

        token= create_access_token(user)

        return {
            "access_token": token,
            "token_type": "bearer"
        }

def get_user_by_id(user_id: int):

    with Session(engine) as session:

        return session.query(User).filter(
            User.userid == user_id
        ).first()

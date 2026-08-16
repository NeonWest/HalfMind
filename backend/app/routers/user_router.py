from app.services.user_service import login_user
from app.schemas.userdto import LoginRequest
from app.schemas.userdto import LoginResponse
from fastapi import APIRouter
from app.schemas.userdto import UserRequest, UserResponse
from app.services.user_service import register_user
from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError

router = APIRouter()



@router.post("/register", response_model=UserResponse)
def register(user_data:UserRequest):
    try:
        return register_user(user_data)
    except IntegrityError:
        raise HTTPException(
            status_code=409,
            detail="Username or email already exists"
        )

@router.post("/login", response_model=LoginResponse)
def login(user_data: LoginRequest):
    return login_user(user_data)


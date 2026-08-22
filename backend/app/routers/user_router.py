from fastapi import APIRouter, HTTPException, Response
from app.schemas.userdto import UserRequest, UserResponse, LoginResponse, LoginRequest
from app.services.user_service import register_user, login_user
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
def login(user_data: LoginRequest, response: Response):
    data= login_user(user_data)
    response.set_cookie(
        key="access_token",
        value=data["access_token"],
        httponly=True,
        secure=True,
        samesite="lax"
    )
    return {"message": "Login Successful!"}


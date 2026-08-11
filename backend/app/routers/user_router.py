from fastapi import APIRouter
from app.schemas.userdto import UserRequest, UserResponse
from app.services.user_service import register_user

router = APIRouter()



@router.post("/register", response_model=UserResponse)
def register(user_data:UserRequest):
    return register_user(user_data)
# FastAPI tools used to create routes, handle errors,
# set cookies, and inject dependencies.
from fastapi import APIRouter, HTTPException, Response, Depends

# Pydantic schemas used to validate incoming requests
# and define the shape of our API responses.
from app.schemas.userdto import (UserRequest, UserResponse, LoginResponse, LoginRequest)

# Service functions that contain our user-related business logic.
from app.services.user_service import register_user, login_user

# Used to catch database errors, such as duplicate usernames/emails.
from sqlalchemy.exc import IntegrityError

# Authentication dependency that verifies the JWT cookie
# and returns the authenticated user.
from app.security.auth import get_current_user


# Creates the router that will contain our user-related endpoints.
router = APIRouter()


# -------------------------
# REGISTER
# -------------------------

# Creates a POST /register endpoint.
# FastAPI validates the request using UserRequest
# and formats the successful response using UserResponse.
@router.post("/register", response_model=UserResponse)
def register(user_data: UserRequest):

    try:
        # Send the validated user data to our service layer.
        return register_user(user_data)

    except IntegrityError:

        # The database rejected the operation because
        # the username or email already exists.
        raise HTTPException(
            status_code=409,
            detail="Username or email already exists"
        )


# -------------------------
# LOGIN
# -------------------------

# Creates a POST /login endpoint.
# LoginRequest validates the email/password sent by the frontend.
@router.post("/login", response_model=LoginResponse)
def login(user_data: LoginRequest, response: Response):

    # Check the user's credentials and create a JWT.
    data = login_user(user_data)

    # Store the JWT inside an HttpOnly cookie.
    # The browser will automatically send this cookie
    # with future requests to our backend.
    response.set_cookie(
        key="access_token",
        value=data["access_token"],
        httponly=True,
        secure=True,
        samesite="none"
    )

    # We don't need to send the JWT back in the JSON response
    # because it is already stored in the cookie.
    return {"message": "Login Successful!"}


# -------------------------
# CURRENT USER
# -------------------------

# Creates a GET /me endpoint.
# This endpoint is protected by get_current_user().
@router.get("/me", response_model=UserResponse)
def get_me(user=Depends(get_current_user)):

    # FastAPI runs get_current_user() first.
    # If authentication succeeds, the authenticated User
    # object is passed into this function.
    return user


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=True,
        samesite="none"
    )

    return {"message": "Logout successful"}
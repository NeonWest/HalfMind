from fastapi import Cookie, HTTPException

import jwt

from app.security.token import SECRET_KEY, ALGORITHM

from app.services.user_service import get_user_by_id


# Verifies the user's access token and returns the authenticated user.
def get_current_user(access_token: str | None = Cookie(default=None)):

    # FastAPI looks for a cookie named "access_token"
    # and puts its value into the access_token variable.
    if access_token is None:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )

    try:

        # Decode and verify the JWT.
        #
        # SECRET_KEY verifies that the token was created by our backend.
        # ALGORITHM tells jwt which signing algorithm was used.
        #
        # If the token is valid, jwt.decode() returns its payload.
        payload = jwt.decode(
            access_token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

    # This catches invalid signatures, expired tokens,
    # malformed tokens, etc.
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    # Get the user's ID from the "sub" field inside the JWT.
    user_id = payload.get("sub")

    # If the token does not contain a user ID,
    # we cannot determine which user is making the request.
    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    # Use the ID from the JWT to find the actual user in the database.
    user = get_user_by_id(int(user_id))

    # The JWT may be valid, but the user could have been
    # deleted from the database.
    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    # Authentication succeeded, so return the authenticated user.
    return user
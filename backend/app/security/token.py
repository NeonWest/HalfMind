import jwt
from datetime import datetime, timedelta, timezone
import os

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
def create_access_token(user): 
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=30
    )

    payload = {
        "sub": str(user.userid),
        "exp": expire
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    
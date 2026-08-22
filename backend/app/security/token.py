import jwt

from datetime import datetime, timedelta, timezone

import os


# Secret key used to sign our JWTs.
# The key is stored in an environment variable so we don't
# hard-code the secret directly in our source code.
SECRET_KEY = os.getenv("JWT_SECRET_KEY")


# The algorithm used to sign and verify our JWTs.
ALGORITHM = "HS256"


def create_access_token(user):

    # The JWT will expire 30 minutes from the time it is created.
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=30
    )

    # Information we want to store inside the JWT.
    payload = {

        # "sub" (subject) identifies which user owns this token.
        # We store the user's database ID as a string.
        "sub": str(user.userid),

        # "exp" tells JWT when this token should expire.
        "exp": expire
    }

    # Create the JWT by signing the payload with our secret key.
    #
    # Later, when we receive this JWT from the cookie,
    # we use the same SECRET_KEY and ALGORITHM to verify it.
    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session
import os
from sqlalchemy import create_engine



DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DB URL is not set!")

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=1800
    )

class Base(DeclarativeBase):
    pass
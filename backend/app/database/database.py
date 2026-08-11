from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session
from dotenv import load_dotenv
import os
from sqlalchemy import create_engine


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DB URL is not set!")

engine = create_engine(DATABASE_URL)

class Base(DeclarativeBase):
    pass
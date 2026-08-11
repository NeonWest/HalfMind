from app.database.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, DateTime
from datetime import datetime

class Note(Base):
    __tablename__ = "notes"

    id: Mapped[int] = mapped_column(primary_key=True)
    userid: Mapped[int] = mapped_column()
    title: Mapped[str] = mapped_column(String)
    body: Mapped[str] = mapped_column(String)
    createdAt: Mapped[datetime] = mapped_column(DateTime)

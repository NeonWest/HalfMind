from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from app.database.database import engine
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.routers.user_router import router as user_router
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL"),
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["GET","POST"],
    allow_headers=["Content-Type", "Authorization"],
)

with Session(engine) as session:
    session.execute(text("SELECT 1"))
    print("Database Connection Works!")

app.include_router(user_router)

@app.get("/")
def root():
    return("You Accessed To Root Page. Congrats!")




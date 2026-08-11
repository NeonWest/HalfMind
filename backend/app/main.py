from fastapi import FastAPI
from dotenv import load_dotenv
import os
from app.database.database import engine
from sqlalchemy import text
from sqlalchemy.orm import Session
load_dotenv()

app = FastAPI()

with Session(engine) as session:
    session.execute(text("SELECT 1"))
    print("Database Connection Works!")



@app.get("/")
def root():
    return("You Accessed To Root Page. Congrats!")




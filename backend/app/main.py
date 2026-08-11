from fastapi import FastAPI
from app.database.database import engine
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.routers.user_router import router as user_router


app = FastAPI()

with Session(engine) as session:
    session.execute(text("SELECT 1"))
    print("Database Connection Works!")

app.include_router(user_router)

@app.get("/")
def root():
    return("You Accessed To Root Page. Congrats!")




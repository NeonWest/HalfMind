from fastapi import FastAPI
from dotenv import load_dotenv
import os
from supabase import create_client

load_dotenv()

app = FastAPI()

@app.get("/")
def root():
    return("You Accessed To Root Page. Congrats!")



from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return("You Accessed To Root Page. Congrats!")



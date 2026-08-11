from datetime import datetime
from pydantic import ConfigDict
from pydantic import BaseModel
class NoteRequest(BaseModel):
    userid: int
    title: str
    body: str


class NoteResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    userid: int
    title: str
    body: str
    createdAt: datetime
    updatedAt: datetime
from pydantic import ConfigDict
from datetime import datetime
from pydantic import BaseModel
class UserRequest(BaseModel):
    username:str
    email:str
    password:str
    


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    userid:int
    username:str
    email:str
    createdAt: datetime
from datetime import datetime, timezone
from pydantic import Field, EmailStr
from typing import Optional, Dict
from pydantic import BaseModel


class MediaFile(BaseModel):
    type: str
    unique_name: str
    available_to_llm: bool
    description: str

class PeopleRequest(BaseModel):
    params: Dict[str, int]
    media: Optional[Dict[str, MediaFile]] = None            

class WriteUserModule(BaseModel):
    id: int
    time: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat()) 
    people_request: PeopleRequest  
    llm_answer: Optional[str] = None 


class UserModule(BaseModel):
    params: Dict[str, int]

class UserModules(BaseModel):
    health: Optional[UserModule] = None
    intelligence: Optional[UserModule] = None
    productivity: Optional[UserModule] = None
    emotions: Optional[UserModule] = None
    relationships: Optional[UserModule] = None
    freedom: Optional[UserModule] = None
    love: Optional[UserModule] = None
    occupation: Optional[UserModule] = None
    wealth: Optional[UserModule] = None

    class Config:
        exclude_none = True


class EmailModel(BaseModel):
    email: EmailStr

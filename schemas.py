from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from .models import UserRole
from beanie import PydanticObjectId

# Token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[UserRole] = None

# User
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: Optional[UserRole] = UserRole.USER

class UserResponse(UserBase):
    id: PydanticObjectId = Field(alias="_id")
    role: UserRole
    created_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {PydanticObjectId: str}

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Creator
class CreatorBase(BaseModel):
    name: str
    platform: str
    username: str
    profile_image_url: Optional[str] = None

class CreatorCreate(CreatorBase):
    pass

class CreatorResponse(CreatorBase):
    id: PydanticObjectId = Field(alias="_id")
    user_id: PydanticObjectId
    created_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {PydanticObjectId: str}

# Analytics
class AnalyticsBase(BaseModel):
    followers: int
    engagement_rate: float
    avg_likes: int
    avg_comments: int
    historical_data: Optional[List[Dict[str, Any]]] = None
    last_updated: datetime

class AnalyticsResponse(AnalyticsBase):
    id: PydanticObjectId = Field(alias="_id")
    creator_id: PydanticObjectId

    class Config:
        populate_by_name = True
        json_encoders = {PydanticObjectId: str}

class CreatorWithAnalytics(CreatorResponse):
    analytics: Optional[AnalyticsResponse] = None

from beanie import Document, Indexed, PydanticObjectId
from pydantic import Field
from typing import Optional, List
from datetime import datetime
import enum

class UserRole(str, enum.Enum):
    USER = "user"
    ADMIN = "admin"

class User(Document):
    name: Optional[str] = None
    email: Indexed(str, unique=True)
    password_hash: str
    role: UserRole = UserRole.USER
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "users"

class Creator(Document):
    user_id: Indexed(PydanticObjectId)
    name: str
    platform: str
    username: str
    profile_image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "creators"

class Analytics(Document):
    creator_id: Indexed(PydanticObjectId, unique=True)
    followers: int = 0
    engagement_rate: float = 0.0
    avg_likes: int = 0
    avg_comments: int = 0
    historical_data: Optional[List[dict]] = None
    last_updated: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "analytics"

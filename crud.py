from .models import User, Creator, Analytics
from . import schemas, auth
from beanie import PydanticObjectId
from datetime import datetime

# User CRUD
async def get_user(user_id: PydanticObjectId) -> User | None:
    return await User.get(user_id)

async def get_user_by_email(email: str) -> User | None:
    return await User.find_one(User.email == email)

async def create_user(user: schemas.UserCreate) -> User:
    hashed_password = auth.get_password_hash(user.password)
    db_user = User(
        email=user.email,
        name=user.name,
        password_hash=hashed_password,
        role=user.role 
    )
    await db_user.insert()
    return db_user

# Creator CRUD
async def get_creators(user_id: PydanticObjectId, role: str, skip: int = 0, limit: int = 100):
    if role == "admin":
        return await Creator.find_all().skip(skip).limit(limit).to_list()
    return await Creator.find(Creator.user_id == user_id).skip(skip).limit(limit).to_list()

async def create_creator(creator: schemas.CreatorCreate, user_id: PydanticObjectId) -> Creator:
    db_creator = Creator(**creator.dict(), user_id=user_id)
    await db_creator.insert()
    return db_creator

async def get_creator(creator_id: PydanticObjectId) -> Creator | None:
    return await Creator.get(creator_id)

async def delete_creator(creator_id: PydanticObjectId):
    creator = await Creator.get(creator_id)
    if creator:
        await creator.delete()
    return creator

# Analytics CRUD
async def get_analytics(creator_id: PydanticObjectId) -> Analytics | None:
    return await Analytics.find_one(Analytics.creator_id == creator_id)

async def update_analytics(creator_id: PydanticObjectId, data: dict) -> Analytics:
    analytics = await Analytics.find_one(Analytics.creator_id == creator_id)
    if not analytics:
        analytics = Analytics(creator_id=creator_id)
        await analytics.insert()
    
    analytics.followers = data["followers"]
    analytics.engagement_rate = data["engagement_rate"]
    analytics.avg_likes = data["avg_likes"]
    analytics.avg_comments = data["avg_comments"]
    analytics.historical_data = data["historical_data"]
    analytics.last_updated = datetime.utcnow()
    
    await analytics.save()
    return analytics

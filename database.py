from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from .models import User, Creator, Analytics
import os
from dotenv import load_dotenv

load_dotenv()

async def init_db():
    # Database URL from environment variable or default local MongoDB
    db_url = os.getenv("DATABASE_URL", "mongodb://localhost:27017")
    db_name = os.getenv("DATABASE_NAME", "creator_dashboard")
    
    client = AsyncIOMotorClient(db_url)
    
    await init_beanie(database=client[db_name], document_models=[User, Creator, Analytics])

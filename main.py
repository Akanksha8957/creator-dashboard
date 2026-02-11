from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os

# Explicitly load .env from the backend directory
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

from .routers import auth, creators, analytics
from .database import init_db
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(title="Creator Analytics Dashboard API", lifespan=lifespan)

# CORS Configuration
origins = [
    "http://localhost:3000", # Next.js frontend
    "http://localhost:8000",
    # Add production URLs here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(creators.router)
app.include_router(analytics.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Creator Analytics Dashboard API"}

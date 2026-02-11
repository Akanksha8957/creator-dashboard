from fastapi import APIRouter, Depends, HTTPException, status
from backend import models, schemas, crud, auth
from datetime import timedelta

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"]
)

@router.post("/register", response_model=schemas.UserResponse)
async def register(user: schemas.UserCreate):
    db_user = await crud.get_user_by_email(email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return await crud.create_user(user=user)

@router.post("/login", response_model=schemas.Token)
async def login(form_data: schemas.UserLogin):
    user = await crud.get_user_by_email(email=form_data.email)
    if not user or not auth.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email, "role": user.role}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserResponse)
async def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from modules import crud
from modules.auth import create_access_token, get_password_hash
from modules.database import get_session
from modules.schemas import Token, UserRead, UserLogin, UserWithToken
from modules.models import User

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

ACCESS_TOKEN_EXPIRE_MINUTES = 43200


@router.post("/token", response_model=Token)
async def login_by_access_token(
        form_data: OAuth2PasswordRequestForm = Depends()
):
    user = await crud.authenticate_user(form_data.name, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.name}, expires_delta=access_token_expires
    )
    return {"id": user.id, "name": user.name, "token": access_token}


@router.post("/login", response_model=UserWithToken)
async def login_for_access_token(
        login_request: UserLogin
):
    user = await crud.authenticate_user(login_request.name, login_request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.name}, expires_delta=access_token_expires
    )
    return {"id": user.id, "name": user.name, "token": access_token}


@router.post("/register", response_model=UserRead)
async def sign_up(user: UserLogin, session: AsyncSession = Depends(get_session)):
    hashed_password = get_password_hash(user.password)
    new_user = User(name=user.name, password=hashed_password)
    user_read = await crud.create_user(new_user, session)
    return user_read


@router.get("/me", response_model=UserRead)
async def read_users_me(current_user: User = Depends(crud.get_current_user)):
    user = UserRead(id=current_user.id, name=current_user.name)
    return user

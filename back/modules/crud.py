from fastapi import Depends, HTTPException
from jose import jwt, JWTError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from modules.auth import verify_password, oauth2_scheme, SECRET_KEY, ALGORITHM
from modules.database import async_session
from modules.models import *
from modules.schemas import ArticlesLinksSchema, UserRead, TokenData, ArticleUpdate


async def get_users(session: AsyncSession) -> list[User]:
    result = await session.execute(select(User))
    return result.scalars().all()


async def create_user(new_user: User, session: AsyncSession) -> UserRead:
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    return UserRead(id=new_user.id, name=new_user.name)


async def get_user_by_name(name: str, session: AsyncSession):
    results = await session.execute(select(User).filter(User.name == name))
    user = results.scalars().first()
    return user


async def get_current_user(token: str = Depends(oauth2_scheme)):
    async with async_session() as session:
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
            token_data = TokenData(name=username)
        except JWTError:
            raise credentials_exception
        user = await get_user_by_name(token_data.name, session)
        if user is None:
            raise credentials_exception
        return user


async def authenticate_user(name: str, password: str):
    async with async_session() as session:
        user = await get_user_by_name(name, session)

        if not user:
            return False
        if not verify_password(password, user.password):
            return False
        return user


async def get_article_ids(session: AsyncSession) -> list[ArticlesLinksSchema]:
    try:
        result = await session.execute(select(Article.link))
        return result.scalars().all()
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong")


async def get_article_by_id(article_id: int, session: AsyncSession) -> Article:
    try:
        result = await session.execute(select(Article).where(Article.id == article_id))
        return result.scalars().first()
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong")


async def update_article(article: Article, article_data: ArticleUpdate, session: AsyncSession) -> Article:
    try:
        article.title = article_data.title
        article.link = article_data.link
        article.summary = article_data.summary
        article.published = article_data.published
        await session.commit()
        return article
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong")


async def delete_article(article: Article, session: AsyncSession) -> Article:
    try:
        await session.delete(article)
        await session.commit()
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong")

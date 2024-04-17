from fastapi import APIRouter, Depends, HTTPException
from fastapi_pagination import Page
from fastapi_pagination.customization import CustomizedPage, UseParamsFields
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy import desc, asc, select, func, or_
from sqlalchemy.ext.asyncio import AsyncSession

from modules import crud
from modules.database import get_session
from modules.models import ItemQueryParams, Article, User
from modules.schemas import ArticleSchema, ArticleUpdate

router = APIRouter(prefix="/api/articles", tags=["Articles"])


@router.get("/", response_model=CustomizedPage[
    Page[ArticleSchema],
    UseParamsFields(size=10)])
async def get_all_articles(session: AsyncSession = Depends(get_session), params: ItemQueryParams = Depends()):
    try:
        order_type = desc if "-" in params.order_by else asc
        order_column = getattr(Article, params.order_by.replace("-", ""))
        order_column = order_type(order_column)
        query = select(Article)
        if params.query:
            query = query.filter(or_(
                func.lower(Article.title).contains(params.query.lower()),
                func.lower(Article.summary).contains(params.query.lower())
            ))
        articles = await paginate(session, query.order_by(order_column))
        return articles
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{article_id}")
async def update_article(article_id: int, article_data: ArticleUpdate, session: AsyncSession = Depends(get_session),
                         current_user: User = Depends(crud.get_current_user), ):
    article = await crud.get_article_by_id(article_id, session)
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")

    try:
        await crud.update_article(article, article_data, session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"message": "Article updated successfully"}


@router.delete("/{article_id}")
async def delete_article(article_id: int, session: AsyncSession = Depends(get_session),
                         current_user: User = Depends(crud.get_current_user), ):
    article = await crud.get_article_by_id(article_id, session)
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    try:
        await crud.delete_article(article, session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"message": "Article deleted successfully"}

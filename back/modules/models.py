from pydantic import BaseModel
from sqlalchemy import Column, DateTime
from sqlalchemy import String
from sqlalchemy import Integer
from modules.database import Base
from modules.schemas import OrderBy


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    name = Column(String, unique=True)
    password = Column(String)


class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String)
    link = Column(String)
    image_href = Column(String)
    summary = Column(String)
    published = Column(DateTime)


class ItemQueryParams(BaseModel):
    order_by: OrderBy = OrderBy.published
    query: str = ""

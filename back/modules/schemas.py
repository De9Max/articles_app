import datetime
from enum import Enum
from typing import  Optional

from pydantic import BaseModel


class ArticleSchema(BaseModel):
    id: int
    title: str
    link: str
    image_href: str
    summary: str
    published: datetime.datetime


class ArticlesLinksSchema(BaseModel):
    link: str


class OrderBy(str, Enum):
    published = "published"
    desc_published = "-published"


class User(BaseModel):
    name: str
    password: str


class UserRead(BaseModel):
    id: int
    name: str


class UserWithToken(BaseModel):
    id: int
    name: str
    token: str



class UserLogin(BaseModel):
    name: str
    password: str


class TokenData(BaseModel):
    name: Optional[str] = None


class Token(BaseModel):
    token: str


class ArticleUpdate(BaseModel):
    title: str
    link: str
    summary: str
    published: datetime.datetime



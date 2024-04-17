import asyncio
import typer
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.middleware.cors import CORSMiddleware
from fastapi_pagination import Page, add_pagination

from config import origins
from modules.crud import get_users
from modules.database import get_session, init_models
from routes.articles import router as articles_router
from routes.auth import router as auth_router

app = FastAPI()
cli = typer.Typer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

add_pagination(app)
app.include_router(articles_router)
app.include_router(auth_router)


@app.get("/users/")
async def get_all_users(session: AsyncSession = Depends(get_session)):
    try:
        users = await get_users(session)
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@cli.command("init")
def db_init_models():
    asyncio.run(init_models())
    print("Models initialized")


if __name__ == "__main__":
    cli()

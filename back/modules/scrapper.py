import asyncio
from datetime import datetime
from time import mktime

import feedparser

from modules.crud import get_article_ids
from modules.database import async_session
from modules.models import Article


def scrape(url):
    feed = feedparser.parse(url)
    return feed.entries


async def save_to_database(entries):
    async with async_session() as session:
        articles = await get_article_ids(session)
        for entry in entries:
            if entry.link not in articles:
                rss_item = Article(
                    title=entry.title,
                    link=entry.link,
                    image_href=entry.links[1].href,
                    summary=entry.summary,
                    published=datetime.fromtimestamp(mktime(entry.published_parsed))
                )
                session.add(rss_item)
        await session.commit()


async def main():
    data = scrape("https://www.liga.net/news/rss.xml")
    await save_to_database(data)


if __name__ == "__main__":
    asyncio.run(main())

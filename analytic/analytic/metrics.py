import aiohttp
import asyncio
from math import ceil
from .settings import get_settings
from .models import Choice, Category

start_date = "2023-05-01"  # костыль


async def metrics_api_request(path: str, params: dict):
    settings = get_settings()
    async with aiohttp.ClientSession() as session:
        async with session.get(
            f"https://api-metrika.yandex.net/{path}",
            headers={"Authorization": f"OAuth {settings.YM_TOKEN}"},
            params={
                "id": settings.YM_IDS,
                "limit": 100_000,
                "date1": start_date,
                "lang": "ru",
                **params,
            },
        ) as response:
            return await response.json()


async def get_page_metrics_filter(
    metrics: str, movie_ids: list[str], date1: str, date2: str
) -> int:
    assert len(movie_ids) <= 10
    data = await metrics_api_request(
        "stat/v1/data",
        {
            "metrics": f"ym:s:{metrics}",
            "filters": " OR ".join(
                [f"ym:pv:URLPath=='/movie/{movie_id}'" for movie_id in movie_ids]
            ),
            "date1": date1,
            "date2": date2,
        },
    )
    data = data["data"]
    if not data:
        return 0
    return data[0]["metrics"][0]


async def get_page_metrics(
    metrics: str, movie_ids: list[str], date1: str = start_date, date2: str = "today"
) -> int:
    return sum(
        await asyncio.gather(
            *[
                get_page_metrics_filter(
                    metrics, movie_ids[i * 10 : (i + 1) * 10], date1, date2
                )
                for i in range(ceil(len(movie_ids) / 10))
            ]
        )
    )


async def get_views(movie_ids: list[str], **kwargs) -> int:
    return await get_page_metrics("pageviews", movie_ids, **kwargs)


async def get_users(movie_ids: list[str], **kwargs) -> int:
    return await get_page_metrics("users", movie_ids, **kwargs)


async def get_shares(movie_id: str) -> int:
    data = (
        await metrics_api_request(
            "stat/v1/data",
            {
                "metrics": "ym:s:visits",
                "dimensions": f"ym:s:paramsLevel1,ym:s:paramsLevel2",
                "filters": f"ym:s:paramsLevel1=='share' AND ym:s:paramsLevel2=='{movie_id}'",
            },
        )
    )["data"]
    if not data:
        return 0
    return sum([sum(metric["metrics"]) for metric in data])


async def get_choices(movie_id: str) -> list[Choice]:
    response = (
        await metrics_api_request(
            "stat/v1/data",
            {
                "metrics": "ym:s:visits",
                "dimensions": f"ym:s:paramsLevel1,ym:s:paramsLevel2,ym:s:paramsLevel3,ym:s:paramsLevel4,ym:s:paramsLevel5",
                "filters": f"ym:s:paramsLevel1=='{movie_id}'",
            },
        )
    )["data"]
    data = [
        {
            "structure": [d["name"] for d in node["dimensions"]],
            "metrics": sum(node["metrics"]),
        }
        for node in response
    ]
    return [Choice(**node) for node in data]


async def get_interests() -> list[Category]:
    response = (
        await metrics_api_request(
            "stat/v1/data",
            {"preset": "interests2"},
        )
    )["data"]
    return [
        Category(
            name=", ".join(
                [
                    dimension["name"]
                    for dimension in catrgory["dimensions"]
                    if dimension["id"]
                ]
            ),
            value=catrgory["metrics"][0],
        )
        for catrgory in response
    ]


async def get_demographics():
    response = (
        await metrics_api_request(
            "stat/v1/data",
            {"preset": "age_gender"},
        )
    )["data"]
    return [
        Category(
            name=", ".join([dimension["name"] for dimension in category["dimensions"]]),
            value=category["metrics"][0],
        )
        for category in response
    ]

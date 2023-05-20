import aiohttp
from .settings import get_settings


async def make_backend_requst(method: str, path: str, **params) -> dict:
    settings = get_settings()
    async with aiohttp.ClientSession() as session:
        async with session.request(
            method, settings.MAIN_API_BASE_URL + path, **params
        ) as request:
            return await request.json()


async def get_movie_summary(movie_id: str) -> dict:
    return await make_backend_requst("get", f"project/{movie_id}/summary")


async def get_user_projects(user_id: str) -> list[str]:
    return [
        project["projectId"]
        for project in (await make_backend_requst("get", f"projects"))
        if project["userId"] == user_id
    ]

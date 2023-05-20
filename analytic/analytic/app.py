import asyncio
from datetime import date, timedelta

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from math import ceil
from .metrics import (
    metrics_api_request,
    get_views,
    get_shares,
    get_choices,
    get_users,
)
from .backend import get_movie_summary, get_user_projects
from .analytics import get_buttons_analytics, get_finishing
from .models import MovieResponse, AnalyticsResponse

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/metrics/{movie_id}", response_model=MovieResponse)
async def metrics(movie_id: str) -> MovieResponse:
    views = await get_views([movie_id])
    shares = await get_shares(movie_id)
    choices = await get_choices(movie_id)

    nodes = (await get_movie_summary(movie_id))["nodes"]
    buttons = get_buttons_analytics(nodes, choices)
    finishing = get_finishing(nodes, choices, views)
    return MovieResponse(
        views=views,
        shares=shares,
        finishing=ceil((finishing * 100)) / 100,
        buttons=buttons,
    )


@app.get("/analytics/{user_id}", response_model=AnalyticsResponse)
async def analytics(user_id: str):
    projects = await get_user_projects(user_id)
    days = list(
        ([(date.today() - timedelta(days=6 - i)).isoformat() for i in range(8)])
    )
    graph = []
    for start, end in zip(days, days[1:]):
        visitors = await get_users(projects, date1=start, date2=end)
        views = await get_views(projects, date1=start, date2=end)
        graph.append({"date": start, "views": views, "visitors": visitors})

    videos = {project: await metrics(project) for project in projects}
    return AnalyticsResponse(graph=graph, videos=videos)

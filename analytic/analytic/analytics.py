from datetime import date, timedelta
from math import ceil
from .models import Choice, ButtonsAnalytics, ConversionResponse
from .metrics import get_views, get_users


def get_buttons_analytics(nodes: list, choices: list[Choice]) -> ButtonsAnalytics:
    buttons = [node for node in nodes if node["buttonName"]]
    response = {}

    for node in choices:
        for button in buttons:
            if node.structure[-2] == button["id"]:
                key = node.structure[2] + " -> " + button["buttonName"]
                if key not in response:
                    response[key] = 0
                response[key] += node.metrics
    for button in buttons:
        for parent_id in button["parentGuids"]:
            parent = [node for node in nodes if node["id"] == parent_id]
            if not parent:
                continue
            parent = parent[0]
            question = parent["question"] or "Что ты выберешь?"
            key = question.strip() + " -> " + button["buttonName"].strip()
            if key not in response:
                response[key] = 0

    return response
    return {
        button["buttonName"]: sum(
            [node.metrics for node in choices if node.structure[-2] == button["id"]]
        )
        for button in buttons
    }


def get_finishing(nodes: list, choices: list[Choice], views: int) -> float:
    final_nodes = [node for node in nodes if not node["childGuids"]]
    return sum(
        [
            sum(
                [node.metrics for node in choices if node.structure[-2] == button["id"]]
            )
            for button in final_nodes
        ]
    ) / (views or 1)


async def get_conversion_for_range(movie_ids: list[str], start: date, end: date) -> int:
    views = await get_views(
        movie_ids,
        date1=start.isoformat(),
        date2=end.isoformat(),
    )
    visitors = await get_users(
        movie_ids,
        date1=start.isoformat(),
        date2=end.isoformat(),
    )
    return ceil((visitors / (views or 1)) * 100)


async def get_conversion(movie_ids: list[str]):
    current_range = [date.today() - timedelta(days=6), date.today()]
    previous_range = [
        date.today() - timedelta(days=6 + 7),
        date.today() - timedelta(days=7),
    ]
    previous = await get_conversion_for_range(movie_ids, *previous_range)
    current = await get_conversion_for_range(movie_ids, *current_range)
    return ConversionResponse(
        previous_dates=f"{previous_range[0].isoformat()} - {previous_range[1].isoformat()}",
        previous=previous,
        dates=f"{current_range[0].isoformat()} - {current_range[1].isoformat()}",
        current=current,
    )

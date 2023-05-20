from .models import Choice, ButtonsAnalytics


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
    return (
        sum(
            [
                sum(
                    [
                        node.metrics
                        for node in choices
                        if node.structure[-2] == button["id"]
                    ]
                )
                for button in final_nodes
            ]
        )
        / (views or 1)
    )

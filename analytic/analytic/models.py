from pydantic import BaseModel


class Choice(BaseModel):
    structure: list[str]
    metrics: float


ButtonsAnalytics = dict[str, float]


class MovieResponse(BaseModel):
    views: int
    shares: int
    finishing: float
    buttons: ButtonsAnalytics


class DayInfo(BaseModel):
    date: str
    views: int
    visitors: int


class ConversionResponse(BaseModel):
    previous_dates: str
    previous: float
    dates: str
    current: float


class AnalyticsResponse(BaseModel):
    graph: list[DayInfo]
    videos: dict[str, MovieResponse]
    conversion: ConversionResponse

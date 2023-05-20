from pydantic import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    YM_TOKEN: str
    YM_IDS: str
    MAIN_API_BASE_URL: str


@lru_cache
def get_settings() -> Settings:
    return Settings()

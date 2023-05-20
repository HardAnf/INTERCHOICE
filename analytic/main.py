from analytic.app import app
from uvicorn import run


if __name__ == "__main__":
    run(
        "analytic.app:app",
        port=8080,
        reload=True,
    )

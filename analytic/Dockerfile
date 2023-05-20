FROM python:3.10

WORKDIR /app

RUN pip install poetry
COPY . ./
RUN poetry install

EXPOSE 8080
CMD ["poetry", "run", "uvicorn", "analytic.app:app", "--host", "0.0.0.0", "--port", "8080"]
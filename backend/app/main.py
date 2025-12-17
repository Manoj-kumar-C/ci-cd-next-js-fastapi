
from fastapi import FastAPI
from app.routers import items

app = FastAPI(title="Async Production-Ready CRUD API")

app.include_router(items.router, prefix="/items", tags=["Items"])

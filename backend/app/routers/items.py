
from fastapi import APIRouter, HTTPException
from uuid import uuid4
from typing import List
from app.schemas.item import ItemCreate, ItemUpdate, ItemResponse
from app.db.json_db import read_data, write_data

router = APIRouter()

@router.post("/", response_model=ItemResponse)
async def create_item(item: ItemCreate):
    data = await read_data()
    new_item = {
        "id": str(uuid4()),
        "name": item.name,
        "description": item.description
    }
    data.append(new_item)
    await write_data(data)
    return new_item

@router.get("/", response_model=List[ItemResponse])
async def get_items():
    return await read_data()

@router.get("/{item_id}", response_model=ItemResponse)
async def get_item(item_id: str):
    data = await read_data()
    for item in data:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@router.put("/{item_id}", response_model=ItemResponse)
async def update_item(item_id: str, payload: ItemUpdate):
    data = await read_data()
    for item in data:
        if item["id"] == item_id:
            item["name"] = payload.name
            item["description"] = payload.description
            await write_data(data)
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@router.delete("/{item_id}")
async def delete_item(item_id: str):
    data = await read_data()
    new_data = [item for item in data if item["id"] != item_id]
    if len(new_data) == len(data):
        raise HTTPException(status_code=404, detail="Item not found")
    await write_data(new_data)
    return {"message": "Item deleted successfully"}

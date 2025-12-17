
import json
import aiofiles
import os

DATA_FILE = "data.json"

async def read_data():
    if not os.path.exists(DATA_FILE):
        return []
    async with aiofiles.open(DATA_FILE, "r") as f:
        content = await f.read()
        return json.loads(content) if content else []

async def write_data(data):
    async with aiofiles.open(DATA_FILE, "w") as f:
        await f.write(json.dumps(data, indent=4))

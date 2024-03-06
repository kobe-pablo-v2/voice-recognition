# main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import whisper
import os
from uuid import uuid4

app = FastAPI()

origins = ["http://localhost:3000",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/text/{fileName}")
def get_text(fileName: str):
    file_path = f"./source/{fileName}.wav"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    try:
        model = whisper.load_model("small")
        result = model.transcribe(file_path, fp16=False)
        return {"text": result['text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/files")
async def get_files():
    directory_path = "./source"
    files = []
    for filename in os.listdir(directory_path):
        files.append({"id": str(uuid4()), "name": filename})
    return files

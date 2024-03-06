import whisper
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
import os

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/{fileName}")
def get_text(fileName: str):
    model = whisper.load_model("small")
    result = model.transcribe(f"./source/{fileName}.wav", fp16=False)
    return {"text": result['text']}

@app.get("/sample1")
def text():
    model = whisper.load_model("small")
    result = model.transcribe("./source/sample2.wav", fp16=False)
    print(result["text"])
    return {"text":result['text']}

@app.get("/files")
async def get_files():
    directory_path = "./source"
    files = []
    for filename in os.listdir(directory_path):
        files.append({"id": str(uuid4()), "name": filename})
    return files
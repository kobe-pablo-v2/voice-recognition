import whisper
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/")
def text():
    model = whisper.load_model("large")
    result = model.transcribe("./sample/sample.wav", fp16=False)
    print(result["text"])
    return {"text":result['text']}
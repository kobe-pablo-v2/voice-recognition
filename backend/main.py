
import whisper

model = whisper.load_model("large")
result = model.transcribe("./sample/sample.wav", fp16=False)
print(result["text"])
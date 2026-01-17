
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


@app.get("/generate")
def generate(topic: str):
    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": f"Write a clear, beginner-friendly paragraph about {topic}."
            }
        ],
        temperature=0.7,
        max_tokens=200
    )

    return {
        "content": completion.choices[0].message.content
    }

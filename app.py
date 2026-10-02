from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini API
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


class Question(BaseModel):
    subject: str
    question: str


@app.get("/")
def home():
    return {
        "message": "AI Learning Companion backend is running!"
    }


@app.post("/ask")
def ask_ai(data: Question):

    prompt = f"""
You are an AI Learning Companion for school students.

Subject: {data.subject}

Student question:
{data.question}

Teach the student clearly and step by step.

Use simple language suitable for a school student.

For Mathematics:
- Show the calculation steps.
- Explain how you got the answer.

For Physics:
- Explain the concept simply.
- Give an example when useful.

For Chemistry:
- Explain the concept simply.
- Include important equations or examples when useful.

Do not only give the final answer.
Help the student understand the concept.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    return {
        "answer": response.text
    }
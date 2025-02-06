from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_chat import generate_response  # Ensure this exists
from summerize_pdf import summerize  # Ensure this exists
from web_search import search  # Ensure this exists

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Pydantic model for input validation
class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate")
async def generate(request: PromptRequest):
    response = generate_response(request.prompt)
    return {"response": response}

@app.post("/summerize")
async def generate(request: PromptRequest):
    response = summerize(request.prompt)
    return {"response": response}

@app.post("/search")
async def generate(request: PromptRequest):
    response = search(request.prompt)
    return {"response": response}
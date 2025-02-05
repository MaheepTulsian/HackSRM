from crewai import Agent
from Agents.create_assignment.tools import pdf_tool
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Set OpenAI API Key and Model Name
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
os.environ["OPENAI_MODEL_NAME"] = "gpt-4o-mini"

# Define the Assignment Writer Agent
assignment_writer = Agent(
    role="Assignment Writer",
    goal="Extract relevant content from PDF files and compose well-structured assignments.",
    verbose=True,  # Fixed typo (was 'verboe')
    memory=True,
    backstory=(
        "An expert in analyzing and understanding PDF documents, capable of identifying key information "
        "and transforming it into comprehensive, well-written assignments. Skilled in maintaining clarity, "
        "coherence, and academic integrity while crafting assignments tailored to specific requirements."
    ),
    tools=[pdf_tool],
    allow_delegation=True
)

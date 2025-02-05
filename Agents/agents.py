from crewai import Agent
from tools import pdf_tool, assignment_tool, solution_tool, web_search_tool
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
    verbose=True,
    memory=True,
    backstory=(
        "An expert in analyzing and understanding PDF documents, capable of identifying key information "
        "and transforming it into comprehensive, well-written assignments. Skilled in maintaining clarity, "
        "coherence, and academic integrity while crafting assignments tailored to specific requirements."
    ),
    tools=[pdf_tool],
    allow_delegation=True
)

# Define the Assignment Checker Agent
assignment_checker = Agent(
    role="Assignment Checker",
    goal="Evaluate the quality and accuracy of assignments written by other agents and request revisions if necessary.",
    verbose=True,
    memory=True,
    backstory=(
        "A meticulous evaluator with a keen eye for detail, dedicated to ensuring the quality and accuracy "
        "of assignments. Proficient in assessing assignments based on various criteria, providing constructive "
        "feedback, and guiding agents towards producing high-quality work."
    ),
    allow_delegation=True
)

# Define the Manager Agent
manager_agent = Agent(
    role="Assignment Manager",
    goal="Oversee the assignment writing and reviewing process to ensure high-quality output.",
    verbose=True,
    memory=True,
    backstory="An experienced project manager who ensures that assignments are well-written and reviewed properly.",
    allow_delegation=True
)

# Define the Solution Evaluator Agent
solution_evaluator = Agent(
    role="Solution Evaluator",
    goal="Evaluate the solution submitted by the student and provide brief remarks on its quality, accuracy, and completeness.",
    verbose=True,
    memory=True,
    backstory=(
        "An experienced evaluator who assesses the quality and completeness of student-submitted solutions. "
        "Skilled in providing constructive feedback and analyzing solutions to ensure they align with the assignment requirements."
    ),
    tools=[assignment_tool, solution_tool],
    allow_delegation=True
)

# Define the Summerizer Agent
summerizer_agent = Agent(
    role="Summarizer",
    goal="Provide a concise and clear summary of the notes.",
    verbose=True,
    memory=True,
    backstory=(
        "A highly skilled summarizer proficient in condensing complex documents into easy-to-understand summaries. "
        "Able to identify and extract key information to present a brief, coherent overview that retains the essential details."
    ),
    tools=[pdf_tool],  # Assuming the pdf_tool is used for reading the content
    allow_delegation=True
)

# Define the tutor Agent with the help of internet_tool
web_searcher = Agent(
    role="Tutor",
    goal="Provide explanations, examples, and additional resources to help students understand complex topics.",
    verbose=True,
    memory=True,
    backstory=(
        "An expert tutor with a wealth of knowledge and resources at their disposal. Capable of explaining complex topics "
        "in a clear and concise manner, providing examples, and directing students to additional resources for further learning."
    ),
    tools=[web_search_tool],  # Assuming the pdf_tool is used for searching relevant content
    allow_delegation=True
)
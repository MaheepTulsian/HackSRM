from crewai import Crew, Agent, Task, Process
from tools import pdf_tool  # Importing the PDF processing tool

# 🔹 Define the RAG Agent
rag_agent = Agent(
    role="AI Researcher",
    goal="Retrieve information from PDFs and generate well-structured responses.",
    verbose=True,
    memory=True,
    backstory="An AI assistant specialized in extracting relevant information from PDF documents.",
    tools=[pdf_tool],  # Uses the PDF tool for retrieval
    allow_delegation=True
)

# 🔹 Define the RAG Task
rag_task = Task(
    description="Retrieve relevant data from PDF documents and generate a detailed response based on the given user input {prompt}.",
    expected_output="A well-structured response based on relevant sections from PDFs.",
    tools=[pdf_tool],  # Uses the PDF retrieval tool
    agent=rag_agent
)

# 🔹 Set Up Crew
crew = Crew(
    agents=[rag_agent],
    tasks=[rag_task],
    process=Process.sequential,  # Ensures structured response generation
    memory=True,
    cache=True,
    max_rpm=100,
    share_crew=True
)

# 🔹 Function to process user prompt
def generate_response(prompt: str):
    print(f"Received prompt: {prompt}")  # Debugging
    input_data = {"prompt": prompt}
    result = crew.kickoff(inputs=input_data)
    print(f"Generated response: {result}")  # Debugging
    return result

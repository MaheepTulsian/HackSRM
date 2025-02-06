from crewai import Crew, Process
from agents import summerizer_agent
from task import summerizer_task

# Create the AI-powered crew for summarizing the assignment and solution
crew = Crew(
    agents=[summerizer_agent],  # Assign the AI agent responsible for summarizing
    tasks=[summerizer_task],    # Assign the summarizer task to be completed
    process=Process.sequential, # Executes tasks in sequence
    memory=True,                # Enables memory for better context retention
    cache=True,                 # Caches results to optimize repeated queries
    max_rpm=100,                # Limits API calls per minute for efficiency
    share_crew=True             # Allows collaboration across different tasks
)

def summerize(prompt: str):
    print(f"Received prompt: {prompt}")  # Debugging
    input_data = {"prompt": prompt}
    result = crew.kickoff(inputs=input_data)
    print(f"Generated response: {result}")  # Debugging
    return result
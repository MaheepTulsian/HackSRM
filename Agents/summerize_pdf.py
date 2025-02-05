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



# Define the input for the summarization process
input_data = {
    "prompt": 
        "Summarize the content of the notes for quick reference and review."
        "Provide a concise overview of the key points and main ideas presented."
        "Ensure that the summary is clear, brief, and captures the essence of both documents.",  # Use the defined prompt for summarization
}

# Start the summarization process with feedback enabled
print("🚀 Starting the summarization process...\n")
result = crew.kickoff(inputs=input_data)

# Output the result
print(result)

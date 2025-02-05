from crewai import Crew, Process
from agents import web_searcher  # Assuming the Agent is defined as web_searcher
from task import tutor_task  # Assuming the Tutor Task is defined as tutor_task

# Create the AI-powered crew for tutoring and providing explanations
crew = Crew(
    agents=[web_searcher],  # Assign the AI agent responsible for tutoring
    tasks=[tutor_task],      # Assign the tutor task to be completed
    process=Process.sequential, # Executes tasks in sequence
    memory=True,                # Enables memory for better context retention
    cache=True,                 # Caches results to optimize repeated queries
    max_rpm=100,                # Limits API calls per minute for efficiency
    share_crew=True             # Allows collaboration across different tasks
)

# Define the input for the tutoring process
input_data = {
    "topic": "Array data structure"
}

# Start the tutoring process with feedback enabled
print("🚀 Starting the tutoring process...\n")
result = crew.kickoff(inputs=input_data)

# Output the result
print(result)

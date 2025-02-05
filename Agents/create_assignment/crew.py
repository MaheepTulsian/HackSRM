from crewai import Crew, Process
from Agents.create_assignment.agents import assignment_writer
from Agents.create_assignment.task import assignment_task

# Create the AI-powered crew for assignment writing
crew = Crew(
    agents=[assignment_writer],  # Assign the AI agent responsible for writing
    tasks=[assignment_task],     # Assign the task to be completed
    process=Process.sequential,  # Executes tasks in sequence
    memory=True,                 # Enables memory for better context retention
    cache=True,                  # Caches results to optimize repeated queries
    max_rpm=100,                 # Limits API calls per minute for efficiency
    share_crew=True              # Allows collaboration across different tasks
)

# Define the input for assignment writing
input_data = {
    "topic": "Create the assignment from the PDF shared at a medium level, "
             "such that every student will be able to attempt it. "
             "Not too easy and not too hard."
}

# Start the assignment writing process with feedback enabled
print("🚀 Starting the assignment writing process...\n")
# Remove the 'feedback' argument
result = crew.kickoff(inputs=input_data)

print(result)

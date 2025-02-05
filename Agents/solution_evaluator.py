from crewai import Crew, Process
from agents import solution_evaluator
from task import solution_evaluation_task

# Create the AI-powered crew for solution evaluation
crew = Crew(
    agents=[solution_evaluator],  # Assign the AI agent responsible for evaluating solutions
    tasks=[solution_evaluation_task],  # Assign the task to be completed
    process=Process.sequential,  # Executes tasks in sequence
    memory=True,                 # Enables memory for better context retention
    cache=True,                  # Caches results to optimize repeated queries
    max_rpm=100,                 # Limits API calls per minute for efficiency
    share_crew=True              # Allows collaboration across different tasks
)

# Define the input for solution evaluation
input_data = {
    "feedback_request": "Provide brief remarks on the solution's quality, accuracy, and completeness."
}

# Start the solution evaluation process with feedback enabled
print("🚀 Starting the solution evaluation process...\n")
# Execute the solution evaluation
result = crew.kickoff(inputs=input_data)

# Print the result (feedback)
print(result)

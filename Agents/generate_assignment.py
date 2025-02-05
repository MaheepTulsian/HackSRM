from crewai import Crew, Process
from agents import assignment_writer, assignment_checker, manager_agent
from task import assignment_task, checking_task

def run_assignment_pipeline():
    input_data = {
        "topic": "Create the assignment from the PDF shared at a medium level, "
                 "such that every student will be able to attempt it. "
                 "Not too easy and not too hard."
    }

    # Create the crew with manager
    crew = Crew(
        agents=[assignment_writer, assignment_checker],  # Do NOT include manager_agent here
        tasks=[assignment_task, checking_task],  # Tasks to be executed
        process=Process.hierarchical,  # Ensures task execution with feedback loop
        manager_agent=manager_agent,   # Assign the manager agent separately
        memory=True,                   # Enables memory for better context retention
        cache=True,                     # Caches results for efficiency
        max_rpm=100,                    # Limits API calls per minute
        share_crew=True                  # Allows collaboration across different tasks
    )

    print("\U0001F680 Starting the assignment writing process...\n")
    
    # Start execution
    result = crew.kickoff(inputs=input_data)

    # Convert CrewOutput to string before writing
    assignment_text = str(result)

    # Save the final assignment to a file
    with open("assignment.txt", "w", encoding="utf-8") as f:
        f.write(assignment_text)

    print("\n✅ Final assignment saved in 'assignment.txt'")

# Run the pipeline
if __name__ == "__main__":
    run_assignment_pipeline()

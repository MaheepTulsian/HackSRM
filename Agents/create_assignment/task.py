from crewai import Task
from Agents.create_assignment.tools import pdf_tool
from Agents.create_assignment.agents import assignment_writer

# Define the Assignment Writing Task
assignment_task = Task(
    description=(
        "Write a well-structured assignment based on the provided PDF content. "
        "Ensure it is at a medium difficulty level so that all students can attempt it, "
        "making it neither too easy nor too hard."
    ),
    expected_output="A clear, structured assignment suitable for students of varying skill levels.",
    tools=[pdf_tool],
    agent=assignment_writer
)

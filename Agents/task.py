from crewai import Task
from tools import pdf_tool, assignment_tool, solution_tool, web_search_tool
from agents import assignment_writer, assignment_checker, solution_evaluator, summerizer_agent, web_searcher

# Define the Assignment Writing Task
assignment_task = Task(
    description=(
        "Write a well-structured assignment based on the provided PDF content. "
        "Ensure it is at a medium difficulty level so that all students can attempt it, "
        "making it neither too easy nor too hard."
        "If feedback for revision is provided, refine the assignment accordingly."
    ),
    expected_output="A clear, structured assignment suitable for students of varying skill levels.",
    tools=[pdf_tool],
    agent=assignment_writer
)

# Define the Assignment Checking Task
checking_task = Task(
    description=(
        "Review and evaluate the assignment written by the Assignment Writer. "
        "Provide detailed feedback on the quality, accuracy, and relevance of the content. "
        "If necessary, request a revision by clearly stating the needed improvements. "
        "If the assignment meets expectations, provide final approval."
    ),
    expected_output="Constructive feedback on assignment quality or final approval confirmation.",
    tools=[pdf_tool],
    agent=assignment_checker
)

# Define the Solution Evaluation Task
solution_evaluation_task = Task(
    description=(
        "Evaluate the student's solution submitted for the assignment. "
        "Check the content against the provided assignment and provide brief remarks regarding the accuracy, completeness, "
        "and overall quality of the solution. Suggest improvements or revisions if necessary."
    ),
    expected_output="Brief remarks and feedback on the student's solution, including any necessary revisions or final approval.",
    tools=[assignment_tool, solution_tool],
    agent=solution_evaluator
)

# Define the Summerizer Task
summerizer_task = Task(
    description=(
        "Summarize the notes to highlight the key points and main ideas. "
        "Focus on providing a clear and brief overview, omitting unnecessary details, and ensuring the essence is captured."
    ),
    expected_output="A concise summary of the notes, covering the essential points in one or two paragraphs.",
    tools=[pdf_tool],  # Assuming pdf_tool is being used for the extraction
    agent=summerizer_agent
)

# Define the Tutor Task
tutor_task = Task(
    description=(
        "Provide tutoring support to students by answering questions, explaining concepts for {topic} "
        "and guiding them through the learning material. Use online resources to enhance explanations "
        "and ensure students have a clear understanding of the subject matter."
    ),
    expected_output="Clear explanations, answers to questions, and guidance to help students understand the material.",
    tools=[web_search_tool],
    agent=web_searcher
)
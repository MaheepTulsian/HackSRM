from crewai_tools import PDFSearchTool, DOCXSearchTool, TXTSearchTool, SerperDevTool
import os

# Set the path to your local PDF file inside the "constant" folder
pdf_path = os.path.join(os.getcwd(), "constant", "test_pdf.pdf")
solution_path = os.path.join(os.getcwd(), "constant", "solution.docx")
assignment_path = os.path.join(os.getcwd(), "constant", "assignment.txt")

# Initialize the tool with the local PDF file
pdf_tool = PDFSearchTool(pdf=pdf_path)
assignment_tool = TXTSearchTool(txt=assignment_path)
solution_tool = DOCXSearchTool(docx=solution_path)

# Initialize the tool for internet searching capabilities
web_search_tool = SerperDevTool()
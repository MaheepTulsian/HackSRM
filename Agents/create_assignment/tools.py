from crewai_tools import PDFSearchTool
import os

# Set the path to your local PDF file inside the "constant" folder
pdf_path = os.path.join(os.getcwd(), "constant", "test_pdf.pdf")

# Initialize the tool with the local PDF file
pdf_tool = PDFSearchTool(pdf=pdf_path)

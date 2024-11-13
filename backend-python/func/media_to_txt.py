from PyPDF2 import PdfReader
from docx import Document
from fastapi import UploadFile

# Function to extract text from a PDF file
def extract_text_from_pdf(file: UploadFile) -> str:
    # Check that the file is a PDF
    if file.content_type != "application/pdf":
        raise ValueError("The provided file is not a PDF.")
    
    # Extract text from the PDF
    try:
        reader = PdfReader(file.file)
        text = "USER ALSO ADDED A PDF FILE (which was translated to text): "
        for page in reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        raise ValueError(f"Error processing the PDF file: {str(e)}")
    
def extract_text_from_docx(file: UploadFile) -> str:
    """Extract text from a DOCX file."""
    if file.content_type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        raise ValueError("The provided file is not a DOCX.")
    try:
        doc = Document(file.file)
        text = "USER ALSO ADDED A DOCX FILE (which was translated to text): " + "\n".join([paragraph.text for paragraph in doc.paragraphs])
        return text
    except Exception as e:
        raise ValueError(f"Error processing the DOCX file: {str(e)}")

def extract_text(file: UploadFile) -> str:
    """Determines the file type and extracts text depending on the format."""
    if file.content_type == "application/pdf":
        return extract_text_from_pdf(file)
    elif file.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return extract_text_from_docx(file)
    else:
        raise ValueError("Unsupported file format.")

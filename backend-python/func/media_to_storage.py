from google.cloud import storage
from google.oauth2 import service_account
import uuid
from typing import List
from fastapi import HTTPException, UploadFile
from config.data import ALLOWED_FORMATS, BUCKET_NAME, MAX_FILE_SIZE, MAX_FILES_COUNT, SERVICE_ACCOUNT_PATH
from func.media_to_txt import extract_text


# Load credentials from JSON file
credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_PATH)
# Initialize Google Cloud Storage client with the specified credentials
storage_client = storage.Client(credentials=credentials)
bucket = storage_client.bucket(BUCKET_NAME)

def upload_files_to_storage(files: List[UploadFile]) -> List[dict]:
    from api.pydantic_classes import MediaFile

    uploaded_files_info = []
    # Check and process files if they are uploaded
    if files:
        if len(files) > MAX_FILES_COUNT:
            raise HTTPException(status_code=400,
                                detail=f"Too many files. Maximum {MAX_FILES_COUNT} files allowed.")

        for file in files:
            # Get the base file object
            file_object = file.file
            # Move to the end of the file
            file_object.seek(0, 2)
            # Get the file size
            file_size = file_object.tell()
            # Move back to the beginning of the file
            file_object.seek(0)
            if file_size > MAX_FILE_SIZE:
                raise HTTPException(status_code=400,
                                    detail=f"File {file.filename} is too large. Maximum file size is 5 MB.")
            
            # Generate a unique name for the file
            unique_name = f"{uuid.uuid4()}_{uuid.uuid4()}"
            file_type = file.content_type
            blob = bucket.blob(unique_name)
            description = extract_text(file)
                
            # The file pointer is at the beginning
            file.file.seek(0)
            # Upload the file to Firestore Storage
            blob.upload_from_file(file.file, content_type=file.content_type)

            # Use the variable is_allowed_format instead of file.is_allowed_format
            is_allowed_format = file.content_type in ALLOWED_FORMATS

            uploaded_files_info.append({
                "available_to_llm": is_allowed_format,
                "type": file_type,
                "unique_name": unique_name,
                "description": description 
            })

        # Close each file
        for file in files:
            file.file.close()

        # Form a dictionary of media files for the request
        media_files = {
            f"file{i+1}": MediaFile(
                type=info["type"],
                unique_name=info["unique_name"],
                available_to_llm=info["available_to_llm"],
                description=info["description"]
            )
            for i, info in enumerate(uploaded_files_info)
        }
        # Collect all descriptions into one string (in case of more than one file)
        files_description = " ".join(info["description"] for info in uploaded_files_info)

        return files_description, media_files, len(uploaded_files_info)
    else:
        return "", None, 0

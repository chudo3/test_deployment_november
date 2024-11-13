from datetime import datetime, timezone
from firebase_admin import auth
import json
from config.data import CONTENT_LLM_NO_DB, CONTENT_LLM_PART_2, CONTENT_LLM_WITH_DB, MIN_TIME_BETWEEN_REQUESTS, SUBJECT_LLM_NO_DB, SUBJECT_LLM_PART_2, SUBJECT_LLM_WITH_DB
from func.collect_request_to_llm import reqest_to_llm
from func.media_to_storage import upload_files_to_storage
from fastapi import APIRouter, Header, Form, File, UploadFile, HTTPException
from typing import Optional
from typing import List

from func.save_to_fb_db import save_to_db
from func.send_email import send_email_to_user
from func.time_btw_requests import check_request_timestamp, set_request_timestamp
from func.token_counter import token_count_gemini

from func.calculate_average import calculate_and_save_average

router = APIRouter()


# Endpoint for uploading JSON data and files
@router.post("/upload_data/")
async def upload_data_and_files(
        authorization: str = Header(...),  # Get ID token from the Authorization header
        json_data: str = Form(...),  # Get JSON data as a string
        files: Optional[List[UploadFile]] = File(None)  # Optional files
):
    # Extract ID token from the Authorization header
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    # Decode the token to get the user's UID
    try:
        id_token = authorization.split(" ")[1]
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token.get("uid")
        email = decoded_token.get("email")
        # Get the user's registration time (auth_time) from the token
        registration_timestamp = decoded_token.get("auth_time", decoded_token.get("iat"))
        # Convert the registration time to a string in the format 'YYYY-MM-DD HH:MM:SS'
        registration_time_str = datetime.fromtimestamp(registration_timestamp, timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid or expired token: {str(e)}")

    try:
        data = json.loads(json_data)
        module_name = next(iter(data))
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON data format.")

    if check_request_timestamp(uid, module_name):
        raise HTTPException(status_code=400, detail=f"Too frequent request. Module updates occur every {MIN_TIME_BETWEEN_REQUESTS} minutes.")

    # Upload all files to Firebase Storage
    files_description, media_files, upload_media_count = upload_files_to_storage(files)
    for_analisys = str(data) + files_description
    # Check for maximum token limit compliance
    if not token_count_gemini(for_analisys):
        raise HTTPException(status_code=400,
                            detail=f"You have uploaded a file with a lot of information.")
    # Determine the logic, compose the request, and record the previous data based on the maximum token limit,
    # send to LLM, and get the response.
    llm_answer, with_param_from_db = reqest_to_llm(module_name, uid, for_analisys)
    name_module = list(data.keys())[0]
    params = data[name_module]["params"]
    params_text = f"Your data by module {name_module}: " + ", ".join(
        [f"{param}: {value}" for param, value in params.items()])
    if with_param_from_db:
        send_email_to_user(email,
                           SUBJECT_LLM_WITH_DB + module_name.upper() + SUBJECT_LLM_PART_2,
                           CONTENT_LLM_WITH_DB + '\n' + params_text + '\n\n' + llm_answer + '\n' + CONTENT_LLM_PART_2
                           )
    else:
        send_email_to_user(email,
                           SUBJECT_LLM_NO_DB + module_name.upper() + SUBJECT_LLM_PART_2,
                           CONTENT_LLM_NO_DB + '\n' + params_text + '\n\n' + llm_answer + '\n' + CONTENT_LLM_PART_2
                           )
                                 
    # Save the parameters to the database for the given uid and module_name
    save_to_db(uid, registration_time_str, email, data, module_name, media_files, llm_answer)
    # Calculate the average value for the given uid and module_name
    calculate_and_save_average(uid, module_name, data)
    # Create a record in Redis to prevent processing of repeated requests within the specified time frame
    set_request_timestamp(uid, module_name)
    # Return response to the front-end
    return {
        "status": "success",
        "uploaded_files_count": upload_media_count,  # Number of successfully uploaded files
    }

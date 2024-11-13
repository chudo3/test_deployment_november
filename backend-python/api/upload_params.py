from datetime import datetime, timezone
from firebase_admin import auth
import json
from fastapi import APIRouter, Header, Form, HTTPException

from func.save_to_fb_db import save_to_db
from func.calculate_average import calculate_and_save_average

router = APIRouter()


# Endpoint for uploading JSON data and files
@router.post("/upload_params/")
async def upload_data_and_files_no_llm(
        authorization: str = Header(...),  # Get ID token from the Authorization header
        json_data: str = Form(...),  # Get JSON data as a string
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
        registration_time_str = datetime.fromtimestamp(registration_timestamp, timezone.utc).strftime(
            '%Y-%m-%d %H:%M:%S')
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid or expired token: {str(e)}")

    try:
        data = json.loads(json_data)
        module_name = next(iter(data))
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON data format.")

    # Save data to the database
    save_to_db(uid, registration_time_str, email, data, module_name, "", "")

    # Calculate and save average
    calculate_and_save_average(uid, module_name, data)

    return {
        "status": "success"
    }

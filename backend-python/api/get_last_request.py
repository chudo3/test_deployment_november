from fastapi import APIRouter, Header, HTTPException, Query
from firebase_admin import auth
from func.calculate_average import get_user_requests
from config.data import MODULES

router = APIRouter()

@router.get("/latest/request")
async def get_latest_request(
        assessment: str = Query(...),  # Get assessment from query parameters
        authorization: str = Header(...)  # Get ID token from headers
):
    # Check the format of the authorization header
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")

    # Decode the token to get the user's UID
    try:
        id_token = authorization.split(" ")[1]
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token.get("uid")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid or expired token: {str(e)}")

    # Check that the assessment exists
    if assessment not in MODULES:
        return {"status": "error", "detail": "Module not found", "params": None}  # Return null

    try:
        # Get requests for the given assessment
        requests_data = get_user_requests(uid, assessment)

        # If there are no requests, return null
        if not requests_data:
            return {"status": "success", "params": None}

        # Get the latest request
        latest_request = requests_data[-1]  # Last element in the list

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving requests data: {str(e)}")

    # Extract params from latest_request
    params = latest_request.get("people_request", {}).get("params", {})

    # Return only params
    return {
        "status": "success",
        "params": params
    }

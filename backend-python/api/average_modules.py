from fastapi import APIRouter, Header, HTTPException
from firebase_admin import auth
from func.calculate_average import get_user_modules, calculate_averages_and_changes
from config.data import MODULES, PERIOD_FORMAT
import datetime

router = APIRouter()


# Endpoint returning average and change values for all user modules, along with total values
@router.get("/average_modules/")
async def get_average_modules(
        authorization: str = Header(...)  # Getting the ID token from the header
):
    # Check the authorization header format
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")

    # Decode the token to get the user's UID
    try:
        id_token = authorization.split(" ")[1]
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token.get("uid")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid or expired token: {str(e)}")

    current_month = datetime.datetime.now(datetime.timezone.utc).strftime(PERIOD_FORMAT)

    try:
        modules_data = get_user_modules(uid)
        module_averages_and_changes = {}
        module_changes = calculate_averages_and_changes(uid, mode='change')

        for module_name in MODULES:
            is_exist = module_name in modules_data

            if is_exist:
                module_info = modules_data[module_name]
                # Search avg
                if 'subcollections' in module_info and 'average' in module_info['subcollections']:
                    month_data = module_info['subcollections']['average'].get(current_month)
                    if month_data:
                        average = month_data.get('average', 0)
                    else:
                        average = 0
                else:
                    average = 0
            else:
                average = 0

            # Get the change for the module (if available)
            change = module_changes.get(module_name, 0)  # Get change, or 0 if not found

            # Add the average, change, and is_exist info to the dictionary
            module_averages_and_changes[module_name] = {
                'is_exist': is_exist,  # Add key is_exist
                'average': round(average, 0),  # Keep two decimal places for accuracy
                'change': round(change, 0)  # Round change to two decimal places
            }

        # Calculate total average and change across all modules
        total_metrics = calculate_averages_and_changes(uid, mode='total')

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving modules data: {str(e)}")

    # Return average and change for each module, along with total values
    return {
        "status": "success",
        "module_averages_and_changes": module_averages_and_changes,
        "total_metrics": total_metrics  # Include total average and change
    }

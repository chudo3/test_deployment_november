from datetime import datetime, timezone
from fastapi import APIRouter, Header, HTTPException
from fastapi.responses import JSONResponse
from firebase_admin import auth
from config.data import CONTENT_WELCOME, SUBJECT_WELCOME
from func.notification import schedule_email
from func.send_email import send_email_to_user

router = APIRouter()

# Endpoint for user registration
@router.post('/register')
def register(authorization: str = Header(None)):
    if authorization is None or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail='Authorization token required')

    id_token = authorization.split(' ')[1]
    try:
        # Verify and decode the ID token
        decoded_token = auth.verify_id_token(id_token)
        email = decoded_token.get('email')
        uid = decoded_token.get("uid")
        registration_timestamp = decoded_token.get("auth_time", decoded_token.get("iat"))
        reg_date_time = datetime.fromtimestamp(registration_timestamp, timezone.utc)

        if not email:
            raise HTTPException(status_code=400, detail='Email not found in token')

        # Send welcome email
        send_email_to_user(email, SUBJECT_WELCOME, CONTENT_WELCOME)

        # Schedule email
        schedule_email(email, reg_date_time, uid)

        return JSONResponse(status_code=200, content={'message': 'Email sent successfully'})
    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail='Invalid ID token')
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Server error: {e}')

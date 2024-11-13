from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
from firebase_admin import credentials, firestore
import firebase_admin
from func.notification import remove_email_job

from config.data import SERVICE_ACCOUNT_PATH

router = APIRouter()

if not firebase_admin._apps:
    cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
    firebase_admin.initialize_app(cred)
db = firestore.client()

@router.get("/unsubscribe/{uid}")
async def unsubscribe(uid: str):
    try:
        user_ref = db.collection("users").document(uid)
        user_data = user_ref.get().to_dict()
        if user_data and user_data.get("is_subscribed", True):
            user_ref.update({"is_subscribed": False})
            remove_email_job(user_data.get("email"))
        
        return RedirectResponse(url="https://happyverse.ai/unsubscribe")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

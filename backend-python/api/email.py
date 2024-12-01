from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone
from firebase_admin import firestore
from pydantic import ValidationError

from api.pydantic_classes import EmailModel

router = APIRouter()
db = firestore.client()


@router.post('/email')
def email_to_db(email_data: dict):
    try:
        email_data = EmailModel(**email_data)
        email = email_data.email
        email_ref = db.collection("emails").document(email)


        if email_ref.get().exists:
            raise HTTPException(status_code=400, detail="Email already exists")


        email_ref.set({
            "dateAdded": datetime.now(timezone.utc).isoformat()
        })

        return {"status": "success", "message": "Email registered successfully"}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=f"Invalid input: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Server error: {e}')

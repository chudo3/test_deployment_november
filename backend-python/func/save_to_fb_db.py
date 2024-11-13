from fastapi import HTTPException
import firebase_admin
from firebase_admin import credentials, firestore
from pydantic import ValidationError
from api.pydantic_classes import PeopleRequest, UserModule, UserModules, WriteUserModule
from config.data import SERVICE_ACCOUNT_PATH


# Initialize Firebase Admin SDK with your Service Account Key
if not firebase_admin._apps:
    cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
    firebase_admin.initialize_app(cred)
db = firestore.client()


# Function to get the next ID for a module
def get_next_id(uid: str, module: str):
    """Get and increment the next ID for a given module."""
    doc_ref = db.collection("users").document(uid).collection("modules").document(module)
    counter_ref = doc_ref.collection("metadata").document("counter")

    @firestore.transactional
    def transaction_counter(transaction):
        snapshot = counter_ref.get(transaction=transaction)
        if snapshot.exists:
            counter = snapshot.get("count") + 1
        else:
            counter = 1
        transaction.set(counter_ref, {"count": counter})
        return counter

    transaction = db.transaction()  # Create a transaction
    new_id = transaction_counter(transaction)  # Pass transaction as an argument
    return new_id

def store_request(uid: str, module: str, request_data: UserModule,  reg_data_time: str, email: str):
    """Store the request in the specified module for the user."""
    try:
        # Check module name
        if module not in UserModules.model_fields:
            raise ValueError(f"Invalid module name: {module}")

        # Get Firestore references
        user_doc_ref = db.collection("users").document(uid)
        module_collection_ref = user_doc_ref.collection("modules").document(module).collection("requests")

        # Check if the user document exists
        if not user_doc_ref.get().exists:
            # Create the user document with reg_data_time and email
            user_doc_ref.set({
                "is_subscribed": True,
                "reg_data_time": reg_data_time,
                "email": email
            })
            print(f"User document '{uid}' created with reg_data_time and email.")

        # Save the request
        module_collection_ref.document(str(request_data.id)).set(request_data.model_dump())
        print(f"Request {request_data.id} successfully saved in module '{module}' for user '{uid}'.")

    except ValidationError as e:
        print("Validation error:", e)
    except Exception as e:
        print("An error occurred while saving the request:", e)


def save_to_db(uid, registration_time_str, email, data, module_name, media_files, llm_answer):
    try:
        # Check if the module exists in UserModules
        if module_name not in UserModules.model_fields:
            raise HTTPException(status_code=400, detail=f"Module '{module_name}' not found in UserModules")

        request_id = get_next_id(uid, module_name)

        new_request = WriteUserModule(
            id=request_id,  # Generate ID programmatically
            people_request=PeopleRequest(
                params=data[module_name]["params"],  
                media=media_files if media_files else None
            ),
            llm_answer=llm_answer
        )

        # Save the request to Firestore
        store_request(uid, module_name, new_request, registration_time_str, email)

    except ValidationError as e:
        raise HTTPException(status_code=400, detail=f"Validation error: {e}")


def get_users_notification_info():
    try:
        users_ref = db.collection("users")
        users = users_ref.stream()

        users_info = []
        for user in users:
            user_data = user.to_dict()
            email = user_data.get("email")
            registration_date = user_data.get("reg_data_time")
            is_subscribed = user_data.get("is_subscribed", True)
            users_info.append({
                "uid": user.id,
                "email": email,
                "registration_date": registration_date,
                "is_subscribed": is_subscribed
            })

        return users_info
    except Exception as e:
        print(f"Error retrieving user information: {e}")
        return []

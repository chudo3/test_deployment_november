import firebase_admin
from firebase_admin import credentials, firestore
from ai_model.gemini_pro import analyze_self_assessment
from api.pydantic_classes import UserModules
from config.data import ADD_BF_TEXT, ADD_MID_TEXT, LLM_ROLE_NO_DB, LLM_ROLE_WITH_DB, NUM_FOR_START_SUMM_OLD_REQUESTS, RESEND_DATA_LIMIT, SERVICE_ACCOUNT_PATH
from func.token_counter import token_count_gemini

# Initialize Firebase Admin SDK with your Service Account Key
if not firebase_admin._apps:
    cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
    firebase_admin.initialize_app(cred)
db = firestore.client()

def reqest_to_llm(module_name, uid, for_analisys):
    old_requests = ""
    
    try:
        if module_name not in UserModules.model_fields:
            raise ValueError(f"Invalid module name: {module_name}")

        # Reference to the requests collection in the specified module for the user
        user_doc_ref = db.collection("users").document(uid)
        module_collection_ref = user_doc_ref.collection("modules").document(module_name).collection("requests")
        request_count = module_collection_ref.stream()

        # Get the latest requests (ordered by descending time) with a limit of RESEND_DATA_LIMIT
        requests = module_collection_ref.order_by("time", direction=firestore.Query.DESCENDING).limit(RESEND_DATA_LIMIT).stream()
        count = 0
        if len(list(request_count)) < NUM_FOR_START_SUMM_OLD_REQUESTS:
            llm_answer = analyze_self_assessment(prompt=for_analisys,
                                                 role=LLM_ROLE_NO_DB
                                                 )
            return llm_answer, False    # False = if just last user request
        else:
            # Iterate through each request from latest to oldest
            for request in requests:
                request_data = request.to_dict()
                request_time = request_data.get("time", "")
                params = request_data.get("people_request", {}).get("params", {})
                media = request_data.get("people_request", {}).get("media", {})
                request_date = f"{request_time}\n{params}\n"

                if media:
                    for media_info in media.items():
                        if isinstance(media_info[1], dict):
                            description = media_info[1].get("description", "")
                            request_date += description

                if token_count_gemini(f"{ADD_BF_TEXT}\n{old_requests}\n{request_date}\n{ADD_MID_TEXT}\n{for_analisys}"):
                    count += 1
                    old_requests += request_date
                else:
                    print("break count = ", count)
                    break
            llm_answer = analyze_self_assessment(prompt=f"{ADD_BF_TEXT}\n{old_requests}\n{ADD_MID_TEXT}\n{for_analisys}",
                                                 role=LLM_ROLE_WITH_DB
                                                 )
            return llm_answer, True     # True = if upload data from firebase db
    except Exception as e:
        print(f"An error occurred: {e}")
    
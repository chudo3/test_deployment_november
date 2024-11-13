import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin.exceptions import FirebaseError
from config.data import SERVICE_ACCOUNT_PATH
from datetime import datetime, timezone
from dateutil.relativedelta import relativedelta
from typing import List, Dict

from config.data import PERIOD_FORMAT

# Firebase Admin SDK
if not firebase_admin._apps:
    cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
    firebase_admin.initialize_app(cred)
db = firestore.client()


# Function to calculate and save the average values of module parameters.
def calculate_and_save_average(uid, module_name, json_data):
    try:
        # Extract parameters for the given module from the provided JSON data.
        params = json_data.get(module_name, {}).get('params', {})

        # If no parameters are found, raise a ValueError.
        if not params:
            raise ValueError("No parameters found for the module.")

        # Get the current date and time in UTC.
        now = datetime.now(timezone.utc)
        # Format the current month as a string using the defined format.
        current_month = now.strftime(PERIOD_FORMAT)

        # Reference to the specific module for the user in Firestore.
        module_ref = db.collection("users").document(uid).collection("modules").document(module_name)
        # Update or create the 'last_request' field with the current date and time.
        module_ref.set({'last_request': now.strftime("%Y-%m-%d %H:%M:%S")}, merge=True)

        # Reference to the document that tracks the average for the current month.
        month_ref = db.collection("users").document(uid).collection("modules").document(module_name).collection("average").document(current_month)

        # Retrieve the document for the current month.
        month_doc = month_ref.get()
        # Sum all parameter values and count the number of parameters.
        param_sum = sum(params.values())
        param_count = len(params)

        # If the document exists, update the sum and request count.
        if month_doc.exists:
            month_data = month_doc.to_dict()
            new_sum = month_data.get('sum', 0) + param_sum
            new_request_count = month_data.get('count', 0) + 1
        # If the document does not exist, initialize the sum and request count.
        else:
            new_sum = param_sum
            new_request_count = 1

        # Calculate the new average based on the sum and number of requests.
        new_average = (new_sum / new_request_count) / param_count

        # Update or create the document with the new sum, count, and average.
        month_ref.set({
            'sum': round(new_sum, 2),
            'count': new_request_count,
            'average': round(new_average, 2)
        }, merge=True)

        print(f"Average for module {module_name} updated successfully.")
        return True

    # Handle Firebase errors and ValueErrors, and return False in case of failure.
    except (FirebaseError, ValueError) as e:
        print(f"Error: {str(e)}")
        return False
    except Exception as e:
        raise Exception(f"An error occurred while calculating average values: {str(e)}")


# Function to calculate the total average and change in module averages.
def calculate_averages_and_changes(uid, mode='total'):
    try:
        # Get the current date and time in UTC.
        now = datetime.now(timezone.utc)
        # Get the time one hour before the current time.
        previous_month = now - relativedelta(months=1)
        # Format the current and previous months as strings.
        current_month = now.strftime(PERIOD_FORMAT)
        previous_month_str = previous_month.strftime(PERIOD_FORMAT)

        # Retrieve all user modules.
        modules = get_user_modules(uid)
        total_current_average = 0
        total_previous_average = 0
        module_changes = {}
        module_count = 0
        total_average_temp = 0
        module_count_temp = 0

        # Loop through each module.
        for module_name in modules.keys():
            try:
                # Get the current and previous month's average documents for the module.
                current_ref = db.collection(f'users/{uid}/modules/{module_name}/average').document(current_month).get()
                previous_ref = db.collection(f'users/{uid}/modules/{module_name}/average').document(previous_month_str).get()

                # If both current and previous documents exist, calculate the change.
                if current_ref.exists and previous_ref.exists:
                    current_data = current_ref.to_dict()
                    previous_data = previous_ref.to_dict()

                    current_average = current_data.get('average', 0)
                    previous_average = previous_data.get('average', 0)

                    total_current_average += current_average
                    total_previous_average += previous_average
                    module_count += 1

                    # If mode is 'change', calculate the percentage change between current and previous averages.
                    if mode == 'change':
                        change = ((current_average - previous_average) / previous_average) * 100 if previous_average != 0 else 0
                        module_changes[module_name] = change

                # If only the current document exists, include it in the total calculation.
                if current_ref.exists and not previous_ref.exists:
                    current_data = current_ref.to_dict()
                    current_average = current_data.get('average', 0)
                    total_average_temp += current_average
                    module_count_temp += 1

            except FirebaseError:
                continue

        # If mode is 'total', calculate the total average and change across all modules.
        if mode == 'total':
            total_average = (total_current_average + total_average_temp) / (module_count + module_count_temp) if (module_count + module_count_temp) > 0 else 0
            total_change = ((total_current_average - total_previous_average) / total_previous_average) * 100 if total_previous_average != 0 else 0
            return {'total_average': round(total_average, 0), 'total_change': round(total_change, 0)}
        # Otherwise, return the changes for each module.
        else:
            return module_changes

    # Handle Firebase errors and raise an exception if needed.
    except FirebaseError as e:
        raise Exception(f"Error calculating averages: {str(e)}")
    except Exception as e:
        raise Exception(f"An error occurred while calculating averages: {str(e)}")


# Function to retrieve all modules for a user.
def get_user_modules(uid: str):
    try:
        # Reference to the user's modules collection.
        user_ref = db.collection('users').document(uid).collection('modules')

        modules = {}

        # Iterate over all module documents.
        for module in user_ref.stream():
            module_data = module.to_dict()

            # Initialize a subcollections dictionary for the module.
            module_data['subcollections'] = {}

            # Retrieve all subcollections for the module.
            subcollections = db.collection('users').document(uid).collection('modules').document(module.id).collections()

            # Iterate over each subcollection and store the data.
            for subcollection in subcollections:
                subcollection_name = subcollection.id

                subcollection_data = {doc.id: doc.to_dict() for doc in subcollection.stream()}
                module_data['subcollections'][subcollection_name] = subcollection_data

            modules[module.id] = module_data

        # Return the modules with their subcollections.
        return modules

    # Handle Firebase errors and other exceptions.
    except FirebaseError as e:
        raise Exception(f"Error accessing Firestore: {str(e)}")
    except Exception as e:
        raise Exception(f"An error occurred while retrieving modules: {str(e)}")


def get_user_requests(uid: str, module_name: str) -> List[Dict]:
    try:
        requests_ref = db.collection('users').document(uid).collection('modules').document(module_name).collection('requests')

        requests = requests_ref.get()

        requests_data = []
        for request in requests:
            request_data = request.to_dict()
            requests_data.append(request_data)

        requests_data.sort(key=lambda r: int(r.get('id', 0)))

        return requests_data

    except Exception as e:
        print(f"Error retrieving requests for user {uid} and module {module_name}: {str(e)}")
        return []

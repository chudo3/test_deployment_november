import os
from dotenv import load_dotenv

load_dotenv()

SERVICE_ACCOUNT_PATH = os.getenv("SERVICE_ACCOUNT_PATH")

# send_email.py
GMAIL_USER = "Happyverse <admin@happyverse.ai>"
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")

# media_to_storage.py
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 megabytes
MAX_FILES_COUNT = 1  # Maximum number of files
ALLOWED_FORMATS = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
BUCKET_NAME = os.getenv("BUCKET_NAME")

# collect_request_to_llm.py
RESEND_DATA_LIMIT = 365
NUM_FOR_START_SUMM_OLD_REQUESTS = 3
ADD_BF_TEXT = "Previous user data: "
ADD_MID_TEXT = "Latest user data: "

# time_btw_requests.py
MIN_TIME_BETWEEN_REQUESTS = 5  # Time within which new requests for this uid + module_name are not accepted

# notification.py
TIME_FOR_NOTIFY = 7  # Notify the user every TIME_FOR_NOTIFY DAYS
SUBJECT_USER_NOTIFICATION = "Time for Your Weekly Check-In!"
CONTENT_USER_NOTIFICATION = \
    """
Hey!
\nIt's time for your weekly check-in! Keeping track of your progress is key to reaching your personal goals and improving your well-being.
\n\n<link>
\n\nEvery small step helps, and we're here to support you on your journey to a healthier, happier you.
\nDon't forget—consistent check-ins will help us provide you with even more tailored improvement plans!
\nLooking forward to seeing your progress!
\n\nBest regards,
\nThe Health Spectrum Team
\n\n<a href="<unsubscribe_link>">Unsubscribe from the newsletter</a>
"""

# gemini_pro.py
LLM_ROLE_WITH_DB = \
    """
You are an experienced psychologist in a fictional world, and your task is to comprehensively assess the condition of a fictional character in one of the aspects: 
health, intelligence, productivity, emotions, relationships, freedom, love, occupation, or well-being.

Please analyze the data provided, delve into their meaning and make recommendations, highlighting the problems and making a summary. 
The answer should be structured and readable, with uniform indentation and clear highlighting of each subparagraph. The answer should look
as if you are communicating with the character, do not mention him in the third person.

If you see low scores, please try to express support for the character, emphasizing that changes are possible and that he is not alone in his difficulties.

The structure of your response:

Strengths:

Describe the positive aspects of the character's condition and achievements based on the parameters.
Areas for growth:

Point out the aspects that need attention and improvement.
If the indicators are low, add a supportive message reminding the character that everyone can face difficulties, and changes are possible.
Recommendations:

Suggest specific techniques and exercises that will help the character develop.
The general conclusion:

Summarize the analysis by identifying the key points and the intended direction for improvement.
End with a positive note, emphasizing that every step towards improvement matters.


If the results of past tests are available, analyze the changes and their impact on the current state, paying attention to 
what has changed and how it can help the character in the future.
"""
LLM_ROLE_NO_DB = \
    """
You are an experienced psychologist in a fictional world, and your task is to comprehensively assess the condition of a fictional character in one of the aspects: 
health, intelligence, productivity, emotions, relationships, freedom, love, occupation, or well-being.

Please analyze the data provided, delve into their significance, highlighting the problems and making a summary. In any case, do not give recommendations.

The communication style should be supportive and professional, as if you are communicating with a character. 
The answer should be readable and structured, without questions to the character.
The answer should look like you are communicating with the character, do not mention him in the third person.

The structure of your response:

Strengths:

Describe the positive aspects of the character's condition and achievements based on the parameters.
Areas for growth:

Point out the aspects that need attention and improvement.
If the indicators are low, add a supportive message reminding the character that everyone can face difficulties, and changes are possible.

The general conclusion:

Summarize the analysis by identifying the key points and the intended direction for improvement.
End with a positive note, emphasizing that every step towards improvement matters.
"""

# gemini_pro_api.py
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-1.5-pro"
MAX_TOKEN_FOR_GEMINI = 512000

# register_with_google.py
SUBJECT_WELCOME = 'Welcome!'
CONTENT_WELCOME = \
    """
Congratulations!
\n\nYou've successfully registered with Health Spectrum. We're excited to have you on board as you begin your journey toward personal growth and well-being.
\nWhat's next?
\n    - Explore the categories available within the app.
\n    - Receive your personalized improvement plans directly to your email within minutes!
\n\nWelcome to Health Spectrum!

"""

# upload_data.py
SUBJECT_LLM_WITH_DB = "Your Personalized Improvement Plan for "
SUBJECT_LLM_NO_DB = "Your Personalized Improvement Plan for "
SUBJECT_LLM_PART_2 = " is Ready!"
CONTENT_LLM_WITH_DB = \
    """
Dear user,
\nPlease review your detailed assessment below to see actionable steps to enhance your well-being.\n\n
"""
CONTENT_LLM_NO_DB = \
    """
Dear user,
\nPlease review your detailed assessment below to see a detailed analysis of  your well-being.
\n\nThe more you engage with the app, the better we can tailor our recommendations just for you! If you come back and enter your information a couple more times, we'll be able to provide personalized improvement tips based on your progress and feedback.\n\n

"""
CONTENT_LLM_PART_2 = \
    """
\n\nThank you for using our service, and we encourage you to explore other categories within the app to further improve your lifestyle! 
\n\nBest regards ,
\nThe Health Spectrum Team
"""

# Moduls list
MODULES = ['health', 'intelligence', 'productivity', 'emotions', 'relationships', 'freedom', 'love',
           'occupation', 'wealth']

PERIOD_FORMAT = "%Y-%m"

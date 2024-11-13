import google.generativeai as genai
from fastapi import HTTPException
from config.data import LLM_ROLE_WITH_DB, GEMINI_API_KEY, GEMINI_MODEL


safe = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
]

def analyze_self_assessment(prompt: str, role: str = LLM_ROLE_WITH_DB):
    try:
        full_prompt = f"{role}\n{prompt}"
        model = genai.GenerativeModel(model_name=GEMINI_MODEL)

        # Get response
        response = model.generate_content(full_prompt, safety_settings=safe)

        return response.text.strip()

    except AttributeError as e:
        raise HTTPException(status_code=500, detail=f"AttributeError: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

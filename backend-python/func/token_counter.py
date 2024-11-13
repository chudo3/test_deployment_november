from config.data import MAX_TOKEN_FOR_GEMINI, GEMINI_MODEL
from vertexai.preview import tokenization


# Count token for Gemini
def token_count_gemini(text: str, model: str = GEMINI_MODEL) -> bool:
    tokenizer = tokenization.get_tokenizer_for_model(model)
    token_count = tokenizer.count_tokens(text).total_tokens
    if token_count > MAX_TOKEN_FOR_GEMINI:
        return False
    else:
        return True

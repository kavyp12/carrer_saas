import os
import logging
import google.generativeai as genai
from functools import lru_cache

# API configuration parameters
MAX_RETRIES = 3
RETRY_DELAY = 1.5  # Seconds between retries
API_TIMEOUT = 30   # Seconds
RATE_LIMIT_DELAY = 2  # Seconds between requests

def setup_gemini_api():
    """Configure Gemini API with validation."""
    try:
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("Missing GEMINI_API_KEY in environment variables")

        genai.configure(api_key=api_key)
        logging.info("Gemini API configured successfully")
    except Exception as e:
        logging.error(f"API configuration failed: {str(e)}")
        raise

@lru_cache(maxsize=512)
def generate_content(prompt, max_tokens=2048, temperature=0.7):
    """Generic content generation function with retries."""
    for attempt in range(MAX_RETRIES):
        try:
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(
                prompt,
                generation_config={
                    'temperature': temperature,
                    'max_output_tokens': max_tokens,
                    'top_p': 0.9
                },
                request_options={'timeout': API_TIMEOUT}
            )
            return response.text if response.text else None
        except Exception as e:
            logging.warning(f"API Error (attempt {attempt+1}): {str(e)}")
            if attempt == MAX_RETRIES - 1:
                raise
    return None
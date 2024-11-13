# HappyVerse API

## Project Description

HappyVerse API is a web application developed using FastAPI that provides various functions for processing user data, including calculating average parameter values, uploading data and files, and interacting with machine learning models for data analysis.

## Project Structure

### Folders and Files

- **api/**: Contains API routes such as `average_modules.py`, `upload_data.py`, `register_with_google.py`, and others. These files define API endpoints and their logic.
  - `average_modules.py`: Handles requests for obtaining average user module values. Uses the `get_user_modules` function to retrieve data from Firestore.
  - `upload_data.py`: Handles data and file uploads, calculates averages, and sends results to the user. Interacts with functions for file uploads, token counting, and sending data to LLM.
  - `register_with_google.py`: Handles user registration and sending welcome emails. Uses Firebase for token verification and sends emails using `send_email_to_user`.

- **config/**: Contains configuration files and variables.
  - `data.py`: Defines various configuration parameters such as service account paths, notification settings, and LLM parameters.

- **func/**: Contains helper functions used in the project.
  - `calculate_average.py`: Functions for calculating and saving average parameter values. Interacts with Firestore to retrieve and update data.
  - `media_to_storage.py`: Functions for uploading files to cloud storage. Uses Google Cloud Storage to save files and extract text from them.
  - `send_email.py`: Functions for sending emails to users. Converts content to HTML using `markdown2` and sends via SMTP.
  - `collect_request_to_llm.py`: Forms requests to the LLM model using data from Firestore. Counts tokens and sends requests to the Gemini model.
  - `token_counter.py`: Counts the number of tokens in the text for the Gemini model to ensure they do not exceed the limit.
  - `save_to_fb_db.py`: Saves data to Firestore, including information about users and their requests.

- **ai_model/**: Contains files related to machine learning models.
  - `gemini_pro.py`: Defines functions for data analysis using the Gemini model. Configures API key and security parameters for content generation.

- **requirements.txt**: List of Python dependencies required for the project.

- **main.py**: The main application file that initializes FastAPI and connects routes. Configures CORS and provides a Swagger user interface.

## Installation and Setup

### Requirements

- Python 3.12 or higher
- Redis
- Installed and configured Firebase

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/happyverse/backend.git
   cd backend
   ```

2. **Create a session and virtual environment**

   ```bash
   screen -S backend
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Setup Redis**

   Install Redis on your Ubuntu server:

   ```bash
   sudo apt update
   sudo apt install redis-server
   ```

   Ensure Redis is running:

   ```bash
   sudo systemctl start redis
   sudo systemctl enable redis
   ```

## Running the Application

1. **Start the FastAPI application**

   Ensure you are in the screen session and virtual environment:

   ```bash
   screen -ls 

   # If not connected to the session
   screen -r backend

   source venv/bin/activate
   ```

   Start the application using Uvicorn:

   ```bash
   uvicorn main:app --host 127.0.0.1 --port 8000
   ```

2. **Access the API documentation**

   Open a browser and go to `https://api.happyverse.ai/docs` to access the Swagger UI and test the API.

## Conclusion

HappyVerse API provides powerful tools for processing and analyzing user data. By following the installation and setup instructions, you can deploy the application on an Ubuntu server and fully utilize its capabilities.
from contextlib import asynccontextmanager
import os
import uvicorn
from fastapi import FastAPI
from fastapi.openapi.docs import get_swagger_ui_html
from starlette.middleware.cors import CORSMiddleware
from api.upload_data import router as data_upload
from api.get_last_request import router as get_last_request
from api.unsubscribe import router as unsubscribe_router
from api.register_with_google import router as register
from api.average_modules import router as get_average_modules
from api.upload_params import router as upload_params
from api.email import router as email
from func.notification import start_notify_after_restart, start_scheduler
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the path to the folder where the main.py file is located
current_file_path = os.path.abspath(__file__)
current_dir = os.path.dirname(current_file_path)
# Set the current directory as the working directory
os.chdir(current_dir)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Actions on startup
    start_scheduler()
    start_notify_after_restart()
    yield

app = FastAPI(
    title="Happyverse API",
    version="1.0.0",
    license_info={
        "name": "Proprietary License",
    },
    lifespan=lifespan
)

app.include_router(register)
app.include_router(data_upload)
app.include_router(get_average_modules)
app.include_router(upload_params)
app.include_router(unsubscribe_router)
app.include_router(get_last_request)
app.include_router(email)


# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url="/openapi.json",
        title="Custom Swagger UI",
        swagger_js_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js",
        swagger_css_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css",
        swagger_favicon_url="https://fastapi.tiangolo.com/img/favicon.png"
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

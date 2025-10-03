from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
from bson import ObjectId


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="D.S.P.Film's Photography API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    if isinstance(doc, dict):
        if "_id" in doc:
            doc["_id"] = str(doc["_id"])
        return {k: serialize_doc(v) for k, v in doc.items()}
    return doc

# Pydantic Models
class SiteContent(BaseModel):
    section: str
    key: str
    value: str
    type: str = "text"  # text, html, image_url, number
    
class SiteContentCreate(BaseModel):
    section: str
    key: str
    value: str
    type: str = "text"

class Service(BaseModel):
    title: str
    description: str
    features: List[str]
    image: str
    icon: str
    color: str
    order: int = 0
    isActive: bool = True

class ServiceCreate(BaseModel):
    title: str
    description: str
    features: List[str]
    image: str
    icon: str
    color: str
    order: int = 0
    isActive: bool = True

class Portfolio(BaseModel):
    title: str
    category: str
    image: str
    description: str = ""
    order: int = 0
    isActive: bool = True

class PortfolioCreate(BaseModel):
    title: str
    category: str
    image: str
    description: str = ""
    order: int = 0
    isActive: bool = True

class Package(BaseModel):
    name: str
    price: str
    duration: str
    category: str
    features: List[str]
    popular: bool = False
    color: str
    order: int = 0
    isActive: bool = True

class PackageCreate(BaseModel):
    name: str
    price: str
    duration: str
    category: str
    features: List[str]
    popular: bool = False
    color: str
    order: int = 0
    isActive: bool = True

class Testimonial(BaseModel):
    name: str
    event: str
    rating: int = 5
    text: str
    image: str
    location: str
    order: int = 0
    isActive: bool = True

class TestimonialCreate(BaseModel):
    name: str
    event: str
    rating: int = 5
    text: str
    image: str
    location: str
    order: int = 0
    isActive: bool = True

class Inquiry(BaseModel):
    name: str
    email: str
    phone: str = ""
    eventType: str
    eventDate: Optional[str] = None
    message: str = ""
    status: str = "new"  # new, responded, booked, closed

class InquiryCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    eventType: str
    eventDate: Optional[str] = None
    message: str = ""

# Basic route
@api_router.get("/")
async def root():
    return {"message": "D.S.P.Film's Photography API", "version": "1.0.0"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

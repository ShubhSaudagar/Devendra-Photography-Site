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

# Content Management APIs
@api_router.get("/content")
async def get_all_content():
    try:
        content = await db.site_content.find().to_list(1000)
        return serialize_doc(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/content/{section}")
async def get_content_by_section(section: str):
    try:
        content = await db.site_content.find({"section": section}).to_list(1000)
        return serialize_doc(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/content")
async def create_content(content: SiteContentCreate):
    try:
        content_dict = content.dict()
        content_dict["createdAt"] = datetime.utcnow()
        content_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.site_content.insert_one(content_dict)
        created_content = await db.site_content.find_one({"_id": result.inserted_id})
        return serialize_doc(created_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/content/{content_id}")
async def update_content(content_id: str, content: SiteContentCreate):
    try:
        content_dict = content.dict()
        content_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.site_content.update_one(
            {"_id": ObjectId(content_id)}, 
            {"$set": content_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Content not found")
            
        updated_content = await db.site_content.find_one({"_id": ObjectId(content_id)})
        return serialize_doc(updated_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Services APIs
@api_router.get("/services")
async def get_services():
    try:
        services = await db.services.find({"isActive": True}).sort("order", 1).to_list(1000)
        return serialize_doc(services)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/services")
async def create_service(service: ServiceCreate):
    try:
        service_dict = service.dict()
        service_dict["createdAt"] = datetime.utcnow()
        service_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.services.insert_one(service_dict)
        created_service = await db.services.find_one({"_id": result.inserted_id})
        return serialize_doc(created_service)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/services/{service_id}")
async def update_service(service_id: str, service: ServiceCreate):
    try:
        service_dict = service.dict()
        service_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.services.update_one(
            {"_id": ObjectId(service_id)}, 
            {"$set": service_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Service not found")
            
        updated_service = await db.services.find_one({"_id": ObjectId(service_id)})
        return serialize_doc(updated_service)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/services/{service_id}")
async def delete_service(service_id: str):
    try:
        result = await db.services.update_one(
            {"_id": ObjectId(service_id)}, 
            {"$set": {"isActive": False, "updatedAt": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Service not found")
            
        return {"message": "Service deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Portfolio APIs
@api_router.get("/portfolio")
async def get_portfolio():
    try:
        portfolio = await db.portfolio.find({"isActive": True}).sort("order", 1).to_list(1000)
        return serialize_doc(portfolio)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/portfolio/{category}")
async def get_portfolio_by_category(category: str):
    try:
        portfolio = await db.portfolio.find({"category": category, "isActive": True}).sort("order", 1).to_list(1000)
        return serialize_doc(portfolio)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/portfolio")
async def create_portfolio_item(portfolio: PortfolioCreate):
    try:
        portfolio_dict = portfolio.dict()
        portfolio_dict["createdAt"] = datetime.utcnow()
        portfolio_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.portfolio.insert_one(portfolio_dict)
        created_portfolio = await db.portfolio.find_one({"_id": result.inserted_id})
        return serialize_doc(created_portfolio)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/portfolio/{portfolio_id}")
async def update_portfolio_item(portfolio_id: str, portfolio: PortfolioCreate):
    try:
        portfolio_dict = portfolio.dict()
        portfolio_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.portfolio.update_one(
            {"_id": ObjectId(portfolio_id)}, 
            {"$set": portfolio_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Portfolio item not found")
            
        updated_portfolio = await db.portfolio.find_one({"_id": ObjectId(portfolio_id)})
        return serialize_doc(updated_portfolio)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/portfolio/{portfolio_id}")
async def delete_portfolio_item(portfolio_id: str):
    try:
        result = await db.portfolio.update_one(
            {"_id": ObjectId(portfolio_id)}, 
            {"$set": {"isActive": False, "updatedAt": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Portfolio item not found")
            
        return {"message": "Portfolio item deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Packages APIs
@api_router.get("/packages")
async def get_packages():
    try:
        packages = await db.packages.find({"isActive": True}).sort("order", 1).to_list(1000)
        return serialize_doc(packages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/packages/{category}")
async def get_packages_by_category(category: str):
    try:
        packages = await db.packages.find({"category": category, "isActive": True}).sort("order", 1).to_list(1000)
        return serialize_doc(packages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/packages")
async def create_package(package: PackageCreate):
    try:
        package_dict = package.dict()
        package_dict["createdAt"] = datetime.utcnow()
        package_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.packages.insert_one(package_dict)
        created_package = await db.packages.find_one({"_id": result.inserted_id})
        return serialize_doc(created_package)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/packages/{package_id}")
async def update_package(package_id: str, package: PackageCreate):
    try:
        package_dict = package.dict()
        package_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.packages.update_one(
            {"_id": ObjectId(package_id)}, 
            {"$set": package_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Package not found")
            
        updated_package = await db.packages.find_one({"_id": ObjectId(package_id)})
        return serialize_doc(updated_package)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/packages/{package_id}")
async def delete_package(package_id: str):
    try:
        result = await db.packages.update_one(
            {"_id": ObjectId(package_id)}, 
            {"$set": {"isActive": False, "updatedAt": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Package not found")
            
        return {"message": "Package deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Testimonials APIs
@api_router.get("/testimonials")
async def get_testimonials():
    try:
        testimonials = await db.testimonials.find({"isActive": True}).sort("order", 1).to_list(1000)
        return serialize_doc(testimonials)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/testimonials")
async def create_testimonial(testimonial: TestimonialCreate):
    try:
        testimonial_dict = testimonial.dict()
        testimonial_dict["createdAt"] = datetime.utcnow()
        testimonial_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.testimonials.insert_one(testimonial_dict)
        created_testimonial = await db.testimonials.find_one({"_id": result.inserted_id})
        return serialize_doc(created_testimonial)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/testimonials/{testimonial_id}")
async def update_testimonial(testimonial_id: str, testimonial: TestimonialCreate):
    try:
        testimonial_dict = testimonial.dict()
        testimonial_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.testimonials.update_one(
            {"_id": ObjectId(testimonial_id)}, 
            {"$set": testimonial_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
            
        updated_testimonial = await db.testimonials.find_one({"_id": ObjectId(testimonial_id)})
        return serialize_doc(updated_testimonial)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str):
    try:
        result = await db.testimonials.update_one(
            {"_id": ObjectId(testimonial_id)}, 
            {"$set": {"isActive": False, "updatedAt": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
            
        return {"message": "Testimonial deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Inquiries APIs
@api_router.get("/inquiries")
async def get_inquiries():
    try:
        inquiries = await db.inquiries.find().sort("createdAt", -1).to_list(1000)
        return serialize_doc(inquiries)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/inquiries")
async def create_inquiry(inquiry: InquiryCreate):
    try:
        inquiry_dict = inquiry.dict()
        inquiry_dict["status"] = "new"
        inquiry_dict["createdAt"] = datetime.utcnow()
        inquiry_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.inquiries.insert_one(inquiry_dict)
        created_inquiry = await db.inquiries.find_one({"_id": result.inserted_id})
        return serialize_doc(created_inquiry)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/inquiries/{inquiry_id}")
async def update_inquiry_status(inquiry_id: str, status_data: dict):
    try:
        status_data["updatedAt"] = datetime.utcnow()
        
        result = await db.inquiries.update_one(
            {"_id": ObjectId(inquiry_id)}, 
            {"$set": status_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Inquiry not found")
            
        updated_inquiry = await db.inquiries.find_one({"_id": ObjectId(inquiry_id)})
        return serialize_doc(updated_inquiry)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/inquiries/{inquiry_id}")
async def delete_inquiry(inquiry_id: str):
    try:
        result = await db.inquiries.delete_one({"_id": ObjectId(inquiry_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Inquiry not found")
            
        return {"message": "Inquiry deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://*.vercel.app",
        "https://*.netlify.app",
        "https://*.render.com",
        os.getenv("FRONTEND_URL", "http://localhost:3000")
    ],
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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

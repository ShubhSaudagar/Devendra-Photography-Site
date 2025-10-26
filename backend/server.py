from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timedelta
from bson import ObjectId
import bcrypt
import secrets
import hashlib
from fastapi import Request, Response, Cookie


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
    type: str = "text"
    
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


# ===== AUTHENTICATION & ADMIN SETUP =====

# Password hashing using bcrypt
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def create_session_token() -> str:
    return secrets.token_urlsafe(32)

def hash_session_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()

# Get current user from session
async def get_current_user(request: Request) -> dict:
    session_token = request.cookies.get("admin_session")
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token_hash = hash_session_token(session_token)
    session = await db.sessions.find_one({
        "tokenHash": token_hash,
        "expiresAt": {"$gt": datetime.utcnow()}
    })
    
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    user = await db.users.find_one({"userId": session["userId"], "isActive": True})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    user_copy = serialize_doc(user)
    if "password" in user_copy:
        del user_copy["password"]
    return user_copy

# Log activity
async def log_activity(user_id: str, action: str, resource: str, resource_id: str = None, details: dict = None):
    await db.activity_log.insert_one({
        "userId": user_id,
        "action": action,
        "resource": resource,
        "resourceId": resource_id,
        "details": details,
        "timestamp": datetime.utcnow()
    })

# Permission check
PERMISSIONS = {
    "admin": ["manage_users", "manage_settings", "manage_analytics", "manage_marketing", 
              "manage_content", "manage_gallery", "manage_blog", "manage_videos", 
              "manage_offers", "manage_pages", "delete_any"],
    "editor": ["manage_content", "manage_gallery", "manage_blog", "manage_videos", 
               "manage_offers", "manage_pages"]
}

def has_permission(role: str, permission: str) -> bool:
    return permission in PERMISSIONS.get(role, [])

# ===== ADMIN AUTH ROUTES =====

@api_router.post("/admin/auth/login")
async def admin_login(request: dict, response: Response):
    user = await db.users.find_one({"email": request.get("email"), "isActive": True})
    if not user or not verify_password(request.get("password"), user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    session_token = create_session_token()
    token_hash = hash_session_token(session_token)
    
    # Determine session expiry based on "remember me"
    remember_me = request.get("rememberMe", False)
    expiry_days = 30 if remember_me else 7
    max_age = expiry_days * 24 * 60 * 60
    
    await db.sessions.insert_one({
        "tokenHash": token_hash,
        "userId": user["userId"],
        "createdAt": datetime.utcnow(),
        "expiresAt": datetime.utcnow() + timedelta(days=expiry_days)
    })
    
    await db.users.update_one({"userId": user["userId"]}, {"$set": {"lastLogin": datetime.utcnow()}})
    await log_activity(user["userId"], "login", "auth")
    
    response.set_cookie(key="admin_session", value=session_token, httponly=True, 
                       max_age=max_age, samesite="lax")
    
    user_data = serialize_doc(user)
    if "password" in user_data:
        del user_data["password"]
    
    return {"success": True, "message": "Login successful", "user": user_data}

@api_router.post("/admin/auth/logout")
async def admin_logout(request: Request, response: Response):
    session_token = request.cookies.get("admin_session")
    if session_token:
        token_hash = hash_session_token(session_token)
        await db.sessions.delete_one({"tokenHash": token_hash})
    response.delete_cookie("admin_session")
    return {"success": True, "message": "Logged out"}

@api_router.get("/admin/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return {"success": True, "user": user}

# ===== ADMIN USER MANAGEMENT =====

@api_router.get("/admin/users")
async def get_all_users(request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_users"):
        raise HTTPException(status_code=403, detail="Permission denied")
    users = await db.users.find().to_list(1000)
    return {"success": True, "users": serialize_doc(users)}

@api_router.post("/admin/users")
async def create_admin_user(data: dict, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_users"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    existing = await db.users.find_one({"email": data.get("email")})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    user_data = {
        "userId": str(uuid.uuid4()),
        "email": data.get("email"),
        "name": data.get("name"),
        "password": get_password_hash(data.get("password")),
        "role": data.get("role", "editor"),
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "lastLogin": None
    }
    
    await db.users.insert_one(user_data)
    await log_activity(user["userId"], "create", "user", user_data["userId"])
    return {"success": True, "message": "User created"}

# ===== ADMIN BLOG ROUTES =====

@api_router.get("/admin/blog")
async def get_all_blogs(request: Request):
    user = await get_current_user(request)
    blogs = await db.blog.find().sort("createdAt", -1).to_list(1000)
    return {"success": True, "blogs": serialize_doc(blogs)}

@api_router.post("/admin/blog")
async def create_blog(data: dict, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_blog"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    blog_data = {
        **data,
        "blogId": str(uuid.uuid4()),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    await db.blog.insert_one(blog_data)
    await log_activity(user["userId"], "create", "blog", blog_data["blogId"])
    return {"success": True, "message": "Blog created", "blog": serialize_doc(blog_data)}

@api_router.put("/admin/blog/{blog_id}")
async def update_blog(blog_id: str, data: dict, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_blog"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    data["updatedAt"] = datetime.utcnow()
    result = await db.blog.update_one({"blogId": blog_id}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    await log_activity(user["userId"], "update", "blog", blog_id)
    return {"success": True, "message": "Blog updated"}

@api_router.delete("/admin/blog/{blog_id}")
async def delete_blog(blog_id: str, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_blog"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    result = await db.blog.delete_one({"blogId": blog_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    await log_activity(user["userId"], "delete", "blog", blog_id)
    return {"success": True, "message": "Blog deleted"}

# ===== ADMIN VIDEOS ROUTES =====

@api_router.get("/admin/videos")
async def get_all_videos(request: Request):
    user = await get_current_user(request)
    videos = await db.videos.find().sort("order", 1).to_list(1000)
    return {"success": True, "videos": serialize_doc(videos)}

@api_router.post("/admin/videos")
async def create_video(data: dict, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_videos"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    video_data = {
        **data,
        "videoId": str(uuid.uuid4()),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    await db.videos.insert_one(video_data)
    await log_activity(user["userId"], "create", "video", video_data["videoId"])
    return {"success": True, "message": "Video created", "video": serialize_doc(video_data)}

@api_router.put("/admin/videos/{video_id}")
async def update_video(video_id: str, data: dict, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_videos"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    data["updatedAt"] = datetime.utcnow()
    result = await db.videos.update_one({"videoId": video_id}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Video not found")
    await log_activity(user["userId"], "update", "video", video_id)
    return {"success": True, "message": "Video updated"}

@api_router.delete("/admin/videos/{video_id}")
async def delete_video(video_id: str, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_videos"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    result = await db.videos.delete_one({"videoId": video_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Video not found")
    await log_activity(user["userId"], "delete", "video", video_id)
    return {"success": True, "message": "Video deleted"}

# ===== ADMIN OFFERS ROUTES =====

@api_router.get("/admin/offers")
async def get_all_offers(request: Request):
    user = await get_current_user(request)
    offers = await db.offers.find().sort("createdAt", -1).to_list(1000)
    return {"success": True, "offers": serialize_doc(offers)}

@api_router.post("/admin/offers")
async def create_offer(data: dict, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_offers"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    offer_data = {
        **data,
        "offerId": str(uuid.uuid4()),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    await db.offers.insert_one(offer_data)
    await log_activity(user["userId"], "create", "offer", offer_data["offerId"])
    return {"success": True, "message": "Offer created", "offer": serialize_doc(offer_data)}

# ===== ADMIN PAGES ROUTES =====

@api_router.get("/admin/pages")
async def get_all_pages(request: Request):
    user = await get_current_user(request)
    pages = await db.pages.find().to_list(1000)
    return {"success": True, "pages": serialize_doc(pages)}

@api_router.post("/admin/pages")
async def create_page(data: dict, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_pages"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    page_data = {
        **data,
        "pageId": str(uuid.uuid4()),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    await db.pages.insert_one(page_data)
    await log_activity(user["userId"], "create", "page", page_data["pageId"])
    return {"success": True, "message": "Page created", "page": serialize_doc(page_data)}

# ===== ADMIN MEDIA ROUTES =====

@api_router.get("/admin/media")
async def get_all_media(request: Request):
    user = await get_current_user(request)
    media = await db.media.find().sort("createdAt", -1).to_list(1000)
    return {"success": True, "media": serialize_doc(media)}

@api_router.post("/admin/media")
async def upload_media(data: dict, request: Request):
    user = await get_current_user(request)
    media_data = {
        **data,
        "mediaId": str(uuid.uuid4()),
        "uploadedBy": user["userId"],
        "createdAt": datetime.utcnow()
    }
    await db.media.insert_one(media_data)
    await log_activity(user["userId"], "upload", "media", media_data["mediaId"])
    return {"success": True, "message": "Media uploaded", "media": serialize_doc(media_data)}

@api_router.delete("/admin/media/{media_id}")
async def delete_media(media_id: str, request: Request):
    user = await get_current_user(request)
    result = await db.media.delete_one({"mediaId": media_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Media not found")
    await log_activity(user["userId"], "delete", "media", media_id)
    return {"success": True, "message": "Media deleted"}

# ===== ADMIN ANALYTICS ROUTES =====

@api_router.post("/analytics/track")
async def track_event(data: dict):
    """Track analytics event"""
    event_data = {
        **data,
        "eventId": str(uuid.uuid4()),
        "timestamp": datetime.utcnow()
    }
    await db.analytics_events.insert_one(event_data)
    return {"success": True, "message": "Event tracked"}

@api_router.get("/admin/analytics/stats")
async def get_analytics_stats(request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_analytics"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    # Get statistics
    total_views = await db.analytics_events.count_documents({"eventType": "page_view"})
    total_clicks = await db.analytics_events.count_documents({"eventType": "click"})
    total_inquiries = await db.inquiries.count_documents({})
    
    # Get recent page views
    recent_views = await db.analytics_events.find({"eventType": "page_view"}).sort("timestamp", -1).limit(100).to_list(100)
    
    # Top pages
    pipeline = [
        {"$match": {"eventType": "page_view"}},
        {"$group": {"_id": "$page", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    top_pages = await db.analytics_events.aggregate(pipeline).to_list(10)
    
    return {
        "success": True,
        "stats": {
            "totalViews": total_views,
            "totalClicks": total_clicks,
            "totalInquiries": total_inquiries,
            "topPages": top_pages,
            "recentViews": serialize_doc(recent_views)
        }
    }

# ===== ADMIN MARKETING SCRIPTS ROUTES =====


# ===== EMERGENCY ADMIN RESET ENDPOINT =====
# This endpoint allows resetting admin password with a special key
# Use this ONLY for initial setup or emergency password reset

@api_router.post("/admin/emergency-reset")
async def emergency_admin_reset(data: dict):
    """
    Emergency endpoint to reset admin password
    Required: { "emergency_key": "<from-env>", "new_password": "..." }
    """
    # Check emergency key from environment
    expected_key = os.environ.get('EMERGENCY_RESET_KEY', 'DSP2025Reset!')
    emergency_key = data.get("emergency_key")
    if emergency_key != expected_key:
        raise HTTPException(status_code=403, detail="Invalid emergency key")
    
    new_password = data.get("new_password")
    if not new_password or len(new_password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")
    
    # Hash the new password
    password_hash = get_password_hash(new_password)
    
    # Update or create admin user
    admin_email = "devshinde45@gmail.com"
    
    # Check if user exists
    existing_user = await db.users.find_one({"email": admin_email})
    
    if existing_user:
        # Update existing user
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {
                "password": password_hash,
                "updatedAt": datetime.utcnow(),
                "isActive": True
            }}
        )
        message = "Admin password updated successfully"
    else:
        # Create new admin user
        admin_data = {
            "userId": str(uuid.uuid4()),
            "email": admin_email,
            "name": "Devendra S. Shinde",
            "password": password_hash,
            "role": "admin",
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "lastLogin": None
        }
        await db.users.insert_one(admin_data)
        message = "Admin user created successfully"
    
    return {
        "success": True,
        "message": message,
        "email": admin_email,
        "note": "You can now login with the new password"
    }

@api_router.get("/admin/marketing/scripts")
async def get_marketing_scripts(request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_marketing"):
        raise HTTPException(status_code=403, detail="Permission denied")
    scripts = await db.marketing_scripts.find().to_list(1000)
    return {"success": True, "scripts": serialize_doc(scripts)}

@api_router.post("/admin/marketing/scripts")
async def create_marketing_script(data: dict, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_marketing"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    script_data = {
        **data,
        "scriptId": str(uuid.uuid4()),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    await db.marketing_scripts.insert_one(script_data)
    await log_activity(user["userId"], "create", "marketing_script", script_data["scriptId"])
    return {"success": True, "message": "Script added", "script": serialize_doc(script_data)}

@api_router.put("/admin/marketing/scripts/{script_id}")
async def update_marketing_script(script_id: str, data: dict, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_marketing"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    data["updatedAt"] = datetime.utcnow()
    result = await db.marketing_scripts.update_one({"scriptId": script_id}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Script not found")
    await log_activity(user["userId"], "update", "marketing_script", script_id)
    return {"success": True, "message": "Script updated"}

@api_router.delete("/admin/marketing/scripts/{script_id}")
async def delete_marketing_script(script_id: str, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_marketing"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    result = await db.marketing_scripts.delete_one({"scriptId": script_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Script not found")
    await log_activity(user["userId"], "delete", "marketing_script", script_id)
    return {"success": True, "message": "Script deleted"}

# ===== ACTIVITY LOG ROUTES =====

@api_router.get("/admin/activity-log")
async def get_activity_log(request: Request, limit: int = 100):
    user = await get_current_user(request)
    logs = await db.activity_log.find().sort("timestamp", -1).limit(limit).to_list(limit)
    return {"success": True, "logs": serialize_doc(logs)}

# ===== AI INTEGRATION ROUTES =====
from ai_service import ai_service

@api_router.post("/admin/ai/generate-caption")
async def generate_caption(data: dict, request: Request):
    user = await get_current_user(request)
    result = await ai_service.generate_caption(
        image_description=data.get("description", ""),
        style=data.get("style", "professional")
    )
    await log_activity(user["userId"], "ai_generate", "caption")
    return result

@api_router.post("/admin/ai/generate-ad-copy")
async def generate_ad_copy(data: dict, request: Request):
    user = await get_current_user(request)
    result = await ai_service.generate_ad_copy(
        service=data.get("service", ""),
        target_audience=data.get("targetAudience", ""),
        tone=data.get("tone", "professional")
    )
    await log_activity(user["userId"], "ai_generate", "ad_copy")
    return result

@api_router.post("/admin/ai/enhance-content")
async def enhance_content(data: dict, request: Request):
    user = await get_current_user(request)
    result = await ai_service.enhance_content(
        original_content=data.get("content", ""),
        enhancement_type=data.get("type", "improve")
    )
    await log_activity(user["userId"], "ai_enhance", "content")
    return result

@api_router.post("/admin/ai/generate-seo")
async def generate_seo(data: dict, request: Request):
    user = await get_current_user(request)
    result = await ai_service.generate_seo_metadata(
        page_title=data.get("title", ""),
        page_content=data.get("content", "")
    )
    await log_activity(user["userId"], "ai_generate", "seo")
    return result

# ===== ADMIN SETTINGS ROUTES =====

@api_router.get("/admin/settings")
async def get_settings(request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_settings"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    settings = await db.settings.find_one({"type": "system"})
    if not settings:
        # Return default settings
        settings = {
            "type": "system",
            "groqApiKey": "",
            "geminiApiKey": "",
            "facebookPixelId": "",
            "googleAnalyticsId": "",
            "googleTagManagerId": "",
            "enableFacebookPixel": False,
            "enableGoogleAnalytics": False,
            "enableGoogleTagManager": False
        }
    return {"success": True, "settings": serialize_doc(settings)}

@api_router.put("/admin/settings")
async def update_settings(data: dict, request: Request):
    user = await get_current_user(request)
    if not has_permission(user["role"], "manage_settings"):
        raise HTTPException(status_code=403, detail="Permission denied")
    
    # Update AI keys if provided
    if "groqApiKey" in data or "geminiApiKey" in data:
        ai_service.update_api_keys(
            groq_key=data.get("groqApiKey"),
            gemini_key=data.get("geminiApiKey")
        )
    
    data["updatedAt"] = datetime.utcnow()
    data["type"] = "system"
    
    # Upsert settings
    await db.settings.update_one(
        {"type": "system"},
        {"$set": data},
        upsert=True
    )
    
    await log_activity(user["userId"], "update", "settings")
    return {"success": True, "message": "Settings updated"}

# ===== FILE UPLOAD ROUTES =====
import shutil
from pathlib import Path

# Create uploads directory if it doesn't exist
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@api_router.post("/admin/upload")
async def upload_file(file: UploadFile = File(...), request: Request = None):
    if request:
        user = await get_current_user(request)
    
    try:
        # Generate unique filename
        file_extension = file.filename.split(".")[-1] if "." in file.filename else ""
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Save metadata to database
        file_url = f"/uploads/{unique_filename}"
        media_data = {
            "mediaId": str(uuid.uuid4()),
            "filename": file.filename,
            "uniqueFilename": unique_filename,
            "url": file_url,
            "type": file.content_type,
            "size": file_path.stat().st_size,
            "uploadedBy": user["userId"] if request else "system",
            "createdAt": datetime.utcnow()
        }
        
        await db.media.insert_one(media_data)
        
        if request:
            await log_activity(user["userId"], "upload", "file", media_data["mediaId"])
        
        return {
            "success": True,
            "message": "File uploaded successfully",
            "file": serialize_doc(media_data)
        }
    except Exception as e:
        logger.error(f"File upload error: {e}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

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
        content_dict = content.model_dump()
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
        content_dict = content.model_dump()
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
        service_dict = service.model_dump()
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
        service_dict = service.model_dump()
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
        portfolio_dict = portfolio.model_dump()
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
        portfolio_dict = portfolio.model_dump()
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
        package_dict = package.model_dump()
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
        package_dict = package.model_dump()
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
        testimonial_dict = testimonial.model_dump()
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
        testimonial_dict = testimonial.model_dump()
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
        inquiry_dict = inquiry.model_dump()
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
        "https://devendra-photography-site.vercel.app",
        "https://dspfilms.com",
        "https://www.dspfilms.com",
        os.getenv("FRONTEND_URL", "http://localhost:3000")
    ],
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
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

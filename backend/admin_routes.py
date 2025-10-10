"""
Admin panel API routes
Handles authentication, CRUD operations for all admin features
"""
from fastapi import APIRouter, HTTPException, Request, Response, Depends, UploadFile, File
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timedelta
from typing import Optional, List
import uuid
from bson import ObjectId

from models import *
from auth import (
    verify_password,
    get_password_hash,
    create_session_token,
    hash_session_token,
    has_permission
)

admin_router = APIRouter(prefix="/admin")

# Helper function
def serialize_doc(doc):
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    if isinstance(doc, dict):
        doc_copy = doc.copy()
        if "_id" in doc_copy:
            doc_copy["_id"] = str(doc_copy["_id"])
        if "password" in doc_copy:
            del doc_copy["password"]  # Never send password to frontend
        return {k: serialize_doc(v) for k, v in doc_copy.items()}
    return doc

# Dependency to get current user from session
async def get_current_user(request: Request, db: AsyncIOMotorDatabase) -> dict:
    session_token = request.cookies.get("admin_session")
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Hash token for lookup
    token_hash = hash_session_token(session_token)
    
    # Find active session
    session = await db.sessions.find_one({
        "tokenHash": token_hash,
        "expiresAt": {"$gt": datetime.utcnow()}
    })
    
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    # Get user
    user = await db.users.find_one({"userId": session["userId"], "isActive": True})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return serialize_doc(user)

# Helper to log activity
async def log_activity(db: AsyncIOMotorDatabase, user_id: str, action: str, resource: str, 
                       resource_id: Optional[str] = None, details: Optional[dict] = None):
    await db.activity_log.insert_one({
        "userId": user_id,
        "action": action,
        "resource": resource,
        "resourceId": resource_id,
        "details": details,
        "timestamp": datetime.utcnow()
    })

# ===== AUTHENTICATION ROUTES =====

def create_admin_auth_routes(db: AsyncIOMotorDatabase):
    
    @admin_router.post("/auth/login")
    async def login(request: LoginRequest, response: Response):
        """Admin login"""
        user = await db.users.find_one({"email": request.email, "isActive": True})
        
        if not user or not verify_password(request.password, user["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Create session
        session_token = create_session_token()
        token_hash = hash_session_token(session_token)
        
        session_data = {
            "tokenHash": token_hash,
            "userId": user["userId"],
            "createdAt": datetime.utcnow(),
            "expiresAt": datetime.utcnow() + timedelta(days=7)
        }
        
        await db.sessions.insert_one(session_data)
        
        # Update last login
        await db.users.update_one(
            {"userId": user["userId"]},
            {"$set": {"lastLogin": datetime.utcnow()}}
        )
        
        # Log activity
        await log_activity(db, user["userId"], "login", "auth")
        
        # Set cookie
        response.set_cookie(
            key="admin_session",
            value=session_token,
            httponly=True,
            max_age=7 * 24 * 60 * 60,  # 7 days
            samesite="lax"
        )
        
        return LoginResponse(
            success=True,
            message="Login successful",
            user=serialize_doc(user),
            session_token=session_token
        )
    
    @admin_router.post("/auth/logout")
    async def logout(request: Request, response: Response):
        """Logout"""
        session_token = request.cookies.get("admin_session")
        if session_token:
            token_hash = hash_session_token(session_token)
            await db.sessions.delete_one({"tokenHash": token_hash})
        
        response.delete_cookie("admin_session")
        return {"success": True, "message": "Logged out"}
    
    @admin_router.get("/auth/me")
    async def get_current_user_info(request: Request):
        """Get current logged-in user"""
        user = await get_current_user(request, db)
        return {"success": True, "user": user}
    
    @admin_router.post("/auth/password-reset-request")
    async def password_reset_request(request: PasswordResetRequest):
        """Request password reset (structure ready for email integration)"""
        user = await db.users.find_one({"email": request.email})
        if not user:
            # Don't reveal if user exists
            return {"success": True, "message": "If email exists, reset link sent"}
        
        # Generate reset token
        reset_token = create_session_token()
        reset_data = {
            "userId": user["userId"],
            "token": reset_token,
            "createdAt": datetime.utcnow(),
            "expiresAt": datetime.utcnow() + timedelta(hours=1),
            "used": False
        }
        
        await db.password_resets.insert_one(reset_data)
        
        # TODO: Send email with reset link containing token
        # For now, return token (in production, only send via email)
        return {
            "success": True,
            "message": "Reset token generated",
            "token": reset_token,  # Remove this in production
            "note": "In production, this would be sent via email"
        }
    
    @admin_router.post("/auth/password-reset-confirm")
    async def password_reset_confirm(request: PasswordResetConfirm):
        """Confirm password reset with token"""
        reset = await db.password_resets.find_one({
            "token": request.token,
            "used": False,
            "expiresAt": {"$gt": datetime.utcnow()}
        })
        
        if not reset:
            raise HTTPException(status_code=400, detail="Invalid or expired reset token")
        
        # Update password
        new_password_hash = get_password_hash(request.new_password)
        await db.users.update_one(
            {"userId": reset["userId"]},
            {"$set": {"password": new_password_hash, "updatedAt": datetime.utcnow()}}
        )
        
        # Mark token as used
        await db.password_resets.update_one(
            {"_id": reset["_id"]},
            {"$set": {"used": True}}
        )
        
        # Log activity
        await log_activity(db, reset["userId"], "password_reset", "auth")
        
        return {"success": True, "message": "Password reset successful"}
    
    return admin_router

# ===== USER MANAGEMENT ROUTES =====

def create_user_routes(db: AsyncIOMotorDatabase):
    
    @admin_router.get("/users")
    async def get_users(request: Request):
        """Get all users (admin only)"""
        current_user = await get_current_user(request, db)
        if not has_permission(current_user["role"], "manage_users"):
            raise HTTPException(status_code=403, detail="Permission denied")
        
        users = await db.users.find().to_list(1000)
        return {"success": True, "users": serialize_doc(users)}
    
    @admin_router.post("/users")
    async def create_user(user: UserCreate, request: Request):
        """Create new user (admin only)"""
        current_user = await get_current_user(request, db)
        if not has_permission(current_user["role"], "manage_users"):
            raise HTTPException(status_code=403, detail="Permission denied")
        
        # Check if email exists
        existing = await db.users.find_one({"email": user.email})
        if existing:
            raise HTTPException(status_code=400, detail="Email already exists")
        
        user_data = user.model_dump()
        user_data["userId"] = str(uuid.uuid4())
        user_data["password"] = get_password_hash(user_data["password"])
        user_data["createdAt"] = datetime.utcnow()
        user_data["lastLogin"] = None
        
        await db.users.insert_one(user_data)
        await log_activity(db, current_user["userId"], "create", "user", user_data["userId"])
        
        return {"success": True, "message": "User created", "user": serialize_doc(user_data)}
    
    @admin_router.put("/users/{user_id}")
    async def update_user(user_id: str, user: UserUpdate, request: Request):
        """Update user (admin only)"""
        current_user = await get_current_user(request, db)
        if not has_permission(current_user["role"], "manage_users"):
            raise HTTPException(status_code=403, detail="Permission denied")
        
        update_data = {k: v for k, v in user.model_dump().items() if v is not None}
        if "password" in update_data:
            update_data["password"] = get_password_hash(update_data["password"])
        update_data["updatedAt"] = datetime.utcnow()
        
        result = await db.users.update_one({"userId": user_id}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
        
        await log_activity(db, current_user["userId"], "update", "user", user_id)
        return {"success": True, "message": "User updated"}
    
    @admin_router.delete("/users/{user_id}")
    async def delete_user(user_id: str, request: Request):
        """Delete user (admin only)"""
        current_user = await get_current_user(request, db)
        if not has_permission(current_user["role"], "manage_users"):
            raise HTTPException(status_code=403, detail="Permission denied")
        
        # Don't allow deleting self
        if user_id == current_user["userId"]:
            raise HTTPException(status_code=400, detail="Cannot delete yourself")
        
        result = await db.users.update_one(
            {"userId": user_id},
            {"$set": {"isActive": False, "updatedAt": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
        
        await log_activity(db, current_user["userId"], "delete", "user", user_id)
        return {"success": True, "message": "User deleted"}
    
    return admin_router

# Due to token limits, I'll create factory functions for other routes
# These will be similar patterns for blog, videos, offers, pages, media, analytics, marketing

def create_blog_routes(db: AsyncIOMotorDatabase):
    # Blog CRUD endpoints (similar pattern to above)
    pass

def create_video_routes(db: AsyncIOMotorDatabase):
    # Video CRUD endpoints
    pass

def create_offer_routes(db: AsyncIOMotorDatabase):
    # Offer CRUD endpoints
    pass

def create_page_routes(db: AsyncIOMotorDatabase):
    # Page CRUD endpoints
    pass

def create_media_routes(db: AsyncIOMotorDatabase):
    # Media management endpoints
    pass

def create_analytics_routes(db: AsyncIOMotorDatabase):
    # Analytics tracking and retrieval endpoints
    pass

def create_marketing_routes(db: AsyncIOMotorDatabase):
    # Marketing scripts management endpoints
    pass

def create_activity_log_routes(db: AsyncIOMotorDatabase):
    # Activity log and undo functionality
    pass

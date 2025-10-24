"""
Pydantic models for all API endpoints
"""
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

# Authentication Models
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    success: bool
    message: str
    user: Optional[Dict[str, Any]] = None
    session_token: Optional[str] = None

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str

# User Models
class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str = "editor"  # admin or editor
    isActive: bool = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    isActive: Optional[bool] = None
    password: Optional[str] = None

class User(UserBase):
    userId: str
    createdAt: datetime
    lastLogin: Optional[datetime] = None

# Blog Models
class BlogCreate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str
    featuredImage: str
    category: str
    tags: List[str] = []
    seoTitle: Optional[str] = None
    seoDescription: Optional[str] = None
    ogImage: Optional[str] = None
    isPublished: bool = False
    publishedAt: Optional[datetime] = None

class BlogUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    featuredImage: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    seoTitle: Optional[str] = None
    seoDescription: Optional[str] = None
    ogImage: Optional[str] = None
    isPublished: Optional[bool] = None
    publishedAt: Optional[datetime] = None

# Video Models
class VideoCreate(BaseModel):
    title: str
    description: str
    videoUrl: str
    thumbnail: str
    category: str
    duration: Optional[str] = None
    tags: List[str] = []
    order: int = 0
    isActive: bool = True

class VideoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    videoUrl: Optional[str] = None
    thumbnail: Optional[str] = None
    category: Optional[str] = None
    duration: Optional[str] = None
    tags: Optional[List[str]] = None
    order: Optional[int] = None
    isActive: Optional[bool] = None

# Offer Models
class OfferCreate(BaseModel):
    title: str
    description: str
    discountPercent: int
    validFrom: datetime
    validUntil: datetime
    terms: List[str] = []
    isActive: bool = True

class OfferUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    discountPercent: Optional[int] = None
    validFrom: Optional[datetime] = None
    validUntil: Optional[datetime] = None
    terms: Optional[List[str]] = None
    isActive: Optional[bool] = None

# Page Models
class PageCreate(BaseModel):
    title: str
    slug: str
    content: str
    template: str = "default"
    seoTitle: Optional[str] = None
    seoDescription: Optional[str] = None
    ogImage: Optional[str] = None
    isPublished: bool = False

class PageUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    template: Optional[str] = None
    seoTitle: Optional[str] = None
    seoDescription: Optional[str] = None
    ogImage: Optional[str] = None
    isPublished: Optional[bool] = None

# Media Models
class MediaUpload(BaseModel):
    filename: str
    url: str
    type: str  # image, video, document
    size: int
    alt: Optional[str] = None
    caption: Optional[str] = None

# Analytics Models
class AnalyticsEvent(BaseModel):
    eventType: str  # page_view, click, form_submit, etc.
    page: str
    data: Optional[Dict[str, Any]] = None
    userAgent: Optional[str] = None
    ipAddress: Optional[str] = None

# Marketing Scripts Models
class MarketingScript(BaseModel):
    name: str  # facebook_pixel, ga4, gtm, etc.
    scriptId: str
    isActive: bool = True
    config: Optional[Dict[str, Any]] = None

# Activity Log Models
class ActivityLog(BaseModel):
    userId: str
    action: str  # create, update, delete, login, etc.
    resource: str  # blog, gallery, user, etc.
    resourceId: Optional[str] = None
    details: Optional[Dict[str, Any]] = None
    timestamp: datetime

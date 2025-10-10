"""
Authentication module for admin panel
Handles login, session management, password hashing
"""
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
import secrets
import hashlib

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)

def create_session_token() -> str:
    """Generate a secure session token"""
    return secrets.token_urlsafe(32)

def hash_session_token(token: str) -> str:
    """Hash session token for storage"""
    return hashlib.sha256(token.encode()).hexdigest()

# User roles and permissions
ROLE_PERMISSIONS = {
    "admin": [
        "manage_users",
        "manage_settings",
        "manage_analytics",
        "manage_marketing",
        "manage_content",
        "manage_gallery",
        "manage_blog",
        "manage_videos",
        "manage_offers",
        "manage_pages",
        "view_activity_log",
        "delete_any"
    ],
    "editor": [
        "manage_content",
        "manage_gallery",
        "manage_blog",
        "manage_videos",
        "manage_offers",
        "manage_pages"
    ]
}

def has_permission(user_role: str, permission: str) -> bool:
    """Check if a role has a specific permission"""
    return permission in ROLE_PERMISSIONS.get(user_role, [])

# auth.py
"""
Authentication router for admin panel
Self-contained (uses MONGO_URL and DB_NAME from env)
Provides:
 - POST /login
 - POST /logout
 - GET /me
Sessions saved in `sessions` collection (tokenHash + expiry)
"""

import os
import secrets
import hashlib
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, HTTPException, Request, Response, status
from pydantic import BaseModel
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorClient
from jose import JWTError, jwt

# ====== CONFIG ======
MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME", "dsp_photography")
SESSION_COOKIE_NAME = "admin_session"
SESSION_EXPIRE_DAYS = 7  # default expiry for session
JWT_SECRET = os.getenv("JWT_SECRET")
if not JWT_SECRET:
    raise RuntimeError("JWT_SECRET environment variable must be set for security. Generate a strong random secret.")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ====== DB ======
if not MONGO_URL:
    raise RuntimeError("MONGO_URL environment variable not set for auth router")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

router = APIRouter()  # will be included by main.py

# ====== Helpers ======
def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_session_token() -> str:
    return secrets.token_urlsafe(32)

def hash_session_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create JWT access token
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> Optional[dict]:
    """
    Verify and decode JWT token
    """
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError:
        return None

def _serialize_doc(d):
    if not d:
        return None
    d = dict(d)
    if "_id" in d:
        d["_id"] = str(d["_id"])
    if "password" in d:
        del d["password"]
    return d

# ====== Request Schemas ======
class LoginPayload(BaseModel):
    email: str
    password: str
    rememberMe: Optional[bool] = False

# ====== ROUTES ======
@router.post("/login")
async def login(payload: LoginPayload, response: Response):
    """Login admin: sets secure httpOnly cookie admin_session"""
    user = await db.users.find_one({"email": payload.email, "isActive": True})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(payload.password, user.get("password", "")):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # create session
    session_token = create_session_token()
    token_hash = hash_session_token(session_token)
    remember = bool(payload.rememberMe)
    expiry_days = 30 if remember else SESSION_EXPIRE_DAYS
    expires_at = datetime.utcnow() + timedelta(days=expiry_days)

    await db.sessions.insert_one({
        "tokenHash": token_hash,
        "userId": user.get("userId") or str(user.get("_id")),
        "createdAt": datetime.utcnow(),
        "expiresAt": expires_at
    })

    # update lastLogin
    await db.users.update_one({"_id": user["_id"]}, {"$set": {"lastLogin": datetime.utcnow()}})

    # Create JWT token
    jwt_token = create_access_token({
        "sub": user.get("email"),
        "role": user.get("role", "editor"),
        "userId": user.get("userId") or str(user.get("_id"))
    })

    # set cookie
    max_age = expiry_days * 24 * 60 * 60
    response.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=session_token,
        httponly=True,
        max_age=max_age,
        samesite="lax"
    )

    return {
        "success": True,
        "message": "Login successful",
        "user": _serialize_doc(user),
        "token": jwt_token  # JWT token for Authorization header
    }

@router.post("/logout")
async def logout(request: Request, response: Response):
    session_token = request.cookies.get(SESSION_COOKIE_NAME)
    if session_token:
        token_hash = hash_session_token(session_token)
        await db.sessions.delete_many({"tokenHash": token_hash})
    response.delete_cookie(SESSION_COOKIE_NAME)
    return {"success": True, "message": "Logged out"}

@router.get("/me")
async def me(request: Request):
    session_token = request.cookies.get(SESSION_COOKIE_NAME)
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    token_hash = hash_session_token(session_token)
    session = await db.sessions.find_one({"tokenHash": token_hash, "expiresAt": {"$gt": datetime.utcnow()}})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    user = await db.users.find_one({"userId": session.get("userId")})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    user_copy = _serialize_doc(user)
    return {"success": True, "user": user_copy}

# (Optional) small admin create endpoint for initial bootstrap (use emergency reset preferred)
@router.post("/create-initial-admin")
async def create_initial_admin(data: dict):
    """
    Danger: Use only first time to create admin, or comment/remove after initial use.
    Expects { email, password, name }
    """
    email = data.get("email")
    password = data.get("password")
    name = data.get("name", "Admin")
    if not email or not password:
        raise HTTPException(status_code=400, detail="email & password required")
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="User exists")
    user_doc = {
        "userId": secrets.token_hex(8),
        "email": email,
        "name": name,
        "password": get_password_hash(password),
        "role": "admin",
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "lastLogin": None
    }
    await db.users.insert_one(user_doc)
    return {"success": True, "message": "Admin created", "email": email}

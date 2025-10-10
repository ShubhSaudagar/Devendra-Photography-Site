"""
Setup script to initialize admin user and update site content
Run this once to set up the admin panel
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import bcrypt
from datetime import datetime
import uuid
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Password hashing using bcrypt directly
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

async def setup_admin():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    print("🚀 Setting up admin panel...")
    
    # 1. Create admin user
    admin_email = "devshinde45@gmail.com"
    admin_password = "DSPAdmin@2025!"
    
    existing_admin = await db.users.find_one({"email": admin_email})
    if not existing_admin:
        admin_data = {
            "userId": str(uuid.uuid4()),
            "email": admin_email,
            "name": "Devendra S. Shinde",
            "password": hash_password(admin_password),
            "role": "admin",
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "lastLogin": None
        }
        await db.users.insert_one(admin_data)
        print(f"✅ Admin user created: {admin_email}")
        print(f"🔑 Password: {admin_password}")
    else:
        print(f"ℹ️  Admin user already exists: {admin_email}")
    
    # 2. Update site content
    print("\n📝 Updating site content...")
    
    # Update hero section
    await db.site_content.update_one(
        {"section": "hero", "key": "title"},
        {"$set": {"value": "DSP Film's", "updatedAt": datetime.utcnow()}},
        upsert=True
    )
    
    await db.site_content.update_one(
        {"section": "hero", "key": "subtitle"},
        {"$set": {"value": "Photography | Video Production | Advertising ⭐⭐⭐⭐⭐", "updatedAt": datetime.utcnow()}},
        upsert=True
    )
    
    await db.site_content.update_one(
        {"section": "hero", "key": "description"},
        {"$set": {"value": "Expert in Cinematic & Wedding photography, newborn & maternity sessions, and commercial projects. Based in Ahilyanagar & Pune, Maharashtra, India.", "updatedAt": datetime.utcnow()}},
        upsert=True
    )
    
    # Update stats
    await db.site_content.update_one(
        {"section": "stats", "key": "photos"},
        {"$set": {"value": "2L+ Photos Captured", "updatedAt": datetime.utcnow()}},
        upsert=True
    )
    
    # Update location
    await db.site_content.update_one(
        {"section": "contact", "key": "location"},
        {"$set": {"value": "Ahilyanagar & Pune, Maharashtra", "updatedAt": datetime.utcnow()}},
        upsert=True
    )
    
    # Update About section photo
    await db.site_content.update_one(
        {"section": "about", "key": "photo"},
        {"$set": {"value": "https://customer-assets.emergentagent.com/job_dsp-film-portfolio/artifacts/521vfvt4_DevShinde.png", "updatedAt": datetime.utcnow()}},
        upsert=True
    )
    
    # Add footer credit
    await db.site_content.update_one(
        {"section": "footer", "key": "credit_name"},
        {"$set": {"value": "Site built by Shubham Saudagar", "updatedAt": datetime.utcnow()}},
        upsert=True
    )
    
    await db.site_content.update_one(
        {"section": "footer", "key": "credit_photo"},
        {"$set": {"value": "https://customer-assets.emergentagent.com/job_dsp-film-portfolio/artifacts/6b692ram_ShubhSaudagar.jpg", "updatedAt": datetime.utcnow()}},
        upsert=True
    )
    
    await db.site_content.update_one(
        {"section": "footer", "key": "credit_instagram"},
        {"$set": {"value": "https://www.instagram.com/shubhsaudagar/", "updatedAt": datetime.utcnow()}},
        upsert=True
    )
    
    print("✅ Site content updated")
    
    # 3. Delete old packages and create new ones
    print("\n📦 Updating packages...")
    
    # Remove all existing packages
    await db.packages.delete_many({})
    
    # New packages data
    packages = [
        {
            "packageId": str(uuid.uuid4()),
            "name": "Wedding Package - Basic",
            "price": "₹50,000",
            "duration": "Full Day",
            "category": "Wedding",
            "features": [
                "Traditional Photographer (1)",
                "Traditional Videographer (1)",
                "Candid Photographer (1)",
                "30-35 pages photobook album + minibook & Couple Frame",
                "64 GB Pendrive",
                "Full Traditional video with 3-4 minutes highlights songs (3 reels)"
            ],
            "terms": [
                "75% amount will be taken as ADVANCE",
                "If order cancelled by your side, ADVANCE will NOT be refunded"
            ],
            "popular": False,
            "color": "#9333ea",
            "order": 1,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "packageId": str(uuid.uuid4()),
            "name": "Wedding Package - Premium",
            "price": "₹1,15,000",
            "duration": "Full Day",
            "category": "Wedding",
            "features": [
                "Traditional Photographer (1)",
                "Traditional Videographer (1)",
                "Candid Photographer (1)",
                "Cinematographer (1)",
                "Assistant (1)",
                "30-35 pages photobook album + minibook & Couple Frame",
                "128 GB Pendrive",
                "Full Traditional video with 3-4 minutes highlights songs",
                "Cinematic video 3-4 min / teaser 45 sec - 1 min / 3 Reels"
            ],
            "terms": [
                "75% amount will be taken as ADVANCE",
                "If order cancelled by your side, ADVANCE will NOT be refunded"
            ],
            "popular": True,
            "color": "#f59e0b",
            "order": 2,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "packageId": str(uuid.uuid4()),
            "name": "Pre-Wedding Package - Cinematic",
            "price": "₹49,000",
            "duration": "Half Day",
            "category": "Pre-Wedding",
            "features": [
                "30-40 photos edited",
                "Complimentary: photobook album & Couple Frame",
                "Cinematic + Drone video 3-4 min / teaser 45 sec - 1 min / 3 Reels"
            ],
            "terms": [
                "75% amount will be taken as ADVANCE",
                "Travelling + Food + Stay charges extra",
                "If order cancelled by your side, ADVANCE will NOT be refunded"
            ],
            "popular": False,
            "color": "#ec4899",
            "order": 3,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "packageId": str(uuid.uuid4()),
            "name": "Pre-Wedding Package - Basic",
            "price": "₹23,000",
            "duration": "Half Day",
            "category": "Pre-Wedding",
            "features": [
                "30-40 photos edited",
                "Complimentary: photobook album & Couple frame",
                "3 Reels"
            ],
            "terms": [
                "75% amount will be taken as ADVANCE",
                "Travelling + Food + Stay charges extra",
                "If order cancelled by your side, ADVANCE will NOT be refunded"
            ],
            "popular": False,
            "color": "#3b82f6",
            "order": 4,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "packageId": str(uuid.uuid4()),
            "name": "Maternity Package",
            "price": "₹16,000",
            "duration": "2-3 Hours",
            "category": "Maternity/ NewBorn & Family",
            "features": [
                "20-30 photos edited",
                "Complimentary: photobook album & Couple frame",
                "2 Reels"
            ],
            "terms": [
                "75% amount will be taken as ADVANCE",
                "If order cancelled by your side, ADVANCE will NOT be refunded"
            ],
            "popular": False,
            "color": "#10b981",
            "order": 5,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "packageId": str(uuid.uuid4()),
            "name": "Indoor Baby Shoot Package",
            "price": "₹5,000",
            "duration": "1-2 Hours",
            "category": "Maternity/ NewBorn & Family",
            "features": [
                "15-20 photos edited"
            ],
            "terms": [
                "75% amount will be taken as ADVANCE",
                "If order cancelled by your side, ADVANCE will NOT be refunded"
            ],
            "popular": False,
            "color": "#8b5cf6",
            "order": 6,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "packageId": str(uuid.uuid4()),
            "name": "Baby Shoot Package - With Video",
            "price": "₹20,000",
            "duration": "2-3 Hours",
            "category": "Maternity/ NewBorn & Family",
            "features": [
                "15-20 photos edited",
                "Cinematic video 2-3 mins + 2 reels"
            ],
            "terms": [
                "75% amount will be taken as ADVANCE",
                "If order cancelled by your side, ADVANCE will NOT be refunded"
            ],
            "popular": False,
            "color": "#06b6d4",
            "order": 7,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ]
    
    await db.packages.insert_many(packages)
    print(f"✅ Created {len(packages)} new packages")
    
    # 4. Update service category
    result = await db.services.update_one(
        {"title": {"$regex": "maternity", "$options": "i"}},
        {"$set": {"title": "Maternity/ NewBorn & Family", "updatedAt": datetime.utcnow()}}
    )
    if result.matched_count > 0:
        print("✅ Updated service category")
    
    print("\n✨ Setup complete!")
    print("\n📋 Admin Login Credentials:")
    print(f"   Email: {admin_email}")
    print(f"   Password: {admin_password}")
    print(f"\n🔗 Admin Panel: http://localhost:3000/admin")
    print("\n⚠️  IMPORTANT: Change the admin password after first login!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(setup_admin())

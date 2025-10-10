"""
Update packages with new details
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import uuid
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def update_packages():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    print("🔄 Updating packages...")
    
    # Remove all existing packages
    await db.packages.delete_many({})
    print("✅ Cleared old packages")
    
    # New packages data
    packages = [
        {
            "packageId": str(uuid.uuid4()),
            "name": "Wedding Package - Basic",
            "price": "₹50,000",
            "duration": "",
            "category": "Wedding",
            "features": [
                "Traditional Photographer (1)",
                "Traditional Videographer (1)",
                "Candid Photographer (1)",
                "30-35 pages photobook album + minibook & Couple Frame",
                "64 GB Pendrive",
                "Full Traditional video with 3-4 minutes highlights songs",
                "3 Reels included"
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
            "duration": "",
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
                "Cinematic video 3-4 min / teaser 45 sec - 1 min",
                "3 Reels included"
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
            "duration": "",
            "category": "Pre-Wedding",
            "features": [
                "30-40 photos edited",
                "Photobook album & Couple Frame (Complimentary)",
                "Cinematic video 3-4 min",
                "Drone video (where permitted)",
                "Teaser 45 sec - 1 min",
                "3 Reels"
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
            "duration": "",
            "category": "Pre-Wedding",
            "features": [
                "30-40 photos edited",
                "Photobook album & Couple frame (Complimentary)",
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
            "duration": "",
            "category": "Maternity | Newborn & Family",
            "features": [
                "20-30 photos edited",
                "Photobook album & Couple frame (Complimentary)",
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
            "category": "Maternity | Babyshoot & Family",
            "features": [
                "15-20 photos edited",
                "Studio setup with props",
                "Professional lighting"
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
            "category": "Maternity | Babyshoot & Family",
            "features": [
                "15-20 photos edited",
                "Cinematic video 2-3 mins",
                "2 Reels",
                "Props and styling included"
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
    print(f"✅ Added {len(packages)} new packages")
    
    # Also update the services category name
    result = await db.services.update_one(
        {"title": {"$regex": "maternity", "$options": "i"}},
        {"$set": {"title": "Maternity | Babyshoot & Family", "updatedAt": datetime.utcnow()}}
    )
    if result.matched_count > 0:
        print("✅ Updated service category name")
    
    print("\n✨ Packages update complete!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(update_packages())

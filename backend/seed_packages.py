"""
Seed database with 7 photography packages for DSP Film's
Run this script to populate MongoDB with package data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

packages_data = [
    # WEDDING PACKAGES
    {
        "category": "WEDDING",
        "title": "Wedding Package - Basic",
        "subtitle": "Perfect for essential wedding coverage",
        "price": 50000,
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
        "ctaText": "Book Now",
        "waNumber": "918308398378",
        "waMessageTemplate": "Hi, I'm interested in the \"Wedding Package - Basic\" package.",
        "order": 1,
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "category": "WEDDING",
        "title": "Wedding Package - Premium",
        "subtitle": "Premium cinematic + traditional team",
        "price": 115000,
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
        "ctaText": "Book Now",
        "waNumber": "918308398378",
        "waMessageTemplate": "Hi, I'm interested in the \"Wedding Package - Premium\" package.",
        "order": 2,
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    
    # PRE-WEDDING PACKAGES
    {
        "category": "PRE-WEDDING",
        "title": "Pre-Wedding Package - Cinematic",
        "subtitle": "Cinematic storytelling with drone (where permitted)",
        "price": 49000,
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
        "ctaText": "Book Now",
        "waNumber": "918308398378",
        "waMessageTemplate": "Hi, I'm interested in the \"Pre-Wedding Package - Cinematic\" package.",
        "order": 3,
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "category": "PRE-WEDDING",
        "title": "Pre-Wedding Package - Basic",
        "subtitle": "Photo-first pre-wedding session",
        "price": 23000,
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
        "ctaText": "Book Now",
        "waNumber": "918308398378",
        "waMessageTemplate": "Hi, I'm interested in the \"Pre-Wedding Package - Basic\" package.",
        "order": 4,
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    
    # MATERNITY | NEWBORN & FAMILY PACKAGES
    {
        "category": "MATERNITY_NEWBORN_FAMILY",
        "title": "Maternity Package",
        "subtitle": "Beautiful maternity portraits",
        "price": 16000,
        "features": [
            "20-30 photos edited",
            "Photobook album & Couple frame (Complimentary)",
            "2 Reels"
        ],
        "terms": [
            "75% amount will be taken as ADVANCE",
            "If order cancelled by your side, ADVANCE will NOT be refunded"
        ],
        "ctaText": "Book Now",
        "waNumber": "918308398378",
        "waMessageTemplate": "Hi, I'm interested in the \"Maternity Package\".",
        "order": 5,
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "category": "MATERNITY_NEWBORN_FAMILY",
        "title": "Indoor Baby Shoot Package",
        "subtitle": "Cozy studio session with props",
        "price": 5000,
        "features": [
            "15-20 photos edited",
            "Studio setup with props",
            "Professional lighting"
        ],
        "terms": [
            "75% amount will be taken as ADVANCE",
            "If order cancelled by your side, ADVANCE will NOT be refunded"
        ],
        "ctaText": "Book Now",
        "waNumber": "918308398378",
        "waMessageTemplate": "Hi, I'm interested in the \"Indoor Baby Shoot Package\".",
        "order": 6,
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "category": "MATERNITY_NEWBORN_FAMILY",
        "title": "Baby Shoot Package - With Video",
        "subtitle": "Photo + cinematic short film",
        "price": 20000,
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
        "ctaText": "Book Now",
        "waNumber": "918308398378",
        "waMessageTemplate": "Hi, I'm interested in the \"Baby Shoot Package - With Video\".",
        "order": 7,
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
]

async def seed_packages():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("🌱 Seeding DSP Photography Packages...")
    
    try:
        # Clear existing packages
        result = await db.packages.delete_many({})
        print(f"🗑️  Deleted {result.deleted_count} existing packages")
        
        # Insert new packages
        result = await db.packages.insert_many(packages_data)
        print(f"✅ Inserted {len(result.inserted_ids)} new packages")
        
        print("\n📦 Package Summary:")
        print(f"  - Wedding: 2 packages")
        print(f"  - Pre-Wedding: 2 packages")
        print(f"  - Maternity | NewBorn & Family: 3 packages")
        
        print("\n🎉 Database seeded successfully!")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_packages())

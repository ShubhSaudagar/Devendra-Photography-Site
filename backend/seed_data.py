import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Site Content Data
site_content_data = [
    # Hero Section
    {"section": "hero", "key": "brand_name", "value": "D.S.P.Film's", "type": "text"},
    {"section": "hero", "key": "tagline", "value": "Capturing Life's Precious Moments", "type": "text"},
    {"section": "hero", "key": "description", "value": "Professional cinematographer and photographer specializing in weddings, cinematic photography, newborn & maternity sessions, and commercial projects. Based in Ahilyanagar, Maharashtra, India.", "type": "text"},
    
    # About Section  
    {"section": "about", "key": "title", "value": "Meet Devendra S. Shinde", "type": "text"},
    {"section": "about", "key": "subtitle", "value": "Cinematic Photographer & Visual Storyteller", "type": "text"},
    {"section": "about", "key": "description", "value": "With over 8 years of experience since February 2017 in cinematic photography and videography, I specialize in capturing life's most precious moments with an artistic eye. From intimate wedding ceremonies to grand celebrations, I bring passion, creativity, and technical expertise to every project. Based in Ahilyanagar, Maharashtra, I serve clients across India with a focus on authentic storytelling through stunning visuals.", "type": "text"},
    {"section": "about", "key": "image", "value": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face", "type": "image_url"},
    
    # Contact Information
    {"section": "contact", "key": "name", "value": "Devendra S. Shinde", "type": "text"},
    {"section": "contact", "key": "phone", "value": "+91 8308398378", "type": "text"},
    {"section": "contact", "key": "email", "value": "contact@dspfilms.com", "type": "text"},
    {"section": "contact", "key": "location", "value": "Ahilyanagar City, Maharashtra, India", "type": "text"},
    {"section": "contact", "key": "office_address", "value": "1st floor, above Ola EV showroom, opp. Shilpa Garden, Nagar - Pune Highway, Ahilyanagar - 414001", "type": "text"},
    {"section": "contact", "key": "experience_start", "value": "February 2017", "type": "text"},
    {"section": "contact", "key": "experience_years", "value": "8+", "type": "text"},
    
    # Social Media
    {"section": "social", "key": "instagram", "value": "https://www.instagram.com/d.s.p.films/", "type": "text"},
    {"section": "social", "key": "facebook", "value": "#", "type": "text"},
    {"section": "social", "key": "youtube", "value": "#", "type": "text"},
]

# Services Data
services_data = [
    {
        "title": "Wedding & Events",
        "description": "Complete wedding documentation from mehendi to reception. Candid moments, traditional rituals, and cinematic storytelling that preserves your special day forever.",
        "features": ["Mehendi & Sangeet Coverage", "Wedding Day Documentation", "Reception Photography", "Traditional Ceremonies", "Candid Moments", "Family Portraits"],
        "image": "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/ocw386dq_DEV_4405%20copy.jpg",
        "icon": "Heart",
        "color": "from-rose-600 to-pink-600",
        "order": 1,
        "isActive": True
    },
    {
        "title": "Pre-Wedding Shoots",
        "description": "Romantic pre-wedding photography sessions that capture your love story. Beautiful locations, creative concepts, and cinematic storytelling for couples.",
        "features": ["Location Scouting", "Creative Concepts", "Costume Guidance", "Multiple Outfit Changes", "Cinematic Shots", "Love Story Documentation"],
        "image": "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/u6ki7yo7_8X3A0072%20copy.jpg",
        "icon": "Camera",
        "color": "from-purple-600 to-indigo-600",
        "order": 2,
        "isActive": True
    },
    {
        "title": "Cinematic Photography",
        "description": "Dramatic, storytelling photography with cinematic composition. Perfect for creative projects, fashion shoots, and artistic portraits with a filmic approach.",
        "features": ["Fashion Photography", "Creative Portraits", "Dramatic Lighting", "Storytelling Shots", "Artistic Compositions", "Film-style Grading"],
        "image": "https://images.unsplash.com/photo-1638128807421-1fe4b5f4e7c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3NTkzMTE3ODd8MA&ixlib=rb-4.1.0&q=85",
        "icon": "Video",
        "color": "from-emerald-600 to-teal-600",
        "order": 3,
        "isActive": True
    },
    {
        "title": "Newborn & Maternity",
        "description": "Gentle, professional photography for expecting mothers and newborn babies. Safe, comfortable environment for precious family moments.",
        "features": ["Maternity Shoots", "Newborn Photography", "Family Portraits", "Baby Milestones", "Safe Environment", "Props & Styling"],
        "image": "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/tfl833jz_8X3A9993%20copy%202.jpg",
        "icon": "Baby",
        "color": "from-amber-600 to-orange-600",
        "order": 4,
        "isActive": True
    },
    {
        "title": "Commercial & Product",
        "description": "Professional commercial photography for businesses, products, and corporate events. High-quality images for marketing and branding needs.",
        "features": ["Product Photography", "Corporate Events", "Business Portraits", "Marketing Content", "Brand Photography", "Professional Headshots"],
        "image": "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/2w4tfdai_8X3A0565%20copy.jpg",
        "icon": "Briefcase",
        "color": "from-slate-600 to-gray-600",
        "order": 5,
        "isActive": True
    }
]

# Portfolio Data
portfolio_data = [
    # Wedding Portfolio
    {
        "title": "Spectacular Wedding Celebration",
        "category": "wedding",
        "image": "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/ocw386dq_DEV_4405%20copy.jpg",
        "description": "Wedding Ceremony",
        "order": 1,
        "isActive": True
    },
    {
        "title": "Traditional Bridal Portrait",
        "category": "wedding",
        "image": "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/2w4tfdai_8X3A0565%20copy.jpg",
        "description": "Bridal Photography",
        "order": 2,
        "isActive": True
    },
    {
        "title": "Romantic Couple Portrait",
        "category": "wedding",
        "image": "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/u6ki7yo7_8X3A0072%20copy.jpg",
        "description": "Couple Photography",
        "order": 3,
        "isActive": True
    },
    {
        "title": "Elegant Bridal Moments",
        "category": "wedding",
        "image": "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/tfl833jz_8X3A9993%20copy%202.jpg",
        "description": "Bridal Portraits",
        "order": 4,
        "isActive": True
    },
    
    # Pre-wedding Portfolio
    {
        "title": "Joyful Pre-Wedding Moments",
        "category": "prewedding",
        "image": "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/u6ki7yo7_8X3A0072%20copy.jpg",
        "description": "Pre-Wedding",
        "order": 1,
        "isActive": True
    },
    {
        "title": "Romantic Pre-Wedding Session",
        "category": "prewedding",
        "image": "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzU5MzExNzgyfDA&ixlib=rb-4.1.0&q=85",
        "description": "Outdoor Session",
        "order": 2,
        "isActive": True
    },
    
    # Cinematic Portfolio
    {
        "title": "Cinematic Portrait",
        "category": "cinematic",
        "image": "https://images.unsplash.com/photo-1638128807421-1fe4b5f4e7c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3NTkzMTE3ODd8MA&ixlib=rb-4.1.0&q=85",
        "description": "Portrait",
        "order": 1,
        "isActive": True
    },
    {
        "title": "Artistic Composition",
        "category": "cinematic",
        "image": "https://images.unsplash.com/photo-1645672508140-31ac457f089c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3NTkzMTE3ODd8MA&ixlib=rb-4.1.0&q=85",
        "description": "Creative",
        "order": 2,
        "isActive": True
    },
    
    # Maternity Portfolio
    {
        "title": "Beautiful Maternity Moments",
        "category": "maternity",
        "image": "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/tfl833jz_8X3A9993%20copy%202.jpg",
        "description": "Maternity",
        "order": 1,
        "isActive": True
    },
    {
        "title": "Gentle Family Portraits",
        "category": "maternity",
        "image": "https://images.unsplash.com/photo-1552819289-824d37ca69d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxuZXdib3JuJTIwYmFieXxlbnwwfHx8fDE3NTkzMTE3OTN8MA&ixlib=rb-4.1.0&q=85",
        "description": "Family",
        "order": 2,
        "isActive": True
    }
]

# Packages Data
packages_data = [
    {
        "name": "Essential Package",
        "price": "₹45,000",
        "duration": "6 Hours",
        "category": "wedding",
        "features": [
            "6 Hours Photography Coverage",
            "200+ High Resolution Photos",
            "Professional Photo Editing",
            "Online Gallery Access",
            "Mobile & Desktop Downloads",
            "Social Media Ready Photos"
        ],
        "popular": False,
        "color": "from-rose-500 to-pink-500",
        "order": 1,
        "isActive": True
    },
    {
        "name": "Premium Package",
        "price": "₹90,000",
        "duration": "Full Day",
        "category": "wedding",
        "features": [
            "Full Day Photography Coverage",
            "400+ High Resolution Photos",
            "Premium Photo Editing & Retouching",
            "Cinematic Photo Gallery",
            "Physical Photo Album (50 prints)",
            "Same Day Preview (30 photos)",
            "2 Hours Pre-wedding Shoot",
            "USB Drive with All Photos"
        ],
        "popular": True,
        "color": "from-purple-500 to-indigo-500",
        "order": 2,
        "isActive": True
    },
    {
        "name": "Luxury Package",
        "price": "₹1,50,000",
        "duration": "2 Days",
        "category": "wedding",
        "features": [
            "Complete Wedding Coverage (2 Days)",
            "600+ High Resolution Photos",
            "Premium Editing & Color Grading",
            "Luxury Photo Album (100 prints)",
            "4 Hours Pre-wedding Shoot",
            "Drone Photography (where permitted)",
            "Same Day Highlight Reel (50 photos)",
            "Premium USB Drive & Online Gallery",
            "Personal Photography Assistant"
        ],
        "popular": False,
        "color": "from-emerald-500 to-teal-500",
        "order": 3,
        "isActive": True
    },
    {
        "name": "Pre-Wedding Special",
        "price": "₹35,000",
        "duration": "4 Hours",
        "category": "prewedding",
        "features": [
            "4 Hours Location Photography",
            "100+ Edited High Resolution Photos",
            "2 Outfit Changes",
            "Creative Concept Development",
            "Professional Lighting Setup",
            "Online Gallery Access",
            "Print Release Rights"
        ],
        "popular": False,
        "color": "from-purple-500 to-pink-500",
        "order": 1,
        "isActive": True
    },
    {
        "name": "Maternity Package",
        "price": "₹25,000",
        "duration": "2 Hours",
        "category": "maternity",
        "features": [
            "2 Hours Studio/Outdoor Shoot",
            "50+ Edited High Resolution Photos",
            "Professional Lighting Setup",
            "Props & Styling Assistance",
            "Partner & Family Shots",
            "Online Gallery Access",
            "Print Release Rights"
        ],
        "popular": False,
        "color": "from-amber-500 to-orange-500",
        "order": 1,
        "isActive": True
    },
    {
        "name": "Commercial Package",
        "price": "₹40,000",
        "duration": "5 Hours",
        "category": "commercial",
        "features": [
            "5 Hours Commercial Shoot",
            "150+ High Resolution Photos",
            "Professional Editing",
            "Commercial Usage Rights",
            "Multiple Product/Brand Setups",
            "Fast 24-Hour Delivery",
            "Raw Files Included"
        ],
        "popular": False,
        "color": "from-slate-500 to-gray-500",
        "order": 1,
        "isActive": True
    }
]

# Testimonials Data
testimonials_data = [
    {
        "name": "Priya & Rahul Sharma",
        "event": "Wedding Photography",
        "rating": 5,
        "text": "Devendra's cinematic approach to our wedding photography was absolutely stunning! Every moment was captured with such artistry and emotion. The photos look like movie stills!",
        "image": "https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?w=100&h=100&fit=crop&crop=face",
        "location": "Pune, Maharashtra",
        "order": 1,
        "isActive": True
    },
    {
        "name": "Anita & Suresh Patil",
        "event": "Pre-Wedding & Wedding",
        "rating": 5,
        "text": "From our pre-wedding shoot to the wedding day, DSP Films exceeded all expectations. The attention to detail and the way they captured our traditional ceremonies was phenomenal.",
        "image": "https://images.unsplash.com/photo-1552819289-824d37ca69d2?w=100&h=100&fit=crop&crop=face",
        "location": "Mumbai, Maharashtra",
        "order": 2,
        "isActive": True
    },
    {
        "name": "Rohan & Kavya Desai",
        "event": "Maternity Photography",
        "rating": 5,
        "text": "The maternity photoshoot was a beautiful experience. Devendra made us feel so comfortable, and the results were breathtaking. We'll treasure these memories forever.",
        "image": "https://images.unsplash.com/photo-1646372751563-4f2cad64dd5b?w=100&h=100&fit=crop&crop=face",
        "location": "Nagpur, Maharashtra",
        "order": 3,
        "isActive": True
    }
]

async def seed_database():
    try:
        print("Starting database seeding...")
        
        # Clear existing data
        print("Clearing existing data...")
        await db.site_content.delete_many({})
        await db.services.delete_many({})
        await db.portfolio.delete_many({})
        await db.packages.delete_many({})
        await db.testimonials.delete_many({})
        
        # Add timestamps to all data
        current_time = datetime.utcnow()
        
        # Seed site content
        print("Seeding site content...")
        for content in site_content_data:
            content["createdAt"] = current_time
            content["updatedAt"] = current_time
        await db.site_content.insert_many(site_content_data)
        
        # Seed services
        print("Seeding services...")
        for service in services_data:
            service["createdAt"] = current_time
            service["updatedAt"] = current_time
        await db.services.insert_many(services_data)
        
        # Seed portfolio
        print("Seeding portfolio...")
        for item in portfolio_data:
            item["createdAt"] = current_time
            item["updatedAt"] = current_time
        await db.portfolio.insert_many(portfolio_data)
        
        # Seed packages
        print("Seeding packages...")
        for package in packages_data:
            package["createdAt"] = current_time
            package["updatedAt"] = current_time
        await db.packages.insert_many(packages_data)
        
        # Seed testimonials
        print("Seeding testimonials...")
        for testimonial in testimonials_data:
            testimonial["createdAt"] = current_time
            testimonial["updatedAt"] = current_time
        await db.testimonials.insert_many(testimonials_data)
        
        print("Database seeding completed successfully!")
        
        # Print summary
        content_count = await db.site_content.count_documents({})
        services_count = await db.services.count_documents({})
        portfolio_count = await db.portfolio.count_documents({})
        packages_count = await db.packages.count_documents({})
        testimonials_count = await db.testimonials.count_documents({})
        
        print(f"Seeded records:")
        print(f"- Site Content: {content_count}")
        print(f"- Services: {services_count}")
        print(f"- Portfolio: {portfolio_count}")
        print(f"- Packages: {packages_count}")
        print(f"- Testimonials: {testimonials_count}")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
#!/usr/bin/env python3
"""
CLI Photography Site Generator
Quick command-line version of the site generator
"""

import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from generator import generate_site, sanitize_name
import secrets


def print_header():
    print("=" * 70)
    print("📸 PHOTOGRAPHY SITE GENERATOR - CLI VERSION")
    print("=" * 70)
    print()


def get_input(prompt, default='', required=False):
    """Get user input with optional default"""
    if default:
        prompt_text = f"{prompt} [{default}]: "
    else:
        prompt_text = f"{prompt}: "
    
    value = input(prompt_text).strip()
    
    if not value and default:
        return default
    
    if required and not value:
        print("⚠️  This field is required!")
        return get_input(prompt, default, required)
    
    return value


def main():
    print_header()
    
    print("This will generate a complete photography business website.")
    print("You'll need:")
    print("  - Business name")
    print("  - Logo file (PNG/JPG)")
    print("  - Basic business information")
    print()
    input("Press Enter to continue...")
    print()
    
    # Collect information
    print("📋 BUSINESS INFORMATION")
    print("-" * 70)
    
    business_name = get_input("Business Name", required=True)
    owner_name = get_input("Owner Name", business_name)
    email = get_input("Email", f"hello@{sanitize_name(business_name)}.com")
    phone = get_input("Phone (optional)")
    tagline = get_input("Tagline", "Capturing Life's Beautiful Moments")
    
    print()
    print("📍 LOCATION")
    print("-" * 70)
    
    city = get_input("City")
    state = get_input("State/Province")
    country = get_input("Country", "United States")
    
    print()
    print("🎨 BRANDING")
    print("-" * 70)
    
    logo_path = get_input("Logo File Path", required=True)
    while not os.path.exists(logo_path):
        print(f"⚠️  File not found: {logo_path}")
        logo_path = get_input("Logo File Path", required=True)
    
    primary_color = get_input("Primary Color (hex)", "#1a1a1a")
    accent_color = get_input("Accent Color (hex)", "#d4af37")
    
    print()
    print("🌐 SOCIAL MEDIA (Optional)")
    print("-" * 70)
    
    instagram = get_input("Instagram URL")
    facebook = get_input("Facebook URL")
    
    print()
    print("💾 DATABASE")
    print("-" * 70)
    
    mongo_url = get_input("MongoDB Connection String", "mongodb://localhost:27017/")
    
    # Prepare data
    business_data = {
        'name': business_name,
        'tagline': tagline,
        'owner_name': owner_name,
        'email': email,
        'phone': phone,
        'city': city,
        'state': state,
        'country': country,
        'primary_color': primary_color,
        'accent_color': accent_color,
        'mongo_url': mongo_url,
        'instagram': instagram,
        'facebook': facebook
    }
    
    # Summary
    print()
    print("=" * 70)
    print("📊 SUMMARY")
    print("=" * 70)
    print(f"Business: {business_name}")
    print(f"Owner: {owner_name}")
    print(f"Email: {email}")
    print(f"Location: {city}, {state}, {country}")
    print(f"Logo: {logo_path}")
    print(f"Colors: {primary_color} / {accent_color}")
    print(f"Database: {sanitize_name(business_name).replace('-', '_')}")
    print("=" * 70)
    print()
    
    confirm = get_input("Generate site? (yes/no)", "yes")
    if confirm.lower() not in ['yes', 'y']:
        print("❌ Generation cancelled.")
        return
    
    # Generate
    print()
    print("🚀 Generating site...")
    print()
    
    # Open logo file
    class LogoFile:
        def __init__(self, path):
            self.filename = os.path.basename(path)
            self._path = path
        
        def save(self, destination):
            import shutil
            shutil.copy(self._path, destination)
    
    logo_file = LogoFile(logo_path)
    
    result = generate_site(business_data, logo_file)
    
    if result['success']:
        print("✅ Site generated successfully!")
        print()
        print("📦 Output:")
        print(f"   Project: {result['project_name']}")
        print(f"   Location: {result['project_dir']}")
        print(f"   ZIP File: {result['zip_file']}")
        print()
        print("🔐 Security:")
        print(f"   JWT Secret: {result['secrets']['jwt_secret'][:20]}...")
        print(f"   Emergency Key: {result['secrets']['emergency_key'][:10]}...")
        print(f"   (Full secrets in backend/.env)")
        print()
        print("💾 Database:")
        print(f"   Database Name: {result['db_name']}")
        print()
        print("📋 Next Steps:")
        print("   1. Extract the ZIP file")
        print("   2. Follow SETUP_INSTRUCTIONS.txt")
        print("   3. Install dependencies")
        print("   4. Start backend and frontend")
        print("   5. Create admin user")
        print("   6. Login to admin panel")
        print()
        print(f"📖 Documentation: {result['project_dir']}/template/docs/")
        print()
        print("=" * 70)
        print(f"🎉 {business_name} site is ready!")
        print("=" * 70)
    else:
        print(f"❌ Error: {result['error']}")
        return 1
    
    return 0


if __name__ == '__main__':
    try:
        exit_code = main()
        sys.exit(exit_code or 0)
    except KeyboardInterrupt:
        print("\n\n❌ Generation cancelled by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

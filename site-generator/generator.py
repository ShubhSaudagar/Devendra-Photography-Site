#!/usr/bin/env python3
"""
Photography Site Generator
Automated site generation from template with business name and logo
"""

import os
import json
import shutil
import secrets
import subprocess
from pathlib import Path
from datetime import datetime
from flask import Flask, request, render_template, jsonify, send_file
from werkzeug.utils import secure_filename
from PIL import Image
import zipfile

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['OUTPUT_FOLDER'] = 'generated'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure folders exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'svg'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def sanitize_name(name):
    """Convert business name to safe directory name"""
    return name.lower().replace(' ', '-').replace("'", '').replace('.', '')


def generate_secrets():
    """Generate secure secrets for new site"""
    return {
        'jwt_secret': secrets.token_hex(32),
        'emergency_key': secrets.token_hex(16)
    }


def process_logo(logo_path, output_dir):
    """Process and optimize logo for web"""
    try:
        with Image.open(logo_path) as img:
            # Convert to RGB if needed
            if img.mode in ('RGBA', 'LA', 'P'):
                # Keep transparency for PNG
                pass
            
            # Create different sizes
            sizes = {
                'logo.png': (500, 200),
                'logo-small.png': (200, 80),
                'favicon.ico': (32, 32)
            }
            
            for filename, size in sizes.items():
                # Maintain aspect ratio
                img.thumbnail(size, Image.Resampling.LANCZOS)
                output_path = os.path.join(output_dir, filename)
                
                if filename.endswith('.ico'):
                    img.save(output_path, format='ICO')
                else:
                    img.save(output_path, format='PNG', optimize=True)
            
            return True
    except Exception as e:
        print(f"Error processing logo: {e}")
        return False


def create_business_config(business_data):
    """Create business configuration JSON"""
    return {
        "business": {
            "name": business_data['name'],
            "tagline": business_data.get('tagline', 'Capturing Life\'s Beautiful Moments'),
            "description": business_data.get('description', 'Professional photography services'),
            "owner": {
                "name": business_data.get('owner_name', business_data['name']),
                "email": business_data.get('email', f"hello@{sanitize_name(business_data['name'])}.com"),
                "phone": business_data.get('phone', '')
            },
            "location": {
                "city": business_data.get('city', ''),
                "state": business_data.get('state', ''),
                "country": business_data.get('country', 'United States'),
                "timezone": business_data.get('timezone', 'America/New_York')
            },
            "social": {
                "instagram": business_data.get('instagram', ''),
                "facebook": business_data.get('facebook', ''),
                "twitter": business_data.get('twitter', ''),
                "youtube": business_data.get('youtube', '')
            }
        },
        "branding": {
            "logo": "/assets/logo.png",
            "favicon": "/assets/favicon.ico",
            "primaryColor": business_data.get('primary_color', '#1a1a1a'),
            "secondaryColor": business_data.get('secondary_color', '#f5f5f5'),
            "accentColor": business_data.get('accent_color', '#d4af37'),
            "fontFamily": business_data.get('font_family', 'Inter, sans-serif')
        },
        "features": {
            "enableBlog": True,
            "enableVideos": True,
            "enableBooking": True,
            "enablePackages": True,
            "enableTestimonials": True,
            "enableAnalytics": True,
            "enableAIContentGeneration": False,
            "enableMultiLanguage": False
        },
        "services": [
            {"id": "weddings", "name": "Wedding Photography", "enabled": True},
            {"id": "portraits", "name": "Portrait Photography", "enabled": True},
            {"id": "events", "name": "Event Photography", "enabled": True},
            {"id": "commercial", "name": "Commercial Photography", "enabled": False}
        ],
        "booking": {
            "requireApproval": True,
            "advanceBookingDays": 30,
            "maxBookingsPerDay": 3,
            "workingHours": {"start": "09:00", "end": "18:00"},
            "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "depositPercentage": 30,
            "cancellationPolicyDays": 7
        },
        "seo": {
            "metaTitle": f"{business_data['name']} | Professional Photography Services",
            "metaDescription": f"Professional photography services by {business_data['name']}",
            "keywords": [
                "photography",
                "wedding photographer",
                "portrait photographer",
                business_data.get('city', 'professional photographer')
            ]
        }
    }


def create_env_files(project_dir, business_data, secrets_data):
    """Create environment files for backend and frontend"""
    db_name = sanitize_name(business_data['name']).replace('-', '_')
    
    # Backend .env
    backend_env = f"""# Database
MONGO_URL={business_data.get('mongo_url', 'mongodb://localhost:27017/')}
DB_NAME={db_name}

# Security
JWT_SECRET={secrets_data['jwt_secret']}
EMERGENCY_RESET_KEY={secrets_data['emergency_key']}

# Environment
ENVIRONMENT=development
FRONTEND_URL=http://localhost:3000

# Server
PORT=8000

# Optional: AI Content Generation
GROQ_API_KEY=
GEMINI_API_KEY=
"""
    
    # Frontend .env
    frontend_env = f"""REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_BUSINESS_NAME={business_data['name']}
"""
    
    # Write files
    with open(os.path.join(project_dir, 'backend', '.env'), 'w') as f:
        f.write(backend_env)
    
    with open(os.path.join(project_dir, 'frontend', '.env'), 'w') as f:
        f.write(frontend_env)


def create_readme(project_dir, business_data):
    """Create customized README for the client project"""
    readme_content = f"""# {business_data['name']} - Photography Website

## Overview

Professional photography website and admin panel for **{business_data['name']}**.

**Features:**
- Client booking system
- Package management
- Portfolio galleries
- Blog and content management
- Analytics dashboard
- Admin panel with role-based access

---

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend runs on http://localhost:8000

### Frontend

```bash
cd frontend
yarn install
yarn start
```

Frontend runs on http://localhost:3000

### Admin Panel

Access: http://localhost:3000/admin

**Default Admin:**
- Email: {business_data.get('email', 'admin@example.com')}
- Password: (set during setup)

---

## Configuration

Edit `config/business.json` to customize:
- Business information
- Branding (colors, fonts)
- Services offered
- Booking settings

---

## Deployment

### Automatic Deployment (Recommended)

Push to GitHub main branch to auto-deploy:
- Backend → Render
- Frontend → Vercel

See `GITHUB_DEPLOYMENT_SETUP.md` for details.

### Manual Deployment

See `DEPLOYMENT_GUIDE.md` for manual deployment instructions.

---

## Documentation

- Setup Guide: `template/docs/SETUP_GUIDE.md`
- Customization: `template/docs/CUSTOMIZATION_GUIDE.md`
- Database Schema: `template/docs/DATABASE_SCHEMA.md`
- API Reference: `docs/API_REFERENCE.md`

---

## Support

For technical support or questions about this installation:
1. Check the documentation
2. Review troubleshooting guide
3. Contact your developer

---

**Generated:** {datetime.now().strftime('%B %d, %Y')}  
**Template Version:** 1.0.0
"""
    
    with open(os.path.join(project_dir, 'README.md'), 'w') as f:
        f.write(readme_content)


def generate_site(business_data, logo_file=None):
    """
    Generate a complete site from template
    
    Args:
        business_data: Dict with business information
        logo_file: Uploaded logo file
        
    Returns:
        Dict with generation results
    """
    try:
        # Create project directory
        project_name = sanitize_name(business_data['name'])
        project_dir = os.path.join(app.config['OUTPUT_FOLDER'], project_name)
        
        if os.path.exists(project_dir):
            shutil.rmtree(project_dir)
        
        # Copy template
        template_base = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
        
        # Copy backend
        shutil.copytree(
            os.path.join(template_base, 'backend'),
            os.path.join(project_dir, 'backend'),
            ignore=shutil.ignore_patterns('__pycache__', '*.pyc', '.env', 'uploads/*', '*.log')
        )
        
        # Copy frontend
        shutil.copytree(
            os.path.join(template_base, 'frontend'),
            os.path.join(project_dir, 'frontend'),
            ignore=shutil.ignore_patterns('node_modules', 'build', '.env', 'yarn.lock')
        )
        
        # Copy configuration files
        for file in ['render.yaml', 'vercel.json', '.gitignore']:
            src = os.path.join(template_base, file)
            if os.path.exists(src):
                shutil.copy(src, project_dir)
        
        # Copy documentation
        shutil.copytree(
            os.path.join(template_base, 'template'),
            os.path.join(project_dir, 'template')
        )
        
        # Copy deployment guides
        for doc in ['GITHUB_DEPLOYMENT_SETUP.md', 'DEPLOYMENT_CHECKLIST.md', 'AUTH_IMPLEMENTATION_GUIDE.md']:
            src = os.path.join(template_base, doc)
            if os.path.exists(src):
                shutil.copy(src, project_dir)
        
        # Create config directory
        config_dir = os.path.join(project_dir, 'config')
        os.makedirs(config_dir, exist_ok=True)
        
        # Generate and save business config
        business_config = create_business_config(business_data)
        with open(os.path.join(config_dir, 'business.json'), 'w') as f:
            json.dump(business_config, f, indent=2)
        
        # Generate secrets
        secrets_data = generate_secrets()
        
        # Create environment files
        create_env_files(project_dir, business_data, secrets_data)
        
        # Process logo if provided
        if logo_file:
            assets_dir = os.path.join(project_dir, 'frontend', 'public', 'assets')
            os.makedirs(assets_dir, exist_ok=True)
            
            logo_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(logo_file.filename))
            logo_file.save(logo_path)
            
            process_logo(logo_path, assets_dir)
            os.remove(logo_path)
        
        # Create customized README
        create_readme(project_dir, business_data)
        
        # Create setup instructions file
        setup_file = os.path.join(project_dir, 'SETUP_INSTRUCTIONS.txt')
        with open(setup_file, 'w') as f:
            f.write(f"""
{business_data['name']} - Setup Instructions
{'=' * 60}

Your photography website has been generated!

NEXT STEPS:
-----------

1. Install Dependencies:

   Backend:
   cd backend
   pip install -r requirements.txt

   Frontend:
   cd frontend
   yarn install

2. Start Development Servers:

   Backend (Terminal 1):
   cd backend
   python main.py
   → Runs on http://localhost:8000

   Frontend (Terminal 2):
   cd frontend
   yarn start
   → Runs on http://localhost:3000

3. Create Admin User:

   curl -X POST http://localhost:8000/api/admin/auth/create-initial-admin \\
     -H "Content-Type: application/json" \\
     -d '{{"email":"{business_data.get('email', 'admin@example.com')}","password":"YourSecurePassword123!","name":"{business_data.get('owner_name', 'Admin')}"}}' 

4. Login to Admin Panel:

   URL: http://localhost:3000/admin
   Email: {business_data.get('email', 'admin@example.com')}
   Password: (password you just set)

5. Customize Your Site:

   - Upload logo (if not already done)
   - Set color scheme
   - Add services and packages
   - Upload portfolio
   - Configure booking settings

6. Deploy to Production:

   Follow GITHUB_DEPLOYMENT_SETUP.md for automated deployment

SECURITY NOTES:
--------------

JWT Secret: {secrets_data['jwt_secret'][:20]}...
Emergency Key: {secrets_data['emergency_key'][:10]}...

(Full secrets are in backend/.env - keep secure!)

DATABASE:
---------

Database Name: {sanitize_name(business_data['name']).replace('-', '_')}
MongoDB URL: {business_data.get('mongo_url', 'mongodb://localhost:27017/')}

DOCUMENTATION:
-------------

- Complete Setup: template/docs/SETUP_GUIDE.md
- Customization: template/docs/CUSTOMIZATION_GUIDE.md
- Database Schema: template/docs/DATABASE_SCHEMA.md
- Deployment: GITHUB_DEPLOYMENT_SETUP.md

SUPPORT:
--------

If you encounter any issues:
1. Check the documentation
2. Review backend logs
3. Check browser console
4. Contact your developer

Generated: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}
""")
        
        # Create ZIP archive
        zip_path = os.path.join(app.config['OUTPUT_FOLDER'], f'{project_name}.zip')
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(project_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, os.path.join(project_dir, '..'))
                    zipf.write(file_path, arcname)
        
        return {
            'success': True,
            'project_name': project_name,
            'project_dir': project_dir,
            'zip_file': zip_path,
            'secrets': secrets_data,
            'db_name': sanitize_name(business_data['name']).replace('-', '_')
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }


@app.route('/')
def index():
    """Main generator interface"""
    return render_template('index.html')


@app.route('/generate', methods=['POST'])
def generate():
    """Handle site generation request"""
    try:
        # Get form data
        business_data = {
            'name': request.form.get('business_name'),
            'tagline': request.form.get('tagline', ''),
            'owner_name': request.form.get('owner_name', ''),
            'email': request.form.get('email', ''),
            'phone': request.form.get('phone', ''),
            'city': request.form.get('city', ''),
            'state': request.form.get('state', ''),
            'country': request.form.get('country', 'United States'),
            'primary_color': request.form.get('primary_color', '#1a1a1a'),
            'accent_color': request.form.get('accent_color', '#d4af37'),
            'mongo_url': request.form.get('mongo_url', 'mongodb://localhost:27017/'),
            'instagram': request.form.get('instagram', ''),
            'facebook': request.form.get('facebook', '')
        }
        
        # Validate required fields
        if not business_data['name']:
            return jsonify({'success': False, 'error': 'Business name is required'}), 400
        
        # Handle logo upload
        logo_file = None
        if 'logo' in request.files:
            file = request.files['logo']
            if file and file.filename and allowed_file(file.filename):
                logo_file = file
        
        # Generate site
        result = generate_site(business_data, logo_file)
        
        if result['success']:
            return jsonify({
                'success': True,
                'project_name': result['project_name'],
                'download_url': f'/download/{result["project_name"]}',
                'db_name': result['db_name'],
                'message': f'Site generated successfully for {business_data["name"]}!'
            })
        else:
            return jsonify({'success': False, 'error': result['error']}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/download/<project_name>')
def download(project_name):
    """Download generated site ZIP"""
    try:
        zip_path = os.path.join(app.config['OUTPUT_FOLDER'], f'{project_name}.zip')
        if os.path.exists(zip_path):
            return send_file(
                zip_path,
                as_attachment=True,
                download_name=f'{project_name}-photography-site.zip'
            )
        else:
            return jsonify({'error': 'Project not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print("=" * 60)
    print("Photography Site Generator")
    print("=" * 60)
    print("\n🚀 Starting site generator server...")
    print("📱 Open: http://localhost:5001")
    print("\n✨ Generate new photography sites with just a name and logo!")
    print("=" * 60)
    print()
    
    app.run(debug=True, host='0.0.0.0', port=5001)

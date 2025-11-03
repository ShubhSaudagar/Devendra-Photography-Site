# Photography Site Generator

Automated website generator that creates complete photography business sites from the template with just a business name and logo.

## 🚀 Quick Start

### Install Dependencies

```bash
cd site-generator
pip install -r requirements.txt
```

### Run Generator

```bash
python generator.py
```

Open http://localhost:5001 in your browser.

## 📝 How to Use

1. **Fill in Business Information**
   - Business name (required)
   - Owner name, email, phone
   - Location

2. **Upload Logo** (required)
   - PNG, JPG, or SVG
   - Recommended: Transparent PNG, 500x200px
   - Auto-generates favicon and different sizes

3. **Configure Branding**
   - Choose primary color (brand color)
   - Choose accent color (call-to-action)

4. **Add Social Media** (optional)
   - Instagram, Facebook links

5. **Database Configuration**
   - MongoDB connection string
   - Default: local MongoDB

6. **Click "Generate Site"**
   - Waits a few seconds
   - Downloads ZIP file with complete site

## 📦 What Gets Generated

The generator creates a complete, ready-to-use photography business website:

### Project Structure
```
{business-name}/
├── backend/              # FastAPI backend
│   ├── server.py
│   ├── auth.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env             # Auto-generated with secrets
├── frontend/            # React frontend
│   ├── src/
│   ├── public/
│   │   └── assets/
│   │       ├── logo.png
│   │       ├── logo-small.png
│   │       └── favicon.ico
│   ├── package.json
│   └── .env             # Auto-generated
├── config/
│   └── business.json    # Business configuration
├── template/            # Documentation
├── .gitignore
├── render.yaml          # Render deployment
├── vercel.json          # Vercel deployment
├── README.md            # Customized README
└── SETUP_INSTRUCTIONS.txt  # Quick start guide
```

### Features Included

✅ **Complete admin panel** with client booking, package management, media uploads  
✅ **Authentication system** with JWT + session cookies  
✅ **Database schema** with 17 collections  
✅ **Deployment automation** for Render and Vercel  
✅ **Auto-generated secrets** (JWT, emergency key)  
✅ **Logo optimization** (multiple sizes, favicon)  
✅ **Business configuration** with all details  
✅ **Environment files** for both backend and frontend  
✅ **Setup instructions** with exact commands  
✅ **Documentation** (setup, customization, deployment)

## 🎨 Customization

### Business Name
- Used for database name
- Used in README
- Used throughout configuration

### Logo
- Automatically resized to:
  - `logo.png` (500x200px)
  - `logo-small.png` (200x80px)
  - `favicon.ico` (32x32px)
- Optimized for web

### Colors
- Primary color: Main brand color
- Accent color: Call-to-action highlights
- Automatically applied to configuration

### Auto-Generated Secrets
- **JWT Secret**: 32-byte random hex (secure token generation)
- **Emergency Key**: 16-byte random hex (admin reset)
- Saved in `backend/.env`

## 📋 After Generation

### 1. Extract ZIP File

```bash
unzip {business-name}-photography-site.zip
cd {business-name}
```

### 2. Follow SETUP_INSTRUCTIONS.txt

The file contains:
- Exact commands to run
- Admin user creation command
- Login credentials
- Database information
- Security secrets
- Next steps

### 3. Start Development

```bash
# Backend
cd backend
pip install -r requirements.txt
python main.py

# Frontend (new terminal)
cd frontend
yarn install
yarn start
```

### 4. Create Admin User

```bash
curl -X POST http://localhost:8000/api/admin/auth/create-initial-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"SecurePass123!","name":"Admin"}'
```

### 5. Login

- URL: http://localhost:3000/admin
- Use credentials from step 4

## 🚀 Deployment

Each generated site includes:

- **GitHub Actions** workflows for auto-deployment
- **Render.yaml** for backend deployment
- **Vercel.json** for frontend deployment
- **Complete deployment guide** (GITHUB_DEPLOYMENT_SETUP.md)

Just push to GitHub main branch to auto-deploy!

## 🔧 Advanced Options

### Custom MongoDB

Edit the MongoDB URL field:
```
mongodb+srv://username:password@cluster.mongodb.net/
```

### Add Services

Edit `config/business.json` in generated site:
```json
{
  "services": [
    {"id": "weddings", "name": "Wedding Photography", "enabled": true},
    {"id": "custom", "name": "Your Custom Service", "enabled": true}
  ]
}
```

### Modify Features

Enable/disable features in `config/business.json`:
```json
{
  "features": {
    "enableBlog": true,
    "enableBooking": true,
    "enablePackages": true,
    "enableAIContentGeneration": false
  }
}
```

## 🎯 Use Cases

**Agency/Freelancer:**
- Generate sites for multiple photography clients
- Quick turnaround (< 5 minutes per client)
- Fully customized branding per client

**Photography Business:**
- Create main site + secondary sites for different services
- Test different branding/colors
- Staging environments

**Template Reseller:**
- Sell customized photography sites
- White-label for clients
- Automated delivery

## 📊 Generator Statistics

Each generation:
- **Time**: ~10-30 seconds
- **Files created**: 100+
- **Lines of code**: 15,000+
- **Features**: 50+ admin features
- **Collections**: 17 database collections
- **API endpoints**: 60+

## 🔒 Security

### Auto-Generated Secrets

Each site gets unique:
- JWT secret (64 characters, hex)
- Emergency reset key (32 characters, hex)

### Environment Isolation

Each generated site has:
- Separate `.env` files
- Unique database name
- Independent configuration

### Best Practices

Generated sites follow:
- Bcrypt password hashing
- JWT + cookie authentication
- CORS protection
- XSS prevention
- SQL injection protection

## 📚 Generated Documentation

Each site includes:
- **README.md** - Customized overview
- **SETUP_INSTRUCTIONS.txt** - Quick start
- **template/docs/SETUP_GUIDE.md** - Complete setup
- **template/docs/CUSTOMIZATION_GUIDE.md** - Customization
- **template/docs/DATABASE_SCHEMA.md** - Database structure
- **GITHUB_DEPLOYMENT_SETUP.md** - Deployment guide

## 🆘 Troubleshooting

### Logo Not Processing

**Issue**: Logo doesn't appear in generated site  
**Solution**: Use PNG format, ensure file is valid image

### Generation Fails

**Issue**: Error during generation  
**Solution**: 
1. Check all required fields filled
2. Ensure valid logo file
3. Check console for error details

### Can't Download ZIP

**Issue**: Download link doesn't work  
**Solution**: Check `site-generator/generated/` folder for ZIP file

## 💡 Tips

1. **Logo Quality**: Use high-resolution logo (at least 500x200px)
2. **Transparent Background**: PNG with transparency looks best
3. **Color Scheme**: Choose colors that match logo
4. **Business Name**: Use official business name for consistency
5. **MongoDB**: Use MongoDB Atlas for production

## 🎉 Quick Demo

Generate a test site in 30 seconds:

1. Business Name: "Test Photography"
2. Upload any PNG logo
3. Keep all default settings
4. Click "Generate Site"
5. Download ZIP
6. Extract and follow SETUP_INSTRUCTIONS.txt

## 📞 Support

For issues with the generator:
1. Check this README
2. Review generated SETUP_INSTRUCTIONS.txt
3. Check console logs
4. Verify all dependencies installed

---

**Ready to generate photography sites!** 🚀

Open http://localhost:5001 and start creating!

# Complete Setup Guide - Photography Admin Template

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Business Configuration](#business-configuration)
4. [Database Setup](#database-setup)
5. [Backend Configuration](#backend-configuration)
6. [Frontend Configuration](#frontend-configuration)
7. [Admin User Creation](#admin-user-creation)
8. [Theme Customization](#theme-customization)
9. [Service & Package Setup](#service--package-setup)
10. [Integration Setup](#integration-setup)
11. [Testing](#testing)
12. [Production Deployment](#production-deployment)

---

## Prerequisites

### Required Software

- **Python 3.11 or higher**
  ```bash
  python --version
  ```

- **Node.js 18 or higher**
  ```bash
  node --version
  ```

- **Git**
  ```bash
  git --version
  ```

- **MongoDB** (Choose one):
  - MongoDB Atlas (Recommended for production)
  - Local MongoDB installation

### Recommended Tools

- **VS Code** or your preferred code editor
- **Postman** or **Insomnia** for API testing
- **MongoDB Compass** for database management

---

## Initial Setup

### 1. Clone the Template

```bash
# Clone the repository
git clone <your-template-repo-url> my-photography-business
cd my-photography-business

# Create a new Git repository for your client
rm -rf .git
git init
git add .
git commit -m "Initial commit - Photography Admin Template"
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

**Frontend:**
```bash
cd frontend
yarn install
# or npm install
cd ..
```

---

## Business Configuration

### 1. Copy Configuration Template

```bash
cp template/config/business.config.json config/business.json
```

### 2. Edit Business Details

Open `config/business.json` and update:

```json
{
  "business": {
    "name": "Acme Photography Studio",
    "tagline": "Capturing Your Perfect Moments",
    "description": "Award-winning wedding and portrait photography",
    "owner": {
      "name": "John Doe",
      "email": "hello@acmephoto.com",
      "phone": "+1 555-123-4567"
    },
    "location": {
      "city": "San Francisco",
      "state": "California",
      "country": "United States",
      "timezone": "America/Los_Angeles"
    }
  }
}
```

### 3. Configure Branding

```json
{
  "branding": {
    "logo": "/assets/acme-logo.png",
    "favicon": "/assets/favicon.ico",
    "primaryColor": "#2c3e50",
    "secondaryColor": "#ecf0f1",
    "accentColor": "#e74c3c",
    "fontFamily": "Montserrat, sans-serif"
  }
}
```

### 4. Enable/Disable Features

```json
{
  "features": {
    "enableBlog": true,
    "enableVideos": true,
    "enableBooking": true,
    "enablePackages": true,
    "enableTestimonials": true,
    "enableAnalytics": true,
    "enableAIContentGeneration": false
  }
}
```

---

## Database Setup

### Option 1: MongoDB Atlas (Recommended)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier
   - Select region closest to your users
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password
   - Grant "Read and write to any database"

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)
   - For production, add specific IPs

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string:
     ```
     mongodb+srv://username:password@cluster.mongodb.net/
     ```

### Option 2: Local MongoDB

```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt install mongodb
sudo systemctl start mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

Connection string for local:
```
mongodb://localhost:27017/
```

---

## Backend Configuration

### 1. Generate Security Secrets

```bash
# Generate JWT secret (copy the output)
python -c "import secrets; print(secrets.token_hex(32))"

# Generate emergency reset key (copy the output)
python -c "import secrets; print(secrets.token_hex(16))"
```

### 2. Create Environment File

Create `backend/.env`:

```bash
# Database
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=acme_photography

# Security
JWT_SECRET=<paste-generated-jwt-secret>
EMERGENCY_RESET_KEY=<paste-generated-reset-key>

# Environment
ENVIRONMENT=development
FRONTEND_URL=http://localhost:3000

# Optional: AI Content Generation
GROQ_API_KEY=
GEMINI_API_KEY=

# Optional: Port
PORT=8000
```

### 3. Test Backend

```bash
cd backend
python main.py
```

You should see:
```
✅ Upload directory active at: backend/uploads
✅ Auth router included: /api/admin/auth
🚀 Starting DSP Photography API on 0.0.0.0:8000
```

Test the health endpoint:
```bash
curl http://localhost:8000/api/health
```

---

## Frontend Configuration

### 1. Create Environment File

Create `frontend/.env`:

```bash
REACT_APP_BACKEND_URL=http://localhost:8000
```

### 2. Update Business Info in Code

Edit `frontend/src/data/business.js`:

```javascript
export const businessConfig = {
  name: "Acme Photography Studio",
  tagline: "Capturing Your Perfect Moments",
  logo: "/assets/acme-logo.png",
  primaryColor: "#2c3e50",
  accentColor: "#e74c3c"
};
```

### 3. Test Frontend

```bash
cd frontend
yarn start
```

Frontend should open at http://localhost:3000

---

## Admin User Creation

### 1. Create Initial Admin

**Using cURL:**
```bash
curl -X POST http://localhost:8000/api/admin/auth/create-initial-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@acmephoto.com",
    "password": "SecurePassword123!",
    "name": "Admin User"
  }'
```

**Or using Postman:**
- Method: POST
- URL: `http://localhost:8000/api/admin/auth/create-initial-admin`
- Body (JSON):
  ```json
  {
    "email": "admin@acmephoto.com",
    "password": "SecurePassword123!",
    "name": "Admin User"
  }
  ```

### 2. Login to Admin Panel

1. Go to http://localhost:3000/admin
2. Enter your admin credentials
3. You'll be redirected to the dashboard

---

## Theme Customization

### 1. Upload Logo

1. Login to admin panel
2. Go to **Settings** → **Theme**
3. Upload your logo (recommended: PNG with transparent background)
4. Set logo dimensions

### 2. Configure Colors

1. In Theme settings:
   - Primary Color: Main brand color
   - Secondary Color: Background color
   - Accent Color: Call-to-action color
2. Preview changes in real-time
3. Click "Save Theme"

### 3. Select Fonts

1. Choose from available Google Fonts:
   - Montserrat
   - Roboto
   - Playfair Display
   - Lora
   - Inter
2. Preview and save

---

## Service & Package Setup

### 1. Define Services

1. Go to **Content** → **Services**
2. Click "Add Service"
3. Fill in details:
   ```
   Title: Wedding Photography
   Description: Full-day wedding coverage
   Features:
     - 8 hours coverage
     - Two photographers
     - 500+ edited photos
     - Online gallery
   Icon: camera
   Color: #e74c3c
   ```

### 2. Create Packages

1. Go to **Packages** → **Manage Packages**
2. Click "Create Package"
3. Example package:
   ```
   Name: Premium Wedding Package
   Price: $3,500
   Description: Complete wedding photography experience
   Features:
     - 10 hours coverage
     - Two photographers
     - Engagement session
     - 800+ edited photos
     - Premium album
     - USB drive
   Category: Wedding
   ```

### 3. Set Up Booking Options

1. Go to **Settings** → **Booking**
2. Configure:
   - Working hours
   - Working days
   - Advance booking period
   - Deposit percentage
   - Cancellation policy

---

## Integration Setup

### Stripe Payment Processing

1. **Get Stripe Keys:**
   - Sign up at https://stripe.com
   - Go to Developers → API keys
   - Copy Publishable key and Secret key

2. **Configure in Admin:**
   - Go to **Settings** → **Integrations**
   - Enable Stripe
   - Enter API keys
   - Save

### Google Calendar Sync

1. **Enable Google Calendar API:**
   - Go to https://console.cloud.google.com
   - Create project
   - Enable Calendar API
   - Create credentials

2. **Configure in Admin:**
   - Go to **Settings** → **Integrations**
   - Enable Google Calendar
   - Enter Calendar ID
   - Save

### Email Notifications

1. **Mailchimp (Optional):**
   - Get API key from Mailchimp
   - Configure in Settings → Integrations

2. **SMTP (Required):**
   - Configure in backend/.env:
     ```
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_USER=your-email@gmail.com
     SMTP_PASSWORD=your-app-password
     ```

---

## Testing

### 1. Test Authentication

```bash
# Login
curl -X POST http://localhost:8000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@acmephoto.com",
    "password": "SecurePassword123!"
  }'
```

### 2. Test Booking Creation

1. Go to public website
2. Navigate to Booking page
3. Fill out booking form
4. Submit
5. Check admin panel for new booking request

### 3. Test Package Management

1. Create a package
2. View on public website
3. Edit package details
4. Deactivate package
5. Verify it's hidden on public site

### 4. Test Media Upload

1. Go to **Gallery** → **Upload**
2. Upload test images
3. Organize into categories
4. View on public portfolio

---

## Production Deployment

### 1. Environment Variables

**Backend (.env.production):**
```bash
MONGO_URL=mongodb+srv://prod-user:password@cluster.mongodb.net/
DB_NAME=acme_photography_prod
JWT_SECRET=<new-production-secret>
EMERGENCY_RESET_KEY=<new-production-key>
ENVIRONMENT=production
FRONTEND_URL=https://acmephoto.com
PORT=8000
```

**Frontend (.env.production):**
```bash
REACT_APP_BACKEND_URL=https://api.acmephoto.com
```

### 2. Deploy to Render (Backend)

1. Push code to GitHub
2. Create Render service
3. Connect GitHub repository
4. Add environment variables
5. Deploy

See `GITHUB_DEPLOYMENT_SETUP.md` for automated deployment.

### 3. Deploy to Vercel (Frontend)

1. Connect GitHub repository
2. Configure build settings:
   - Root: `frontend`
   - Build Command: `yarn build`
   - Output: `build`
3. Add environment variable
4. Deploy

### 4. Configure Custom Domain

**Render:**
1. Go to service settings
2. Add custom domain: `api.acmephoto.com`
3. Configure DNS CNAME

**Vercel:**
1. Go to project settings
2. Add custom domain: `acmephoto.com`
3. Configure DNS A/CNAME records

### 5. Enable SSL

Both Render and Vercel automatically provide SSL certificates.

---

## Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] Admin user created
- [ ] Logo and branding uploaded
- [ ] Services configured
- [ ] Packages created
- [ ] Sample portfolio uploaded
- [ ] Contact form tested
- [ ] Booking flow tested
- [ ] Payment integration tested (if enabled)
- [ ] Email notifications working
- [ ] Analytics tracking verified
- [ ] SEO metadata configured
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Backup strategy implemented

---

## Troubleshooting

### Backend won't start

**Issue:** "Module not found" error  
**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

**Issue:** "MONGO_URL not set"  
**Solution:** Check `.env` file exists in backend folder

### Frontend won't connect to backend

**Issue:** CORS errors  
**Solution:** Verify `FRONTEND_URL` in backend `.env` matches frontend URL

**Issue:** 404 on API calls  
**Solution:** Ensure backend is running on port 8000

### Can't login

**Issue:** "Invalid credentials"  
**Solution:** Verify admin user was created successfully

---

## Next Steps

1. Review [API Reference](./API_REFERENCE.md)
2. Learn about [Customization](./CUSTOMIZATION_GUIDE.md)
3. Set up [Integrations](./INTEGRATION_GUIDE.md)
4. Configure [Auto-Deployment](../GITHUB_DEPLOYMENT_SETUP.md)

---

**Congratulations! Your photography admin panel is ready! 🎉**

For support, refer to the main [README.md](../README.md) or check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

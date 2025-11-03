# Photography Admin Panel Template

## 🎨 Overview

A production-ready, full-stack admin panel template for photography businesses. Built with **FastAPI** (Python) and **React** with complete booking management, package creation, media uploads, client management, and analytics dashboard.

**Perfect for:**
- Wedding photographers
- Portrait studios
- Event photographers
- Commercial photography businesses
- Photography agencies

---

## ✨ Features

### 🔐 Authentication & User Management
- JWT + Session cookie authentication
- Role-based access control (Admin/Editor)
- Multi-user support
- Password reset functionality
- Activity logging & audit trails

### 📅 Client Booking System
- Calendar integration
- Booking request management
- Status tracking (Pending/Confirmed/Completed/Cancelled)
- Client information capture
- Email notifications
- Deposit tracking
- Booking conflicts prevention

### 💼 Package Management
- Create custom photography packages
- Pricing tiers
- Feature lists
- Package activation/deactivation
- Special offers and discounts

### 📸 Media Management
- Image upload with drag-and-drop
- Video embeds (YouTube, Vimeo)
- Gallery organization by category
- Bulk upload support
- Media library with search
- File size optimization
- Cloudflare R2 ready

### 📊 Analytics Dashboard
- Page views tracking
- Click tracking
- Top pages report
- Revenue analytics
- Client acquisition metrics
- Booking conversion rates
- Custom event tracking

### 🎨 Theme Customization
- White-label branding
- Logo upload
- Color scheme customization
- Font selection
- Mobile-responsive design
- Dark/light mode support

### 🤖 AI-Powered Content
- Social media caption generation
- Ad copy creation
- SEO metadata generation
- Blog post assistance
- Image alt text generation

### 📱 Marketing Integration
- Facebook Pixel
- Google Analytics 4
- Google Tag Manager
- Email marketing (Mailchimp)
- SMS notifications (Twilio)

### 📝 Content Management
- Blog posts (SEO optimized)
- Portfolio galleries
- Service pages
- Testimonials
- Custom pages
- Video galleries

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+**
- **Node.js 18+**
- **MongoDB** (Atlas or local)
- **Git**

### 1. Clone & Configure

```bash
# Clone the repository
git clone <your-repo-url>
cd photography-admin-template

# Copy and configure business settings
cp template/config/business.config.json config/business.json
# Edit config/business.json with your client's details
```

### 2. Backend Setup

```bash
# Install Python dependencies
cd backend
pip install -r requirements.txt

# Generate secure secrets
python -c "import secrets; print('JWT_SECRET=' + secrets.token_hex(32))"
python -c "import secrets; print('EMERGENCY_RESET_KEY=' + secrets.token_hex(16))"

# Create .env file
cat > .env << EOF
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=your_photography_db
JWT_SECRET=<generated-jwt-secret>
EMERGENCY_RESET_KEY=<generated-emergency-key>
FRONTEND_URL=http://localhost:3000
GROQ_API_KEY=<optional-groq-api-key>
GEMINI_API_KEY=<optional-gemini-api-key>
EOF

# Run backend
python main.py
# Backend runs on http://localhost:8000
```

### 3. Frontend Setup

```bash
# Install dependencies
cd frontend
yarn install

# Create .env file
echo "REACT_APP_BACKEND_URL=http://localhost:8000" > .env

# Run frontend
yarn start
# Frontend runs on http://localhost:3000
```

### 4. Create Admin User

```bash
curl -X POST http://localhost:8000/api/admin/auth/create-initial-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@yourstudio.com",
    "password": "ChangeMe123!",
    "name": "Admin User"
  }'
```

### 5. Login

- Navigate to `http://localhost:3000/admin`
- Login with your admin credentials
- Complete the setup wizard

---

## 📋 Customization Guide

### Business Configuration

Edit `config/business.json`:

```json
{
  "business": {
    "name": "Your Photography Studio",
    "tagline": "Your Tagline",
    "owner": {
      "name": "Your Name",
      "email": "hello@yourstudio.com"
    }
  },
  "branding": {
    "logo": "/assets/logo.png",
    "primaryColor": "#1a1a1a",
    "accentColor": "#d4af37"
  },
  "features": {
    "enableBlog": true,
    "enableBooking": true,
    "enablePackages": true
  }
}
```

### Theme Customization

1. Upload logo via Admin Panel → Settings → Theme
2. Set color scheme
3. Choose fonts
4. Configure layout preferences

### Service Types

Define your photography services in `config/business.json`:

```json
"services": [
  {
    "id": "weddings",
    "name": "Wedding Photography",
    "enabled": true
  },
  {
    "id": "portraits",
    "name": "Portrait Photography",
    "enabled": true
  }
]
```

### Booking Configuration

```json
"booking": {
  "requireApproval": true,
  "advanceBookingDays": 30,
  "maxBookingsPerDay": 3,
  "workingHours": {
    "start": "09:00",
    "end": "18:00"
  },
  "depositPercentage": 30
}
```

---

## 🎯 Deployment

### Option 1: Automated GitHub Deployment (Recommended)

Already configured! Just follow these steps:

1. **Create Render Service**
   - Go to https://dashboard.render.com/
   - Create Web Service from GitHub
   - Configure environment variables

2. **Create Vercel Project**
   - Go to https://vercel.com/dashboard
   - Import GitHub repository
   - Set `REACT_APP_BACKEND_URL`

3. **Add GitHub Secrets**
   - `RENDER_SERVICE_ID`
   - `RENDER_API_KEY`
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

4. **Push to main**
   ```bash
   git push origin main
   ```

Auto-deployment is configured! See `GITHUB_DEPLOYMENT_SETUP.md` for details.

### Option 2: Manual Deployment

See `DEPLOYMENT_GUIDE.md` for manual deployment instructions.

---

## 📱 API Documentation

### Authentication Endpoints

```http
POST /api/admin/auth/login
POST /api/admin/auth/logout
GET  /api/admin/auth/me
POST /api/admin/auth/create-initial-admin
```

### Booking Endpoints

```http
GET    /api/bookings
POST   /api/bookings
GET    /api/bookings/{id}
PUT    /api/bookings/{id}
DELETE /api/bookings/{id}
PATCH  /api/bookings/{id}/status
```

### Package Endpoints

```http
GET    /api/packages
POST   /api/admin/packages
PUT    /api/admin/packages/{id}
DELETE /api/admin/packages/{id}
```

### Media Endpoints

```http
GET    /api/admin/media
POST   /api/admin/media/upload
DELETE /api/admin/media/{id}
```

### Analytics Endpoints

```http
POST /api/analytics/track
GET  /api/admin/analytics/stats
GET  /api/admin/analytics/revenue
GET  /api/admin/analytics/clients
```

Full API documentation: [API_REFERENCE.md](./docs/API_REFERENCE.md)

---

## 🗄️ Database Schema

### Collections

- `users` - Admin users and editors
- `sessions` - Active sessions
- `bookings` - Client booking requests
- `packages` - Photography packages
- `services` - Service definitions
- `portfolio` - Portfolio items
- `blog` - Blog posts
- `videos` - Video gallery
- `media` - Uploaded files
- `testimonials` - Client testimonials
- `inquiries` - Contact form submissions
- `analytics_events` - Analytics tracking
- `activity_log` - Admin activity audit

Schema details: [DATABASE_SCHEMA.md](./docs/DATABASE_SCHEMA.md)

---

## 🎨 Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin dashboard components
│   │   │   ├── DashboardHome.js
│   │   │   ├── BookingManager.js
│   │   │   ├── PackageManager.js
│   │   │   ├── GalleryManager.js
│   │   │   ├── AnalyticsView.js
│   │   │   └── ...
│   │   ├── ui/             # Shadcn UI components
│   │   └── public/         # Public website components
│   ├── pages/
│   │   ├── AdminDashboard.js
│   │   ├── AdminLogin.js
│   │   └── HomePage.js
│   ├── services/
│   │   └── api.js          # API client
│   └── lib/
│       └── utils.js
```

---

## 🔧 Backend Structure

```
backend/
├── server.py              # Main FastAPI app
├── auth.py                # Authentication module
├── models.py              # Database models
├── utils/
│   ├── email.py          # Email notifications
│   ├── sms.py            # SMS notifications
│   └── analytics.py      # Analytics helpers
├── uploads/              # Media storage
└── requirements.txt
```

---

## 📊 Analytics & Reporting

### Available Reports

1. **Traffic Analytics**
   - Page views by day/week/month
   - Top pages
   - Traffic sources
   - Device types

2. **Booking Analytics**
   - Booking requests per month
   - Conversion rates
   - Popular services
   - Peak booking times

3. **Revenue Analytics**
   - Revenue by month
   - Revenue by service type
   - Average booking value
   - Deposit tracking

4. **Client Analytics**
   - New clients per month
   - Client retention rate
   - Client acquisition sources
   - Geographic distribution

---

## 🔌 Integrations

### Payment Processing (Stripe)

```json
"integrations": {
  "stripe": {
    "enabled": true,
    "publicKey": "pk_live_...",
    "secretKey": "sk_live_..."
  }
}
```

### Calendar Sync (Google Calendar)

```json
"googleCalendar": {
  "enabled": true,
  "calendarId": "your-calendar@group.calendar.google.com"
}
```

### Email Marketing (Mailchimp)

```json
"mailchimp": {
  "enabled": true,
  "apiKey": "...",
  "listId": "..."
}
```

### SMS Notifications (Twilio)

```json
"twilioSMS": {
  "enabled": true,
  "accountSid": "AC...",
  "authToken": "...",
  "fromNumber": "+1234567890"
}
```

---

## 🛠️ Development

### Running Tests

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
yarn test
```

### Code Formatting

```bash
# Backend (Black)
cd backend
black .

# Frontend (Prettier)
cd frontend
yarn format
```

### Linting

```bash
# Backend (Flake8)
flake8 backend/

# Frontend (ESLint)
yarn lint
```

---

## 🔒 Security

- JWT + Session cookie authentication
- Password hashing with bcrypt
- SQL injection protection
- XSS protection
- CORS configuration
- Rate limiting
- Environment variable secrets
- Activity logging

---

## 📖 Documentation

- [Setup Guide](./docs/SETUP_GUIDE.md)
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)
- [API Reference](./docs/API_REFERENCE.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [Customization Guide](./docs/CUSTOMIZATION_GUIDE.md)
- [Integration Guide](./docs/INTEGRATION_GUIDE.md)

---

## 🎁 What's Included

✅ Complete authentication system  
✅ Client booking management  
✅ Package creation & management  
✅ Media upload & organization  
✅ Analytics dashboard  
✅ Blog management  
✅ SEO optimization  
✅ Email notifications  
✅ AI content generation  
✅ Mobile responsive design  
✅ GitHub auto-deployment  
✅ Production-ready configuration  
✅ Comprehensive documentation

---

## 🆘 Support

For issues and questions:
1. Check the [documentation](./docs/)
2. Review [common issues](./docs/TROUBLESHOOTING.md)
3. Open a GitHub issue

---

## 📜 License

MIT License - Use for any photography business

---

## 🚀 Quick Deploy Checklist

- [ ] Configure `config/business.json`
- [ ] Set up MongoDB database
- [ ] Generate JWT secrets
- [ ] Configure environment variables
- [ ] Create admin user
- [ ] Upload logo and branding
- [ ] Configure services and packages
- [ ] Set up integrations (optional)
- [ ] Test booking workflow
- [ ] Deploy to production
- [ ] Configure custom domain
- [ ] Set up SSL certificate

---

**Ready to launch your photography business platform!** 🎉

For detailed setup instructions, see [SETUP_GUIDE.md](./docs/SETUP_GUIDE.md)

# 🚀 Quick Start - Site Generator

## Generate New Photography Sites in 30 Seconds

### Option 1: Web Interface (Easiest)

```bash
cd site-generator
pip install -r requirements.txt
python generator.py
```

**Open:** http://localhost:5001

1. Enter business name
2. Upload logo
3. Fill basic info
4. Click "Generate Site"
5. Download ZIP
6. Done! 🎉

### Option 2: Command Line

```bash
cd site-generator
python cli_generator.py
```

Follow the prompts, get your site!

---

## What You Get

Every generated site includes:

✅ **Complete Backend** (FastAPI)
- Client booking system
- Package management
- Media uploads
- Analytics dashboard
- Blog/content management
- 60+ API endpoints

✅ **Complete Frontend** (React)
- Admin panel
- Public website
- Responsive design
- 50+ features

✅ **Auto-Generated**
- JWT secrets (secure)
- Database configuration
- Logo optimization (3 sizes)
- Environment files
- Setup instructions

✅ **Deployment Ready**
- GitHub Actions
- Render config (backend)
- Vercel config (frontend)
- One-click deploy

✅ **Documentation**
- Setup guide
- Customization guide
- Database schema
- API reference
- Deployment guide

---

## After Generation

### 1. Extract ZIP
```bash
unzip client-name-photography-site.zip
cd client-name
```

### 2. Install & Run
```bash
# Backend
cd backend && pip install -r requirements.txt && python main.py

# Frontend (new terminal)
cd frontend && yarn install && yarn start
```

### 3. Create Admin
```bash
curl -X POST http://localhost:8000/api/admin/auth/create-initial-admin \
  -d '{"email":"admin@client.com","password":"secure","name":"Admin"}'
```

### 4. Login
http://localhost:3000/admin

---

## Time to Production

- **Generate:** 30 seconds
- **Setup:** 10 minutes
- **Deploy:** 5 minutes
- **Total:** 15 minutes per client!

---

## Perfect For

- **Freelance Developers** - Generate sites for clients
- **Agencies** - Deliver custom sites quickly
- **Photography Studios** - Multiple service sites
- **Template Resellers** - Sell customized sites

---

**Start generating now:**
```bash
cd site-generator
python generator.py
```

See `SITE_GENERATOR_GUIDE.md` for complete documentation.

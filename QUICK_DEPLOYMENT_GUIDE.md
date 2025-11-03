# 🚀 Quick Deployment Guide - DSP Photography Site

**Last Updated:** November 3, 2025

---

## ⚡ 30-Second Checklist

- [x] Backend configured for Render
- [x] Frontend configured for Vercel  
- [x] MongoDB connection ready
- [x] Admin panel with Live Edit complete
- [x] GitHub Actions configured
- [x] Root redirect added to backend
- [ ] Deploy to Render (auto via GitHub)
- [ ] Deploy to Vercel (auto via GitHub)
- [ ] Seed database with `python backend/seed_data.py`

---

## 📋 Deployment Steps

### Step 1: Push to GitHub

```bash
git add .
git commit -m "final: fixed deployments and admin panel ready"
git push origin main
```

**Result:** GitHub Actions triggers both Render and Vercel deployments automatically.

---

### Step 2: Verify Render Deployment

**Wait:** 2-3 minutes for Render to build and deploy

**Test:**
```bash
curl https://devendra-photography-site.onrender.com/api/health
```

**Expected:**
```json
{
  "status": "ok",
  "service": "DSP Photography API",
  "timestamp": "2025-11-03T...",
  "upload_dir": "backend/uploads"
}
```

---

### Step 3: Verify Vercel Deployment

**Wait:** 1-2 minutes for Vercel to build and deploy

**Test:** Visit in browser
```
https://devendra-photography-site.vercel.app
```

**Expected:** Homepage loads with hero section

---

### Step 4: Seed Database

**Option A: Remote Seeding (Recommended)**

```bash
# SSH into Render or run locally with production MongoDB URL
export MONGO_URL="your-production-mongo-url"
export DB_NAME="dsp_photography"
python backend/seed_data.py
```

**Option B: Manual via Admin Panel**

1. Visit `https://dspfilms.com/admin`
2. Login with `devshinde45@gmail.com` / `DSPAdmin@123`
3. Manually add:
   - Services (3 items)
   - Packages (3 items)
   - Portfolio items
   - Testimonials

---

### Step 5: Test Admin Panel

1. **Login:**
   ```
   URL: https://dspfilms.com/admin
   Email: devshinde45@gmail.com
   Password: DSPAdmin@123
   ```

2. **Test Live Edit:**
   - Click "Live Edit Mode" button (top right)
   - Click "Enable Editing"
   - Edit "Hero Heading"
   - Click "Save Changes"
   - Verify success notification

3. **Verify Content:**
   - Navigate to Services
   - Check if 3 services loaded
   - Navigate to Packages
   - Check if 3 packages loaded

---

## 🔧 Environment Variables

### Render Dashboard

Ensure these are set in Render:

| Variable | Value |
|----------|-------|
| `MONGO_URL` | Your MongoDB Atlas URL |
| `DB_NAME` | `dsp_photography` |
| `JWT_SECRET` | Random 32+ char string |
| `EMERGENCY_RESET_KEY` | Random 32+ char string |
| `FRONTEND_URL` | `https://dspfilms.com` or Vercel URL |
| `GROQ_API_KEY` | (Optional) Groq AI key |
| `GEMINI_API_KEY` | (Optional) Gemini key |

### Vercel Dashboard

Set this in Vercel:

| Variable | Value |
|----------|-------|
| `REACT_APP_BACKEND_URL` | `https://devendra-photography-site.onrender.com` |

---

## 🧪 Testing Checklist

### Backend (Render)

- [ ] Root endpoint returns API info
- [ ] Health check returns `{"status": "ok"}`
- [ ] `/api/services` returns array (even if empty)
- [ ] `/api/packages` returns array (even if empty)
- [ ] `/api/admin/auth/login` accepts credentials

**Quick Test:**
```bash
# Health
curl https://devendra-photography-site.onrender.com/api/health

# Root
curl https://devendra-photography-site.onrender.com/

# Services
curl https://devendra-photography-site.onrender.com/api/services

# Login
curl -X POST https://devendra-photography-site.onrender.com/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"devshinde45@gmail.com","password":"DSPAdmin@123"}'
```

### Frontend (Vercel)

- [ ] Homepage loads
- [ ] Services section visible
- [ ] Packages section visible
- [ ] Admin login page accessible at `/admin`
- [ ] Images load correctly
- [ ] Mobile responsive

### Admin Panel

- [ ] Login works with credentials
- [ ] Dashboard loads after login
- [ ] Live Edit button visible
- [ ] Live Edit modal opens
- [ ] Content edits save successfully
- [ ] Logout works

---

## 🚨 Troubleshooting

### Issue: Render 404 on /api routes

**Solution:** Already fixed! Root redirect added to `backend/server.py`

### Issue: Vercel build fails

**Check:**
1. Is `REACT_APP_BACKEND_URL` set in Vercel?
2. Is `frontend/package.json` build script correct?
3. Check Vercel build logs for errors

**Fix:**
```bash
# Ensure this is in frontend/package.json
"build": "GENERATE_SOURCEMAP=false craco build"
```

### Issue: MongoDB connection timeout

**Check:**
1. Is `MONGO_URL` correct in Render?
2. Is MongoDB Atlas allowing connections from Render's IP?
3. Is the database name `dsp_photography`?

**Fix:**
```bash
# Test MongoDB connection locally
python backend/seed_data.py
# Should connect and seed data
```

### Issue: Admin login fails

**Check:**
1. Is admin user created in database?
2. Are credentials correct?
3. Is `JWT_SECRET` set in Render?

**Fix:**
```bash
# Re-seed database to create admin user
python backend/seed_data.py
```

### Issue: Empty content on frontend

**Cause:** Database not seeded

**Fix:**
```bash
# Seed database
python backend/seed_data.py

# OR use admin panel to manually add content
```

---

## 🎯 Success Criteria

✅ **Render:** Health check returns 200 OK  
✅ **Vercel:** Homepage loads correctly  
✅ **MongoDB:** Connected and seeded  
✅ **Admin:** Login works, Live Edit functional  
✅ **CI/CD:** Auto-deploy on GitHub push  

---

## 📞 Admin Credentials

**Email:** `devshinde45@gmail.com`  
**Password:** `DSPAdmin@123`  
**Role:** admin  

**Security Note:** Change password after first login via Settings panel.

---

## 🔗 Quick Links

| Resource | URL |
|----------|-----|
| **Backend API** | https://devendra-photography-site.onrender.com |
| **Frontend** | https://devendra-photography-site.vercel.app |
| **Admin Panel** | https://dspfilms.com/admin |
| **API Docs** | https://devendra-photography-site.onrender.com/docs |
| **GitHub Repo** | https://github.com/ShubhSaudagar/Devendra-Photography-Site |

---

## 📄 Full Documentation

For complete details, see:
- `DEPLOYMENT_FIX_SUMMARY.md` - Complete deployment documentation
- `LIVE_EDIT_IMPLEMENTATION.md` - Live editing feature details
- `replit.md` - Project architecture and technical details

---

**© 2025 DSP Film's. Developed by Shubh Saudagar.**

# GitHub Auto-Deployment Setup Checklist

Quick reference checklist for setting up auto-deployment to Render (backend) and Vercel (frontend).

## 📋 Pre-Setup Requirements

- [ ] GitHub repository with `main` branch
- [ ] Render account created
- [ ] Vercel account created
- [ ] All code pushed to GitHub

---

## 🔧 Render Backend Configuration

### 1. Create Render Service
- [ ] Go to [Render Dashboard](https://dashboard.render.com/)
- [ ] Click **New +** → **Web Service**
- [ ] Connect GitHub repository
- [ ] Name: `dsp-photography-api`
- [ ] Branch: `main`
- [ ] Runtime: Python 3.11.9

### 2. Environment Variables
Add these in Render Dashboard → Service → Environment:

```bash
✅ MONGO_URL=mongodb+srv://...
✅ DB_NAME=dsp_photography
✅ JWT_SECRET=<generate-new-secret>
✅ EMERGENCY_RESET_KEY=<your-key>
✅ GROQ_API_KEY=<optional>
✅ GEMINI_API_KEY=<optional>
✅ ENVIRONMENT=production
✅ PORT=8000
✅ FRONTEND_URL=<your-vercel-url>
```

**Generate JWT_SECRET:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### 3. Get Render Credentials
- [ ] Account Settings → API Keys → Create new key
- [ ] Copy API key: `rnd_XXXXXXXXX`
- [ ] Copy Service ID from URL: `srv-XXXXXX`
- [ ] Enable Auto-Deploy in Settings → Build & Deploy

---

## 🚀 Vercel Frontend Configuration

### 1. Create Vercel Project
- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click **Add New...** → **Project**
- [ ] Import GitHub repository
- [ ] Framework: Create React App
- [ ] Root Directory: `frontend`
- [ ] Build Command: `yarn build`
- [ ] Output Directory: `build`

### 2. Environment Variables
Add in Project Settings → Environment Variables:

```bash
✅ REACT_APP_BACKEND_URL=https://dsp-photography-api.onrender.com
```

### 3. Get Vercel Credentials

**Option A: Via Dashboard**
- [ ] Go to https://vercel.com/account/tokens
- [ ] Create token named "GitHub Actions"
- [ ] Copy token: `vercel_token_XXXX`

**Option B: Via CLI**
```bash
cd frontend
vercel login
vercel link
# Copy values from .vercel/project.json
```

- [ ] Copy **Vercel Token**: `vercel_token_XXXX`
- [ ] Copy **Org ID**: `team_XXXXXXXXX`
- [ ] Copy **Project ID**: `prj_XXXXXXXXX`

### 4. Set Production Branch
- [ ] Project Settings → Git → Production Branch
- [ ] Set to: `main`
- [ ] Save

---

## 🔐 GitHub Secrets Configuration

Go to: **GitHub Repo → Settings → Secrets and variables → Actions**

### Add 5 Secrets:

| Secret Name | Value | Source |
|-------------|-------|--------|
| `RENDER_SERVICE_ID` | `srv-XXXXXX` | Render service URL |
| `RENDER_API_KEY` | `rnd_XXXXXXXXX` | Render Account Settings |
| `VERCEL_TOKEN` | `vercel_token_XXXX` | Vercel Account Tokens |
| `VERCEL_ORG_ID` | `team_XXXXXXXXX` | `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `prj_XXXXXXXXX` | `.vercel/project.json` |

**Checklist:**
- [ ] RENDER_SERVICE_ID added
- [ ] RENDER_API_KEY added
- [ ] VERCEL_TOKEN added
- [ ] VERCEL_ORG_ID added
- [ ] VERCEL_PROJECT_ID added

---

## 📁 Repository Files

### Files Already Created ✅

- [ ] `.github/workflows/deploy-render.yml` - Backend deployment workflow
- [ ] `.github/workflows/deploy-vercel.yml` - Frontend deployment workflow
- [ ] `render.yaml` - Render configuration with all env vars
- [ ] `vercel.json` - Vercel configuration
- [ ] `.gitignore` - Updated with Vercel exclusions

### Commit and Push

```bash
git add .
git commit -m "Configure GitHub auto-deployment for Render and Vercel"
git push origin main
```

- [ ] Files committed to repository
- [ ] Pushed to `main` branch

---

## ✅ Testing & Verification

### 1. Monitor First Deployment

**GitHub Actions:**
- [ ] Go to repo → **Actions** tab
- [ ] Verify both workflows are running
- [ ] Check for green checkmarks

**Render:**
- [ ] Go to Render Dashboard → Service → **Logs**
- [ ] Verify build is running
- [ ] Look for: `✅ Upload directory active at: backend/uploads`

**Vercel:**
- [ ] Go to Vercel Dashboard → Project → **Deployments**
- [ ] Verify deployment is running
- [ ] Click deployment → View logs

### 2. Verify Deployments

**Backend Health Check:**
```bash
curl https://dsp-photography-api.onrender.com/api/health
```
- [ ] Returns 200 OK response

**Frontend Access:**
- [ ] Open Vercel deployment URL
- [ ] Verify website loads correctly
- [ ] Check browser console for errors

### 3. Test Auto-Deploy Trigger

**Backend Only:**
```bash
# Make a small change
echo "# Test" >> backend/README.md
git add backend/
git commit -m "Test backend auto-deploy"
git push origin main
```
- [ ] Only Render workflow triggers
- [ ] Vercel workflow skipped

**Frontend Only:**
```bash
# Make a small change
echo "# Test" >> frontend/README.md
git add frontend/
git commit -m "Test frontend auto-deploy"
git push origin main
```
- [ ] Only Vercel workflow triggers
- [ ] Render workflow skipped

**Both:**
```bash
# Make changes to both
git add backend/ frontend/
git commit -m "Test full-stack deploy"
git push origin main
```
- [ ] Both workflows trigger
- [ ] Run in parallel

---

## 🎯 Success Criteria

### Render Backend
- [x] Service created and running
- [x] Auto-deploy enabled for `main` branch
- [x] All environment variables configured
- [x] Build logs show '✅ Upload directory active'
- [x] API accessible at production URL
- [x] GitHub Actions workflow passes

### Vercel Frontend
- [x] Project created and deployed
- [x] Production branch set to `main`
- [x] Environment variables configured
- [x] Website accessible at production URL
- [x] GitHub Actions workflow passes

### GitHub Integration
- [x] All 5 secrets configured
- [x] Workflows committed to repository
- [x] Auto-deploy triggers on `main` push
- [x] Selective deployment (backend/frontend only when needed)

---

## 🐛 Troubleshooting

### Workflow Fails: "Secret not found"
**Solution:**
- Verify all 5 secrets exist in GitHub repo settings
- Check secret names are exact (case-sensitive)
- Re-add missing secrets

### Render: "Environment variable not set"
**Solution:**
- Go to Render Dashboard → Service → Environment
- Add missing variables
- Trigger manual redeploy

### Vercel: "Build failed"
**Solution:**
- Check `REACT_APP_BACKEND_URL` is set
- Verify build command in vercel.json
- Test build locally: `cd frontend && yarn build`

### Upload Directory Message Not Showing
**Solution:**
- Check Render logs tab (not just build output)
- Message appears during server startup
- Located at line 1212 in `backend/server.py`

---

## 📚 Additional Resources

- **Full Setup Guide**: [GITHUB_DEPLOYMENT_SETUP.md](GITHUB_DEPLOYMENT_SETUP.md)
- **Auth Implementation**: [AUTH_IMPLEMENTATION_GUIDE.md](AUTH_IMPLEMENTATION_GUIDE.md)
- **Main Deployment Guide**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 🎉 Quick Summary

Once setup is complete:

1. **Push to `main`** → Automatic deployment
2. **Backend changes** → Deploys to Render
3. **Frontend changes** → Deploys to Vercel
4. **Both changes** → Deploys to both platforms
5. **Include `[skip ci]`** → No deployment

**Deployment URLs:**
- Backend: `https://dsp-photography-api.onrender.com`
- Frontend: `https://your-project.vercel.app`

---

**Setup Date**: _______________  
**Configured By**: _______________  
**Last Verified**: _______________

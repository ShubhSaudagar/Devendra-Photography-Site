# GitHub Auto-Deployment Setup Guide

This guide explains how to set up automatic deployments to Render (backend) and Vercel (frontend) whenever you push to the `main` branch.

## Overview

**Deployment Architecture:**
- **Backend**: Deploys to Render using GitHub Actions
- **Frontend**: Deploys to Vercel using GitHub Actions
- **Trigger**: Any commit to `main` branch
- **Branch Strategy**: `main` branch → Production environment

## Prerequisites

1. GitHub repository with `main` branch
2. Render account with backend service created
3. Vercel account with frontend project created
4. API keys and credentials from both platforms

---

## Part 1: Render Backend Setup

### Step 1: Create Render Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure service:
   - **Name**: `dsp-photography-api`
   - **Branch**: `main`
   - **Root Directory**: Leave empty (we use `cd backend` in commands)
   - **Runtime**: Python 3.11.9
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && gunicorn server:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120 --worker-class uvicorn.workers.UvicornWorker`

### Step 2: Configure Environment Variables in Render

Add these environment variables in Render Dashboard → Service → Environment:

```bash
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=dsp_photography
JWT_SECRET=<your-generated-jwt-secret>
EMERGENCY_RESET_KEY=<your-emergency-key>
GROQ_API_KEY=<your-groq-api-key>
GEMINI_API_KEY=<your-gemini-api-key>
ENVIRONMENT=production
PORT=8000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Generate JWT_SECRET:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### Step 3: Get Render API Credentials

1. Go to **Render Dashboard** → **Account Settings** → **API Keys**
2. Click **Create API Key**
3. Copy the API key (you'll need this for GitHub Secrets)
4. Get your Service ID:
   - Go to your service page
   - The URL will be: `https://dashboard.render.com/web/srv-XXXXXX`
   - Copy the `srv-XXXXXX` part (this is your Service ID)

### Step 4: Enable Auto-Deploy in Render

1. Go to your service → **Settings** → **Build & Deploy**
2. Verify **Auto-Deploy** is set to **Yes**
3. Set **Branch**: `main`

---

## Part 2: Vercel Frontend Setup

### Step 1: Connect GitHub to Vercel

**Option A: Using Vercel Dashboard (Recommended)**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `yarn build` (or `npm run build`)
   - **Output Directory**: `build`
   - **Install Command**: `yarn install` (or `npm install`)

**Option B: Using Vercel CLI**

```bash
cd frontend
vercel login
vercel link
vercel --prod
```

### Step 2: Configure Environment Variables in Vercel

1. Go to **Project Settings** → **Environment Variables**
2. Add variable:
   - **Key**: `REACT_APP_BACKEND_URL`
   - **Value**: `https://dsp-photography-api.onrender.com` (your Render backend URL)
   - **Environment**: Production, Preview, Development

### Step 3: Get Vercel Credentials

1. **Get Vercel Token:**
   ```bash
   # Login to Vercel
   vercel login
   
   # Go to: https://vercel.com/account/tokens
   # Create new token → Name it "GitHub Actions"
   # Copy the token
   ```

2. **Get Project IDs:**
   ```bash
   cd frontend
   vercel link
   ```
   
   This creates `.vercel/project.json`:
   ```json
   {
     "orgId": "team_XXXXXXXXX",
     "projectId": "prj_XXXXXXXXX"
   }
   ```
   
   Copy these values.

### Step 4: Set Production Branch

1. Go to **Project Settings** → **Git** → **Production Branch**
2. Set to: `main`
3. Save

---

## Part 3: GitHub Secrets Configuration

Add these secrets to your GitHub repository:

### Navigate to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### Add Render Secrets

| Secret Name | Value | Where to Find |
|-------------|-------|---------------|
| `RENDER_SERVICE_ID` | `srv-XXXXXX` | Render service URL |
| `RENDER_API_KEY` | `rnd_XXXXXXXXX` | Render Account Settings → API Keys |

### Add Vercel Secrets

| Secret Name | Value | Where to Find |
|-------------|-------|---------------|
| `VERCEL_TOKEN` | `vercel_token_XXXX` | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | `team_XXXXXXXXX` | `.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | `prj_XXXXXXXXX` | `.vercel/project.json` → `projectId` |

---

## Part 4: Workflow Files Explanation

### Backend Workflow (`.github/workflows/deploy-render.yml`)

**Triggers on:**
- Push to `main` branch
- Changes to `backend/**`, `render.yaml`, `requirements.txt`, or workflow file

**What it does:**
1. Checks out code
2. Deploys to Render using the Render Deploy Action
3. Waits for deployment to complete
4. Creates GitHub deployment record

**Key features:**
- `wait_deploy: true` - Waits for Render to finish building
- `github_deployment: true` - Creates deployment in GitHub UI

### Frontend Workflow (`.github/workflows/deploy-vercel.yml`)

**Triggers on:**
- Push to `main` branch
- Changes to `frontend/**`, `vercel.json`, or workflow file

**What it does:**
1. Checks out code
2. Sets up Node.js with Yarn caching
3. Installs Vercel CLI
4. Pulls Vercel environment configuration
5. Builds the project
6. Deploys to Vercel production
7. Outputs deployment URL

**Key features:**
- Uses Vercel CLI for full control
- Builds artifacts before deployment
- Shows deployment URL in GitHub Actions summary

---

## Part 5: Testing the Setup

### Initial Test Deploy

1. **Make a small change to trigger deployment:**
   ```bash
   git checkout main
   echo "# Auto-deploy test" >> README.md
   git add README.md
   git commit -m "Test auto-deployment workflows"
   git push origin main
   ```

2. **Monitor deployments:**
   - **GitHub Actions**: Go to your repo → **Actions** tab
   - **Render**: Dashboard → Your service → **Logs**
   - **Vercel**: Dashboard → Your project → **Deployments**

### Verify Backend Deployment

1. Go to **Render Dashboard** → Your service → **Logs**
2. Look for this message in build logs:
   ```
   ✅ Upload directory active at: backend/uploads
   ```

3. Test the API:
   ```bash
   curl https://dsp-photography-api.onrender.com/api/health
   ```

### Verify Frontend Deployment

1. Go to **Vercel Dashboard** → Your project → **Deployments**
2. Click on the latest deployment
3. Click **Visit** to open the deployed site
4. Verify it loads correctly

---

## Part 6: Deployment Workflows

### Normal Development Flow

```bash
# Make changes to backend
git add backend/
git commit -m "Update backend feature"
git push origin main
# ✅ Only backend deploys to Render

# Make changes to frontend
git add frontend/
git commit -m "Update frontend UI"
git push origin main
# ✅ Only frontend deploys to Vercel
```

### Deploy Both Simultaneously

```bash
# Make changes to both
git add backend/ frontend/
git commit -m "Update full-stack feature"
git push origin main
# ✅ Both workflows run in parallel
```

### Skip Deployment

To push without triggering deployment, include in commit message:
```bash
git commit -m "Update docs [skip ci]"
git push origin main
# ✅ No deployment triggered
```

---

## Part 7: Monitoring & Debugging

### Check GitHub Actions Status

1. Go to repository → **Actions** tab
2. See all workflow runs
3. Click on any run to see detailed logs

### Check Render Deployment

1. Render Dashboard → Service → **Events** tab
2. Click on latest deployment
3. View **Logs** tab for build output
4. Verify '✅ Upload directory active' message appears

### Check Vercel Deployment

1. Vercel Dashboard → Project → **Deployments**
2. Click on deployment
3. View build logs
4. Check deployment URL

### Common Issues

#### Render: Deployment Fails

**Check:**
- All environment variables are set in Render
- `requirements.txt` is up to date
- Python version matches (3.11.9)

**Solution:**
```bash
# Manually trigger redeploy
# Render Dashboard → Service → Manual Deploy
```

#### Vercel: Build Fails

**Check:**
- `REACT_APP_BACKEND_URL` is set
- All dependencies in `package.json`
- Build command is correct

**Solution:**
```bash
# Test build locally
cd frontend
yarn install
yarn build
```

#### GitHub Actions: Secrets Not Found

**Check:**
- All secrets are added in GitHub repo settings
- Secret names match exactly (case-sensitive)
- Secrets are available for Actions

**Solution:**
1. Go to repo → Settings → Secrets and variables → Actions
2. Verify all 5 secrets exist
3. Re-add any missing secrets

---

## Part 8: Advanced Configuration

### Deploy Only on Tag

Modify `.github/workflows/deploy-render.yml`:

```yaml
on:
  push:
    tags:
      - 'v*'
```

### Deploy Staging Environment

Create `.github/workflows/deploy-staging.yml`:

```yaml
on:
  push:
    branches:
      - develop

jobs:
  deploy:
    # ... deploy to staging environment
```

### Slack Notifications

Add to workflow:

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## Checklist: Setup Completion

### Render Backend
- [ ] Service created on Render
- [ ] Connected to GitHub repository
- [ ] Environment variables configured
- [ ] Auto-deploy enabled for `main` branch
- [ ] Render API key created
- [ ] Service ID copied

### Vercel Frontend
- [ ] Project created on Vercel
- [ ] Connected to GitHub repository
- [ ] Environment variables configured (`REACT_APP_BACKEND_URL`)
- [ ] Production branch set to `main`
- [ ] Vercel token created
- [ ] Project IDs copied

### GitHub Repository
- [ ] All 5 secrets added (RENDER_SERVICE_ID, RENDER_API_KEY, VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
- [ ] Workflow files committed to `.github/workflows/`
- [ ] `render.yaml` updated with all env vars
- [ ] `vercel.json` created
- [ ] Initial test deployment successful

### Verification
- [ ] Backend deploys successfully to Render
- [ ] Render logs show '✅ Upload directory active'
- [ ] Frontend deploys successfully to Vercel
- [ ] Both deployments accessible via URLs
- [ ] GitHub Actions show green checkmarks

---

## Support & Resources

### Official Documentation
- **Render**: https://render.com/docs/deploys
- **Vercel**: https://vercel.com/docs/deployments/git
- **GitHub Actions**: https://docs.github.com/actions

### Render Dashboard
- Services: https://dashboard.render.com/
- API Keys: https://dashboard.render.com/u/settings#api-keys

### Vercel Dashboard
- Projects: https://vercel.com/dashboard
- Tokens: https://vercel.com/account/tokens

### Troubleshooting
- Check GitHub Actions logs for workflow errors
- Check Render/Vercel dashboards for deployment status
- Verify all secrets are correctly configured
- Test builds locally before pushing

---

**Last Updated**: November 3, 2025

For questions or issues, refer to the main [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) or open a GitHub issue.

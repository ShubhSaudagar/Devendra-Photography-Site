# D.S.P.Film's Photography Website - Deployment Guide

## Backend Deployment (Render)

### Step 1: Deploy Backend on Render
1. Create new Web Service on Render
2. Connect GitHub repository: `ShubhSaudagar/Devendra-Photography-Site`
3. Configure:
   - **Name**: `devendra-photography-api`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn server:app -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`

### Step 2: Set Environment Variables on Render
- `MONGO_URL`: Your MongoDB connection string
- `DB_NAME`: `dsp_photography`
- `FRONTEND_URL`: `https://devendra-photography-site.vercel.app`

### Step 3: Note Backend URL
After deployment, note your Render backend URL:
`https://devendra-photography-api.onrender.com`

---

## Frontend Deployment (Vercel)

### Step 1: Deploy Frontend on Vercel
1. Import project from GitHub: `ShubhSaudagar/Devendra-Photography-Site`
2. Configure:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 2: Set Environment Variable on Vercel
- `REACT_APP_API_URL`: `https://devendra-photography-api.onrender.com/api`

### Step 3: Update CORS (Backend)
Update backend environment variable:
- `FRONTEND_URL`: Use your actual Vercel domain

---

## Database Setup

### MongoDB Atlas (Recommended)
1. Create MongoDB Atlas cluster
2. Get connection string
3. Add to Render environment variables as `MONGO_URL`

---

## Testing Deployment

### Backend Health Check
- Visit: `https://devendra-photography-api.onrender.com/api/`
- Should return: `{"message":"D.S.P.Film's Photography API","version":"1.0.0"}`

### Frontend Check
- Visit: `https://devendra-photography-site.vercel.app`
- Verify all sections load with data from backend
- Test contact form submission

---

## Expected URLs
- **Frontend**: `https://devendra-photography-site.vercel.app`
- **Backend**: `https://devendra-photography-api.onrender.com`
- **Admin Portal**: `https://devendra-photography-site.vercel.app/admin`

---

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly in backend
- Check Vercel domain matches CORS settings

### Build Errors
- Verify all environment variables are set
- Check build logs for specific errors

### Database Connection
- Verify MongoDB connection string
- Ensure IP whitelist includes 0.0.0.0/0 for Render
# Render Deployment Guide - D.S.P.Film's Photography Portfolio

## Issue Fixed
**Problem**: `TypeError: ForwardRef._evaluate() missing 1 required keyword-only argument: 'recursive_guard'`

**Root Cause**: Render was using Python 3.13, which changed the `ForwardRef._evaluate()` signature. Pydantic v1.10.4 doesn't support Python 3.13.

**Solution**: Force Render to use Python 3.11.9 via `runtime.txt` and `render.yaml` configuration.

## Files Updated

### 1. `/app/runtime.txt` (NEW)
```
python-3.11.9
```

### 2. `/app/backend/runtime.txt` (NEW)
```
python-3.11.9
```

### 3. `/app/backend/render.yaml` (UPDATED)
Added Python version specification:
```yaml
pythonVersion: 3.11.9
```

### 4. `/app/render.yaml` (UPDATED)
Added Python version specification:
```yaml
pythonVersion: 3.11.9
```

## Deployment Steps for Render

### Option 1: Using `/app/backend/render.yaml` (Recommended)

1. **Connect Repository to Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Blueprint"
   - Connect your GitHub/GitLab repository
   - Point to `/app/backend/render.yaml`

2. **Set Environment Variables**
   - `MONGO_URL`: Your MongoDB connection string
   - `DB_NAME`: `dsp_photography`
   - `FRONTEND_URL`: Your Vercel frontend URL (e.g., `https://devendra-photography-site.vercel.app`)

3. **Deploy**
   - Render will automatically use Python 3.11.9
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn server:app -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`

### Option 2: Manual Web Service Setup

1. **Create New Web Service**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect repository
   - Set root directory: `backend`

2. **Configure Service**
   - **Environment**: Python
   - **Python Version**: 3.11.9 (will be read from `runtime.txt`)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn server:app -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`

3. **Environment Variables**
   - `MONGO_URL`: Your MongoDB connection string
   - `DB_NAME`: `dsp_photography`
   - `FRONTEND_URL`: Your Vercel frontend URL

4. **Deploy**

## Verification

After deployment, verify the backend is working:

```bash
# Health check
curl https://your-render-url.onrender.com/api/

# Get site content
curl https://your-render-url.onrender.com/api/site-content
```

Expected response:
```json
{"message": "Photography Portfolio API is running"}
```

## Important Notes

1. **Python Version Lock**: The `runtime.txt` file ensures Render uses Python 3.11.9, preventing Python 3.13 compatibility issues.

2. **CORS Configuration**: The backend automatically configures CORS based on `FRONTEND_URL` environment variable.

3. **Database**: Ensure your MongoDB instance is accessible from Render's IP addresses.

4. **Environment Variables**: Never commit `.env` files. Set all environment variables in Render dashboard.

5. **Logs**: Monitor deployment logs in Render dashboard for any issues.

## Troubleshooting

### If deployment still fails:

1. **Check Python Version in Logs**
   - Look for: `Using Python version X.X.X`
   - Should be 3.11.9

2. **Verify Dependencies Install**
   - Check build logs for any package installation errors

3. **Check Start Command**
   - Ensure Gunicorn finds the `server:app` correctly

4. **Environment Variables**
   - Verify all required variables are set in Render dashboard

### Alternative Solution (If Python 3.11 doesn't work)

Upgrade to Pydantic v2 and FastAPI latest:

```txt
# requirements.txt
fastapi==0.115.0
pydantic==2.9.0
pydantic-core==2.23.0
uvicorn==0.30.0
gunicorn==23.0.0
python-dotenv==1.0.0
pymongo==4.8.0
motor==3.5.0
python-multipart==0.0.9
```

**Note**: This requires code changes in `server.py` for Pydantic v2 compatibility.

## Current Status

✅ Local backend running successfully on Python 3.11.13
✅ All API endpoints working
✅ Frontend connecting to backend correctly
✅ MongoDB integration working
✅ Deployment configuration updated for Python 3.11.9

## Next Steps

1. Push these changes to your repository
2. Deploy to Render using one of the methods above
3. Update Vercel environment variable `REACT_APP_BACKEND_URL` with your Render URL
4. Test the production deployment

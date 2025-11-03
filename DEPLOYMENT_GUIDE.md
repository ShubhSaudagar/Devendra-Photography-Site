# DSP Film's - Deployment Guide

## Quick Start

### Prerequisites
- Python 3.11.9
- MongoDB Atlas account
- Node.js 18+ (for frontend)
- Git

## Replit Deployment (Current Setup)

### Backend Setup
1. The backend is configured to run with:
   ```bash
   python3 main.py
   ```

2. Configure Replit Secrets (already done):
   - `MONGO_URL` - MongoDB connection string
   - `DB_NAME` - Database name (dsp_photography)
   - `GROQ_API_KEY` - Groq AI API key (optional)
   - `GEMINI_API_KEY` - Google Gemini API key (optional)
   - `EMERGENCY_RESET_KEY` - Admin password reset key
   - `JWT_SECRET` - JWT signing secret
   - `FRONTEND_URL` - Frontend URL for CORS

3. The backend runs on port 8000

### Workflow Configuration
The workflow is set to run `python3 main.py` which:
- Changes to the backend directory
- Loads environment variables
- Starts the FastAPI server with Uvicorn

## Render Deployment (Production Backend)

### Setup Steps

1. **Connect GitHub Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - **Name**: `dsp-photography-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `gunicorn -c backend/gunicorn.conf.py backend.server:app`
   - **Instance Type**: Free or Starter

3. **Environment Variables** (add in Render dashboard)
   ```
   MONGO_URL=your_mongodb_atlas_connection_string
   DB_NAME=dsp_photography
   FRONTEND_URL=https://your-vercel-app.vercel.app
   GROQ_API_KEY=your_groq_api_key
   GEMINI_API_KEY=your_gemini_api_key
   EMERGENCY_RESET_KEY=your_emergency_reset_key
   JWT_SECRET=your_jwt_secret
   PORT=8000
   PYTHON_VERSION=3.11.9
   ```

4. **Deploy**
   - Render will automatically build and deploy
   - Your API will be available at: `https://your-service.onrender.com`

### Gunicorn Configuration
The backend includes `gunicorn.conf.py` with optimal settings:
- 2 Uvicorn workers
- Automatic worker restart (memory leak protection)
- 120-second timeout
- Health monitoring

## Vercel Deployment (Frontend)

### Setup Steps

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `yarn build`
     - **Output Directory**: `build`

3. **Environment Variables**
   ```
   REACT_APP_BACKEND_URL=https://your-render-service.onrender.com
   ```

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your frontend will be available at: `https://your-app.vercel.app`

## MongoDB Atlas Setup

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a free M0 cluster

2. **Configure Access**
   - Database Access: Create user with read/write permissions
   - Network Access: Add IP address `0.0.0.0/0` (allow from anywhere)

3. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

4. **Initial Data**
   - Use the setup scripts in `backend/seed_data.py` to populate initial data
   - Or manually add data through the admin panel

## Post-Deployment

### 1. Set Up Admin Account
```bash
cd backend
python setup_admin.py
```

### 2. Test the API
```bash
curl https://your-api-url.onrender.com/api/services
```

### 3. Test the Frontend
- Visit your Vercel URL
- Check homepage loads correctly
- Test admin login at `/admin`

### 4. Update CORS
Update `FRONTEND_URL` in backend environment variables to match your Vercel deployment URL.

## Troubleshooting

### Backend Issues
- **MongoDB Connection Error**: Check `MONGO_URL` and IP whitelist
- **Import Errors**: Verify all dependencies in `requirements.txt`
- **Port Issues**: Render uses `PORT` environment variable

### Frontend Issues
- **API Connection Failed**: Check `REACT_APP_BACKEND_URL` points to correct backend
- **Build Errors**: Run `yarn build` locally to test

### CORS Issues
- Ensure `FRONTEND_URL` in backend matches your frontend deployment URL
- Check browser console for specific CORS errors

## Monitoring

### Render
- View logs in Render dashboard
- Set up health check endpoints
- Monitor resource usage

### Vercel
- View deployment logs in Vercel dashboard
- Check analytics for traffic patterns

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong `EMERGENCY_RESET_KEY`
- [ ] Use strong `JWT_SECRET`
- [ ] Update MongoDB user credentials
- [ ] Restrict MongoDB IP access (production)
- [ ] Enable HTTPS only
- [ ] Review CORS settings
- [ ] Set secure cookie flags
- [ ] Regular security updates

## Maintenance

### Regular Tasks
1. Monitor MongoDB storage usage
2. Review application logs
3. Update dependencies monthly
4. Backup database regularly
5. Test admin panel functionality

### Updating Code
1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Render auto-deploys from main branch
5. Vercel auto-deploys frontend

---

For support or questions, refer to the main [README.md](README.md) file.

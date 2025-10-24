# Environment Variables Setup Guide

## 📋 Overview

This project uses environment variables to store sensitive configuration data like API keys, database credentials, and secrets. This guide explains how to set up your environment for local development and production deployment.

## 🚀 Quick Start

### For Local Development

1. **Copy the example file:**
   ```bash
   cp backend/.env.sample backend/.env
   ```

2. **Fill in your actual values:**
   ```bash
   # Edit backend/.env with your favorite editor
   nano backend/.env
   # or
   vim backend/.env
   ```

3. **Get API Keys:**
   - **Groq API**: https://console.groq.com (Free tier, no credit card)
   - **Gemini API**: https://ai.google.dev (1,500 requests/day free)

4. **Update the values:**
   ```env
   GROQ_API_KEY=your_actual_groq_key_here
   GEMINI_API_KEY=your_actual_gemini_key_here
   EMERGENCY_RESET_KEY=choose_a_secure_key
   JWT_SECRET=generate_a_random_secret_key
   ```

5. **Run the application:**
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   python server.py

   # Frontend
   cd frontend
   yarn install
   yarn start
   ```

## 🔐 Required Environment Variables

### Backend Variables (`backend/.env`)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017` | Yes |
| `DB_NAME` | Database name | `test_database` | Yes |
| `GROQ_API_KEY` | Groq AI API key | `gsk_...` | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` | Yes |
| `EMERGENCY_RESET_KEY` | Admin password reset key | `YourSecureKey123!` | Yes |
| `JWT_SECRET` | JWT token secret | `random_secret_string` | Yes |
| `FRONTEND_URL` | Frontend URL | `https://dspfilms.com` | Yes |
| `CORS_ORIGINS` | Allowed CORS origins | `*` or specific URLs | Yes |
| `STORAGE_PATH` | File upload directory | `/app/backend/uploads` | Yes |

### Frontend Variables (`frontend/.env`)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `REACT_APP_BACKEND_URL` | Backend API URL | `https://api.dspfilms.com` | Yes |

## 🌐 Production Deployment

### Vercel (Frontend)

1. Go to your project dashboard
2. Settings → Environment Variables
3. Add:
   ```
   REACT_APP_BACKEND_URL = https://your-backend-url.com
   ```

### Render (Backend)

1. Go to your service dashboard
2. Environment → Environment Variables
3. Add all backend variables from the table above

### Important Security Notes:

- ✅ **DO**: Set production environment variables through hosting dashboards
- ✅ **DO**: Use different API keys for development and production
- ✅ **DO**: Generate strong, random JWT_SECRET for production
- ❌ **DON'T**: Commit `.env` files to GitHub
- ❌ **DON'T**: Share API keys in public channels
- ❌ **DON'T**: Use the same emergency reset key everywhere

## 🔧 Generating Secure Values

### JWT Secret
```bash
# Generate a secure JWT secret (32+ characters)
openssl rand -hex 32
# or
python -c "import secrets; print(secrets.token_hex(32))"
```

### Emergency Reset Key
```bash
# Generate a strong password
openssl rand -base64 24
```

## 🧪 Testing Your Setup

### Backend Health Check
```bash
curl http://localhost:8001/api/
```

Expected response:
```json
{
  "message": "D.S.P.Film's Photography API",
  "version": "1.0.0"
}
```

### Frontend Connection
```bash
# In browser console (http://localhost:3000)
console.log(process.env.REACT_APP_BACKEND_URL)
```

Should output your backend URL.

## 🐛 Troubleshooting

### "Environment variable not found"
- Check if `.env` file exists in the correct directory
- Verify variable names match exactly (case-sensitive)
- Restart your development server after changing `.env`

### "CORS error"
- Update `CORS_ORIGINS` in backend `.env`
- Make sure frontend URL is included
- Restart backend server

### "Invalid API key"
- Verify Groq/Gemini keys are correct
- Check for extra spaces or quotes
- Test keys in admin settings panel

### "AI features not working"
- Login to admin panel
- Go to Settings → Update API keys
- Test with "Generate Caption" feature

## 📦 Team Setup

### For New Team Members

1. **Request access to secrets:**
   - Ask team lead for `.env.secrets` file
   - Or get individual API keys

2. **Set up locally:**
   ```bash
   # Backend
   cp backend/.env.sample backend/.env
   # Fill in values from shared secrets
   
   # Frontend
   cp frontend/.env.example frontend/.env
   # Add backend URL
   ```

3. **Verify setup:**
   ```bash
   # Test backend
   cd backend && python server.py
   
   # Test frontend
   cd frontend && yarn start
   ```

## 🔄 Updating Environment Variables

### Local Development
```bash
# Edit the file
nano backend/.env

# Restart the server
sudo supervisorctl restart backend
```

### Production (Vercel/Render)
1. Update in dashboard
2. Redeploy (automatic on Vercel)
3. Manual restart on Render if needed

### Via Admin Panel (for AI keys only)
1. Login: https://dspfilms.com/admin
2. Navigate to Settings
3. Update Groq/Gemini API keys
4. Click "Save Settings"
5. Changes apply immediately

## 📝 Best Practices

1. **Rotate keys regularly** (every 90 days recommended)
2. **Use different keys per environment** (dev, staging, prod)
3. **Monitor API usage** to detect unauthorized access
4. **Backup your keys** in a secure password manager
5. **Review access logs** monthly
6. **Delete unused keys** from providers

## 🔗 Helpful Links

- **Groq Console**: https://console.groq.com
- **Google AI Studio**: https://ai.google.dev
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Vercel Docs**: https://vercel.com/docs/environment-variables
- **Render Docs**: https://render.com/docs/environment-variables

## 🆘 Getting Help

If you encounter issues:

1. Check this guide first
2. Review error logs: `tail -f /var/log/supervisor/backend.err.log`
3. Test API keys in provider console
4. Contact team lead or DevOps

---

**Last Updated**: 2025-01-24  
**Maintainer**: Development Team  
**Project**: D.S.P.Film's Photography Website

#!/bin/bash

echo "🔧 DSP Film's - Production Deployment Fix Script"
echo "================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo -e "${RED}❌ Error: frontend directory not found${NC}"
    echo "Please run this script from the /app directory"
    exit 1
fi

echo "✅ Directory check passed"
echo ""

# Check backend is accessible
echo "🔍 Checking backend connectivity..."
BACKEND_URL="https://devendra-photography-site.onrender.com/api/"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $BACKEND_URL)

if [ "$HTTP_CODE" == "200" ]; then
    echo -e "${GREEN}✅ Backend is live and responding${NC}"
else
    echo -e "${RED}❌ Backend check failed (HTTP $HTTP_CODE)${NC}"
    echo "Backend URL: $BACKEND_URL"
    exit 1
fi
echo ""

# Build frontend locally to verify
echo "🏗️  Building frontend locally..."
cd frontend
yarn build > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Local build successful${NC}"
else
    echo -e "${RED}❌ Local build failed${NC}"
    echo "Please check the build errors"
    exit 1
fi
cd ..
echo ""

# Git status
echo "📦 Checking git status..."
git status --short
echo ""

# Commit if needed
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Committing changes..."
    git add .
    git commit -m "fix: Update backend URL and Vercel configuration for production"
    echo -e "${GREEN}✅ Changes committed${NC}"
else
    echo "✅ No changes to commit"
fi
echo ""

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to GitHub${NC}"
else
    echo -e "${RED}❌ Failed to push to GitHub${NC}"
    exit 1
fi
echo ""

echo "================================================"
echo -e "${YELLOW}⚠️  IMPORTANT: Manual Vercel Configuration Required${NC}"
echo ""
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Select: Devendra-Photography-Site"
echo "3. Go to: Settings → Environment Variables"
echo "4. Add/Update:"
echo "   Name: REACT_APP_BACKEND_URL"
echo "   Value: https://devendra-photography-site.onrender.com"
echo "   Environments: ✓ Production ✓ Preview ✓ Development"
echo "5. Save and Redeploy"
echo "6. ✅ IMPORTANT: Select 'Clear Build Cache' when redeploying"
echo ""
echo "================================================"
echo ""
echo -e "${GREEN}✅ Local fixes complete!${NC}"
echo -e "${YELLOW}⏳ Waiting for Vercel environment variable update...${NC}"
echo ""
echo "After updating Vercel, your site should be live at:"
echo "🌐 https://dspfilms.com"
echo ""

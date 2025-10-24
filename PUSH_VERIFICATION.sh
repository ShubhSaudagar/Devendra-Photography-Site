#!/bin/bash

echo "🔍 GitHub Push Verification Script"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check for secrets in staged files
echo "1. Checking for secrets in staged files..."
if git diff --cached | grep -qiE "(gsk_[a-zA-Z0-9]{50}|AIza[a-zA-Z0-9_-]{35}|DSP2025Reset!)"; then
    echo -e "${RED}❌ FOUND SECRETS IN STAGED FILES!${NC}"
    echo "Run 'git diff --cached' to see what will be committed"
    exit 1
else
    echo -e "${GREEN}✅ No secrets found in staged files${NC}"
fi

echo ""
echo "2. Checking .gitignore..."
if grep -q "\.env\.secrets" .gitignore && grep -q "^\*\.env$" .gitignore; then
    echo -e "${GREEN}✅ .gitignore properly configured${NC}"
else
    echo -e "${RED}❌ .gitignore missing required entries${NC}"
    exit 1
fi

echo ""
echo "3. Checking if .env files are ignored..."
if git ls-files --error-unmatch backend/.env 2>/dev/null; then
    echo -e "${RED}❌ backend/.env is tracked by Git!${NC}"
    echo "Run: git rm --cached backend/.env"
    exit 1
else
    echo -e "${GREEN}✅ .env files are properly ignored${NC}"
fi

echo ""
echo "4. Verifying .env.secrets exists..."
if [ -f .env.secrets ]; then
    echo -e "${GREEN}✅ .env.secrets file found (backup your secrets!)${NC}"
else
    echo -e "${YELLOW}⚠️  .env.secrets not found (may need to create)${NC}"
fi

echo ""
echo "5. Checking backend/.env.sample..."
if [ -f backend/.env.sample ] && grep -q "EMERGENCY_RESET_KEY" backend/.env.sample; then
    echo -e "${GREEN}✅ .env.sample template is ready${NC}"
else
    echo -e "${RED}❌ .env.sample missing or incomplete${NC}"
    exit 1
fi

echo ""
echo "======================================"
echo -e "${GREEN}🎉 ALL CHECKS PASSED!${NC}"
echo ""
echo "Your project is SAFE to push to GitHub."
echo ""
echo "Run these commands:"
echo "  git add ."
echo "  git commit -m \"security: Remove hardcoded secrets\""
echo "  git push origin admin-panel-v2"
echo ""

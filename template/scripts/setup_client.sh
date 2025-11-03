#!/bin/bash

# Photography Admin Template - Client Setup Script
# This script automates the initial setup for a new photography client

set -e  # Exit on error

echo "🎨 Photography Admin Template - Client Setup"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

# Check prerequisites
echo "Checking prerequisites..."
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed"
    exit 1
fi
print_success "Python 3 found: $(python3 --version)"

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    exit 1
fi
print_success "Node.js found: $(node --version)"

# Check npm or yarn
if command -v yarn &> /dev/null; then
    PACKAGE_MANAGER="yarn"
    print_success "Yarn found: $(yarn --version)"
elif command -v npm &> /dev/null; then
    PACKAGE_MANAGER="npm"
    print_success "npm found: $(npm --version)"
else
    print_error "Neither npm nor yarn is installed"
    exit 1
fi

echo ""
echo "=============================================="
echo "Client Information"
echo "=============================================="
echo ""

# Gather client information
read -p "Business Name: " BUSINESS_NAME
read -p "Business Email: " BUSINESS_EMAIL
read -p "Owner Name: " OWNER_NAME
read -p "City: " CITY
read -p "State/Province: " STATE
read -p "Country: " COUNTRY

echo ""
read -p "Database Name (lowercase, no spaces): " DB_NAME
read -p "MongoDB Connection String: " MONGO_URL

echo ""
echo "=============================================="
echo "Admin User Setup"
echo "=============================================="
echo ""

read -p "Admin Email: " ADMIN_EMAIL
read -sp "Admin Password: " ADMIN_PASSWORD
echo ""

echo ""
print_info "Generating security secrets..."

# Generate secrets
JWT_SECRET=$(python3 -c "import secrets; print(secrets.token_hex(32))")
EMERGENCY_KEY=$(python3 -c "import secrets; print(secrets.token_hex(16))")

print_success "Security secrets generated"

echo ""
echo "=============================================="
echo "Configuration"
echo "=============================================="
echo ""

# Create config directory
mkdir -p config

# Create business configuration
cat > config/business.json << EOF
{
  "business": {
    "name": "$BUSINESS_NAME",
    "tagline": "Capturing Life's Beautiful Moments",
    "description": "Professional photography services",
    "owner": {
      "name": "$OWNER_NAME",
      "email": "$BUSINESS_EMAIL",
      "phone": ""
    },
    "location": {
      "city": "$CITY",
      "state": "$STATE",
      "country": "$COUNTRY",
      "timezone": "America/New_York"
    },
    "social": {
      "instagram": "",
      "facebook": "",
      "twitter": "",
      "youtube": ""
    }
  },
  "branding": {
    "logo": "/assets/logo.png",
    "favicon": "/assets/favicon.ico",
    "primaryColor": "#1a1a1a",
    "secondaryColor": "#f5f5f5",
    "accentColor": "#d4af37",
    "fontFamily": "Inter, sans-serif"
  },
  "features": {
    "enableBlog": true,
    "enableVideos": true,
    "enableBooking": true,
    "enablePackages": true,
    "enableTestimonials": true,
    "enableAnalytics": true,
    "enableAIContentGeneration": false,
    "enableMultiLanguage": false
  }
}
EOF

print_success "Business configuration created: config/business.json"

# Create backend .env
cat > backend/.env << EOF
# Database
MONGO_URL=$MONGO_URL
DB_NAME=$DB_NAME

# Security
JWT_SECRET=$JWT_SECRET
EMERGENCY_RESET_KEY=$EMERGENCY_KEY

# Environment
ENVIRONMENT=development
FRONTEND_URL=http://localhost:3000

# Server
PORT=8000

# Optional: AI Content Generation
GROQ_API_KEY=
GEMINI_API_KEY=
EOF

print_success "Backend environment file created: backend/.env"

# Create frontend .env
cat > frontend/.env << EOF
REACT_APP_BACKEND_URL=http://localhost:8000
EOF

print_success "Frontend environment file created: frontend/.env"

echo ""
echo "=============================================="
echo "Installing Dependencies"
echo "=============================================="
echo ""

# Install backend dependencies
print_info "Installing Python dependencies..."
cd backend
pip3 install -r requirements.txt > /dev/null 2>&1
print_success "Backend dependencies installed"
cd ..

# Install frontend dependencies
print_info "Installing Node.js dependencies..."
cd frontend
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    yarn install > /dev/null 2>&1
else
    npm install > /dev/null 2>&1
fi
print_success "Frontend dependencies installed"
cd ..

echo ""
echo "=============================================="
echo "Starting Backend"
echo "=============================================="
echo ""

# Start backend in background
print_info "Starting backend server..."
cd backend
python3 main.py > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 5

# Check if backend is running
if ps -p $BACKEND_PID > /dev/null; then
    print_success "Backend server started (PID: $BACKEND_PID)"
else
    print_error "Backend server failed to start"
    cat backend.log
    exit 1
fi

echo ""
echo "=============================================="
echo "Creating Admin User"
echo "=============================================="
echo ""

# Wait a bit more for server to fully initialize
sleep 2

# Create admin user
print_info "Creating admin user..."
RESPONSE=$(curl -s -X POST http://localhost:8000/api/admin/auth/create-initial-admin \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$ADMIN_EMAIL\",
    \"password\": \"$ADMIN_PASSWORD\",
    \"name\": \"$OWNER_NAME\"
  }")

if echo "$RESPONSE" | grep -q "success"; then
    print_success "Admin user created successfully"
else
    print_error "Failed to create admin user"
    echo "Response: $RESPONSE"
fi

echo ""
echo "=============================================="
echo "Setup Complete!"
echo "=============================================="
echo ""
echo "📊 Setup Summary:"
echo ""
echo "Business: $BUSINESS_NAME"
echo "Database: $DB_NAME"
echo "Admin Email: $ADMIN_EMAIL"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1. Frontend Development Server:"
echo "   cd frontend"
echo "   $PACKAGE_MANAGER start"
echo ""
echo "2. Backend is already running (PID: $BACKEND_PID)"
echo "   Logs: tail -f backend.log"
echo ""
echo "3. Access Admin Panel:"
echo "   http://localhost:3000/admin"
echo "   Email: $ADMIN_EMAIL"
echo "   Password: [your password]"
echo ""
echo "4. Stop Backend Server:"
echo "   kill $BACKEND_PID"
echo ""
echo "📖 Documentation:"
echo "   - Setup Guide: template/docs/SETUP_GUIDE.md"
echo "   - Customization: template/docs/CUSTOMIZATION_GUIDE.md"
echo "   - Deployment: GITHUB_DEPLOYMENT_SETUP.md"
echo ""
print_success "Setup completed successfully!"
echo ""

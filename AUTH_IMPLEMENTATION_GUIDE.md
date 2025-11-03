# JWT + Cookie Authentication Implementation Guide

## Overview

The DSP Film's photography website now supports **dual authentication**: session cookies (httpOnly) AND JWT tokens via Authorization header.

## Security Features Implemented

### Backend (FastAPI)
1. **Session-based authentication** (Cookie)
   - HttpOnly, Secure cookies
   - SameSite='lax' for CSRF protection
   - Session tokens stored in MongoDB with expiration
   - Automatic cleanup of expired sessions

2. **JWT Token authentication** (Authorization header)
   - HS256 algorithm with secure secret
   - 7-day token expiry
   - User claims: sub (email), role, userId
   - Verified on every protected request

3. **Dual authentication support**
   - `get_current_user()` checks Authorization header FIRST
   - Falls back to session cookie if no Bearer token
   - Flexible for both web and mobile clients

### Frontend (React)
1. **Automatic token management**
   - JWT stored in localStorage on login
   - Axios interceptor adds `Authorization: Bearer <token>` to all requests
   - Automatic logout on 401 responses
   - Auto-redirect to login on authentication failure

2. **API Client Features**
   - `authAPI.login()` - Stores token and user data
   - `authAPI.logout()` - Clears local storage
   - `authAPI.isAuthenticated()` - Check auth status
   - `authAPI.getCurrentUser()` - Get user from localStorage

## Required Environment Variables

### Critical - Must Set

```bash
JWT_SECRET=<your-strong-random-secret-here>
```

**Generate a secure JWT secret:**
```bash
# Option 1: Using OpenSSL
openssl rand -hex 32

# Option 2: Using Python
python -c "import secrets; print(secrets.token_hex(32))"

# Option 3: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**⚠️ SECURITY WARNING**: 
- The application will FAIL to start if `JWT_SECRET` is not set
- This is intentional - never use default/hard-coded secrets
- Generate a NEW secret for each environment (dev/staging/prod)
- NEVER commit JWT secrets to version control

### Other Required Variables

```bash
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=dsp_photography
FRONTEND_URL=https://your-frontend-domain.vercel.app
EMERGENCY_RESET_KEY=<your-emergency-reset-secret>
```

## API Endpoints

### Authentication Endpoints

#### 1. Login
```bash
POST /api/admin/auth/login
Content-Type: application/json

{
  "email": "devshinde45@gmail.com",
  "password": "DSPAdmin@123",
  "rememberMe": false
}

# Response:
{
  "success": true,
  "message": "Login successful",
  "user": { 
    "userId": "xxx",
    "email": "devshinde45@gmail.com",
    "name": "Devendra S. Shinde",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# Sets Cookie: admin_session=<session_token>; HttpOnly; SameSite=Lax
```

#### 2. Logout
```bash
POST /api/admin/auth/logout
Cookie: admin_session=<token>
# OR
Authorization: Bearer <jwt_token>

# Response:
{
  "success": true,
  "message": "Logged out"
}
```

#### 3. Get Current User
```bash
GET /api/admin/auth/me
Authorization: Bearer <jwt_token>
# OR via Cookie

# Response:
{
  "success": true,
  "user": { ... }
}
```

#### 4. Create Initial Admin (First-time setup only)
```bash
POST /api/admin/auth/create-initial-admin
Content-Type: application/json

{
  "email": "devshinde45@gmail.com",
  "password": "DSPAdmin@123",
  "name": "Devendra S. Shinde"
}
```

### Protected Endpoints

All admin endpoints (`/api/admin/*`) automatically check authentication using:
1. **JWT token in Authorization header** (preferred)
2. **Session cookie** (fallback)

Example protected request:
```bash
GET /api/admin/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Testing the Implementation

### 1. Set Environment Variables

```bash
# In Replit Secrets, add:
JWT_SECRET=your-generated-secret-here
MONGO_URL=your-mongodb-connection-string
DB_NAME=dsp_photography
EMERGENCY_RESET_KEY=your-emergency-key
```

### 2. Start the Backend

```bash
python3 main.py
```

**Expected output:**
```
✅ Auth router included: /api/admin/auth
🚀 Starting DSP Photography API on 0.0.0.0:8000
```

### 3. Create Admin User

```bash
curl -X POST http://localhost:8000/api/admin/auth/create-initial-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "devshinde45@gmail.com",
    "password": "DSPAdmin@123",
    "name": "Devendra S. Shinde"
  }'
```

### 4. Test Login

```bash
curl -X POST http://localhost:8000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "devshinde45@gmail.com",
    "password": "DSPAdmin@123",
    "rememberMe": false
  }' \
  -c cookies.txt \
  -v
```

**Check for:**
- ✅ HTTP 200 response
- ✅ JSON response with `token` field
- ✅ Set-Cookie header with `admin_session`

### 5. Test JWT Authentication

```bash
# Extract token from login response
TOKEN="<paste-token-here>"

# Test protected endpoint with JWT
curl -X GET http://localhost:8000/api/admin/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### 6. Test Cookie Authentication

```bash
# Using saved cookies from login
curl -X GET http://localhost:8000/api/admin/auth/me \
  -b cookies.txt
```

### 7. Test Frontend Login

```javascript
// In browser console or React component
import { authAPI } from './services/api';

// Login
const response = await authAPI.login(
  'devshinde45@gmail.com', 
  'DSPAdmin@123',
  false
);

console.log('Token:', response.token);
console.log('User:', response.user);

// Check authentication
console.log('Authenticated:', authAPI.isAuthenticated());

// Get current user
console.log('Current user:', authAPI.getCurrentUser());

// All subsequent API calls will include Authorization header
```

## Frontend Integration

### Login Component Example

```javascript
import { authAPI } from '../services/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(email, password, rememberMe);
      console.log('Login successful:', response);
      // Redirect to dashboard
      window.location.href = '/admin/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password"
      />
      <label>
        <input 
          type="checkbox" 
          checked={rememberMe} 
          onChange={(e) => setRememberMe(e.target.checked)} 
        />
        Remember Me
      </label>
      <button type="submit">Login</button>
    </form>
  );
};
```

### Protected Route Component

```javascript
import { authAPI } from '../services/api';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  if (!authAPI.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Usage in routes:
<Route path="/admin/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

## Security Best Practices

### ✅ Implemented
- JWT secret required (no default fallback)
- HttpOnly cookies for session tokens
- SameSite=Lax for CSRF protection
- Token expiration (7 days default, 30 days with remember-me)
- Secure password hashing (bcrypt)
- Session token hashing (SHA-256)
- Automatic 401 handling and logout

### ⚠️ Recommended Improvements
1. **Use httpOnly cookies for JWT instead of localStorage** (eliminates XSS risk)
2. **Implement refresh token rotation**
3. **Add CSRF double-submit token for state-changing requests**
4. **Implement rate limiting on login endpoint**
5. **Add audit logging for authentication events**
6. **Set Secure flag on cookies in production (HTTPS only)**

### Production Checklist
- [ ] Generate unique JWT_SECRET for production
- [ ] Rotate JWT_SECRET regularly (e.g., monthly)
- [ ] Enable HTTPS only (Secure flag on cookies)
- [ ] Restrict CORS to specific frontend domain
- [ ] Implement rate limiting
- [ ] Enable audit logging
- [ ] Set up monitoring for failed login attempts
- [ ] Configure session timeout policies

## Troubleshooting

### Backend won't start: "JWT_SECRET must be set"
**Solution:** Set the JWT_SECRET environment variable in Replit Secrets

```bash
# Generate a secret:
python -c "import secrets; print(secrets.token_hex(32))"

# Add to Replit Secrets:
JWT_SECRET=<generated-secret>
```

### Login returns 500 error: "MongoDB authentication failed"
**Solution:** Update MONGO_URL with valid MongoDB Atlas credentials

### Frontend gets 401 on protected routes
**Check:**
1. JWT token is stored in localStorage
2. Authorization header is being sent
3. Token hasn't expired (check expiry claim)
4. Backend is running and accessible

### Cookies not being set
**Check:**
1. Frontend and backend are on same domain (or CORS configured)
2. `withCredentials: true` in axios config
3. Backend returns Set-Cookie header

---

For support, refer to the main [README.md](README.md) and [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

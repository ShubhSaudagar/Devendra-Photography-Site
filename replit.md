# DSP Film's Photography Portfolio Website

## Overview

DSP Film's is a full-stack photography portfolio and business management platform for professional photographer Devendra S. Shinde. The application features a modern, cinematic public-facing website for showcasing photography services, portfolios, and packages, alongside a comprehensive admin panel for content management, client inquiries, and business analytics.

The platform specializes in wedding photography, pre-wedding shoots, cinematic photography, maternity/newborn sessions, and commercial projects, serving clients primarily in Ahilyanagar and Pune, Maharashtra, India.

**Deployment Status:** Migrated to Replit on October 28, 2025. The application runs successfully with backend on port 8000 and frontend on port 5000.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18.2.0 with Create React App
- Tailwind CSS for styling with custom design system
- Shadcn UI component library for consistent UI patterns
- React Router v6 for client-side routing
- Axios for HTTP requests

**Design Philosophy:**
- Glass-morphism design with gradient overlays
- Responsive, mobile-first approach
- Dark theme with cinematic aesthetics
- Smooth scroll animations and transitions

**Key Routes:**
- `/` - Public homepage with all portfolio sections
- `/admin` - Admin login portal
- `/admin/dashboard/*` - Protected admin dashboard with nested routes

**State Management:**
- Local component state with React hooks
- LocalStorage for admin authentication persistence
- No global state management library (Redux/Context not implemented)

**API Integration:**
- Centralized API service layer in `src/services/api.js`
- Dynamic backend URL resolution for local/production environments
- Axios interceptors for error handling

### Backend Architecture

**Technology Stack:**
- FastAPI 0.115.0 (Python 3.11.9)
- Motor (AsyncIO MongoDB driver) for database operations
- Pydantic v2.9.2 for data validation
- Uvicorn/Gunicorn for ASGI server
- Bcrypt for password hashing
- Python-Jose for JWT handling

**API Design:**
- RESTful API with `/api` prefix
- Separate admin routes under `/api/admin`
- Cookie-based session authentication for admin panel
- CORS middleware configured for cross-origin requests

**Key Endpoints:**
- Public APIs: Content, Services, Portfolio, Packages, Testimonials, Inquiries
- Admin APIs: Authentication, CRUD for all content types, Analytics, Settings, File Upload
- AI Integration: Caption generation, ad copy, SEO metadata, content enhancement

**Authentication System:**
- Session-based authentication using secure cookies
- Token hashing with SHA-256 for storage
- Role-based access control (admin/editor roles)
- "Remember Me" functionality (7-day vs 30-day sessions)
- Emergency password reset mechanism

**File Upload System:**
- Local file storage in `/app/backend/uploads`
- MongoDB metadata tracking (mediaId, filename, URL, type, size)
- Multipart form-data support
- Architecture prepared for Cloudflare R2 migration (not yet implemented)

### Data Storage

**Database:** MongoDB (Motor async driver)

**Collections:**
- `site_content` - Dynamic website content (hero, about, contact sections)
- `services` - Photography service offerings
- `portfolio` - Portfolio items organized by category
- `packages` - Pricing packages for different photography types
- `testimonials` - Client testimonials
- `inquiries` - Contact form submissions
- `users` - Admin users with roles and permissions
- `sessions` - Active admin sessions
- `blog` - Blog posts (admin-only)
- `videos` - Video content management
- `offers` - Promotional offers
- `pages` - Custom page content
- `media` - Uploaded file metadata
- `activity_log` - Admin action audit trail
- `analytics` - Site interaction tracking

**Schema Design:**
- Document-based with embedded arrays for features/lists
- ObjectId for primary keys, custom IDs (UUID) for business logic
- Timestamps (createdAt, updatedAt) on all collections
- Soft deletes via `isActive` boolean flags

### Authentication & Authorization

**Admin Authentication:**
- Email/password login with bcrypt hashing
- Session tokens (32-byte URL-safe random strings)
- Token hashing for secure storage (SHA-256)
- Cookie-based sessions with httpOnly flag
- Session expiration: 7 days (default) or 30 days (remember me)

**Role Permissions:**
- **Admin Role**: Full access including user management, settings, analytics, marketing
- **Editor Role**: Content management only (gallery, blog, videos, services)
- Permission checking via `has_permission()` helper function

**Security Features:**
- Password complexity requirements enforced
- Emergency reset endpoint with secret key
- Activity logging for audit trails
- CORS restricted to specific origins

## External Dependencies

### Third-Party APIs

**AI Content Generation:**
- **Groq API (Primary)**: llama-3.3-70b-versatile model for content generation
  - Used for: Social media captions, ad copy, content enhancement, SEO metadata
  - Fallback behavior: Switches to Gemini on failure/quota exhaustion
- **Google Gemini API (Fallback)**: gemini-2.5-pro model
  - Automatically activated when Groq fails
  - API keys managed dynamically via admin settings

**Marketing Integrations (Toggleable via Admin):**
- Facebook Pixel
- Google Analytics 4 (GA4)
- Google Tag Manager (GTM)

### Cloud Services

**Database:**
- MongoDB Atlas (connection string via environment variable)
- Database name: `dsp_photography`

**Deployment Platforms:**
- **Current (Replit)**: Full-stack development and hosting
  - Backend workflow: `cd backend && python -m uvicorn server:app --host 0.0.0.0 --port 8000 --reload`
  - Frontend workflow: `cd frontend && yarn start`
  - Ports: Backend (8000), Frontend (5000)
- **Previous (Vercel + Render)**:
  - Frontend: Vercel (Create React App build)
  - Backend: Render (Python 3.11.9)

**File Storage:**
- Current: Local filesystem (`/app/backend/uploads`)
- Future: Cloudflare R2 (infrastructure prepared, not implemented)

### Environment Variables

**Backend Required:**
- `MONGO_URL` - MongoDB connection string
- `DB_NAME` - Database name (dsp_photography)
- `FRONTEND_URL` - CORS origin (Vercel URL)
- `GROQ_API_KEY` - Groq AI API key (optional, configurable via admin)
- `GEMINI_API_KEY` - Google Gemini API key (optional, configurable via admin)
- `EMERGENCY_RESET_KEY` - Secret key for password reset
- `JWT_SECRET` - JWT signing secret (currently unused, reserved)
- `PORT` - Server port (default: 8000)

**Frontend Required:**
- `REACT_APP_BACKEND_URL` - Backend API URL

### Python Dependencies (Key Libraries)

- `fastapi==0.115.0` - Web framework
- `pydantic==2.9.2` - Data validation
- `motor==3.5.1` - Async MongoDB driver
- `uvicorn==0.30.6` - ASGI server
- `gunicorn==23.0.0` - Production server
- `python-multipart==0.0.12` - File upload support
- `python-jose[cryptography]==3.3.0` - JWT handling
- `passlib[bcrypt]==1.7.4` - Password hashing
- `groq==0.33.0` - Groq AI SDK
- `google-generativeai==0.8.5` - Google Gemini SDK

### Known Issues & Fixes

**Python 3.13 Compatibility:**
- Original deployment failed with Pydantic v1.10.4 on Python 3.13
- Solution: Upgraded to Pydantic v2.9.2 and FastAPI 0.115.0
- Migration required: `.dict()` → `.model_dump()` in all endpoints
- Runtime forced to Python 3.11.9 via `runtime.txt` for stability

**CORS Configuration:**
- Production domain `https://dspfilms.com` must be explicitly added to CORS origins
- Wildcard patterns (`https://*.vercel.app`) supported for staging environments
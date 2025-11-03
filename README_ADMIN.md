# DSP Film's - Admin Panel Documentation

## 🎉 Admin Panel Successfully Deployed!

Premium modern admin panel with glass-morphism design for managing your photography website.

---

## 🔐 Admin Login Setup

**Admin Portal URL:** `http://localhost:3000/admin` (local) or your deployed frontend URL + `/admin`

### Setting Up Admin Credentials

For security reasons, admin credentials are NOT stored in code. To create your admin account:

1. **Use the setup script:**
   ```bash
   cd backend
   python setup_admin.py
   ```
   
2. **Or use the emergency reset endpoint** (requires `EMERGENCY_RESET_KEY` environment variable):
   - Send a POST request to `/api/admin/auth/emergency-reset` with your emergency reset key
   - This will create/reset the admin account

⚠️ **SECURITY IMPORTANT:** 
- Never commit admin credentials to Git
- Store passwords securely using environment variables
- Change default passwords immediately
- Use strong, unique passwords for production

---

## 🌟 Features Overview

### 1. **Dashboard**
- Quick stats overview (Gallery items, Blog posts, Videos, Inquiries)
- Quick action buttons for common tasks
- Beautiful gradient glass-morphism UI

### 2. **Gallery Manager**
- Full CRUD operations on portfolio images
- Upload, edit, and delete gallery items
- Category-based organization
- Image preview and management

### 3. **Videos Manager**
- Add and manage video content
- YouTube/Vimeo integration ready
- Thumbnail management

### 4. **Blog Manager**
- Create and publish blog posts
- Rich text editing (ready for WYSIWYG)
- SEO fields (title, description, OG image)
- Draft/Published status

### 5. **Offers Manager**
- Create promotional offers
- Set validity periods
- Discount management

### 6. **Pages Manager**
- Create custom landing pages
- Template selection
- SEO optimization

### 7. **Analytics** (Admin only)
- Page views tracking
- Click tracking
- Top pages report
- Custom event tracking

### 8. **Marketing & Automation** (Admin only)
- Facebook Pixel management
- Google Analytics 4 integration
- GTM (Google Tag Manager) setup
- Custom tracking scripts
- AI-ready API hooks (for future integration)

### 9. **Users Management** (Admin only)
- Create new users (Admin/Editor roles)
- Update user permissions
- Deactivate users

### 10. **Settings** (Admin only)
- Site configuration
- Footer credit customization
- Theme settings
- Reset to default option

---

## 👥 User Roles & Permissions

### Admin Role
- Full access to all features
- User management
- Analytics and marketing
- Settings configuration
- Content management

### Editor Role
- Gallery management
- Blog posts
- Videos management
- Offers management
- Pages management
- **Cannot:** Manage users, view analytics, edit settings

---

## 📝 How to Use

### First Time Setup
1. Go to `http://localhost:3000/admin`
2. Login with provided credentials
3. Change password in Settings
4. Update site content and upload photos

### Adding Gallery Images
1. Click **Gallery** in sidebar
2. Click **Add New Item**
3. Fill in title, category, image URL
4. Click **Save**

### Creating Blog Posts
1. Click **Blog** in sidebar
2. Click **New Post**
3. Fill in title, content, featured image
4. Set SEO fields (optional)
5. Publish or save as draft

### Managing Users (Admin only)
1. Click **Users** in sidebar
2. Click **Add User**
3. Enter email, name, password
4. Select role (Admin/Editor)
5. Click **Create**

### Setting up Analytics
1. Click **Analytics** in sidebar
2. View site statistics
3. Check top pages and recent activity

### Marketing Scripts Setup
1. Click **Marketing** in sidebar
2. Click **Add Script**
3. Select type (Facebook Pixel, GA4, GTM)
4. Enter script ID
5. Toggle ON/OFF as needed

---

## 🤖 AI & Automation (Future Ready)

The system is ready for AI integration. API hooks are in place for:

- **Auto Photo Captioning:** Generate descriptions for uploaded photos
- **Ad Copy Generation:** AI-powered marketing copy
- **Content Suggestions:** Blog topic recommendations
- **Color Grading Suggestions:** AI-based photo enhancement tips

To integrate AI features:
1. Obtain API keys from your preferred provider (OpenAI, Claude, Gemini)
2. Add keys to backend `.env` file
3. Uncomment AI route handlers in `server.py`
4. Enable features in Marketing & Automation tab

---

## 📊 Analytics Tracking

### Custom Event Tracking
The site automatically tracks:
- Page views
- Button clicks
- Form submissions
- Gallery interactions

### Add Google Analytics 4
1. Go to Marketing tab
2. Click "Add Script"
3. Select "GA4"
4. Enter your GA4 measurement ID (G-XXXXXXXXXX)
5. Toggle "Active"

---

## 🎨 Site Content Updates

### Updated Content (Already Applied)
✅ Brand name: "DSP Film's"
✅ Tagline: "Photography | Video Production | Advertising ⭐⭐⭐⭐⭐"
✅ Location: "Ahilyanagar & Pune, Maharashtra"
✅ Category: "Maternity/ NewBorn & Family"
✅ Stats: "2L+ Photos Captured"
✅ About photo: Updated to DevShinde.png
✅ Footer credit: "Site built by Shubham Saudagar" with Instagram link

### Updated Packages (7 New Packages)
1. Wedding Package - Basic (₹50,000)
2. Wedding Package - Premium (₹1,15,000)
3. Pre-Wedding - Cinematic (₹49,000)
4. Pre-Wedding - Basic (₹23,000)
5. Maternity Package (₹16,000)
6. Indoor Baby Shoot (₹5,000)
7. Baby Shoot with Video (₹20,000)

All packages include detailed features and terms & conditions.

---

## 🔧 Technical Details

### Backend API Endpoints

**Authentication:**
- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Logout
- `GET /api/admin/auth/me` - Get current user

**Content Management:**
- `GET /api/admin/blog` - Get all blog posts
- `POST /api/admin/blog` - Create blog post
- `PUT /api/admin/blog/{id}` - Update blog post
- `DELETE /api/admin/blog/{id}` - Delete blog post

(Similar patterns for videos, offers, pages, media)

**Users (Admin only):**
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Delete user

**Analytics:**
- `POST /api/analytics/track` - Track event
- `GET /api/admin/analytics/stats` - Get statistics

**Marketing:**
- `GET /api/admin/marketing/scripts` - Get scripts
- `POST /api/admin/marketing/scripts` - Add script
- `PUT /api/admin/marketing/scripts/{id}` - Update script

### Database Collections
- `users` - Admin and editor users
- `sessions` - Login sessions
- `blog` - Blog posts
- `videos` - Video content
- `offers` - Promotional offers
- `pages` - Custom pages
- `media` - Uploaded media files
- `analytics_events` - Event tracking
- `marketing_scripts` - Tracking scripts
- `activity_log` - Admin actions log

---

## 🚀 Deployment

### Current Setup (Local)
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8001`
- Admin: `http://localhost:3000/admin`

### Production Deployment

**Frontend (Vercel):**
- Already deployed
- Environment variables configured
- No changes needed

**Backend (Render):**
- Already deployed
- New endpoints automatically available
- No manual deployment needed

**Important:** After pushing to GitHub, both frontend and backend will auto-deploy.

---

## 🐛 Troubleshooting

### Can't Login
- Check email and password
- Ensure backend is running
- Check browser console for errors

### Images Not Loading
- Verify image URLs are correct
- Check CORS settings
- Ensure MongoDB connection is active

### Analytics Not Tracking
- Check if marketing scripts are active
- Verify script IDs are correct
- Check browser console for errors

---

## 📞 Support & Contacts

**Photographer:**
- Name: Devendra S. Shinde
- Email: devshinde45@gmail.com
- Phone: +91 8308398378

**Website Developer:**
- Name: Shubham Saudagar
- Instagram: [@shubhsaudagar](https://www.instagram.com/shubhsaudagar/)

---

## 📝 Activity Log

The admin panel automatically logs all actions:
- User logins
- Content creation/updates/deletion
- User management actions
- Settings changes

View activity log from the Dashboard or dedicated Activity section.

---

## 🔒 Security Notes

1. **Change default password immediately**
2. Use strong passwords (min 12 characters)
3. Never share admin credentials
4. Regularly review user access
5. Enable password reset via email (future feature)
6. Keep MongoDB connection string secure
7. Use HTTPS in production

---

## 🎯 Roadmap & Future Features

### Coming Soon
- ✨ WYSIWYG editor for blog posts
- 🎨 Live preview editing
- 📱 Media library with drag & drop upload
- 🤖 AI-powered features integration
- 📧 Email notifications for inquiries
- 🔄 Undo last change functionality
- 📊 Advanced analytics charts
- 🌐 Multi-language support
- 📱 Mobile app for admin

### AI Integration (Ready)
- Photo auto-captioning
- Ad copy generation
- Content recommendations
- Smart tagging

---

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Router](https://reactrouter.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## ✅ Checklist for Going Live

- [ ] Change admin password
- [ ] Add all portfolio photos
- [ ] Create at least 3 blog posts
- [ ] Upload videos
- [ ] Set up Google Analytics 4
- [ ] Add Facebook Pixel (if using FB ads)
- [ ] Test all contact forms
- [ ] Verify WhatsApp links work
- [ ] Check mobile responsiveness
- [ ] Test admin panel on production

---

**Last Updated:** October 10, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready

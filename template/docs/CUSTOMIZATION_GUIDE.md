# Customization Guide - Photography Admin Template

## 🎨 Overview

This guide shows you how to customize the template for different photography businesses. All customization can be done without deep technical knowledge.

---

## Quick Customization Checklist

- [ ] Business information (name, logo, contact)
- [ ] Color scheme and branding
- [ ] Services offered
- [ ] Package pricing
- [ ] Booking settings
- [ ] Email templates
- [ ] SEO metadata
- [ ] Social media links
- [ ] Payment integration
- [ ] Analytics tracking

---

## 1. Business Information

### Using the Configuration File

Edit `config/business.json`:

```json
{
  "business": {
    "name": "Acme Photography",
    "tagline": "Capturing Your Perfect Moments",
    "description": "Award-winning wedding and portrait photography",
    "owner": {
      "name": "Jane Smith",
      "email": "hello@acmephoto.com",
      "phone": "+1 555-123-4567"
    },
    "location": {
      "city": "San Francisco",
      "state": "California",
      "country": "United States",
      "timezone": "America/Los_Angeles"
    }
  }
}
```

### Via Admin Panel

1. Login to admin panel
2. Go to **Settings** → **Business Info**
3. Update fields
4. Click "Save Changes"

---

## 2. Branding & Theme

### Logo & Favicon

**Option A: Via Admin Panel**
1. Settings → Theme → Logo Upload
2. Upload PNG (recommended: 500x200px, transparent background)
3. Upload favicon (32x32px .ico file)

**Option B: Via Files**
```bash
# Copy your logo
cp /path/to/your/logo.png frontend/public/assets/logo.png

# Copy your favicon
cp /path/to/your/favicon.ico frontend/public/assets/favicon.ico
```

### Color Scheme

**Via Config File:**
```json
{
  "branding": {
    "primaryColor": "#2c3e50",      // Main brand color
    "secondaryColor": "#ecf0f1",    // Background/neutral
    "accentColor": "#e74c3c",       // Call-to-action/highlights
    "fontFamily": "Montserrat, sans-serif"
  }
}
```

**Via Admin Panel:**
1. Settings → Theme → Colors
2. Use color picker or enter hex codes
3. Preview changes in real-time
4. Save

### Typography

**Available Google Fonts:**
- Inter (modern, clean)
- Montserrat (elegant, professional)
- Roboto (versatile, readable)
- Playfair Display (classic, serif)
- Lora (elegant serif)
- Open Sans (friendly, approachable)

**Select via Admin Panel:**
1. Settings → Theme → Typography
2. Choose primary font
3. Choose heading font
4. Save

---

## 3. Services Configuration

### Define Your Services

Edit `config/business.json`:

```json
{
  "services": [
    {
      "id": "weddings",
      "name": "Wedding Photography",
      "enabled": true,
      "startingPrice": 2500
    },
    {
      "id": "portraits",
      "name": "Portrait Photography",
      "enabled": true,
      "startingPrice": 300
    },
    {
      "id": "events",
      "name": "Event Photography",
      "enabled": true,
      "startingPrice": 800
    },
    {
      "id": "commercial",
      "name": "Commercial Photography",
      "enabled": false,
      "startingPrice": 1500
    }
  ]
}
```

### Add Services via Admin

1. Go to **Content** → **Services**
2. Click "Add Service"
3. Fill in:
   - Title
   - Description
   - Features (bullet points)
   - Starting price
   - Icon (choose from library)
   - Color theme
4. Upload service image
5. Set display order
6. Activate
7. Save

---

## 4. Package Creation

### Create Packages

1. **Go to Packages**
   - Admin Panel → Packages → Create Package

2. **Basic Info:**
   ```
   Name: Premium Wedding Package
   Category: Wedding
   Price: $3,500
   Deposit: 30%
   ```

3. **Features List:**
   ```
   - 10 hours coverage
   - Two professional photographers
   - Engagement session included
   - 800+ edited high-resolution photos
   - Premium photo album (12x12)
   - USB drive with all images
   - Online gallery (1 year)
   - Print release
   ```

4. **Deliverables:**
   ```
   - Photo delivery: 4-6 weeks
   - Album delivery: 8-10 weeks
   ```

5. **Display:**
   - Upload package image
   - Set as "Featured" (optional)
   - Set display order
   - Activate

### Package Pricing Strategy

**Standard Tiers:**
```
Basic: $1,500-$2,000    (essentials)
Standard: $2,500-$3,500 (most popular)
Premium: $4,000-$6,000  (comprehensive)
Luxury: $7,000+         (all-inclusive)
```

---

## 5. Booking Settings

### Configure Booking Rules

Edit `config/business.json`:

```json
{
  "booking": {
    "requireApproval": true,           // Manual approval required
    "advanceBookingDays": 30,          // Minimum days in advance
    "maxBookingsPerDay": 3,            // Max bookings per day
    "workingHours": {
      "start": "09:00",                // Start time
      "end": "18:00"                   // End time
    },
    "workingDays": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "depositPercentage": 30,           // Required deposit
    "cancellationPolicyDays": 7        // Cancellation window
  }
}
```

### Via Admin Panel

1. Settings → Booking
2. Configure:
   - Working hours
   - Working days
   - Advance booking period
   - Maximum bookings per day
   - Deposit requirement
   - Cancellation policy
3. Save

---

## 6. Email Templates

### Booking Confirmation Email

Edit `backend/templates/email/booking_confirmation.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        /* Your email styles */
    </style>
</head>
<body>
    <h1>Booking Confirmed!</h1>
    <p>Hi {{client_name}},</p>
    <p>Thank you for booking with {{business_name}}!</p>
    
    <h2>Booking Details:</h2>
    <ul>
        <li>Event Type: {{event_type}}</li>
        <li>Date: {{event_date}}</li>
        <li>Location: {{event_location}}</li>
        <li>Package: {{package_name}}</li>
    </ul>
    
    <h2>Next Steps:</h2>
    <ol>
        <li>Pay deposit: ${{deposit_amount}}</li>
        <li>Sign contract (attached)</li>
        <li>Schedule consultation call</li>
    </ol>
    
    <p>Questions? Reply to this email or call {{business_phone}}</p>
    
    <p>Best regards,<br>{{owner_name}}</p>
</body>
</html>
```

### Customize Email Templates

**Available Templates:**
- `booking_confirmation.html` - Booking confirmation
- `booking_reminder.html` - Event reminder (7 days before)
- `deposit_reminder.html` - Deposit payment reminder
- `delivery_notification.html` - Photos ready notification
- `inquiry_response.html` - General inquiry response

**Variables Available:**
- `{{client_name}}`
- `{{business_name}}`
- `{{owner_name}}`
- `{{event_date}}`
- `{{event_type}}`
- `{{package_name}}`
- `{{deposit_amount}}`
- `{{total_amount}}`
- `{{business_phone}}`
- `{{business_email}}`

---

## 7. Homepage Customization

### Hero Section

**Via Admin Panel:**
1. Content → Site Content → Hero
2. Edit:
   - Main headline
   - Subheadline
   - Call-to-action text
   - Background image/video
3. Save

**Via Code (`frontend/src/components/Hero.js`):**
```javascript
const heroContent = {
  headline: "Capturing Your Perfect Moments",
  subheadline: "Award-winning wedding and portrait photography",
  ctaText: "View Portfolio",
  ctaLink: "/portfolio",
  backgroundImage: "/assets/hero-bg.jpg"
};
```

### About Section

1. Content → Site Content → About
2. Edit:
   - About text
   - Mission statement
   - Awards/credentials
   - Profile photo
3. Save

---

## 8. Portfolio Organization

### Create Categories

1. Gallery → Categories
2. Add categories:
   - Weddings
   - Portraits
   - Events
   - Commercial
   - Maternity
   - etc.

### Upload Portfolio

1. Gallery → Upload
2. Select images
3. Add details:
   - Title
   - Description
   - Category
   - Tags
   - Featured (yes/no)
4. Bulk upload supported
5. Organize order by drag-and-drop

### Portfolio Display Settings

1. Settings → Gallery
2. Configure:
   - Items per page
   - Thumbnail size
   - Lightbox style
   - Watermark (optional)
   - Download permissions
3. Save

---

## 9. SEO Optimization

### Site-Wide SEO

Edit `config/business.json`:

```json
{
  "seo": {
    "metaTitle": "Acme Photography | San Francisco Wedding Photographer",
    "metaDescription": "Award-winning wedding and portrait photography in San Francisco Bay Area. Book your session today!",
    "keywords": [
      "san francisco wedding photographer",
      "bay area portrait photography",
      "professional event photographer",
      "engagement photography",
      "wedding photography packages"
    ],
    "author": "Acme Photography",
    "og:image": "/assets/og-image.jpg"
  }
}
```

### Page-Level SEO

**For Blog Posts:**
1. When creating/editing blog post
2. Fill in SEO section:
   - Meta title
   - Meta description
   - URL slug
   - Focus keyword
3. Save

**For Portfolio Items:**
1. Add descriptive titles
2. Use keyword-rich descriptions
3. Add alt text to all images
4. Use location tags

---

## 10. Social Media Integration

### Add Social Links

Edit `config/business.json`:

```json
{
  "business": {
    "social": {
      "instagram": "https://instagram.com/acmephoto",
      "facebook": "https://facebook.com/acmephotography",
      "twitter": "https://twitter.com/acmephoto",
      "youtube": "https://youtube.com/@acmephoto",
      "pinterest": "https://pinterest.com/acmephoto",
      "tiktok": "https://tiktok.com/@acmephoto"
    }
  }
}
```

### Social Sharing

Enabled by default for:
- Blog posts
- Portfolio items
- Package pages

**Customize Share Text:**

Edit `frontend/src/utils/social.js`:
```javascript
export const getShareText = (type, item) => {
  const texts = {
    portfolio: `Check out this beautiful ${item.category} photography by Acme Photography!`,
    blog: `${item.title} - Read on Acme Photography Blog`,
    package: `Explore our ${item.name} starting at $${item.price}`
  };
  return texts[type];
};
```

---

## 11. Payment Integration

### Stripe Setup

1. **Get Stripe Keys:**
   - Sign up at https://stripe.com
   - Get Publishable key and Secret key

2. **Configure in Admin:**
   - Settings → Integrations → Stripe
   - Enable Stripe
   - Enter Publishable key
   - Enter Secret key
   - Test mode: On (for testing)
   - Save

3. **Test Payment:**
   - Create test booking
   - Use test card: 4242 4242 4242 4242
   - Verify payment appears in Stripe dashboard

---

## 12. Analytics & Tracking

### Google Analytics 4

1. **Create GA4 Property:**
   - Go to https://analytics.google.com
   - Create property
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Configure in Admin:**
   - Settings → Marketing → Google Analytics
   - Enable GA4
   - Enter Measurement ID
   - Save

### Facebook Pixel

1. **Get Pixel ID:**
   - Go to Facebook Events Manager
   - Create Pixel
   - Copy Pixel ID

2. **Configure in Admin:**
   - Settings → Marketing → Facebook Pixel
   - Enable Pixel
   - Enter Pixel ID
   - Save

---

## 13. Advanced Customization

### Custom CSS

Add custom styles via Admin Panel:

1. Settings → Advanced → Custom CSS
2. Add your CSS:
   ```css
   /* Custom button styles */
   .btn-primary {
       background: linear-gradient(45deg, #2c3e50, #e74c3c);
       border-radius: 25px;
   }
   
   /* Custom font for headings */
   h1, h2, h3 {
       font-family: 'Playfair Display', serif;
       letter-spacing: 1px;
   }
   ```
3. Save

### Custom JavaScript

1. Settings → Advanced → Custom Scripts
2. Add tracking or custom functionality:
   ```javascript
   // Custom tracking
   gtag('event', 'booking_click', {
       'event_category': 'engagement',
       'event_label': 'booking_form'
   });
   ```
3. Save

---

## 14. Multi-Location Setup

### For Multiple Studios

Edit `config/business.json`:

```json
{
  "locations": [
    {
      "id": "sf",
      "name": "San Francisco Studio",
      "address": "123 Market St, San Francisco, CA 94103",
      "phone": "+1 555-123-4567",
      "email": "sf@acmephoto.com",
      "hours": {
        "monday-friday": "9AM - 6PM",
        "saturday": "10AM - 4PM",
        "sunday": "Closed"
      }
    },
    {
      "id": "oakland",
      "name": "Oakland Studio",
      "address": "456 Broadway, Oakland, CA 94607",
      "phone": "+1 555-987-6543",
      "email": "oakland@acmephoto.com"
    }
  ]
}
```

---

## 15. Language & Localization

### Enable Multi-Language

Edit `config/business.json`:

```json
{
  "features": {
    "enableMultiLanguage": true
  },
  "languages": {
    "default": "en",
    "available": ["en", "es", "fr"]
  }
}
```

### Add Translations

Create `frontend/src/locales/es.json`:

```json
{
  "nav": {
    "home": "Inicio",
    "about": "Sobre Nosotros",
    "portfolio": "Portafolio",
    "contact": "Contacto"
  },
  "hero": {
    "title": "Capturando Tus Momentos Perfectos",
    "cta": "Ver Portafolio"
  }
}
```

---

## Customization Checklist

After setup, customize these items:

**Visual Branding:**
- [ ] Upload logo
- [ ] Set color scheme
- [ ] Choose fonts
- [ ] Add favicon

**Business Content:**
- [ ] Update business information
- [ ] Add services
- [ ] Create packages
- [ ] Write about section
- [ ] Upload portfolio

**Settings:**
- [ ] Configure booking rules
- [ ] Set up email templates
- [ ] Add social media links
- [ ] Configure SEO metadata

**Integrations:**
- [ ] Set up payment processing
- [ ] Enable analytics
- [ ] Configure email service
- [ ] Add marketing pixels

**Testing:**
- [ ] Test booking flow
- [ ] Test payment (if enabled)
- [ ] Test email notifications
- [ ] Test mobile responsiveness
- [ ] Test all links

---

## Need Help?

- **Documentation:** Check template/docs/
- **Support:** Open GitHub issue
- **Community:** Join photography business forums

---

**Ready to make the template your own! 🎨**

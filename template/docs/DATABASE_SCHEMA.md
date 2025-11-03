# Database Schema - Photography Admin Template

## Overview

The template uses MongoDB with the following collections. All timestamps are stored in UTC.

---

## Core Collections

### 1. `users` - Admin Users

Stores admin and editor user accounts.

```javascript
{
  _id: ObjectId,
  userId: String (UUID),          // Unique user identifier
  email: String,                  // Login email (unique index)
  name: String,                   // Full name
  password: String,               // Bcrypt hashed password
  role: String,                   // "admin" or "editor"
  isActive: Boolean,              // Account status
  createdAt: Date,                // Account creation
  lastLogin: Date                 // Last login timestamp
}
```

**Indexes:**
- `email` (unique)
- `userId` (unique)
- `isActive`

---

### 2. `sessions` - Active Sessions

Stores active authentication sessions.

```javascript
{
  _id: ObjectId,
  tokenHash: String (SHA-256),    // Hashed session token
  userId: String,                 // Reference to users.userId
  createdAt: Date,                // Session creation
  expiresAt: Date                 // Session expiration
}
```

**Indexes:**
- `tokenHash` (unique)
- `userId`
- `expiresAt`

**TTL Index:** Auto-delete expired sessions after `expiresAt`

---

## Business Collections

### 3. `bookings` - Client Booking Requests

Stores all booking/inquiry requests from clients.

```javascript
{
  _id: ObjectId,
  bookingId: String (UUID),       // Unique booking identifier
  
  // Client Information
  clientName: String,             // Client full name
  clientEmail: String,            // Contact email
  clientPhone: String,            // Contact phone
  
  // Booking Details
  eventType: String,              // "wedding", "portrait", "commercial", etc.
  eventDate: Date,                // Requested event date
  eventLocation: String,          // Event location/address
  eventDuration: Number,          // Duration in hours
  guestCount: Number,             // Number of guests (for events)
  
  // Additional Info
  message: String,                // Client message/requirements
  budget: String,                 // Client budget range
  referralSource: String,         // How they found you
  
  // Package Selection
  packageId: String,              // Selected package (if any)
  packageName: String,            // Package name
  
  // Status Tracking
  status: String,                 // "pending", "confirmed", "completed", "cancelled"
  priority: String,               // "low", "medium", "high"
  
  // Financial
  depositPaid: Boolean,           // Deposit payment status
  depositAmount: Number,          // Deposit amount
  totalAmount: Number,            // Total booking amount
  paymentStatus: String,          // "pending", "partial", "paid"
  
  // Metadata
  createdAt: Date,                // Booking request date
  updatedAt: Date,                // Last update
  confirmedAt: Date,              // Confirmation date
  completedAt: Date,              // Completion date
  
  // Admin Notes
  adminNotes: String,             // Internal notes
  assignedTo: String              // Assigned photographer userId
}
```

**Indexes:**
- `bookingId` (unique)
- `clientEmail`
- `eventDate`
- `status`
- `createdAt` (descending)

---

### 4. `packages` - Photography Packages

Pricing packages offered to clients.

```javascript
{
  _id: ObjectId,
  packageId: String (UUID),       // Unique package identifier
  
  // Package Details
  name: String,                   // Package name
  category: String,               // "wedding", "portrait", "event", etc.
  description: String,            // Package description
  
  // Pricing
  price: Number,                  // Base price
  currency: String,               // "USD", "EUR", etc.
  depositPercentage: Number,      // Required deposit (%)
  
  // Features
  features: [String],             // List of features included
  duration: Number,               // Duration in hours
  photographerCount: Number,      // Number of photographers
  photoCount: String,             // "500+", "Unlimited", etc.
  
  // Deliverables
  deliverables: [String],         // What client receives
  turnaroundDays: Number,         // Delivery timeframe
  
  // Display
  featured: Boolean,              // Show as featured
  order: Number,                  // Display order
  image: String,                  // Package image URL
  
  // Status
  isActive: Boolean,              // Package availability
  createdAt: Date,                // Creation date
  updatedAt: Date                 // Last update
}
```

**Indexes:**
- `packageId` (unique)
- `category`, `isActive`
- `featured`, `order`

---

### 5. `services` - Service Offerings

Services offered by the photography business.

```javascript
{
  _id: ObjectId,
  serviceId: String (UUID),       // Unique service identifier
  
  // Service Details
  title: String,                  // Service name
  description: String,            // Service description
  icon: String,                   // Icon identifier
  image: String,                  // Service image URL
  
  // Features
  features: [String],             // Key features
  
  // Pricing
  startingPrice: Number,          // Starting price
  priceRange: String,             // "$500-$2000"
  
  // Display
  color: String,                  // Theme color (hex)
  order: Number,                  // Display order
  isActive: Boolean,              // Service availability
  
  // Metadata
  createdAt: Date,                // Creation date
  updatedAt: Date                 // Last update
}
```

**Indexes:**
- `serviceId` (unique)
- `isActive`, `order`

---

## Content Collections

### 6. `portfolio` - Portfolio Items

Gallery items showcasing work.

```javascript
{
  _id: ObjectId,
  portfolioId: String (UUID),     // Unique portfolio item identifier
  
  // Content
  title: String,                  // Project title
  description: String,            // Project description
  category: String,               // "wedding", "portrait", etc.
  
  // Media
  images: [{
    url: String,                  // Image URL
    caption: String,              // Image caption
    order: Number                 // Display order
  }],
  coverImage: String,             // Main/cover image URL
  
  // Metadata
  date: Date,                     // Project/shoot date
  location: String,               // Shoot location
  client: String,                 // Client name (optional)
  
  // Display
  featured: Boolean,              // Show on homepage
  order: Number,                  // Display order
  isActive: Boolean,              // Visibility
  
  // SEO
  slug: String,                   // URL slug
  tags: [String],                 // Search tags
  
  // Timestamps
  createdAt: Date,                // Creation date
  updatedAt: Date                 // Last update
}
```

**Indexes:**
- `portfolioId` (unique)
- `slug` (unique)
- `category`, `isActive`
- `featured`, `order`

---

### 7. `blog` - Blog Posts

Blog articles and posts.

```javascript
{
  _id: ObjectId,
  blogId: String (UUID),          // Unique blog post identifier
  
  // Content
  title: String,                  // Post title
  content: String,                // HTML content
  excerpt: String,                // Short summary
  
  // Media
  featuredImage: String,          // Main image URL
  gallery: [String],              // Additional images
  
  // Organization
  category: String,               // Post category
  tags: [String],                 // Post tags
  
  // Author
  author: String,                 // Author userId
  authorName: String,             // Author display name
  
  // SEO
  slug: String,                   // URL slug (unique)
  metaTitle: String,              // SEO title
  metaDescription: String,        // SEO description
  
  // Status
  status: String,                 // "draft", "published"
  publishedAt: Date,              // Publish date
  
  // Display
  featured: Boolean,              // Show as featured
  order: Number,                  // Display order
  
  // Timestamps
  createdAt: Date,                // Creation date
  updatedAt: Date                 // Last update
}
```

**Indexes:**
- `blogId` (unique)
- `slug` (unique)
- `status`, `publishedAt`
- `category`, `tags`

---

### 8. `videos` - Video Gallery

Video content (YouTube, Vimeo embeds).

```javascript
{
  _id: ObjectId,
  videoId: String (UUID),         // Unique video identifier
  
  // Content
  title: String,                  // Video title
  description: String,            // Video description
  
  // Video Source
  url: String,                    // YouTube/Vimeo URL
  embedCode: String,              // Embed HTML
  thumbnail: String,              // Thumbnail image URL
  platform: String,               // "youtube", "vimeo"
  
  // Organization
  category: String,               // Video category
  tags: [String],                 // Search tags
  
  // Display
  featured: Boolean,              // Show on homepage
  order: Number,                  // Display order
  isActive: Boolean,              // Visibility
  
  // Timestamps
  createdAt: Date,                // Upload date
  updatedAt: Date                 // Last update
}
```

**Indexes:**
- `videoId` (unique)
- `category`, `isActive`
- `featured`, `order`

---

### 9. `testimonials` - Client Testimonials

Client reviews and testimonials.

```javascript
{
  _id: ObjectId,
  testimonialId: String (UUID),   // Unique testimonial identifier
  
  // Client Info
  clientName: String,             // Client name
  clientPhoto: String,            // Client photo URL (optional)
  clientRole: String,             // "Bride & Groom", "Business Owner"
  
  // Content
  content: String,                // Testimonial text
  rating: Number,                 // 1-5 stars
  
  // Event Details
  eventType: String,              // Type of service
  eventDate: Date,                // Service date
  
  // Display
  featured: Boolean,              // Show on homepage
  order: Number,                  // Display order
  isActive: Boolean,              // Visibility
  
  // Timestamps
  createdAt: Date,                // Creation date
  updatedAt: Date                 // Last update
}
```

**Indexes:**
- `testimonialId` (unique)
- `featured`, `isActive`
- `rating`

---

### 10. `media` - Uploaded Files

Media file metadata (images, documents).

```javascript
{
  _id: ObjectId,
  mediaId: String (UUID),         // Unique media identifier
  
  // File Details
  filename: String,               // Original filename
  url: String,                    // File URL
  path: String,                   // Server path
  
  // File Info
  type: String,                   // "image", "video", "document"
  mimeType: String,               // MIME type
  size: Number,                   // File size (bytes)
  
  // Image Metadata
  width: Number,                  // Image width
  height: Number,                 // Image height
  
  // Organization
  category: String,               // Media category
  tags: [String],                 // Search tags
  altText: String,                // Alt text for images
  
  // Upload Info
  uploadedBy: String,             // userId of uploader
  createdAt: Date                 // Upload date
}
```

**Indexes:**
- `mediaId` (unique)
- `type`, `category`
- `uploadedBy`
- `createdAt` (descending)

---

## System Collections

### 11. `site_content` - Dynamic Site Content

Editable site content (hero, about, contact).

```javascript
{
  _id: ObjectId,
  
  // Content Identifier
  section: String,                // "hero", "about", "contact"
  key: String,                    // Content key
  
  // Content
  value: String,                  // Content value
  type: String,                   // "text", "html", "image", "url"
  
  // Metadata
  updatedAt: Date,                // Last update
  updatedBy: String               // userId of editor
}
```

**Indexes:**
- `section`, `key` (compound unique)

---

### 12. `settings` - System Settings

Global system settings and configuration.

```javascript
{
  _id: ObjectId,
  
  // Setting Identifier
  category: String,               // "general", "email", "integrations"
  key: String,                    // Setting key
  
  // Value
  value: Mixed,                   // Setting value (any type)
  
  // Metadata
  updatedAt: Date,                // Last update
  updatedBy: String               // userId of editor
}
```

**Indexes:**
- `category`, `key` (compound unique)

---

### 13. `analytics_events` - Analytics Tracking

User interaction tracking for analytics.

```javascript
{
  _id: ObjectId,
  eventId: String (UUID),         // Unique event identifier
  
  // Event Details
  eventType: String,              // "page_view", "click", "form_submit"
  page: String,                   // Page URL
  action: String,                 // Action performed
  
  // Session Info
  sessionId: String,              // Session identifier
  userId: String,                 // userId (if logged in)
  
  // User Agent
  userAgent: String,              // Browser user agent
  device: String,                 // "desktop", "mobile", "tablet"
  browser: String,                // Browser name
  os: String,                     // Operating system
  
  // Location
  country: String,                // Country code
  city: String,                   // City name
  
  // Referrer
  referrer: String,               // Referring URL
  source: String,                 // Traffic source
  
  // Metadata
  metadata: Object,               // Additional event data
  timestamp: Date                 // Event timestamp
}
```

**Indexes:**
- `eventId` (unique)
- `eventType`, `timestamp`
- `page`, `timestamp`
- `sessionId`

**TTL Index:** Auto-delete events older than 90 days

---

### 14. `activity_log` - Admin Activity Log

Audit trail of admin actions.

```javascript
{
  _id: ObjectId,
  
  // Action Details
  userId: String,                 // Admin userId
  userName: String,               // Admin name
  action: String,                 // "create", "update", "delete"
  resource: String,               // "blog", "package", "user"
  resourceId: String,             // ID of affected resource
  
  // Change Details
  details: Object,                // Action details
  
  // Metadata
  timestamp: Date,                // Action timestamp
  ipAddress: String,              // IP address
  userAgent: String               // Browser user agent
}
```

**Indexes:**
- `userId`, `timestamp`
- `resource`, `action`
- `timestamp` (descending)

**TTL Index:** Auto-delete logs older than 1 year

---

## Additional Collections

### 15. `inquiries` - Contact Form Submissions

General contact form inquiries (non-booking).

```javascript
{
  _id: ObjectId,
  inquiryId: String (UUID),       // Unique inquiry identifier
  
  // Contact Info
  name: String,                   // Sender name
  email: String,                  // Sender email
  phone: String,                  // Sender phone
  
  // Message
  subject: String,                // Inquiry subject
  message: String,                // Inquiry message
  
  // Status
  status: String,                 // "new", "read", "replied", "archived"
  
  // Response
  responseNotes: String,          // Admin notes
  respondedAt: Date,              // Response date
  respondedBy: String,            // userId of responder
  
  // Metadata
  createdAt: Date,                // Submission date
  updatedAt: Date                 // Last update
}
```

**Indexes:**
- `inquiryId` (unique)
- `status`, `createdAt`
- `email`

---

### 16. `offers` - Special Offers

Promotional offers and discounts.

```javascript
{
  _id: ObjectId,
  offerId: String (UUID),         // Unique offer identifier
  
  // Offer Details
  title: String,                  // Offer title
  description: String,            // Offer description
  code: String,                   // Discount code
  
  // Discount
  discountType: String,           // "percentage", "fixed"
  discountValue: Number,          // Discount amount
  
  // Validity
  startDate: Date,                // Offer start date
  endDate: Date,                  // Offer end date
  
  // Conditions
  minAmount: Number,              // Minimum order amount
  maxUses: Number,                // Maximum use count
  usedCount: Number,              // Times used
  
  // Display
  isActive: Boolean,              // Offer availability
  featured: Boolean,              // Show prominently
  
  // Timestamps
  createdAt: Date,                // Creation date
  updatedAt: Date                 // Last update
}
```

**Indexes:**
- `offerId` (unique)
- `code` (unique)
- `isActive`, `endDate`

---

### 17. `pages` - Custom Pages

Custom static pages.

```javascript
{
  _id: ObjectId,
  pageId: String (UUID),          // Unique page identifier
  
  // Page Details
  title: String,                  // Page title
  content: String,                // HTML content
  
  // SEO
  slug: String,                   // URL slug (unique)
  metaTitle: String,              // SEO title
  metaDescription: String,        // SEO description
  
  // Status
  isActive: Boolean,              // Page visibility
  
  // Timestamps
  createdAt: Date,                // Creation date
  updatedAt: Date                 // Last update
}
```

**Indexes:**
- `pageId` (unique)
- `slug` (unique)
- `isActive`

---

## Relationships

### User ↔ Content
- `users.userId` → `blog.author`
- `users.userId` → `activity_log.userId`
- `users.userId` → `media.uploadedBy`

### Booking ↔ Package
- `packages.packageId` → `bookings.packageId`

### Analytics Tracking
- Track all bookings in `analytics_events`
- Conversion funnel: page_view → booking_form → booking_submit

---

## Indexes Summary

### Unique Indexes
- All `*Id` fields (UUID identifiers)
- `users.email`
- `blog.slug`
- `portfolio.slug`
- `pages.slug`
- `offers.code`
- `sessions.tokenHash`

### Compound Indexes
- `site_content`: (`section`, `key`)
- `settings`: (`category`, `key`)
- `bookings`: (`status`, `eventDate`)
- `packages`: (`category`, `isActive`)

### TTL Indexes
- `sessions.expiresAt` - Auto-delete expired sessions
- `analytics_events.timestamp` - Delete events > 90 days
- `activity_log.timestamp` - Delete logs > 1 year

---

## Data Seeding

See `template/scripts/seed_data.js` for sample data to populate a new installation.

---

## Backup Strategy

### Recommended Backups

1. **Daily Backups** (Automated):
   - All collections
   - Retain for 30 days

2. **Weekly Backups** (Long-term):
   - All collections
   - Retain for 1 year

3. **Pre-Deployment Backups**:
   - Before major updates
   - Retain indefinitely

### MongoDB Atlas Backup

MongoDB Atlas provides automated backups:
- Continuous snapshots
- Point-in-time recovery
- Cross-region replication

---

## Performance Considerations

### Query Optimization

1. **Always use indexed fields** in queries
2. **Limit result sets** with `.limit()`
3. **Use projection** to fetch only needed fields
4. **Aggregate pipeline** for complex reports

### Collection Size Management

- **Analytics**: TTL index auto-cleanup
- **Activity Log**: Archive old logs
- **Media**: Use external storage (Cloudflare R2)

---

For migration scripts and data management, see `template/scripts/`.

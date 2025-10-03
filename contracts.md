# D.S.P.Film's Photography Website - Backend Integration Contracts

## Overview
This document defines the API contracts and data models for integrating the frontend with MongoDB backend, enabling complete content management system (CMS) functionality.

## Database Models

### 1. Site Content Model (site_content)
```javascript
{
  _id: ObjectId,
  section: String, // "hero", "about", "footer", etc.
  key: String, // unique identifier for the content
  value: String, // the actual content
  type: String, // "text", "html", "image_url", "number"
  updatedAt: Date,
  createdAt: Date
}
```

### 2. Services Model (services)
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  features: [String],
  image: String, // URL
  icon: String,
  color: String,
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Portfolio Model (portfolio)
```javascript
{
  _id: ObjectId,
  title: String,
  category: String, // "wedding", "prewedding", "cinematic", "maternity"
  image: String, // URL
  description: String,
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Packages Model (packages)
```javascript
{
  _id: ObjectId,
  name: String,
  price: String,
  duration: String,
  category: String,
  features: [String],
  popular: Boolean,
  color: String,
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Testimonials Model (testimonials)
```javascript
{
  _id: ObjectId,
  name: String,
  event: String,
  rating: Number,
  text: String,
  image: String, // URL
  location: String,
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Inquiries Model (inquiries)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  eventType: String,
  eventDate: Date,
  message: String,
  status: String, // "new", "responded", "booked", "closed"
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Content Management APIs
- `GET /api/content` - Get all site content
- `GET /api/content/:section` - Get content by section
- `PUT /api/content/:id` - Update specific content
- `POST /api/content` - Create new content

### Services APIs
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Portfolio APIs
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/:category` - Get portfolio by category
- `POST /api/portfolio` - Create new portfolio item
- `PUT /api/portfolio/:id` - Update portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item

### Packages APIs
- `GET /api/packages` - Get all packages
- `GET /api/packages/:category` - Get packages by category
- `POST /api/packages` - Create new package
- `PUT /api/packages/:id` - Update package
- `DELETE /api/packages/:id` - Delete package

### Testimonials APIs
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create new testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### Inquiries APIs
- `GET /api/inquiries` - Get all inquiries
- `POST /api/inquiries` - Create new inquiry
- `PUT /api/inquiries/:id` - Update inquiry status
- `DELETE /api/inquiries/:id` - Delete inquiry

## Frontend Integration Plan

### 1. Replace Mock Data
- Remove `/src/data/mock.js`
- Create API service functions in `/src/services/api.js`
- Update all components to use API calls instead of mock data

### 2. Admin Portal Enhancement
- Add content management for all site text
- File upload functionality for images
- Drag & drop reordering for items
- Real-time preview of changes
- Bulk operations (delete, activate/deactivate)

### 3. Content Management Features
The admin should be able to edit:
- Hero section (title, tagline, description)
- About section (all text content)
- Services (title, description, features, images)
- Portfolio (images, titles, categories)
- Packages (names, prices, features, descriptions)
- Testimonials (all content)
- Contact information (phone, email, address)
- Footer content (all text and links)
- Meta content (SEO titles, descriptions)

### 4. Form Handling
- Contact form submissions save to database
- Admin can view and manage all inquiries
- Email notifications for new inquiries
- Status tracking for inquiries

### 5. Image Management
- Upload functionality for portfolio images
- Image optimization and compression
- Support for multiple image formats
- Image gallery management in admin

## Implementation Steps

1. **Backend Setup**
   - Create MongoDB models
   - Build API endpoints
   - Add validation and error handling
   - Seed database with current mock data

2. **Frontend Integration**
   - Create API service layer
   - Update components to use real data
   - Add loading states and error handling
   - Implement real form submissions

3. **Admin Portal Enhancement**
   - Build comprehensive content management
   - Add image upload functionality
   - Create intuitive editing interfaces
   - Add bulk operations and search

4. **Testing & Optimization**
   - Test all CRUD operations
   - Verify responsive design
   - Check form submissions
   - Test admin functionality

## Security Considerations
- Input validation and sanitization
- Rate limiting for API endpoints
- File upload security (type, size validation)
- SQL injection prevention
- CORS configuration

## Performance Optimizations
- Database indexing
- Image compression
- API response caching
- Lazy loading for images
- Pagination for large datasets

This contract ensures seamless integration between frontend and backend while providing comprehensive content management capabilities.
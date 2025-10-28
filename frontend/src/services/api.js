import axios from "axios";

const getBackendURL = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  if (process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  if (window.location.hostname.includes('replit.dev')) {
    const host = window.location.hostname.split(':')[0];
    return `https://${host}:8000`;
  }
  return 'http://localhost:8000';
};

const BACKEND_URL = getBackendURL();
const API = BACKEND_URL.includes('/api') ? BACKEND_URL : `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

// Content Management APIs
export const contentAPI = {
  getAll: () => apiClient.get('/content'),
  getBySection: (section) => apiClient.get(`/content/${section}`),
  create: (content) => apiClient.post('/content', content),
  update: (id, content) => apiClient.put(`/content/${id}`, content),
};

// Services APIs
export const servicesAPI = {
  getAll: () => apiClient.get('/services'),
  create: (service) => apiClient.post('/services', service),
  update: (id, service) => apiClient.put(`/services/${id}`, service),
  delete: (id) => apiClient.delete(`/services/${id}`),
};

// Portfolio APIs
export const portfolioAPI = {
  getAll: () => apiClient.get('/portfolio'),
  getByCategory: (category) => apiClient.get(`/portfolio/${category}`),
  create: (portfolio) => apiClient.post('/portfolio', portfolio),
  update: (id, portfolio) => apiClient.put(`/portfolio/${id}`, portfolio),
  delete: (id) => apiClient.delete(`/portfolio/${id}`),
};

// Packages APIs
export const packagesAPI = {
  getAll: () => apiClient.get('/packages'),
  getByCategory: (category) => apiClient.get(`/packages/${category}`),
  create: (package_) => apiClient.post('/packages', package_),
  update: (id, package_) => apiClient.put(`/packages/${id}`, package_),
  delete: (id) => apiClient.delete(`/packages/${id}`),
};

// Testimonials APIs
export const testimonialsAPI = {
  getAll: () => apiClient.get('/testimonials'),
  create: (testimonial) => apiClient.post('/testimonials', testimonial),
  update: (id, testimonial) => apiClient.put(`/testimonials/${id}`, testimonial),
  delete: (id) => apiClient.delete(`/testimonials/${id}`),
};

// Inquiries APIs
export const inquiriesAPI = {
  getAll: () => apiClient.get('/inquiries'),
  create: (inquiry) => apiClient.post('/inquiries', inquiry),
  update: (id, data) => apiClient.put(`/inquiries/${id}`, data),
  delete: (id) => apiClient.delete(`/inquiries/${id}`),
};

// Helper function to organize content by section and key
export const organizeContent = (contentArray) => {
  const organized = {};
  
  contentArray.forEach(item => {
    if (!organized[item.section]) {
      organized[item.section] = {};
    }
    organized[item.section][item.key] = item.value;
  });
  
  return organized;
};

// Helper function to organize portfolio by category
export const organizePortfolio = (portfolioArray) => {
  const organized = {
    wedding: [],
    prewedding: [],
    cinematic: [],
    maternity: []
  };
  
  portfolioArray.forEach(item => {
    if (organized[item.category]) {
      organized[item.category].push({
        id: item._id,
        title: item.title,
        image: item.image,
        category: item.description || item.category
      });
    }
  });
  
  return organized;
};

// Helper function to format services data
export const formatServices = (servicesArray) => {
  return servicesArray.map(service => ({
    id: service._id,
    title: service.title,
    description: service.description,
    features: service.features,
    image: service.image,
    icon: service.icon,
    color: service.color
  }));
};

// Helper function to format packages data
export const formatPackages = (packagesArray) => {
  return packagesArray.map(pkg => ({
    id: pkg._id,
    name: pkg.name,
    price: pkg.price,
    duration: pkg.duration,
    category: pkg.category,
    features: pkg.features,
    popular: pkg.popular,
    color: pkg.color
  }));
};

// Helper function to format testimonials data
export const formatTestimonials = (testimonialsArray) => {
  return testimonialsArray.map(testimonial => ({
    id: testimonial._id,
    name: testimonial.name,
    event: testimonial.event,
    rating: testimonial.rating,
    text: testimonial.text,
    image: testimonial.image,
    location: testimonial.location
  }));
};

// Main API object for easy importing
export const API_SERVICES = {
  content: contentAPI,
  services: servicesAPI,
  portfolio: portfolioAPI,
  packages: packagesAPI,
  testimonials: testimonialsAPI,
  inquiries: inquiriesAPI,
};

export default API_SERVICES;
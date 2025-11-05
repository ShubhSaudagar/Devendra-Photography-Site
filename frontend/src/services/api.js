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

const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    throw error;
  }
);

export const authAPI = {
  login: async (email, password, rememberMe = false) => {
    const response = await apiClient.post('/admin/auth/login', {
      email,
      password,
      rememberMe
    });
    
    if (response.data.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },
  
  logout: async () => {
    try {
      await apiClient.post('/admin/auth/logout');
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },
  
  me: async () => {
    const response = await apiClient.get('/admin/auth/me');
    return response.data;
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

export const contentAPI = {
  getAll: () => apiClient.get('/content'),
  getBySection: (section) => apiClient.get(`/content/${section}`),
  create: (content) => apiClient.post('/content', content),
  update: (id, content) => apiClient.put(`/content/${id}`, content),
};

export const servicesAPI = {
  getAll: () => apiClient.get('/services'),
  create: (service) => apiClient.post('/services', service),
  update: (id, service) => apiClient.put(`/services/${id}`, service),
  delete: (id) => apiClient.delete(`/services/${id}`),
};

export const portfolioAPI = {
  getAll: () => apiClient.get('/portfolio'),
  getByCategory: (category) => apiClient.get(`/portfolio/${category}`),
  create: (item) => apiClient.post('/portfolio', item),
  update: (id, item) => apiClient.put(`/portfolio/${id}`, item),
  delete: (id) => apiClient.delete(`/portfolio/${id}`),
};

export const packagesAPI = {
  getAll: () => apiClient.get('/packages'),
  getById: (id) => apiClient.get(`/packages/${id}`),
  create: (pkg) => apiClient.post('/packages', pkg),
  update: (id, pkg) => apiClient.put(`/packages/${id}`, pkg),
  delete: (id) => apiClient.delete(`/packages/${id}`),
};

export const testimonialsAPI = {
  getAll: () => apiClient.get('/testimonials'),
  create: (testimonial) => apiClient.post('/testimonials', testimonial),
  update: (id, testimonial) => apiClient.put(`/testimonials/${id}`, testimonial),
  delete: (id) => apiClient.delete(`/testimonials/${id}`),
};

export const inquiriesAPI = {
  submit: (data) => apiClient.post('/inquiries', data),
  getAll: () => apiClient.get('/admin/inquiries'),
  getById: (id) => apiClient.get(`/admin/inquiries/${id}`),
  update: (id, data) => apiClient.put(`/admin/inquiries/${id}`, data),
  delete: (id) => apiClient.delete(`/admin/inquiries/${id}`),
};

export const blogAPI = {
  getAll: () => apiClient.get('/blog'),
  getById: (id) => apiClient.get(`/blog/${id}`),
  create: (post) => apiClient.post('/admin/blog', post),
  update: (id, post) => apiClient.put(`/admin/blog/${id}`, post),
  delete: (id) => apiClient.delete(`/admin/blog/${id}`),
};

export const videosAPI = {
  getAll: () => apiClient.get('/videos'),
  create: (video) => apiClient.post('/admin/videos', video),
  update: (id, video) => apiClient.put(`/admin/videos/${id}`, video),
  delete: (id) => apiClient.delete(`/admin/videos/${id}`),
};

export const offersAPI = {
  getAll: () => apiClient.get('/offers'),
  create: (offer) => apiClient.post('/admin/offers', offer),
  update: (id, offer) => apiClient.put(`/admin/offers/${id}`, offer),
  delete: (id) => apiClient.delete(`/admin/offers/${id}`),
};

export const analyticsAPI = {
  getDashboard: () => apiClient.get('/admin/analytics/dashboard'),
  trackEvent: (event) => apiClient.post('/analytics/track', event),
};

export const settingsAPI = {
  get: () => apiClient.get('/admin/settings'),
  update: (settings) => apiClient.put('/admin/settings', settings),
};

export const organizeContent = (contentArray) => {
  if (!Array.isArray(contentArray)) {
    return {};
  }
  
  const organized = {};
  
  contentArray.forEach(item => {
    const section = item.section || 'general';
    const key = item.key || 'value';
    const value = item.value || '';
    
    if (!organized[section]) {
      organized[section] = {};
    }
    
    organized[section][key] = value;
  });
  
  return organized;
};

export const getPackages = async () => {
  const response = await packagesAPI.getAll();
  return response.data;
};

export const getPortfolio = async () => {
  const response = await portfolioAPI.getAll();
  return response.data;
};

export const getServices = async () => {
  const response = await servicesAPI.getAll();
  return response.data;
};

export const getTestimonials = async () => {
  const response = await testimonialsAPI.getAll();
  return response.data;
};

const API_SERVICES = {
  authAPI,
  contentAPI,
  servicesAPI,
  portfolioAPI,
  packagesAPI,
  testimonialsAPI,
  inquiriesAPI,
  blogAPI,
  videosAPI,
  offersAPI,
  analyticsAPI,
  settingsAPI,
  organizeContent,
  apiClient,
};

export default API_SERVICES;

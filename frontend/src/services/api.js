// compatibility API file — uses local mock data and provides legacy exports
// Replace the existing frontend/src/services/api.js with this file content.

// Import mock data (you already have frontend/src/data/mock.js)
import {
  services,
  packages,
  portfolio,
  testimonials,
  photographerInfo,
  aboutInfo,
} from "../data/mock";

/* ============================
   New-style async getters
   ============================ */
export const getServices = async () => services;
export const getPackages = async () => packages;
export const getPortfolio = async () => portfolio;
export const getTestimonials = async () => testimonials;
export const getPhotographerInfo = async () => photographerInfo;
export const getAboutInfo = async () => aboutInfo;

/* ============================
   Formatters (kept for compatibility)
   ============================ */
export const formatServices = (servicesArray) => {
  return (
    servicesArray?.map((service, index) => ({
      id: service.id ?? index,
      title: service.title,
      description: service.description,
      features: service.features,
      image: service.image,
      icon: service.icon,
      color: service.color,
    })) ?? []
  );
};

export const formatPackages = (packagesArray) => {
  return (
    packagesArray?.map((pkg, index) => ({
      id: pkg.id ?? index,
      name: pkg.name,
      price: pkg.price,
      duration: pkg.duration,
      category: pkg.category,
      features: pkg.features,
      popular: pkg.popular,
      color: pkg.color,
    })) ?? []
  );
};

export const formatTestimonials = (testimonialsArray) => {
  return (
    testimonialsArray?.map((t, index) => ({
      id: t.id ?? index,
      name: t.name,
      event: t.event,
      rating: t.rating,
      text: t.text,
      image: t.image,
      location: t.location,
    })) ?? []
  );
};

/* ============================
   Legacy / Compatibility objects
   (so old imports in components continue to work)
   ============================ */
export const contentAPI = {
  get: async () => {
    // previously contentAPI.get() returned page-level content — map to photographer info
    return getPhotographerInfo();
  },
};

export const portfolioAPI = {
  get: async () => {
    return getPortfolio();
  },
};

export const servicesAPI = {
  get: async () => {
    return getServices();
  },
};

export const packagesAPI = {
  get: async () => {
    return getPackages();
  },
};

export const testimonialsAPI = {
  get: async () => {
    return getTestimonials();
  },
};

/* inquiriesAPI used to submit contact/inquiry forms.
   Provide a mock submit that logs and resolves (so components don't crash). */
export const inquiriesAPI = {
  submit: async (formData) => {
    console.log("inquiriesAPI.submit (mock) called:", formData);
    // return a shape similar to a successful API response
    return { success: true, message: "Mock inquiry received" };
  },
  send: async (formData) => {
    console.log("inquiriesAPI.send (mock) called:", formData);
    return { success: true, message: "Mock inquiry sent" };
  },
};

/* simple passthrough helpers for 'organize' functions if components expect them */
export const organizeContent = (data) => data;
export const organizePortfolio = (data) => data;
export const organizeServices = (data) => data;

/* ============================
   Unified default export (for compatibility)
   Some parts of the app might import default API_SERVICES
   ============================ */
const API_SERVICES = {
  getServices,
  getPackages,
  getPortfolio,
  getTestimonials,
  getPhotographerInfo,
  getAboutInfo,
  formatServices,
  formatPackages,
  formatTestimonials,
  contentAPI,
  portfolioAPI,
  servicesAPI,
  packagesAPI,
  testimonialsAPI,
  inquiriesAPI,
  organizeContent,
  organizePortfolio,
  organizeServices,
};

export default API_SERVICES;

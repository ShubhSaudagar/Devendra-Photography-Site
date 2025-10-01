// Mock data for D.S.P.Film's Photography Website

export const photographerInfo = {
  name: "Devendra",
  brandName: "D.S.P.Film's",
  tagline: "Capturing Life's Precious Moments",
  description: "Professional photographer specializing in weddings, cinematic photography, newborn & maternity sessions, and commercial projects. Based in Maharashtra, India.",
  phone: "+91 98765 43210",
  email: "contact@dspfilms.com",
  location: "Maharashtra, India",
  experience: "5+ Years",
  social: {
    instagram: "https://www.instagram.com/d.s.p.films/",
    facebook: "#",
    youtube: "#"
  }
};

export const services = [
  {
    id: 1,
    title: "Wedding & Events",
    description: "Complete wedding documentation from pre-wedding shoots to reception ceremonies. Candid moments, traditional rituals, and beautiful couple portraits.",
    features: ["Pre-wedding Shoot", "Wedding Day Coverage", "Reception Photography", "Traditional Ceremonies", "Candid Moments", "Couple Portraits"],
    image: "https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzU5MzExNzgyfDA&ixlib=rb-4.1.0&q=85",
    icon: "Heart"
  },
  {
    id: 2,
    title: "Cinematic Photography",
    description: "Dramatic, storytelling photography with cinematic composition. Perfect for creative projects, fashion shoots, and artistic portraits.",
    features: ["Fashion Photography", "Creative Portraits", "Dramatic Lighting", "Storytelling Shots", "Artistic Compositions", "Editorial Style"],
    image: "https://images.unsplash.com/photo-1638128807421-1fe4b5f4e7c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3NTkzMTE3ODd8MA&ixlib=rb-4.1.0&q=85",
    icon: "Camera"
  },
  {
    id: 3,
    title: "Newborn & Maternity",
    description: "Gentle, professional photography for expecting mothers and newborn babies. Safe, comfortable environment for precious family moments.",
    features: ["Maternity Shoots", "Newborn Photography", "Family Portraits", "Baby Milestones", "Safe Environment", "Props & Styling"],
    image: "https://images.unsplash.com/photo-1533483595632-c5f0e57a1936?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieXxlbnwwfHx8fDE3NTkzMTE3OTN8MA&ixlib=rb-4.1.0&q=85",
    icon: "Baby"
  },
  {
    id: 4,
    title: "Commercial & Product",
    description: "Professional commercial photography for businesses, products, and corporate events. High-quality images for marketing and branding needs.",
    features: ["Product Photography", "Corporate Events", "Business Portraits", "Marketing Content", "Brand Photography", "Professional Headshots"],
    image: "https://images.unsplash.com/photo-1646372751563-4f2cad64dd5b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3NTkzMTE3ODd8MA&ixlib=rb-4.1.0&q=85",
    icon: "Briefcase"
  }
];

export const packages = [
  {
    id: 1,
    name: "Basic Package",
    price: "₹45,000",
    duration: "6 Hours",
    category: "wedding",
    features: [
      "6 Hours Photography Coverage",
      "200+ High Resolution Photos",
      "Basic Photo Editing",
      "Online Gallery Access",
      "Mobile & Desktop Downloads"
    ],
    popular: false
  },
  {
    id: 2,
    name: "Premium Package",
    price: "₹90,000",
    duration: "Full Day",
    category: "wedding",
    features: [
      "Full Day Photography Coverage",
      "400+ High Resolution Photos",
      "Professional Photo Editing",
      "Premium Online Gallery",
      "Physical Photo Album (50 prints)",
      "Mobile & Desktop Downloads",
      "2 Hours Pre-wedding Shoot"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Luxury Package",
    price: "₹1,50,000",
    duration: "2 Days",
    category: "wedding",
    features: [
      "Complete Wedding Coverage (2 Days)",
      "600+ High Resolution Photos",
      "Premium Photo Editing & Retouching",
      "Luxury Photo Album (100 prints)",
      "4 Hours Pre-wedding Shoot",
      "Drone Photography (where permitted)",
      "Same Day Preview (50 photos)",
      "USB Drive with All Photos"
    ],
    popular: false
  },
  {
    id: 4,
    name: "Maternity Package",
    price: "₹25,000",
    duration: "2 Hours",
    category: "maternity",
    features: [
      "2 Hours Studio/Outdoor Shoot",
      "50+ Edited High Resolution Photos",
      "Professional Lighting Setup",
      "Props & Styling Assistance",
      "Online Gallery Access",
      "Print Release Rights"
    ],
    popular: false
  },
  {
    id: 5,
    name: "Newborn Package",
    price: "₹20,000",
    duration: "3 Hours",
    category: "newborn",
    features: [
      "3 Hours Safe Newborn Photography",
      "40+ Edited High Resolution Photos",
      "Multiple Setups & Props",
      "Family Shots Included",
      "Online Gallery Access",
      "Print Release Rights"
    ],
    popular: false
  },
  {
    id: 6,
    name: "Commercial Package",
    price: "₹35,000",
    duration: "4 Hours",
    category: "commercial",
    features: [
      "4 Hours Commercial Shoot",
      "100+ High Resolution Photos",
      "Professional Editing",
      "Commercial Usage Rights",
      "Multiple Product Setups",
      "Fast 48-Hour Delivery"
    ],
    popular: false
  }
];

export const portfolio = {
  wedding: [
    {
      id: 1,
      title: "Beautiful Ring Ceremony",
      image: "https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzU5MzExNzgyfDA&ixlib=rb-4.1.0&q=85",
      category: "Wedding"
    },
    {
      id: 2,
      title: "Romantic Couple Portrait",
      image: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzU5MzExNzgyfDA&ixlib=rb-4.1.0&q=85",
      category: "Pre-Wedding"
    },
    {
      id: 3,
      title: "Traditional Wedding Moments",
      image: "https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzU5MzExNzgyfDA&ixlib=rb-4.1.0&q=85",
      category: "Ceremony"
    },
    {
      id: 4,
      title: "Beach Wedding Session",
      image: "https://images.unsplash.com/photo-1562826772-be179f321470?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHw0fHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzU5MzExNzgyfDA&ixlib=rb-4.1.0&q=85",
      category: "Destination"
    }
  ],
  cinematic: [
    {
      id: 1,
      title: "Dramatic Silhouette",
      image: "https://images.unsplash.com/photo-1638128807421-1fe4b5f4e7c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3NTkzMTE3ODd8MA&ixlib=rb-4.1.0&q=85",
      category: "Portrait"
    },
    {
      id: 2,
      title: "Artistic Bird Photography",
      image: "https://images.unsplash.com/photo-1645672508140-31ac457f089c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3NTkzMTE3ODd8MA&ixlib=rb-4.1.0&q=85",
      category: "Nature"
    },
    {
      id: 3,
      title: "Urban Architecture",
      image: "https://images.unsplash.com/photo-1646372751563-4f2cad64dd5b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3NTkzMTE3ODd8MA&ixlib=rb-4.1.0&q=85",
      category: "Commercial"
    },
    {
      id: 4,
      title: "Creative Portrait",
      image: "https://images.pexels.com/photos/34084883/pexels-photo-34084883.jpeg",
      category: "Fashion"
    }
  ],
  newborn: [
    {
      id: 1,
      title: "Peaceful Newborn",
      image: "https://images.unsplash.com/photo-1533483595632-c5f0e57a1936?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieXxlbnwwfHx8fDE3NTkzMTE3OTN8MA&ixlib=rb-4.1.0&q=85",
      category: "Newborn"
    },
    {
      id: 2,
      title: "Adorable Baby Portrait",
      image: "https://images.unsplash.com/photo-1610901158532-d246c011729e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxuZXdib3JuJTIwYmFieXxlbnwwfHx8fDE3NTkzMTE3OTN8MA&ixlib=rb-4.1.0&q=85",
      category: "Baby"
    },
    {
      id: 3,
      title: "Tender Moments",
      image: "https://images.unsplash.com/photo-1552819289-824d37ca69d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxuZXdib3JuJTIwYmFieXxlbnwwfHx8fDE3NTkzMTE3OTN8MA&ixlib=rb-4.1.0&q=85",
      category: "Family"
    },
    {
      id: 4,
      title: "Baby Feet Details",
      image: "https://images.pexels.com/photos/1973270/pexels-photo-1973270.jpeg",
      category: "Details"
    }
  ]
};

export const testimonials = [
  {
    id: 1,
    name: "Priya & Rahul Sharma",
    event: "Wedding Photography",
    rating: 5,
    text: "Devendra captured our wedding beautifully! Every moment was perfect and the photos exceeded our expectations. Highly professional and creative.",
    image: "https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Anita Patil",
    event: "Maternity Shoot",
    rating: 5,
    text: "The maternity photoshoot was amazing! Devendra made me feel comfortable and the results were stunning. Beautiful memories captured forever.",
    image: "https://images.unsplash.com/photo-1552819289-824d37ca69d2?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Mumbai Fashion Brand",
    event: "Commercial Photography",
    rating: 5,
    text: "Professional, creative, and delivered exactly what we needed for our product catalog. Great experience working with D.S.P.Film's team.",
    image: "https://images.unsplash.com/photo-1646372751563-4f2cad64dd5b?w=100&h=100&fit=crop&crop=face"
  }
];

export const stats = [
  { number: "200+", label: "Happy Clients" },
  { number: "500+", label: "Events Covered" },
  { number: "5+", label: "Years Experience" },
  { number: "10K+", label: "Photos Captured" }
];

export const aboutInfo = {
  title: "Meet Devendra",
  subtitle: "Professional Photographer & Visual Storyteller",
  description: "With over 5 years of experience in photography, I specialize in capturing life's most precious moments. From intimate wedding ceremonies to professional commercial shoots, I bring passion and creativity to every project. Based in Maharashtra, I serve clients across India with a focus on authentic storytelling through imagery.",
  achievements: [
    "5+ Years Professional Experience",
    "200+ Satisfied Clients",
    "Specialized in 4 Photography Categories",
    "Published in Local Photography Magazines"
  ],
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face"
};
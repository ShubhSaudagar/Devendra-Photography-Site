// Mock data for D.S.P.Film's Photography Website - Updated with Real Photos and Enhanced Services

export const photographerInfo = {
  name: "Devendra S. Shinde",
  brandName: "DSP Film's",
  tagline: "Capturing Life's Precious Moments",
  description: "Expert in Cinematic & Wedding photography, newborn & maternity sessions, and commercial projects. Based in Ahilyanagar & Pune, Maharashtra, India.",
  phone: "+91 8308398378",
  location: "Ahilyanagar & Pune, Maharashtra",
  officeAddress: "1st floor, above Ola EV showroom, opp. Shilpa Garden, Nagar - Pune Highway, Ahilyanagar - 414001",
  experience: "8+ Years",
  experienceStart: "February 2017",
  social: {
    instagram: "https://www.instagram.com/d.s.p.films/",
    facebook: "https://www.facebook.com/devshindephotography/",
    youtube: "https://www.youtube.com/@devshindefilms6040/featured"
  }
};

export const services = [
  {
    id: 1,
    title: "Wedding & Events",
    description: "Complete wedding documentation from mehendi to reception. Candid moments, traditional rituals, and cinematic storytelling that preserves your special day forever.",
    features: ["Mehendi & Sangeet Coverage", "Wedding Day Documentation", "Reception Photography", "Traditional Ceremonies", "Candid Moments", "Family Portraits"],
    image: "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/ocw386dq_DEV_4405%20copy.jpg",
    icon: "Heart",
    color: "from-rose-600 to-pink-600"
  },
  {
    id: 2,
    title: "Pre-Wedding Shoots",
    description: "Romantic pre-wedding photography sessions that capture your love story. Beautiful locations, creative concepts, and cinematic storytelling for couples.",
    features: ["Location Scouting", "Creative Concepts", "Costume Guidance", "Multiple Outfit Changes", "Cinematic Shots", "Love Story Documentation"],
    image: "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/u6ki7yo7_8X3A0072%20copy.jpg",
    icon: "Camera",
    color: "from-purple-600 to-indigo-600"
  },
  {
    id: 3,
    title: "Cinematic Photography",
    description: "Dramatic, storytelling photography with cinematic composition. Perfect for creative projects, fashion shoots, and artistic portraits with a filmic approach.",
    features: ["Fashion Photography", "Creative Portraits", "Dramatic Lighting", "Storytelling Shots", "Artistic Compositions", "Film-style Grading"],
    image: "https://images.unsplash.com/photo-1638128807421-1fe4b5f4e7c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3NTkzMTE3ODd8MA&ixlib=rb-4.1.0&q=85",
    icon: "Video",
    color: "from-emerald-600 to-teal-600"
  },
  {
    id: 4,
    title: "Maternity | Newborn & Family",
    description: "Gentle, professional photography for expecting mothers and newborn babies. Safe, comfortable environment for precious family moments.",
    features: ["Maternity Shoots", "Newborn Photography", "Family Portraits", "Baby Milestones", "Safe Environment", "Props & Styling"],
    image: "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/tfl833jz_8X3A9993%20copy%202.jpg",
    icon: "Baby",
    color: "from-amber-600 to-orange-600"
  },
  {
    id: 5,
    title: "Commercial & Product",
    description: "Professional commercial photography for businesses, products, and corporate events. High-quality images for marketing and branding needs.",
    features: ["Product Photography", "Corporate Events", "Business Portraits", "Marketing Content", "Brand Photography", "Professional Headshots"],
    image: "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/2w4tfdai_8X3A0565%20copy.jpg",
    icon: "Briefcase",
    color: "from-slate-600 to-gray-600"
  }
];

export const packages = [
  {
    id: 1,
    name: "Essential Package",
    price: "₹45,000",
    duration: "6 Hours",
    category: "wedding",
    features: [
      "6 Hours Photography Coverage",
      "200+ High Resolution Photos",
      "Professional Photo Editing",
      "Online Gallery Access",
      "Mobile & Desktop Downloads",
      "Social Media Ready Photos"
    ],
    popular: false,
    color: "from-rose-500 to-pink-500"
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
      "Premium Photo Editing & Retouching",
      "Cinematic Photo Gallery",
      "Physical Photo Album (50 prints)",
      "Same Day Preview (30 photos)",
      "2 Hours Pre-wedding Shoot",
      "USB Drive with All Photos"
    ],
    popular: true,
    color: "from-purple-500 to-indigo-500"
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
      "Premium Editing & Color Grading",
      "Luxury Photo Album (100 prints)",
      "4 Hours Pre-wedding Shoot",
      "Drone Photography (where permitted)",
      "Same Day Highlight Reel (50 photos)",
      "Premium USB Drive & Online Gallery",
      "Personal Photography Assistant"
    ],
    popular: false,
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: 4,
    name: "Pre-Wedding Special",
    price: "₹35,000",
    duration: "4 Hours",
    category: "prewedding",
    features: [
      "4 Hours Location Photography",
      "100+ Edited High Resolution Photos",
      "2 Outfit Changes",
      "Creative Concept Development",
      "Professional Lighting Setup",
      "Online Gallery Access",
      "Print Release Rights"
    ],
    popular: false,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    name: "Maternity Package",
    price: "₹25,000",
    duration: "2 Hours",
    category: "maternity",
    features: [
      "2 Hours Studio/Outdoor Shoot",
      "50+ Edited High Resolution Photos",
      "Professional Lighting Setup",
      "Props & Styling Assistance",
      "Partner & Family Shots",
      "Online Gallery Access",
      "Print Release Rights"
    ],
    popular: false,
    color: "from-amber-500 to-orange-500"
  },
  {
    id: 6,
    name: "Commercial Package",
    price: "₹40,000",
    duration: "5 Hours",
    category: "commercial",
    features: [
      "5 Hours Commercial Shoot",
      "150+ High Resolution Photos",
      "Professional Editing",
      "Commercial Usage Rights",
      "Multiple Product/Brand Setups",
      "Fast 24-Hour Delivery",
      "Raw Files Included"
    ],
    popular: false,
    color: "from-slate-500 to-gray-500"
  }
];

export const portfolio = {
  wedding: [
    {
      id: 1,
      title: "Spectacular Wedding Celebration",
      image: "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/ocw386dq_DEV_4405%20copy.jpg",
      category: "Wedding Ceremony"
    },
    {
      id: 2,
      title: "Traditional Bridal Portrait",
      image: "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/2w4tfdai_8X3A0565%20copy.jpg",
      category: "Bridal Photography"
    },
    {
      id: 3,
      title: "Romantic Couple Portrait",
      image: "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/u6ki7yo7_8X3A0072%20copy.jpg",
      category: "Couple Photography"
    },
    {
      id: 4,
      title: "Elegant Bridal Moments",
      image: "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/tfl833jz_8X3A9993%20copy%202.jpg",
      category: "Bridal Portraits"
    }
  ],
  prewedding: [
    {
      id: 1,
      title: "Joyful Pre-Wedding Moments",
      image: "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/u6ki7yo7_8X3A0072%20copy.jpg",
      category: "Pre-Wedding"
    },
    {
      id: 2,
      title: "Romantic Pre-Wedding Session",
      image: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzU5MzExNzgyfDA&ixlib=rb-4.1.0&q=85",
      category: "Outdoor Session"
    }
  ],
  cinematic: [
    {
      id: 1,
      title: "Cinematic Portrait",
      image: "https://images.unsplash.com/photo-1638128807421-1fe4b5f4e7c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3NTkzMTE3ODd8MA&ixlib=rb-4.1.0&q=85",
      category: "Portrait"
    },
    {
      id: 2,
      title: "Artistic Composition",
      image: "https://images.unsplash.com/photo-1645672508140-31ac457f089c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxjaW5lbWF0aWMlMjBwaG90b2dyYXBoeXxlbnwwfHx8fDE3NTkzMTE3ODd8MA&ixlib=rb-4.1.0&q=85",
      category: "Creative"
    }
  ],
  maternity: [
    {
      id: 1,
      title: "Beautiful Maternity Moments",
      image: "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/tfl833jz_8X3A9993%20copy%202.jpg",
      category: "Maternity"
    },
    {
      id: 2,
      title: "Gentle Family Portraits",
      image: "https://images.unsplash.com/photo-1552819289-824d37ca69d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxuZXdib3JuJTIwYmFieXxlbnwwfHx8fDE3NTkzMTE3OTN8MA&ixlib=rb-4.1.0&q=85",
      category: "Family"
    }
  ]
};

export const testimonials = [
  {
    id: 1,
    name: "Priya & Rahul Sharma",
    event: "Wedding Photography",
    rating: 5,
    text: "Devendra's cinematic approach to our wedding photography was absolutely stunning! Every moment was captured with such artistry and emotion. The photos look like movie stills!",
    image: "https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?w=100&h=100&fit=crop&crop=face",
    location: "Pune, Maharashtra"
  },
  {
    id: 2,
    name: "Anita & Suresh Patil",
    event: "Pre-Wedding & Wedding",
    rating: 5,
    text: "From our pre-wedding shoot to the wedding day, DSP Films exceeded all expectations. The attention to detail and the way they captured our traditional ceremonies was phenomenal.",
    image: "https://images.unsplash.com/photo-1552819289-824d37ca69d2?w=100&h=100&fit=crop&crop=face",
    location: "Mumbai, Maharashtra"
  },
  {
    id: 3,
    name: "Rohan & Kavya Desai",
    event: "Maternity Photography",
    rating: 5,
    text: "The maternity photoshoot was a beautiful experience. Devendra made us feel so comfortable, and the results were breathtaking. We'll treasure these memories forever.",
    image: "https://images.unsplash.com/photo-1646372751563-4f2cad64dd5b?w=100&h=100&fit=crop&crop=face",
    location: "Nagpur, Maharashtra"
  }
];

export const stats = [
  { number: "500+", label: "Happy Couples" },
  { number: "1200+", label: "Events Covered" },
  { number: "8+", label: "Years Experience" },
  { number: "2L+", label: "Photos Captured" }
];

export const aboutInfo = {
  title: "Meet Devendra S. Shinde",
  subtitle: "Cinematic Photographer & Visual Storyteller",
  description: "With over 8 years of experience since February 2017 in cinematic photography and videography, I specialize in capturing life's most precious moments with an artistic eye. From intimate wedding ceremonies to grand celebrations, I bring passion, creativity, and technical expertise to every project. Based in Ahilyanagar & Pune, Maharashtra, I serve clients across India with a focus on authentic storytelling through stunning visuals.",
  achievements: [
    "8+ Years Professional Experience (Since Feb 2017)",
    "500+ Satisfied Couples",
    "Expert in Cinematic & Wedding",
    "Featured in Wedding Photography Magazines",
    "Maternity | Newborn & Family Specialist",
    "Based in Ahilyanagar & Pune"
  ],
  image: "https://customer-assets.emergentagent.com/job_dsp-film-portfolio/artifacts/521vfvt4_DevShinde.png"
};
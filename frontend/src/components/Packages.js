import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Star, Sparkles, Crown, ArrowRight } from "lucide-react";
import axios from "axios";

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState('Wedding');
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  
  const API_URL = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/packages`);
      if (Array.isArray(response.data)) {
        setPackages(response.data.map(pkg => ({
          ...pkg,
          id: pkg.packageId || pkg._id
        })));
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const categories = [
    { id: 'Wedding', label: 'Wedding Packages', color: 'from-rose-500 to-pink-500' },
    { id: 'Pre-Wedding', label: 'Pre-Wedding', color: 'from-purple-500 to-indigo-500' },
    { id: 'Maternity | Newborn & Family', label: 'Maternity | Newborn & Family', color: 'from-amber-500 to-orange-500' }
  ];

  const filteredPackages = packages.filter(pkg => 
    pkg.category === selectedCategory
  );

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPackageIcon = (packageName) => {
    if (packageName.includes('Luxury') || packageName.includes('Premium')) {
      return <Crown size={20} />;
    }
    if (packageName.includes('Special')) {
      return <Sparkles size={20} />;
    }
    return <Star size={20} />;
  };

  return (
    <section id="packages" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/40 to-black"></div>
      <div className="absolute top-40 left-20 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-rose-600/20 to-pink-600/20 border border-white/10 backdrop-blur-lg mb-6">
            <span className="text-sm font-medium text-rose-300">Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Photography Packages
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Choose the perfect package for your photography needs. All packages include professional editing and high-resolution images.
          </p>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant="ghost"
                className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {/* Background */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} shadow-lg`
                    : 'bg-white/5 group-hover:bg-white/10 backdrop-blur-lg border border-white/10'
                }`}></div>
                
                <span className="relative z-10">{category.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPackages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className={`group relative border-0 bg-transparent transition-all duration-500 transform hover:scale-105 ${
                pkg.popular ? 'lg:scale-110' : ''
              }`}
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-lg border border-white/20 transition-all duration-500 ${
                hoveredPackage === pkg.id ? 'border-white/30 shadow-2xl' : ''
              }`}></div>
              
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className={`bg-gradient-to-r ${pkg.color} text-white px-4 py-2 rounded-full shadow-lg flex items-center animate-pulse`}>
                    <Star className="w-4 h-4 mr-2 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardContent className="relative z-10 p-8 h-full flex flex-col">
                {/* Package Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${pkg.color} mb-4 shadow-lg`}>
                    <div className="text-white">
                      {getPackageIcon(pkg.name)}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {pkg.name}
                  </h3>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {pkg.price}
                    </span>
                    <div className="text-sm text-gray-400 mt-1">{pkg.duration}</div>
                  </div>
                </div>
                
                {/* Features List */}
                <div className="flex-1 mb-6">
                  <ul className="space-y-4">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm text-gray-300">
                        <div className="flex-shrink-0 mr-3 mt-0.5">
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Terms & Conditions */}
                {pkg.terms && pkg.terms.length > 0 && (
                  <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-xs font-semibold text-purple-300 mb-2">Terms & Conditions:</p>
                    <ul className="space-y-1">
                      {pkg.terms.map((term, termIndex) => (
                        <li key={termIndex} className="text-xs text-gray-400 leading-relaxed">
                          • {term}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* CTA Button */}
                <a 
                  href="https://wa.me/918308398378?text=Hi%2C%20I'm%20interested%20in%20booking%20the%20package%3A%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative w-full py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                    pkg.popular 
                      ? `bg-gradient-to-r ${pkg.color} hover:shadow-lg text-white` 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    Book This Package
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={16} />
                  </span>
                  
                  {pkg.popular && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div className="text-center">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="text-purple-400 mr-3" size={24} />
                <h3 className="text-2xl font-bold text-white">
                  Need a Custom Package?
                </h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Every event is unique. Let's discuss your specific needs and create a personalized photography package that fits your vision and budget.
              </p>
              <Button 
                onClick={scrollToContact}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center">
                  Get Custom Quote
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={16} />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
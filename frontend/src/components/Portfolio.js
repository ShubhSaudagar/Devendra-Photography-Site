import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Eye, Heart, Share2, ArrowRight } from "lucide-react";
import { portfolioAPI, organizePortfolio } from "../services/api";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('wedding');
  const [hoveredImage, setHoveredImage] = useState(null);
  const [portfolio, setPortfolio] = useState({ wedding: [], prewedding: [], cinematic: [], maternity: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await portfolioAPI.getAll();
        const organizedPortfolio = organizePortfolio(response.data);
        setPortfolio(organizedPortfolio);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const categories = [
    { id: 'wedding', label: 'Wedding & Events', count: portfolio.wedding?.length || 0, color: 'from-rose-500 to-pink-500' },
    { id: 'prewedding', label: 'Pre-Wedding', count: portfolio.prewedding?.length || 0, color: 'from-purple-500 to-indigo-500' },
    { id: 'cinematic', label: 'Cinematic', count: portfolio.cinematic?.length || 0, color: 'from-emerald-500 to-teal-500' },
    { id: 'maternity', label: 'Maternity | Newborn & Family', count: portfolio.maternity?.length || 0, color: 'from-amber-500 to-orange-500' }
  ];

  const currentPortfolio = portfolio[activeCategory] || [];

  if (loading) {
    return (
      <section id="portfolio" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">Loading portfolio...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
      <div className="absolute top-20 right-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-white/10 backdrop-blur-lg mb-6">
            <span className="text-sm font-medium text-emerald-300">Our Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Portfolio Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore our collection of captured moments and creative photography work across different styles and occasions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant="ghost"
              className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {/* Background */}
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} shadow-lg`
                  : 'bg-white/5 group-hover:bg-white/10 backdrop-blur-lg border border-white/10'
              }`}></div>
              
              {/* Content */}
              <span className="relative z-10 flex items-center">
                {category.label}
                <Badge 
                  variant="secondary" 
                  className={`ml-3 text-xs px-2 py-1 ${
                    activeCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-gray-300'
                  }`}
                >
                  {category.count}
                </Badge>
              </span>
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {currentPortfolio.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105"
              onMouseEnter={() => setHoveredImage(item.id)}
              onMouseLeave={() => setHoveredImage(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-900 aspect-w-4 aspect-h-5">
                {/* Image */}
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                      {item.category}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/30 transition-colors duration-200">
                        <Eye size={18} className="text-white" />
                      </button>
                      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/30 transition-colors duration-200">
                        <Heart size={18} className="text-white" />
                      </button>
                      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/30 transition-colors duration-200">
                        <Share2 size={18} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 ${
                  hoveredImage === item.id ? 'border-gradient-to-r from-purple-500 to-pink-500 shadow-2xl' : ''
                }`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Button 
            variant="outline"
            className="group relative border-2 border-white/20 text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-lg transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center">
              View Complete Gallery
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Camera, Award, Users, Play, Star, ArrowRight } from "lucide-react";
import { photographerInfo, stats } from "../data/mock";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/ocw386dq_DEV_4405%20copy.jpg",
    "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/u6ki7yo7_8X3A0072%20copy.jpg",
    "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/2w4tfdai_8X3A0565%20copy.jpg",
    "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/tfl833jz_8X3A9993%20copy%202.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transform scale-105"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
          </div>
        ))}
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-bounce opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Brand Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-white/10 backdrop-blur-lg">
            <Camera size={20} className="mr-3 text-purple-400" />
            <span className="text-sm font-medium text-gray-200">Cinematic Photography & Films</span>
            <div className="ml-3 flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-yellow-400 fill-current" />
              ))}
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                {photographerInfo.brandName}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 max-w-4xl mx-auto">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {photographerInfo.tagline}
              </span>
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {photographerInfo.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const icons = [Users, Camera, Award, Star];
              const IconComponent = icons[index];
              const colors = [
                'from-purple-600 to-indigo-600',
                'from-pink-600 to-rose-600',
                'from-emerald-600 to-teal-600',
                'from-amber-600 to-orange-600'
              ];
              
              return (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${colors[index]} mb-4`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              onClick={() => scrollToSection('portfolio')}
              size="lg"
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center">
                View Portfolio
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </Button>
            
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline" 
              size="lg"
              className="group relative border-2 border-white/20 text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center">
                <Play className="mr-2 group-hover:scale-110 transition-transform duration-200" size={20} />
                Book a Session
              </span>
            </Button>
          </div>

          {/* Image Navigation Dots */}
          <div className="flex justify-center space-x-3 pt-8">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <div className="text-xs text-gray-400 mt-2">Scroll</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
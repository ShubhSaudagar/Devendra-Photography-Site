import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Camera, Award, Users, Play, Star, ArrowRight } from "lucide-react";
import { contentAPI, portfolioAPI, organizeContent } from "../services/api";
import { photographerInfo } from "../data/mock";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [siteContent, setSiteContent] = useState({});
  const [heroImages, setHeroImages] = useState([
    "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/ocw386dq_DEV_4405%20copy.jpg",
    "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/u6ki7yo7_8X3A0072%20copy.jpg",
    "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/2w4tfdai_8X3A0565%20copy.jpg",
    "https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/tfl833jz_8X3A9993%20copy%202.jpg"
  ]);
  const [stats, setStats] = useState([
    { number: "500+", label: "Happy Couples" },
    { number: "1200+", label: "Events Covered" },
    { number: "8+", label: "Years Experience" },
    { number: "2L+", label: "Photos Captured" }
  ]);
  const [loading, setLoading] = useState(true);

  // Get photographer info from site content with defaults
  const photographerInfo = {
    brandName: siteContent.hero?.brand_name || "DSP Film's",
    tagline: siteContent.hero?.tagline || "Capturing Life's Precious Moments", 
    description: siteContent.hero?.description || "Expert in Cinematic & Wedding photography, newborn & maternity sessions, and commercial projects. Based in Ahilyanagar & Pune, Maharashtra, India."
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentResponse, portfolioResponse] = await Promise.all([
          contentAPI.getAll(),
          portfolioAPI.getAll()
        ]);
        
        const organizedContent = organizeContent(contentResponse.data);
        setSiteContent(organizedContent);
        
        // Update hero images from portfolio
        const portfolioImages = portfolioResponse.data
          .filter(item => item.image)
          .slice(0, 4)
          .map(item => item.image);
        
        if (portfolioImages.length > 0) {
          setHeroImages(portfolioImages);
        }
        
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

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
            <span className="text-sm font-medium text-gray-200">Photography | Video Production | Advertising</span>
            <div className="ml-3 flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-yellow-400 fill-current" />
              ))}
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-gradient" style={{fontFamily: "'Playfair Display', serif"}}>
                DSP Film's
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
            
            <a 
              href="https://wa.me/+918308398378"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative border-2 border-green-500/60 text-white hover:bg-green-500 hover:text-white px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              <span className="flex items-center">
                <svg className="mr-2 group-hover:scale-110 transition-transform duration-200" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
                </svg>
                WhatsApp Now
              </span>
            </a>
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
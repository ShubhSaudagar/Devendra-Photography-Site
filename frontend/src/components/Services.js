import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Heart, Camera, Baby, Briefcase, Video, ArrowRight } from "lucide-react";
import { servicesAPI, formatServices } from "../services/api";

const iconMap = {
  Heart: Heart,
  Camera: Camera,
  Baby: Baby,
  Briefcase: Briefcase,
  Video: Video
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll();
        const formattedServices = formatServices(response.data);
        setServices(formattedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">Loading services...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-white/10 backdrop-blur-lg mb-6">
            <span className="text-sm font-medium text-purple-300">Our Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Photography Services
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Specializing in capturing life's most precious moments with professional expertise, 
            cinematic vision, and artistic storytelling.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            
            return (
              <Card key={service.id} className="group relative overflow-hidden border-0 bg-transparent hover:transform hover:scale-105 transition-all duration-500">
                {/* Service Image Background */}
                <div className="absolute inset-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform scale-110 group-hover:scale-125 transition-transform duration-700"
                    style={{ backgroundImage: `url(${service.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 group-hover:from-black/90 group-hover:via-black/70 transition-all duration-500"></div>
                </div>

                <CardContent className="relative z-10 p-8 h-96 flex flex-col justify-end">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="text-white" size={28} />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features Preview */}
                    <div className="space-y-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {service.features.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-xs text-gray-400">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    {/* Learn More Button */}
                    <button className="inline-flex items-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200 hover:text-purple-400">
                      Learn More
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </CardContent>

                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm"></div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a 
            href="https://wa.me/918308398378?text=Hi%2C%20I%20need%20a%20custom%20photography%20package" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-white/10 backdrop-blur-lg hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 cursor-pointer group"
          >
            <Camera className="mr-3 text-purple-400 group-hover:scale-110 transition-transform duration-200" size={20} />
            <span className="text-white font-medium">Need something custom? Let's create it together</span>
            <ArrowRight className="ml-3 text-pink-400 group-hover:translate-x-1 transition-transform duration-200" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
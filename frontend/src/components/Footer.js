import React from "react";
import { Camera, Heart, Instagram, Facebook, Youtube, Mail, Phone, MapPin, Building2, Clock, ArrowUp } from "lucide-react";
import { photographerInfo, services } from "../data/mock";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/80 to-black"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-sm opacity-70"></div>
                  <div className="relative bg-black rounded-xl p-3">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {photographerInfo.brandName}
                </h3>
              </div>
              
              <p className="text-gray-400 leading-relaxed">
                {photographerInfo.description}
              </p>
              
              <div className="space-y-3">
                <div className="text-white font-semibold">{photographerInfo.name}</div>
                <div className="text-sm text-gray-400">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
                    Since {photographerInfo.experienceStart}
                  </span> • {photographerInfo.experience}
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a 
                  href={photographerInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 p-3 rounded-xl transition-all duration-300 transform group-hover:scale-110">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                </a>
                <a 
                  href={photographerInfo.social.facebook}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 p-3 rounded-xl transition-all duration-300 transform group-hover:scale-110">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                </a>
                <a 
                  href={photographerInfo.social.youtube}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 p-3 rounded-xl transition-all duration-300 transform group-hover:scale-110">
                    <Youtube className="w-5 h-5 text-white" />
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Home', id: 'hero' },
                  { label: 'About', id: 'about' },
                  { label: 'Services', id: 'services' },
                  { label: 'Portfolio', id: 'portfolio' },
                  { label: 'Packages', id: 'packages' },
                  { label: 'Contact', id: 'contact' }
                ].map((link) => (
                  <li key={link.id}>
                    <button 
                      onClick={() => scrollToSection(link.id)}
                      className="group text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white relative">
                Our Services
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <button 
                      onClick={() => scrollToSection('services')}
                      className="group text-gray-400 hover:text-white transition-colors duration-200 flex items-center text-left"
                    >
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white relative">
                Get in Touch
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full"></div>
              </h4>
              
              <div className="space-y-4">
                <a 
                  href={`tel:${photographerInfo.phone}`}
                  className="group flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-white/10 flex items-center justify-center group-hover:from-green-600/30 group-hover:to-emerald-600/30 transition-all duration-200">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm">{photographerInfo.phone}</div>
                  </div>
                </a>
                
                <div className="flex items-start space-x-3 text-gray-400">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-white/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Location</div>
                    <div className="text-sm">{photographerInfo.location}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 text-gray-400">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-white/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Office</div>
                    <div className="text-sm leading-relaxed">{photographerInfo.officeAddress}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <span>© {currentYear} {photographerInfo.brandName}. All rights reserved.</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-400 text-base">
                  <span className="text-base">Site built by</span>
                  <a 
                    href="https://www.instagram.com/shubhsaudagar/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-purple-400 transition"
                  >
                    <img 
                      src="https://customer-assets.emergentagent.com/job_dsp-film-portfolio/artifacts/6b692ram_ShubhSaudagar.jpg" 
                      alt="Shubham Saudagar" 
                      className="w-8 h-8 rounded-full border border-purple-500/50"
                    />
                    <span className="font-medium text-base">Shubham Saudagar</span>
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <button 
                onClick={scrollToTop}
                className="group relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-full p-3 hover:from-white/20 hover:to-white/10 transition-all duration-300 transform hover:scale-110"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 text-white group-hover:text-cyan-400 transition-colors duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
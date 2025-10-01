import React from "react";
import { Camera, Heart, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { photographerInfo, services } from "../data/mock";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold">{photographerInfo.brandName}</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {photographerInfo.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href={photographerInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={photographerInfo.social.facebook}
                className="p-2 bg-gray-800 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={photographerInfo.social.youtube}
                className="p-2 bg-gray-800 hover:bg-white hover:text-gray-900 rounded-lg transition-all duration-200"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('packages')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Packages
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-gray-300">{photographerInfo.phone}</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-gray-300">{photographerInfo.email}</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-gray-300">{photographerInfo.location}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>© {currentYear} {photographerInfo.brandName}. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for capturing beautiful moments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
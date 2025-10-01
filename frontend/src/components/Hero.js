import React from "react";
import { Button } from "./ui/button";
import { Camera, Award, Users } from "lucide-react";
import { photographerInfo } from "../data/mock";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm rounded-full">
                <Camera size={16} className="mr-2" />
                Professional Photography
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                {photographerInfo.brandName}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light">
                {photographerInfo.tagline}
              </p>
              <p className="text-lg text-gray-600 max-w-lg">
                {photographerInfo.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Users className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">200+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Award className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('portfolio')}
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg"
              >
                View Portfolio
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline" 
                size="lg"
                className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 text-lg"
              >
                Book a Session
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzU5MzExNzgyfDA&ixlib=rb-4.1.0&q=85"
                alt="Professional Photography"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Events Captured</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Camera, Award, Users, Clock, MapPin, Calendar, ArrowRight } from "lucide-react";
import { aboutInfo, stats } from "../data/mock";

const About = () => {
  const icons = {
    "500+": Users,
    "1200+": Camera,
    "8+": Award,
    "2L+": Clock
  };

  const timelineItems = [
    { year: "2017", title: "Photography Journey Begins", description: "Started professional photography in February 2017" },
    { year: "2018", title: "Cinematic Expertise", description: "Specialized in cinematic wedding photography" },
    { year: "2019", title: "Brand Recognition", description: "Sponsored many events in Ahilyanagar" },
    { year: "2024", title: "500+ Happy Couples", description: "Milestone achievement in client satisfaction" }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-white/10 backdrop-blur-lg mb-6">
            <span className="text-sm font-medium text-amber-300">About</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              The Artist Behind the Lens
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full">
                <Camera className="w-4 h-4 mr-2" />
                Professional Photographer
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {aboutInfo.title}
              </h3>
              <p className="text-xl text-gray-400 mb-6 font-light leading-relaxed">
                {aboutInfo.subtitle}
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                {aboutInfo.description}
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutInfo.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 text-sm">{achievement}</span>
                </div>
              ))}
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <div>
                    <div className="text-white font-medium text-sm">Based in</div>
                    <div className="text-gray-400 text-xs">Ahilyanagar & Pune</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <div>
                    <div className="text-white font-medium text-sm">Since</div>
                    <div className="text-gray-400 text-xs">February 2017</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 to-orange-600/30 rounded-3xl blur-2xl transform rotate-6"></div>
              <div className="relative aspect-w-4 aspect-h-5 rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 p-2">
                <img 
                  src={aboutInfo.image}
                  alt="Devendra S. Shinde - Professional Photographer"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl"
                />
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-amber-600 to-orange-600 p-6 rounded-2xl shadow-2xl">
              <div className="text-center text-white">
                <Camera className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">8+</div>
                <div className="text-xs opacity-90">Years</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl">
              <div className="text-white text-center">
                <div className="text-lg font-bold">500+</div>
                <div className="text-xs text-gray-300">Happy Couples</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = icons[stat.number] || Camera;
            const colors = [
              'from-purple-600 to-indigo-600',
              'from-pink-600 to-rose-600',
              'from-emerald-600 to-teal-600',
              'from-amber-600 to-orange-600'
            ];
            
            return (
              <Card key={index} className="group relative border-0 bg-transparent hover:transform hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl group-hover:border-white/30 transition-all duration-300"></div>
                <CardContent className="relative z-10 p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${colors[index]} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Timeline Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Journey Timeline
            </span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From humble beginnings to becoming one of Maharashtra's most trusted wedding photographers.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-amber-600 via-orange-600 to-amber-600"></div>
          
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:flex-row`}>
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full border-4 border-black shadow-lg z-10"></div>
                
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} ml-12 md:ml-0`}>
                  <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:border-white/30 transition-all duration-300">
                    <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
                      {item.year}
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
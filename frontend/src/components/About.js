import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Camera, Award, Users, Clock } from "lucide-react";
import { aboutInfo, stats } from "../data/mock";

const About = () => {
  const icons = {
    "200+": Users,
    "500+": Camera,
    "5+": Award,
    "10K+": Clock
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-gray-900 text-white">
                About the Photographer
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {aboutInfo.title}
              </h2>
              <p className="text-xl text-gray-600 mb-6 font-light">
                {aboutInfo.subtitle}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {aboutInfo.description}
              </p>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Professional Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aboutInfo.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="text-gray-600">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = icons[stat.number] || Camera;
                return (
                  <Card key={index} className="text-center p-4 border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="mb-2">
                        <IconComponent className="w-6 h-6 text-gray-900 mx-auto mb-2" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={aboutInfo.image}
                alt="Devendra - Professional Photographer"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl border">
              <div className="text-center">
                <Camera className="w-8 h-8 text-gray-900 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">5+</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
            </div>
            
            {/* Location Badge */}
            <div className="absolute -bottom-6 -left-6 bg-gray-900 text-white p-4 rounded-xl shadow-xl">
              <div className="text-sm font-medium">Based in Maharashtra</div>
              <div className="text-xs text-gray-300">Serving All India</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Heart, Camera, Baby, Briefcase } from "lucide-react";
import { services } from "../data/mock";

const iconMap = {
  Heart: Heart,
  Camera: Camera,
  Baby: Baby,
  Briefcase: Briefcase
};

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Photography Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Specializing in capturing life's most precious moments with professional expertise and creative vision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gray-100 rounded-full group-hover:bg-gray-900 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-gray-900 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-6">
                    {service.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="text-sm text-gray-500">
                        • {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
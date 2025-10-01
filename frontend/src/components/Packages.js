import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Star } from "lucide-react";
import { packages } from "../data/mock";

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState('wedding');

  const categories = [
    { id: 'wedding', label: 'Wedding Packages' },
    { id: 'maternity', label: 'Maternity' },
    { id: 'newborn', label: 'Newborn' },
    { id: 'commercial', label: 'Commercial' }
  ];

  const filteredPackages = packages.filter(pkg => 
    selectedCategory === 'wedding' ? pkg.category === 'wedding' : pkg.category === selectedCategory
  );

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Photography Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect package for your photography needs. All packages include professional editing and high-resolution images.
          </p>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={selectedCategory === category.id ? 'bg-gray-900 text-white' : 'border-gray-300'}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className={`relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
              pkg.popular ? 'ring-2 ring-gray-900 shadow-xl' : 'shadow-md'
            }`}>
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {pkg.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                  <div className="text-sm text-gray-600 mt-1">{pkg.duration}</div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={scrollToContact}
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-gray-900 hover:bg-gray-800 text-white' 
                      : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  }`}
                  variant={pkg.popular ? "default" : "outline"}
                >
                  Book This Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Package?
            </h3>
            <p className="text-gray-600 mb-6">
              Every event is unique. Let's discuss your specific needs and create a personalized photography package that fits your vision and budget.
            </p>
            <Button 
              onClick={scrollToContact}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3"
            >
              Get Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
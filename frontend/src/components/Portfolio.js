import React, { useState } from "react";
import { Button } from "./ui/button";
import { portfolio } from "../data/mock";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('wedding');

  const categories = [
    { id: 'wedding', label: 'Wedding & Events', count: portfolio.wedding.length },
    { id: 'cinematic', label: 'Cinematic', count: portfolio.cinematic.length },
    { id: 'newborn', label: 'Newborn & Maternity', count: portfolio.newborn.length }
  ];

  const currentPortfolio = portfolio[activeCategory] || [];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of captured moments and creative photography work.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                activeCategory === category.id 
                  ? 'bg-gray-900 text-white hover:bg-gray-800' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.label}
              <span className="ml-2 text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentPortfolio.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl bg-gray-200 aspect-w-4 aspect-h-5">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-200">{item.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3"
          >
            View Complete Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
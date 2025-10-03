import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Star, Quote, ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { testimonials } from "../data/mock";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
      <div className="absolute top-40 left-10 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-600/20 to-cyan-600/20 border border-white/10 backdrop-blur-lg mb-6">
            <span className="text-sm font-medium text-teal-300">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Read testimonials from our happy clients who trusted us to capture their special moments.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-5xl mx-auto mb-16">
          <div 
            className="relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 opacity-20">
              <Quote className="w-16 h-16 text-teal-400" />
            </div>
            
            {/* Navigation Buttons */}
            <div className="absolute top-6 right-6 flex space-x-2">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="relative z-10 text-center">
              {/* Rating */}
              <div className="flex items-center justify-center mb-6">
                {[...Array(testimonials[activeTestimonial]?.rating || 5)].map((_, index) => (
                  <Star key={index} className="w-6 h-6 text-yellow-400 fill-current mx-1" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <blockquote className="text-2xl md:text-3xl font-light text-white mb-8 italic leading-relaxed">
                "{testimonials[activeTestimonial]?.text}"
              </blockquote>
              
              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full blur-sm opacity-70"></div>
                  <img 
                    src={testimonials[activeTestimonial]?.image}
                    alt={testimonials[activeTestimonial]?.name}
                    className="relative w-16 h-16 rounded-full object-cover border-2 border-white/20"
                  />
                </div>
                <div className="text-left">
                  <div className="text-xl font-semibold text-white">{testimonials[activeTestimonial]?.name}</div>
                  <div className="text-teal-400 font-medium">{testimonials[activeTestimonial]?.event}</div>
                  <div className="flex items-center text-gray-400 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {testimonials[activeTestimonial]?.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className={`group border-0 bg-transparent transition-all duration-500 cursor-pointer hover:transform hover:scale-105 ${
                index === activeTestimonial ? 'ring-2 ring-teal-500' : ''
              }`}
              onClick={() => setActiveTestimonial(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl group-hover:border-white/30 transition-all duration-300"></div>
              
              <CardContent className="relative z-10 p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-teal-400 opacity-60" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, ratingIndex) => (
                    <Star key={ratingIndex} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-300 mb-6 italic leading-relaxed text-sm">
                  "{testimonial.text.length > 120 ? testimonial.text.substring(0, 120) + '...' : testimonial.text}"
                </p>
                
                {/* Client Info */}
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <div className="text-white font-medium text-sm">{testimonial.name}</div>
                    <div className="text-teal-400 text-xs">{testimonial.event}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-cyan-600/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Ready to Create Amazing Memories?
                </span>
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Join our family of satisfied clients and let us capture your special moments with the same passion and professionalism.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={scrollToContact}
                  className="group bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="flex items-center justify-center">
                    Book Your Session
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
                  </span>
                </button>
                <button 
                  onClick={scrollToPortfolio}
                  className="group border-2 border-white/20 text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-semibold backdrop-blur-lg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    View More Work
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
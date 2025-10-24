import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Star, Quote, ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { testimonials } from "../data/mock";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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
              className={`group border-0 bg-transparent transition-all duration-300 cursor-pointer hover:transform hover:scale-102 ${
                index === activeTestimonial ? 'ring-1 ring-teal-500/50' : ''
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
                <a 
                  href="https://wa.me/+918308398378"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  <span className="flex items-center justify-center">
                    <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
                    </svg>
                    WhatsApp Us
                  </span>
                </a>
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
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../data/mock";

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read testimonials from our happy clients who trusted us to capture their special moments.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-gray-400" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Client Info */}
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.event}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Create Amazing Memories?
            </h3>
            <p className="text-gray-600 mb-6">
              Join our family of satisfied clients and let us capture your special moments with the same passion and professionalism.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200"
              >
                Book Your Session
              </button>
              <button 
                onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
                className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-md font-medium transition-all duration-200"
              >
                View More Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
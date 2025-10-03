import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { toast } from "../hooks/use-toast";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, Send, Building2, ArrowRight } from "lucide-react";
import { contentAPI, inquiriesAPI, organizeContent } from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission with loading state
    setTimeout(() => {
      toast({
        title: "Inquiry Submitted Successfully!",
        description: "Thank you for your interest. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: photographerInfo.phone,
      action: `tel:${photographerInfo.phone}`,
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      value: photographerInfo.email,
      action: `mailto:${photographerInfo.email}`,
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "@d.s.p.films",
      action: photographerInfo.social.instagram,
      color: "from-pink-600 to-purple-600"
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/40 to-black"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-white/10 backdrop-blur-lg mb-6">
            <span className="text-sm font-medium text-cyan-300">Contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Let's Capture Your Moments
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to book your photography session? Get in touch with us and let's discuss how we can make your vision come to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods - Left Column */}
          <div className="space-y-6">
            {/* Quick Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <a
                    key={index}
                    href={method.action}
                    target={method.title === 'Instagram' ? '_blank' : '_self'}
                    rel={method.title === 'Instagram' ? 'noopener noreferrer' : ''}
                    className="group block"
                  >
                    <div className="relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">{method.title}</div>
                          <div className="text-gray-400 text-sm">{method.value}</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200 ml-auto" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Office Address */}
            <Card className="border-0 bg-transparent">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-white flex items-center">
                  <Building2 className="w-5 h-5 mr-3 text-cyan-400" />
                  Office Address
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Visit our studio for consultations
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3 text-gray-300">
                  <div className="text-sm leading-relaxed">
                    {photographerInfo.officeAddress}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                    <span>{photographerInfo.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border-0 bg-transparent">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-cyan-400" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Inquiry Response</span>
                  <span className="text-white font-medium">Within 24 hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Consultation</span>
                  <span className="text-white font-medium">Same day</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Booking</span>
                  <span className="text-white font-medium">Flexible timings</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form - Right Columns */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-transparent">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl"></div>
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-3xl font-bold text-white mb-2">
                  Book Your Session
                </CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  Fill out the form below and we'll get back to you with a personalized quote.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white font-medium">Full Name *</Label>
                      <Input 
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white font-medium">Email Address *</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white font-medium">Phone Number</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="eventType" className="text-white font-medium">Photography Type *</Label>
                      <Select onValueChange={(value) => handleInputChange('eventType', value)} required>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-cyan-400 focus:ring-cyan-400 rounded-xl h-12">
                          <SelectValue placeholder="Select photography type" className="text-gray-400" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          <SelectItem value="wedding">Wedding & Events</SelectItem>
                          <SelectItem value="prewedding">Pre-Wedding Photography</SelectItem>
                          <SelectItem value="maternity">Maternity Photography</SelectItem>
                          <SelectItem value="newborn">Newborn Photography</SelectItem>
                          <SelectItem value="commercial">Commercial Photography</SelectItem>
                          <SelectItem value="cinematic">Cinematic Photography</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eventDate" className="text-white font-medium">Preferred Date</Label>
                    <Input 
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => handleInputChange('eventDate', e.target.value)}
                      className="bg-white/10 border-white/20 text-white focus:border-cyan-400 focus:ring-cyan-400 rounded-xl h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white font-medium">Message</Label>
                    <Textarea 
                      id="message"
                      placeholder="Tell us more about your photography needs, vision, or any specific requirements..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={5}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <Send className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
                        </>
                      )}
                    </span>
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
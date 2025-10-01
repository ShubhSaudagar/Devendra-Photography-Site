import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { toast } from "../hooks/use-toast";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { photographerInfo } from "../data/mock";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: "Inquiry Submitted!",
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
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Let's Capture Your Moments
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to book your photography session? Get in touch with us and let's discuss how we can make your vision come to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  We'd love to hear from you. Choose your preferred method of contact.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-gray-600">{photographerInfo.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600">{photographerInfo.email}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Location</div>
                    <div className="text-gray-600">{photographerInfo.location}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Response Time</div>
                    <div className="text-gray-600">Within 24 hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Follow Our Work
                </CardTitle>
                <CardDescription>
                  Stay updated with our latest photography projects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a 
                    href={photographerInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-lg transition-colors duration-200"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href={photographerInfo.social.facebook}
                    className="p-3 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-lg transition-colors duration-200"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href={photographerInfo.social.youtube}
                    className="p-3 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-lg transition-colors duration-200"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Book Your Session
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you with a personalized quote.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Photography Type *</Label>
                      <Select onValueChange={(value) => handleInputChange('eventType', value)} required>
                        <SelectTrigger className="border-gray-300 focus:border-gray-900 focus:ring-gray-900">
                          <SelectValue placeholder="Select photography type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding & Events</SelectItem>
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
                    <Label htmlFor="eventDate">Preferred Date</Label>
                    <Input 
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => handleInputChange('eventDate', e.target.value)}
                      className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message"
                      placeholder="Tell us more about your photography needs, vision, or any specific requirements..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={5}
                      className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-lg font-medium"
                  >
                    Send Inquiry
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
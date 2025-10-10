import React, { useState, useEffect } from "react";
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
    phone: '',
    eventType: '',
    eventDate: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await contentAPI.getAll();
        const organizedContent = organizeContent(response.data);
        setSiteContent(organizedContent);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Get photographer info from site content with defaults
  const photographerInfo = {
    name: siteContent.contact?.name || "Devendra S. Shinde",
    brandName: siteContent.hero?.brand_name || "D.S.P.Film's",
    phone: siteContent.contact?.phone || "+91 8308398378",
    location: siteContent.contact?.location || "Ahilyanagar City, Maharashtra, India",
    officeAddress: siteContent.contact?.office_address || "1st floor, above Ola EV showroom, opp. Shilpa Garden, Nagar - Pune Highway, Ahilyanagar - 414001",
    social: {
      instagram: siteContent.social?.instagram || "https://www.instagram.com/d.s.p.films/",
      facebook: siteContent.social?.facebook || "#",
      youtube: siteContent.social?.youtube || "#"
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Real form submission to API
      await inquiriesAPI.create(formData);
      
      toast({
        title: "Inquiry Submitted Successfully!",
        description: "Thank you for your interest. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        eventType: '',
        eventDate: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: photographerInfo.phone,
      action: `tel:${photographerInfo.phone}`,
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
        </svg>
      ),
      title: "WhatsApp",
      value: "Quick Message",
      action: "https://wa.me/+918308398378",
      color: "from-green-600 to-emerald-600"
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
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
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
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "../hooks/use-toast";
import { Toaster } from "../components/ui/toaster";
import { 
  Upload, 
  Edit, 
  Trash2, 
  Plus, 
  Camera, 
  Package, 
  Users, 
  MessageSquare, 
  Home 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { photographerInfo, packages, testimonials, portfolio } from "../data/mock";
import ThemeManager from "../components/admin/ThemeManager";

const AdminPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({
    // Portfolio form
    title: '',
    category: '',
    image: '',
    // Package form
    packageName: '',
    price: '',
    duration: '',
    features: '',
    category: 'wedding'
  });

  // Mock stats
  const stats = [
    { label: "Total Inquiries", value: "24", icon: MessageSquare, trend: "+12%" },
    { label: "Active Packages", value: "6", icon: Package, trend: "+2" },
    { label: "Portfolio Images", value: "48", icon: Camera, trend: "+8" },
    { label: "Happy Clients", value: "200+", icon: Users, trend: "+15" }
  ];

  const recentInquiries = [
    { name: "Priya Sharma", service: "Wedding Photography", date: "2025-01-26", status: "New" },
    { name: "Rahul Patil", service: "Commercial Photography", date: "2025-01-25", status: "Responded" },
    { name: "Anita Desai", service: "Maternity Photography", date: "2025-01-24", status: "Booked" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePortfolioSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Portfolio Item Added!",
      description: "New portfolio item has been successfully added.",
    });
    setFormData({ title: '', category: '', image: '' });
  };

  const handlePackageSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Package Updated!",
      description: "Photography package has been successfully updated.",
    });
    setFormData({ packageName: '', price: '', duration: '', features: '', category: 'wedding' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Camera className="w-8 h-8 text-gray-900" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            </div>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Website</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-xs text-green-600">{stat.trend} from last month</p>
                        </div>
                        <IconComponent className="w-8 h-8 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                  <CardDescription>Latest client inquiries and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentInquiries.map((inquiry, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{inquiry.name}</p>
                          <p className="text-sm text-gray-600">{inquiry.service}</p>
                          <p className="text-xs text-gray-500">{inquiry.date}</p>
                        </div>
                        <Badge variant={inquiry.status === 'New' ? 'destructive' : inquiry.status === 'Responded' ? 'default' : 'secondary'}>
                          {inquiry.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your photography business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => setActiveTab('portfolio')}
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Portfolio Image
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('packages')}
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Update Packages
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('inquiries')}
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View All Inquiries
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add New Portfolio Item */}
              <Card>
                <CardHeader>
                  <CardTitle>Add Portfolio Image</CardTitle>
                  <CardDescription>Upload new images to your portfolio gallery</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePortfolioSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Image Title</Label>
                      <Input 
                        id="title"
                        placeholder="Enter image title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => handleInputChange('category', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding & Events</SelectItem>
                          <SelectItem value="cinematic">Cinematic</SelectItem>
                          <SelectItem value="newborn">Newborn & Maternity</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image">Image Upload</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Add to Portfolio
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Current Portfolio */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Portfolio</CardTitle>
                  <CardDescription>Manage existing portfolio images</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {Object.entries(portfolio).map(([category, images]) => (
                      <div key={category}>
                        <h4 className="font-medium text-gray-900 capitalize mb-2">{category}</h4>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {images.slice(0, 4).map((item) => (
                            <div key={item.id} className="relative group">
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-20 object-cover rounded"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Package Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Update Package</CardTitle>
                  <CardDescription>Modify pricing and features for your photography packages</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePackageSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="packageName">Package Name</Label>
                        <Input 
                          id="packageName"
                          placeholder="e.g., Premium Wedding"
                          value={formData.packageName}
                          onChange={(e) => handleInputChange('packageName', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input 
                          id="price"
                          placeholder="e.g., 90,000"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input 
                          id="duration"
                          placeholder="e.g., Full Day"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="packageCategory">Category</Label>
                        <Select onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="maternity">Maternity</SelectItem>
                            <SelectItem value="newborn">Newborn</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="features">Package Features</Label>
                      <Textarea 
                        id="features"
                        placeholder="Enter features separated by commas"
                        value={formData.features}
                        onChange={(e) => handleInputChange('features', e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Update Package
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Current Packages */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Packages</CardTitle>
                  <CardDescription>Overview of all your photography packages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {packages.map((pkg) => (
                      <div key={pkg.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                          <Badge variant={pkg.popular ? 'default' : 'secondary'}>
                            {pkg.popular ? 'Popular' : 'Standard'}
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mb-2">{pkg.price}</p>
                        <p className="text-sm text-gray-600 mb-2">{pkg.duration}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Inquiries</CardTitle>
                <CardDescription>Manage all photography inquiries and bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock inquiries */}
                  {[
                    { name: "Priya Sharma", email: "priya@example.com", service: "Wedding Photography", date: "2025-02-15", message: "Looking for wedding photography for our ceremony in Pune." },
                    { name: "Rahul Patil", email: "rahul@example.com", service: "Commercial Photography", date: "2025-02-20", message: "Need product photography for our new startup." },
                    { name: "Anita Desai", email: "anita@example.com", service: "Maternity Photography", date: "2025-02-25", message: "Interested in a maternity photoshoot." }
                  ].map((inquiry, index) => (
                    <div key={index} className="p-6 border rounded-lg space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{inquiry.name}</h4>
                          <p className="text-sm text-gray-600">{inquiry.email}</p>
                          <Badge className="mt-2">{inquiry.service}</Badge>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <p>Event Date: {inquiry.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{inquiry.message}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Respond
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark as Read
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <ThemeManager />
          </TabsContent>
        </Tabs>
      </div>
      
      <Toaster />
    </div>
  );
};

export default AdminPortal;
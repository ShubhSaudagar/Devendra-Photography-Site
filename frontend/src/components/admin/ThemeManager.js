import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../../hooks/use-toast";
import { Upload, Palette, Type, Save } from "lucide-react";

const ThemeManager = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [currentLogo, setCurrentLogo] = useState("https://customer-assets.emergentagent.com/job_capture-moments-22/artifacts/gqst9x71_DSP%20logo.png");
  
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#9333ea", // purple-600
    secondaryColor: "#ec4899", // pink-600
    accentColor: "#06b6d4", // cyan-600
    fontFamily: "Inter",
    headerFont: "Playfair Display"
  });

  // Drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setLogoFile(file);
        // Create preview URL
        const reader = new FileReader();
        reader.onload = (event) => {
          setCurrentLogo(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload an image file (PNG, JPG, SVG)",
          variant: "destructive"
        });
      }
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setLogoFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          setCurrentLogo(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload an image file (PNG, JPG, SVG)",
          variant: "destructive"
        });
      }
    }
  };

  const saveLogo = async () => {
    // Mock save - in real implementation, this would upload to server
    toast({
      title: "Logo Updated",
      description: "Logo has been successfully updated"
    });
  };

  const saveTheme = async () => {
    // Mock save - in real implementation, this would update CSS variables
    document.documentElement.style.setProperty('--primary-color', themeSettings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', themeSettings.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', themeSettings.accentColor);
    
    toast({
      title: "Theme Updated",
      description: "Theme colors have been applied successfully"
    });
  };

  const presetThemes = [
    { name: "Purple Pink", primary: "#9333ea", secondary: "#ec4899", accent: "#06b6d4" },
    { name: "Blue Cyan", primary: "#2563eb", secondary: "#06b6d4", accent: "#8b5cf6" },
    { name: "Green Emerald", primary: "#059669", secondary: "#10b981", accent: "#f59e0b" },
    { name: "Red Orange", primary: "#dc2626", secondary: "#ea580c", accent: "#06b6d4" },
    { name: "Monochrome", primary: "#374151", secondary: "#6b7280", accent: "#f59e0b" }
  ];

  const applyPreset = (preset) => {
    setThemeSettings(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    }));
  };

  return (
    <div className="space-y-6">
      {/* Logo Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Logo Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Logo Preview */}
          <div className="text-center">
            <Label className="text-sm font-medium mb-2 block">Current Logo</Label>
            <div className="inline-block p-4 bg-gray-100 rounded-lg">
              <img src={currentLogo} alt="Current Logo" className="h-16 w-auto object-contain" />
            </div>
          </div>

          {/* Drag and Drop Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag and drop your logo here
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or click to browse files
            </p>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileInput}
            />
            <Button variant="outline" className="pointer-events-none">
              Choose File
            </Button>
          </div>

          {logoFile && (
            <Button onClick={saveLogo} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Logo
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Theme Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Color Theme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Primary Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={themeSettings.primaryColor}
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-16 h-10 p-1 border rounded cursor-pointer"
                />
                <Input
                  type="text"
                  value={themeSettings.primaryColor}
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Secondary Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={themeSettings.secondaryColor}
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="w-16 h-10 p-1 border rounded cursor-pointer"
                />
                <Input
                  type="text"
                  value={themeSettings.secondaryColor}
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Accent Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={themeSettings.accentColor}
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                  className="w-16 h-10 p-1 border rounded cursor-pointer"
                />
                <Input
                  type="text"
                  value={themeSettings.accentColor}
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Preset Themes */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Preset Themes</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {presetThemes.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="p-3 rounded-lg border hover:border-gray-400 transition-colors text-center"
                >
                  <div className="flex space-x-1 mb-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.primary }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.secondary }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.accent }}
                    ></div>
                  </div>
                  <div className="text-xs font-medium">{preset.name}</div>
                </button>
              ))}
            </div>
          </div>

          <Button onClick={saveTheme} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Apply Theme
          </Button>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Typography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Body Font</Label>
              <select 
                className="w-full p-2 border rounded-md"
                value={themeSettings.fontFamily}
                onChange={(e) => setThemeSettings(prev => ({ ...prev, fontFamily: e.target.value }))}
              >
                <option value="Inter">Inter (Modern Sans-serif)</option>
                <option value="Roboto">Roboto (Clean Sans-serif)</option>
                <option value="Open Sans">Open Sans (Friendly Sans-serif)</option>
                <option value="Playfair Display">Playfair Display (Elegant Serif)</option>
                <option value="Lora">Lora (Reading Serif)</option>
                <option value="Montserrat">Montserrat (Geometric Sans-serif)</option>
              </select>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Header Font</Label>
              <select 
                className="w-full p-2 border rounded-md"
                value={themeSettings.headerFont}
                onChange={(e) => setThemeSettings(prev => ({ ...prev, headerFont: e.target.value }))}
              >
                <option value="Playfair Display">Playfair Display (Elegant Serif)</option>
                <option value="Merriweather">Merriweather (Strong Serif)</option>
                <option value="Montserrat">Montserrat (Bold Sans-serif)</option>
                <option value="Oswald">Oswald (Impact Sans-serif)</option>
                <option value="Crimson Text">Crimson Text (Classic Serif)</option>
                <option value="Inter">Inter (Clean Sans-serif)</option>
              </select>
            </div>
          </div>

          <Button 
            onClick={() => {
              document.body.style.fontFamily = themeSettings.fontFamily;
              toast({
                title: "Fonts Updated",
                description: "Typography changes have been applied"
              });
            }}
            className="w-full"
          >
            <Save className="w-4 h-4 mr-2" />
            Apply Typography
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeManager;
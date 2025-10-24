import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Key, Eye, EyeOff } from 'lucide-react';

const SettingsView = () => {
  const [settings, setSettings] = useState({
    groqApiKey: '',
    geminiApiKey: '',
    facebookPixelId: '',
    googleAnalyticsId: '',
    googleTagManagerId: '',
    enableFacebookPixel: false,
    enableGoogleAnalytics: false,
    enableGoogleTagManager: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showGroqKey, setShowGroqKey] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  
  const API_URL = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/settings`, { withCredentials: true });
      setSettings(response.data.settings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${API_URL}/api/admin/settings`, settings, { withCredentials: true });
      alert('Settings saved successfully!');
      setSaving(false);
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save settings');
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your admin panel and AI integration settings</p>
      </div>

      {/* AI Integration Settings */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Key size={20} className="text-purple-400" />
          AI Provider API Keys
        </h2>
        <div className="space-y-4">
          {/* Groq API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Groq API Key (Primary)
            </label>
            <div className="relative">
              <input
                type={showGroqKey ? 'text' : 'password'}
                value={settings.groqApiKey || ''}
                onChange={(e) => handleChange('groqApiKey', e.target.value)}
                placeholder="Enter Groq API key"
                className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none pr-12"
              />
              <button
                onClick={() => setShowGroqKey(!showGroqKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showGroqKey ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Used for content generation, captions, and ad copy</p>
          </div>

          {/* Gemini API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gemini API Key (Fallback)
            </label>
            <div className="relative">
              <input
                type={showGeminiKey ? 'text' : 'password'}
                value={settings.geminiApiKey || ''}
                onChange={(e) => handleChange('geminiApiKey', e.target.value)}
                placeholder="Enter Gemini API key"
                className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none pr-12"
              />
              <button
                onClick={() => setShowGeminiKey(!showGeminiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showGeminiKey ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Automatically used when Groq quota ends</p>
          </div>
        </div>
      </div>

      {/* Marketing Scripts */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Marketing Integration</h2>
        <div className="space-y-4">
          {/* Facebook Pixel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">Facebook Pixel</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableFacebookPixel}
                  onChange={(e) => handleChange('enableFacebookPixel', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <input
              type="text"
              value={settings.facebookPixelId || ''}
              onChange={(e) => handleChange('facebookPixelId', e.target.value)}
              placeholder="Enter Facebook Pixel ID"
              className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none"
              disabled={!settings.enableFacebookPixel}
            />
          </div>

          {/* Google Analytics */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">Google Analytics 4</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableGoogleAnalytics}
                  onChange={(e) => handleChange('enableGoogleAnalytics', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <input
              type="text"
              value={settings.googleAnalyticsId || ''}
              onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
              placeholder="Enter GA4 Measurement ID (G-XXXXXXXXXX)"
              className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none"
              disabled={!settings.enableGoogleAnalytics}
            />
          </div>

          {/* Google Tag Manager */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">Google Tag Manager</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableGoogleTagManager}
                  onChange={(e) => handleChange('enableGoogleTagManager', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <input
              type="text"
              value={settings.googleTagManagerId || ''}
              onChange={(e) => handleChange('googleTagManagerId', e.target.value)}
              placeholder="Enter GTM Container ID (GTM-XXXXXXX)"
              className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none"
              disabled={!settings.enableGoogleTagManager}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:opacity-90 transition flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
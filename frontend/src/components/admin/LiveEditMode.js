import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

const LiveEditMode = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState({});
  const [changes, setChanges] = useState({});
  const [saving, setSaving] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [selectedColor, setSelectedColor] = useState('#1a1a1a');

  // Predefined options (no arbitrary CSS)
  const fontOptions = [
    'Inter',
    'Roboto',
    'Montserrat',
    'Playfair Display',
    'Lora',
    'Open Sans'
  ];

  const colorOptions = [
    { name: 'Dark', value: '#1a1a1a' },
    { name: 'Primary', value: '#2c3e50' },
    { name: 'Accent', value: '#d4af37' },
    { name: 'Blue', value: '#3498db' },
    { name: 'Green', value: '#27ae60' },
    { name: 'Red', value: '#e74c3c' },
  ];

  // Load existing content
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await api.get('/api/site-content');
      const contentMap = {};
      response.data.forEach(item => {
        contentMap[`${item.section}.${item.key}`] = item.value;
      });
      setContent(contentMap);
    } catch (error) {
      showNotification('Failed to load content', 'error');
    }
  };

  // Auto-save every 30 seconds if there are changes
  useEffect(() => {
    if (!autoSave || Object.keys(changes).length === 0) return;

    const interval = setInterval(() => {
      handleSave();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoSave, changes]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleContentChange = (section, key, value) => {
    const changeKey = `${section}.${key}`;
    setChanges(prev => ({
      ...prev,
      [changeKey]: { section, key, value, type: 'text' }
    }));
  };

  const handleSave = async () => {
    if (Object.keys(changes).length === 0) {
      showNotification('No changes to save', 'info');
      return;
    }

    setSaving(true);
    try {
      const updates = Object.values(changes);
      await api.post('/api/admin/content/batch-update', { updates });
      
      showNotification(`Saved ${updates.length} changes successfully!`, 'success');
      setChanges({});
      await loadContent(); // Reload to confirm
    } catch (error) {
      showNotification(error.response?.data?.detail || 'Failed to save changes', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (section, key, file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/api/admin/media/upload', formData);
      const imageUrl = response.data.url;
      handleContentChange(section, key, imageUrl);
      showNotification('Image uploaded successfully!', 'success');
    } catch (error) {
      showNotification('Failed to upload image', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Live Edit Mode</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isEditing
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isEditing ? '✓ Editing' : 'Enable Editing'}
              </button>
              
              <button
                onClick={() => setAutoSave(!autoSave)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  autoSave
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {autoSave ? '⚡ Auto-save ON' : 'Auto-save OFF'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {Object.keys(changes).length} unsaved change{Object.keys(changes).length !== 1 && 's'}
            </span>
            
            <button
              onClick={handleSave}
              disabled={saving || Object.keys(changes).length === 0}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex gap-4 p-6">
          {/* Editor Panel */}
          <div className="w-1/3 bg-gray-50 rounded-xl p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Content Editor</h3>
            
            {/* Style Controls */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Family
                </label>
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {fontOptions.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Color
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`px-3 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === color.value
                          ? 'border-indigo-600 ring-2 ring-indigo-200'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value, color: '#fff' }}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-4">
              <EditableField
                label="Hero Heading"
                section="hero"
                fieldKey="heading"
                value={content['hero.heading'] || 'Capturing Life\'s Beautiful Moments'}
                isEditing={isEditing}
                onChange={handleContentChange}
                multiline={false}
              />

              <EditableField
                label="Hero Subheading"
                section="hero"
                fieldKey="subheading"
                value={content['hero.subheading'] || 'Professional Photography & Videography'}
                isEditing={isEditing}
                onChange={handleContentChange}
                multiline={false}
              />

              <EditableField
                label="About Text"
                section="about"
                fieldKey="description"
                value={content['about.description'] || 'Professional photographer specializing in weddings and events'}
                isEditing={isEditing}
                onChange={handleContentChange}
                multiline={true}
              />

              <ImageUploadField
                label="Hero Background"
                section="hero"
                fieldKey="background_image"
                value={content['hero.background_image']}
                isEditing={isEditing}
                onUpload={handleImageUpload}
              />

              <ImageUploadField
                label="Logo"
                section="header"
                fieldKey="logo"
                value={content['header.logo']}
                isEditing={isEditing}
                onUpload={handleImageUpload}
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="flex-1 bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-gray-600 ml-2">Live Preview</span>
            </div>
            
            <div className="h-full overflow-y-auto p-8" style={{ fontFamily: selectedFont }}>
              {/* Preview Content */}
              <div className="space-y-8">
                {/* Hero Section Preview */}
                <div
                  className="relative rounded-xl overflow-hidden p-12 text-center"
                  style={{
                    backgroundImage: content['hero.background_image'] 
                      ? `url(${content['hero.background_image']})` 
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="relative z-10">
                    <h1
                      className="text-5xl font-bold mb-4"
                      style={{ color: selectedColor }}
                    >
                      {changes['hero.heading']?.value || content['hero.heading'] || 'Capturing Life\'s Beautiful Moments'}
                    </h1>
                    <p className="text-xl text-white/90">
                      {changes['hero.subheading']?.value || content['hero.subheading'] || 'Professional Photography & Videography'}
                    </p>
                  </div>
                </div>

                {/* About Section Preview */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h2 className="text-3xl font-bold mb-4" style={{ color: selectedColor }}>
                    About
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {changes['about.description']?.value || content['about.description'] || 'Professional photographer specializing in weddings and events'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
                notification.type === 'success' ? 'bg-green-600' :
                notification.type === 'error' ? 'bg-red-600' :
                'bg-blue-600'
              } text-white`}
            >
              {notification.type === 'success' && '✓'}
              {notification.type === 'error' && '✕'}
              {notification.type === 'info' && 'ℹ'}
              <span>{notification.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Editable Field Component
const EditableField = ({ label, section, fieldKey, value, isEditing, onChange, multiline }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(section, fieldKey, newValue);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={localValue}
          onChange={handleChange}
          disabled={!isEditing}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg ${
            isEditing
              ? 'border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              : 'border-gray-300 bg-gray-50 cursor-not-allowed'
          }`}
        />
      ) : (
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          disabled={!isEditing}
          className={`w-full px-3 py-2 border rounded-lg ${
            isEditing
              ? 'border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              : 'border-gray-300 bg-gray-50 cursor-not-allowed'
          }`}
        />
      )}
    </div>
  );
};

// Image Upload Field Component
const ImageUploadField = ({ label, section, fieldKey, value, isEditing, onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(section, fieldKey, file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {value && (
        <div className="mb-2">
          <img src={value} alt={label} className="w-full h-32 object-cover rounded-lg" />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={!isEditing}
        className={`w-full px-3 py-2 border border-dashed rounded-lg ${
          isEditing
            ? 'border-indigo-500 hover:border-indigo-600 cursor-pointer'
            : 'border-gray-300 bg-gray-50 cursor-not-allowed'
        }`}
      />
    </div>
  );
};

export default LiveEditMode;

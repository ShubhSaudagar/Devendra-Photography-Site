import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Save, X, ExternalLink } from 'lucide-react';

const PackagesManager = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'WEDDING',
    price: 0,
    features: [],
    terms: [],
    ctaText: 'Book Now',
    waNumber: '918308398378',
    waMessageTemplate: ''
  });
  
  const API_URL = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;
  
  const categories = [
    { value: 'WEDDING', label: 'Wedding' },
    { value: 'PRE-WEDDING', label: 'Pre-Wedding' },
    { value: 'MATERNITY_NEWBORN_FAMILY', label: 'Maternity | NewBorn & Family' }
  ];
  
  useEffect(() => {
    fetchPackages();
  }, []);
  
  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/packages`);
      setPackages(response.data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const packageData = {
      ...formData,
      price: parseInt(formData.price),
      waMessageTemplate: formData.waMessageTemplate || `Hi, I'm interested in the "${formData.title}" package.`
    };
    
    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/api/admin/packages/${editingId}`,
          packageData,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${API_URL}/api/admin/packages`,
          packageData,
          { withCredentials: true }
        );
      }
      
      resetForm();
      fetchPackages();
    } catch (error) {
      console.error('Error saving package:', error);
      alert(error.response?.data?.detail || 'Failed to save package');
    }
  };
  
  const handleEdit = (pkg) => {
    setEditingId(pkg._id);
    setFormData({
      title: pkg.title,
      subtitle: pkg.subtitle,
      category: pkg.category,
      price: pkg.price,
      features: pkg.features || [],
      terms: pkg.terms || [],
      ctaText: pkg.ctaText || 'Book Now',
      waNumber: pkg.waNumber || '918308398378',
      waMessageTemplate: pkg.waMessageTemplate || ''
    });
    setShowForm(true);
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    
    try {
      await axios.delete(
        `${API_URL}/api/admin/packages/${id}`,
        { withCredentials: true }
      );
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package');
    }
  };
  
  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      title: '',
      subtitle: '',
      category: 'WEDDING',
      price: 0,
      features: [],
      terms: [],
      ctaText: 'Book Now',
      waNumber: '918308398378',
      waMessageTemplate: ''
    });
  };
  
  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };
  
  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };
  
  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };
  
  const addTerm = () => {
    setFormData({
      ...formData,
      terms: [...formData.terms, '']
    });
  };
  
  const updateTerm = (index, value) => {
    const newTerms = [...formData.terms];
    newTerms[index] = value;
    setFormData({ ...formData, terms: newTerms });
  };
  
  const removeTerm = (index) => {
    setFormData({
      ...formData,
      terms: formData.terms.filter((_, i) => i !== index)
    });
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white">Loading packages...</div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Packages Manager</h1>
          <p className="text-purple-300">Create and manage photography packages</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:opacity-90 transition"
        >
          <Plus size={20} />
          Add Package
        </button>
      </div>
      
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gradient-to-br from-purple-900/90 via-black/90 to-blue-900/90 backdrop-blur-xl rounded-2xl p-8 max-w-3xl w-full border border-white/20 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? 'Edit Package' : 'Create New Package'}
              </h2>
              <button onClick={resetForm} className="text-white/60 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Wedding Package - Basic"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Subtitle *</label>
                  <input
                    type="text"
                    required
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Perfect for essential wedding coverage"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value} className="bg-gray-900">
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="50000"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white/80 text-sm font-medium">Features *</label>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    + Add Feature
                  </button>
                </div>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Feature description"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white/80 text-sm font-medium">Terms & Conditions *</label>
                  <button
                    type="button"
                    onClick={addTerm}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    + Add Term
                  </button>
                </div>
                {formData.terms.map((term, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={term}
                      onChange={(e) => updateTerm(index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Term or condition"
                    />
                    <button
                      type="button"
                      onClick={() => removeTerm(index)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">CTA Button Text</label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Book Now"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">WhatsApp Number</label>
                  <input
                    type="text"
                    value={formData.waNumber}
                    onChange={(e) => setFormData({ ...formData, waNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="918308398378"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">WhatsApp Message Template</label>
                <textarea
                  rows={3}
                  value={formData.waMessageTemplate}
                  onChange={(e) => setFormData({ ...formData, waMessageTemplate: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={`Hi, I'm interested in the "${formData.title}" package.`}
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:opacity-90 transition"
                >
                  <Save size={20} />
                  {editingId ? 'Update Package' : 'Create Package'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-purple-500/50 transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{pkg.title}</h3>
                <p className="text-purple-300 text-sm">{pkg.subtitle}</p>
              </div>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                {categories.find(c => c.value === pkg.category)?.label || pkg.category}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="text-3xl font-bold text-white mb-2">
                ₹ {pkg.price.toLocaleString('en-IN')}
              </div>
              
              {pkg.features && pkg.features.length > 0 && (
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-white/60 font-medium">Features:</p>
                  {pkg.features.slice(0, 3).map((feature, idx) => (
                    <p key={idx} className="text-sm text-white/80">• {feature}</p>
                  ))}
                  {pkg.features.length > 3 && (
                    <p className="text-sm text-purple-400">+{pkg.features.length - 3} more</p>
                  )}
                </div>
              )}
            </div>
            
            <a
              href={`https://wa.me/${pkg.waNumber}?text=${encodeURIComponent(pkg.waMessageTemplate || `Hi, I'm interested in the "${pkg.title}" package.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center w-full px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition mb-4"
            >
              <ExternalLink size={16} />
              Test WhatsApp CTA
            </a>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(pkg)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(pkg._id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {packages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60 mb-4">No packages found. Create your first package!</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:opacity-90 transition"
          >
            Create Package
          </button>
        </div>
      )}
    </div>
  );
};

export default PackagesManager;

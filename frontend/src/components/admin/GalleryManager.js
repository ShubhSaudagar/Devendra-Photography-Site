import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Plus, Trash2, Upload, X } from 'lucide-react';

const GalleryManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  
  const API_URL = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/portfolio`);
      setItems(response.data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    try {
      await axios.post(
        `${API_URL}/api/admin/gallery/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );
      
      setSelectedFile(null);
      setPreviewUrl(null);
      fetchGallery();
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error.response?.data?.detail || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await axios.delete(
        `${API_URL}/api/admin/gallery/${id}`,
        { withCredentials: true }
      );
      fetchGallery();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const cancelPreview = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gallery Manager</h1>
          <p className="text-purple-300">Upload and manage portfolio images</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:opacity-90 transition"
        >
          <Plus size={20} />
          Upload Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {previewUrl && (
        <div className="mb-8 bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Upload Preview</h3>
            <button onClick={cancelPreview} className="text-white/60 hover:text-white">
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-video rounded-lg overflow-hidden bg-black/50">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="text-white/80">
                <p className="text-sm mb-1">File: <span className="text-purple-300">{selectedFile?.name}</span></p>
                <p className="text-sm">Size: <span className="text-purple-300">{(selectedFile?.size / 1024 / 1024).toFixed(2)} MB</span></p>
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-white font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                <Upload size={20} />
                {uploading ? 'Uploading...' : 'Confirm Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-white text-center py-20">Loading gallery...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden border border-white/20 hover:border-purple-500/50 transition group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1 truncate">{item.title}</h3>
                <p className="text-purple-300 text-sm mb-3">{item.category}</p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && items.length === 0 && !previewUrl && (
        <div className="text-center py-12">
          <Upload size={48} className="mx-auto text-white/30 mb-4" />
          <p className="text-white/60 mb-4">No images in gallery. Upload your first image!</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:opacity-90 transition"
          >
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;

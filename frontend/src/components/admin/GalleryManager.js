import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit } from 'lucide-react';

const GalleryManager = ({ user }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  const API_URL = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/portfolio`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await axios.delete(`${API_URL}/api/portfolio/${id}`);
      fetchGallery();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Gallery Manager</h1>
        <button
          onClick={() => {setShowModal(true); setCurrentItem(null);}}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
        >
          <Plus size={20} />
          Add New Item
        </button>
      </div>

      {loading ? (
        <div className="text-white text-center py-20">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden border border-white/20">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-purple-300 text-sm mb-3">{item.category}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {setShowModal(true); setCurrentItem(item);}}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
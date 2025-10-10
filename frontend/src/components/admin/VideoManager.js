import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';

const VideoManager = ({ user }) => {
  const [videos, setVideos] = useState([]);
  const API_URL = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/videos`, { withCredentials: true });
      setVideos(response.data.videos || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Video Manager</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg">
          <Plus size={20} />
          Add Video
        </button>
      </div>
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 text-white">
        <p>Video management coming soon. Currently {videos.length} videos.</p>
      </div>
    </div>
  );
};

export default VideoManager;
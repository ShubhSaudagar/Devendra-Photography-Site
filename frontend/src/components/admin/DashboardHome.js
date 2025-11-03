import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Image, FileText, TrendingUp } from 'lucide-react';

const DashboardHome = ({ user }) => {
  const [stats, setStats] = useState({
    totalGallery: 0,
    totalBlog: 0,
    totalVideos: 0,
    totalInquiries: 0
  });
  
  const API_URL = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [gallery, blog, videos, inquiries] = await Promise.all([
        axios.get(`${API_URL}/api/portfolio`),
        axios.get(`${API_URL}/api/admin/blog`, { withCredentials: true }),
        axios.get(`${API_URL}/api/admin/videos`, { withCredentials: true }),
        axios.get(`${API_URL}/api/inquiries`)
      ]);
      
      setStats({
        totalGallery: gallery.data.length || 0,
        totalBlog: blog.data.blogs?.length || 0,
        totalVideos: videos.data.videos?.length || 0,
        totalInquiries: inquiries.data.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    { label: 'Gallery Items', value: stats.totalGallery, icon: Image, color: 'purple' },
    { label: 'Blog Posts', value: stats.totalBlog, icon: FileText, color: 'blue' },
    { label: 'Videos', value: stats.totalVideos, icon: TrendingUp, color: 'green' },
    { label: 'Inquiries', value: stats.totalInquiries, icon: Users, color: 'orange' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
        <p className="text-purple-300">Here's what's happening with your site</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                  <Icon className={`text-${stat.color}-400`} size={24} />
                </div>
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/admin/gallery" className="p-4 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition">
            <h3 className="font-semibold text-white mb-1">Add to Gallery</h3>
            <p className="text-sm text-purple-200">Upload new photos</p>
          </a>
          <a href="/admin/blog" className="p-4 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition">
            <h3 className="font-semibold text-white mb-1">Write Blog Post</h3>
            <p className="text-sm text-blue-200">Create new content</p>
          </a>
          <a href="/admin/videos" className="p-4 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition">
            <h3 className="font-semibold text-white mb-1">Add Video</h3>
            <p className="text-sm text-green-200">Upload new video</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
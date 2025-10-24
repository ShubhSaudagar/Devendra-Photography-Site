import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, Users, Image, FileText, Activity } from 'lucide-react';

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/analytics/stats`, { withCredentials: true });
      setStats(response.data.stats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const statCards = [
    { icon: TrendingUp, label: 'Total Views', value: stats?.totalViews || 0, color: 'purple' },
    { icon: Activity, label: 'Total Clicks', value: stats?.totalClicks || 0, color: 'blue' },
    { icon: Users, label: 'Total Inquiries', value: stats?.totalInquiries || 0, color: 'green' },
    { icon: Image, label: 'Media Items', value: 0, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with DSP Film's.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${card.color}-500/20`}>
                  <Icon className={`text-${card.color}-400`} size={24} />
                </div>
                <span className="text-xs text-gray-400">This week</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{card.value}</h3>
              <p className="text-sm text-gray-400">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Top Pages */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Top Pages</h2>
        {stats?.topPages && stats.topPages.length > 0 ? (
          <div className="space-y-3">
            {stats.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <span className="text-gray-300">{page._id || 'Homepage'}</span>
                <span className="text-purple-400 font-semibold">{page.count} views</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">No page view data available</p>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Activity size={20} className="text-purple-400" />
          Recent Activity
        </h2>
        <p className="text-gray-400 text-center py-8">Activity log will appear here</p>
      </div>
    </div>
  );
};

export default DashboardHome;
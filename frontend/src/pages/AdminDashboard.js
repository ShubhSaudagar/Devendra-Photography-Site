import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, Image, Video, Tag, FileText, Users, 
  Settings, Activity, TrendingUp, LogOut, Menu, X, Edit3
} from 'lucide-react';

// Import admin components (to be created)
import DashboardHome from '../components/admin/DashboardHome';
import GalleryManager from '../components/admin/GalleryManager';
import VideoManager from '../components/admin/VideoManager';
import BlogManager from '../components/admin/BlogManager';
import OffersManager from '../components/admin/OffersManager';
import PagesManager from '../components/admin/PagesManager';
import UserManager from '../components/admin/UserManager';
import AnalyticsView from '../components/admin/AnalyticsView';
import MarketingView from '../components/admin/MarketingView';
import SettingsView from '../components/admin/SettingsView';
import LiveEditMode from '../components/admin/LiveEditMode';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [liveEditMode, setLiveEditMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const API_URL = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/admin/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem('admin_user');
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/admin');
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'editor'] },
    { path: '/admin/gallery', icon: Image, label: 'Gallery', roles: ['admin', 'editor'] },
    { path: '/admin/videos', icon: Video, label: 'Videos', roles: ['admin', 'editor'] },
    { path: '/admin/blog', icon: FileText, label: 'Blog', roles: ['admin', 'editor'] },
    { path: '/admin/offers', icon: Tag, label: 'Offers', roles: ['admin', 'editor'] },
    { path: '/admin/pages', icon: FileText, label: 'Pages', roles: ['admin', 'editor'] },
    { path: '/admin/analytics', icon: TrendingUp, label: 'Analytics', roles: ['admin'] },
    { path: '/admin/marketing', icon: Activity, label: 'Marketing', roles: ['admin'] },
    { path: '/admin/users', icon: Users, label: 'Users', roles: ['admin'] },
    { path: '/admin/settings', icon: Settings, label: 'Settings', roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} z-40`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <div>
                  <h2 className="text-xl font-bold text-white">DSP Film's</h2>
                  <p className="text-sm text-purple-300">Admin Panel</p>
                </div>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-white/10">
            {sidebarOpen && (
              <div className="mb-3 px-4 py-2 bg-white/5 rounded-lg">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-purple-300">{user.role}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition"
            >
              <LogOut size={20} />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header with Live Edit Toggle */}
        <div className="sticky top-0 z-30 bg-gradient-to-r from-gray-900/95 to-purple-900/95 backdrop-blur-xl border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              {location.pathname.replace('/admin/', '').replace('-', ' ').toUpperCase() || 'DASHBOARD'}
            </h1>
            
            <button
              onClick={() => setLiveEditMode(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Edit3 size={20} />
              <span>Live Edit Mode</span>
            </button>
          </div>
        </div>

        <div className="p-8">
          <Routes>
            <Route path="/" element={<DashboardHome user={user} />} />
            <Route path="/gallery" element={<GalleryManager user={user} />} />
            <Route path="/videos" element={<VideoManager user={user} />} />
            <Route path="/blog" element={<BlogManager user={user} />} />
            <Route path="/offers" element={<OffersManager user={user} />} />
            <Route path="/pages" element={<PagesManager user={user} />} />
            <Route path="/analytics" element={<AnalyticsView user={user} />} />
            <Route path="/marketing" element={<MarketingView user={user} />} />
            <Route path="/users" element={<UserManager user={user} />} />
            <Route path="/settings" element={<SettingsView user={user} />} />
          </Routes>
        </div>
      </main>

      {/* Live Edit Mode Modal */}
      {liveEditMode && (
        <LiveEditMode onClose={() => setLiveEditMode(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;

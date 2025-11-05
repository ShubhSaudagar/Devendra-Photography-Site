import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, Image, Package, LogOut, Menu, X
} from 'lucide-react';

import DashboardHome from '../components/admin/DashboardHome';
import GalleryManager from '../components/admin/GalleryManager';
import PackagesManager from '../components/admin/PackagesManager';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/packages', icon: Package, label: 'Packages' },
    { path: '/admin/gallery', icon: Image, label: 'Gallery' },
  ];

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
            {menuItems.map((item) => {
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
        <div className="p-8">
          <Routes>
            <Route path="/" element={<DashboardHome user={user} />} />
            <Route path="/packages" element={<PackagesManager />} />
            <Route path="/gallery" element={<GalleryManager />} />
          </Routes>
        </div>
        
        {/* Footer */}
        <footer className="p-6 text-center border-t border-white/10">
          <p className="text-white/60 text-sm">
            © 2025 DSP Films. Developed by Shubh Saudagar.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;

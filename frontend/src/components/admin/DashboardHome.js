import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Package, Camera } from 'lucide-react';
import { portfolioAPI, packagesAPI } from '../../services/api';

const DashboardHome = ({ user }) => {
  const [stats, setStats] = useState({
    totalGallery: 0,
    totalPackages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [gallery, packages] = await Promise.all([
          portfolioAPI.getAll(),
          packagesAPI.getAll(),
        ]);
        setStats({
          totalGallery: gallery.data?.length || 0,
          totalPackages: packages.data?.length || 0,
        });
      } catch (error) {
        console.error('Stats fetch error:', error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Gallery Photos',
      value: stats.totalGallery,
      icon: Image,
      color: 'purple',
    },
    {
      label: 'Packages',
      value: stats.totalPackages,
      icon: Package,
      color: 'blue',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name || 'Admin'}! 👋
        </h1>
        <p className="text-purple-300">DSP Film's admin panel — manage your site here</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Icon className="text-purple-400" size={24} />
                </div>
                <span className="text-3xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions — FIXED paths */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions ⚡</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/dashboard/packages"
            className="p-5 bg-purple-500/20 rounded-xl hover:bg-purple-500/30 transition group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Package size={22} className="text-purple-300" />
              <h3 className="font-semibold text-white">Manage Packages</h3>
            </div>
            <p className="text-sm text-purple-200">Add, edit or delete photography packages</p>
          </Link>

          <Link
            to="/admin/dashboard/gallery"
            className="p-5 bg-blue-500/20 rounded-xl hover:bg-blue-500/30 transition group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Image size={22} className="text-blue-300" />
              <h3 className="font-semibold text-white">Manage Gallery</h3>
            </div>
            <p className="text-sm text-blue-200">Upload and delete portfolio photos</p>
          </Link>
        </div>
      </div>

      {/* Site link */}
      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Camera size={20} className="text-green-400" />
          <p className="text-white text-sm font-medium">View Live Site</p>
        </div>
        
          href="https://dspfilms.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition text-sm font-medium"
        >
          Open → dspfilms.com
        </a>
      </div>
    </div>
  );
};

export default DashboardHome;
```

---

## 🔑 Login Fail — Admin User Reset Karo!

Login fail ho raha hai kyunki MongoDB mein admin user ki details shayad reset ho gayi ya token mismatch hai. Ye karo:

**Browser mein ye URL open karo** (Render backend directly):
```
https://devendra-photography-site.onrender.com/api/admin/auth/setup
```

Agar 404 aaye toh Render Dashboard pe jao:

1. render.com → tera service → **Environment** tab
2. `EMERGENCY_RESET_KEY` ki value copy karo (jo tune set ki thi)
3. Fir browser mein:
```
https://devendra-photography-site.onrender.com/api/admin/emergency-reset?key=EMERGENCY_RESET_KEY_YAHAN_PASTE_KARO

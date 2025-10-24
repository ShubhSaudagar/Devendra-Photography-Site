import React from 'react';
import { TrendingUp, BarChart } from 'lucide-react';

const AnalyticsView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Track your website performance and engagement</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <TrendingUp className="text-purple-400" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">0</h3>
              <p className="text-sm text-gray-400">Total Visits</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-12 rounded-2xl border border-white/10 text-center">
        <BarChart size={64} className="mx-auto text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">Analytics Dashboard</h3>
        <p className="text-gray-500">Detailed charts and reports coming soon</p>
      </div>
    </div>
  );
};

export default AnalyticsView;
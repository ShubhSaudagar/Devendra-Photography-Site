import React from 'react';
import { Activity, Megaphone } from 'lucide-react';

const MarketingView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Marketing Automation</h1>
        <p className="text-gray-400">Manage tracking pixels and marketing integrations</p>
      </div>
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-12 rounded-2xl border border-white/10 text-center">
        <Megaphone size={64} className="mx-auto text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">Marketing Tools</h3>
        <p className="text-gray-500">Configure Facebook Pixel, GA4, and GTM in Settings</p>
      </div>
    </div>
  );
};

export default MarketingView;
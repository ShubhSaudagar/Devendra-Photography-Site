import React from 'react';
import { Plus } from 'lucide-react';

const OffersManager = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Offers Manager</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg">
          <Plus size={20} />
          New Offer
        </button>
      </div>
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 text-white">
        <p>Offers management coming soon</p>
      </div>
    </div>
  );
};

export default OffersManager;
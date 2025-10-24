import React from 'react';
import { FileText, Plus } from 'lucide-react';

const BlogManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blog Manager</h1>
          <p className="text-gray-400">Create and manage blog posts</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:opacity-90 transition flex items-center gap-2">
          <Plus size={20} /> New Post
        </button>
      </div>
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-12 rounded-2xl border border-white/10 text-center">
        <FileText size={64} className="mx-auto text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">Blog Content</h3>
        <p className="text-gray-500">Share your photography stories and tips</p>
      </div>
    </div>
  );
};

export default BlogManager;
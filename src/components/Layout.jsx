import React from 'react';
import Advertisement from './Advertisement';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 py-8">
          {/* 左侧推荐服务区域 */}
          <div className="w-64 shrink-0">
            <div className="sticky top-4 bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-bold mb-4">推荐服务</h2>
              <Advertisement />
            </div>
          </div>

          {/* 主要内容区域 */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout; 
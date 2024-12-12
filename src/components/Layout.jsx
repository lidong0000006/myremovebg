import React from 'react';
import Advertisement from './Advertisement';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="font-bold text-xl">RemoveBG</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">功能</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">商务办公</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">定价</a>
              <a href="#" className="text-blue-500 hover:text-blue-600">登录</a>
              <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                注册
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* 左侧推荐服务区域 */}
          <div className="w-64 shrink-0">
            <div className="sticky top-4 bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-bold mb-4">推荐服务</h2>
              <div className="space-y-4">
                <Advertisement />
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">专业图片编辑服务</h3>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">批量处理优惠</h3>
                </div>
              </div>
            </div>
          </div>

          {/* 主内容区域 */}
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
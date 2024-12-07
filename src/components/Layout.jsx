import React from 'react';
import Advertisement from './Advertisement';

const Layout = () => {
  return (
    <div className="flex">
      {/* 左侧推荐服务区域 */}
      <div className="w-1/4 min-w-[250px] p-4 border-r">
        <div className="sticky top-4">
          <h2 className="text-xl font-bold mb-4">推荐服务</h2>
          {/* 这里放置推荐服务的内容 */}
          <Advertisement />
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 p-4">
        {/* 您的主要内容 */}
      </div>
    </div>
  );
};

export default Layout; 
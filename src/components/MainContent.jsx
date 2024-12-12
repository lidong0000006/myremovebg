import React, { useState, useRef } from 'react';

const MainContent = () => {
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // 创建预览URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      {/* 标题部分 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">图片背景消除</h1>
        <p className="text-xl text-gray-600">100% 全自动且 免费</p>
      </div>

      {/* 图片上传区域 */}
      <div className="grid grid-cols-2 gap-6">
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h3 className="font-semibold mb-2">原始图片</h3>
          <div className="mt-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <button 
              onClick={handleUploadClick}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              上传图片
            </button>
            <p className="mt-2 text-sm text-gray-500">或者拖放一个文件</p>
            <p className="mt-1 text-sm text-gray-500">支持 JPG, PNG, WEBP 等常见格式</p>
            {previewUrl && (
              <div className="mt-4">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-w-full h-auto mx-auto rounded-lg"
                  style={{ maxHeight: '200px' }}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <h3 className="font-semibold mb-2">处理后的图片</h3>
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-500">选择背景颜色：</p>
            <input 
              type="color" 
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-20 h-10"
            />
          </div>
        </div>
      </div>

      {/* 特点说明 */}
      <div className="grid grid-cols-3 gap-8 mt-12">
        <div className="text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="font-bold mb-2">快速处理</h3>
          <p className="text-gray-600">5秒内完成背景去除</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="font-bold mb-2">精确识别</h3>
          <p className="text-gray-600">AI智能识别前景物体</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="font-bold mb-2">安全可靠</h3>
          <p className="text-gray-600">图片加密传输与存储</p>
        </div>
      </div>

      {/* 示例图片区域 */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-6">没有图片？试试这些样例</h3>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="border rounded-lg p-4 text-center">
              <div className="bg-gray-200 h-32 mb-2 rounded"></div>
              <button className="text-blue-500 hover:text-blue-600">
                点击使用
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent; 
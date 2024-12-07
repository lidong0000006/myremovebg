// Google AdSense 配置
(function() {
    // 等待 DOM 加载完成
    document.addEventListener('DOMContentLoaded', function() {
        // 初始化广告位
        initializeAds();
    });

    function initializeAds() {
        // 创建广告容器
        createAdContainers();
        
        // 如果需要动态加载更多广告位，可以在这里添加逻辑
    }

    function createAdContainers() {
        // 侧边栏广告位
        const sidebarAds = document.querySelectorAll('.ad-item');
        sidebarAds.forEach((adContainer, index) => {
            // 为每个广告位创建唯一ID
            adContainer.id = `sidebar-ad-${index + 1}`;
            
            // 清空现有内容
            adContainer.innerHTML = '';
            
            // 这里将插入 Google AdSense 代码
            // 实际使用时替换为你的 Google AdSense 代码
        });
    }
})();

import React, { useEffect } from 'react';

const Advertisement = () => {
  useEffect(() => {
    try {
      // 广告代码初始化
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('广告加载失败:', err);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
         data-ad-slot="YOUR_AD_SLOT_ID"
         data-ad-format="auto"
         data-full-width-responsive="true">
    </ins>
  );
};

export default Advertisement; 
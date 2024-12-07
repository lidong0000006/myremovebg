document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'kZyajyoVynW1kKERK7CtEdBs';
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const uploadButton = document.querySelector('.upload-button');

    // 点击上传按钮触发文件选择
    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    // 处理拖拽事件
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#007bff';
        dropZone.style.backgroundColor = '#f8f9fa';
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ccc';
        dropZone.style.backgroundColor = 'white';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ccc';
        dropZone.style.backgroundColor = 'white';
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // 处理文件选择
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files);
    });

    // 处理示例图片点击
    document.querySelectorAll('.example-card').forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('.example-img');
            handleExampleImage(img.src);
        });
    });

    function createImageComparisonSlider(originalSrc, processedSrc) {
        return `
            <div class="image-comparison">
                <div class="comparison-container">
                    <img src="${originalSrc}" alt="原图" class="original-image">
                    <img src="${processedSrc}" alt="处理后的图片" class="processed-image">
                </div>
                <div class="comparison-controls">
                    <button class="download-button">
                        <svg viewBox="0 0 24 24" class="download-icon">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
                        </svg>
                        下载图片
                    </button>
                    <button class="retry-button">重新上传</button>
                </div>
            </div>
        `;
    }

    function initializeComparisonSlider() {
        const container = document.querySelector('.comparison-container');
        const processedImage = document.querySelector('.processed-image');
        let isDragging = false;

        function updateSliderPosition(e) {
            if (!isDragging) return;
            const rect = container.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            processedImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
        }

        container.addEventListener('mousedown', () => {
            isDragging = true;
            document.body.style.cursor = 'col-resize';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDragging) {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                processedImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.cursor = 'default';
        });

        // 设置初始位置
        processedImage.style.clipPath = 'inset(0 0 0 50%)';
    }

    function handleExampleImage(imageSrc) {
        preview.innerHTML = `
            <div class="preview-image">
                <img src="${imageSrc}" alt="选中的示例图片">
                <div class="processing-message">
                    <p>正在处理图片...</p>
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        
        removeBackground(imageSrc);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const originalImageSrc = e.target.result;
                    preview.innerHTML = `
                        <div class="preview-image">
                            <img src="${originalImageSrc}" alt="上传的图片">
                            <div class="processing-message">
                                <p>正在处理图片...</p>
                                <div class="progress-bar"></div>
                            </div>
                        </div>
                    `;
                    
                    removeBackground(originalImageSrc);
                };
                reader.readAsDataURL(file);
            } else {
                showError('请上传图片文件！');
            }
        }
    }

    async function removeBackground(imageData) {
        const preview = document.getElementById('preview');
        const progressBar = document.querySelector('.progress-bar');
        
        try {
            // 准备图片数据
            const formData = new FormData();
            formData.append('image_file', dataURItoBlob(imageData));
            
            // 发送请求到Remove.bg API
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': API_KEY
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('背景去除失败');
            }

            // 获取处理后的图片
            const blob = await response.blob();
            const processedImageUrl = URL.createObjectURL(blob);

            // 显示对比滑块
            preview.innerHTML = createImageComparisonSlider(imageData, processedImageUrl);
            initializeComparisonSlider();

            // 添加下载和重试按钮的事件监听
            document.querySelector('.download-button').addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = processedImageUrl;
                link.download = 'processed-image.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });

            document.querySelector('.retry-button').addEventListener('click', () => {
                fileInput.click();
            });

        } catch (error) {
            showError('处理图片时出错：' + error.message);
        }
    }

    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        
        return new Blob([ab], { type: mimeString });
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        preview.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
});

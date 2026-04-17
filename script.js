// ==================== 关键修改位置3: 功能配置和数据 ====================
// 风格标签库 - 可以根据需要添加更多标签
const styleTags = [
    '极简主义', '现代简约', '北欧风格', '日式和风', '工业风', 
    '复古怀旧', '波普艺术', '赛博朋克', '蒸汽波', '孟菲斯风格',
    '扁平化', '拟物化', '3D立体', '手绘插画', '水彩风格',
    '国潮风', '新中式', '欧式古典', '哥特式', '巴洛克'
];

const layoutTags = [
    '居中对齐', '左对齐', '网格布局', '不对称布局', '留白充足',
    '满版构图', '分割式布局', '对角线构图', '三角形构图', 'S形构图',
    '层次感强', '扁平化布局', '卡片式设计', '单栏布局', '多栏布局'
];

const fontTags = [
    '无衬线字体', '衬线字体', '手写体', '艺术字体', '粗体字',
    '细体字', '等宽字体', '书法字体', '卡通字体', '复古字体'
];

const moodTags = [
    '清新自然', '温暖治愈', '冷静专业', '活力四射', '优雅高贵',
    '神秘深邃', '科技未来', '文艺复古', '可爱俏皮', '严肃庄重'
];

// 全局变量
let currentImageData = null;
let currentExtractedData = null;
let compareImage1Data = null;
let compareImage2Data = null;
let compareExtracted1 = null;
let compareExtracted2 = null;
let favorites = JSON.parse(localStorage.getItem('styleFavorites') || '[]');

// DOM元素
const elements = {
    // 导航
    navTabs: document.querySelectorAll('.nav-tab'),
    mobileNavTabs: document.querySelectorAll('.mobile-nav-tab'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    favCount: document.getElementById('fav-count'),
    
    // 页面
    pages: document.querySelectorAll('.page'),
    extractPage: document.getElementById('extract-page'),
    comparePage: document.getElementById('compare-page'),
    favoritesPage: document.getElementById('favorites-page'),
    
    // 提取功能
    uploadArea: document.getElementById('upload-area'),
    fileInput: document.getElementById('file-input'),
    imageUrl: document.getElementById('image-url'),
    loadUrlBtn: document.getElementById('load-url-btn'),
    previewContainer: document.getElementById('preview-container'),
    previewImage: document.getElementById('preview-image'),
    clearImageBtn: document.getElementById('clear-image-btn'),
    extractBtn: document.getElementById('extract-btn'),
    resultsContainer: document.getElementById('results-container'),
    
    // 结果展示
    colorsContainer: document.getElementById('colors-container'),
    colorValues: document.getElementById('color-values'),
    copyColorsBtn: document.getElementById('copy-colors-btn'),
    styleTags: document.getElementById('style-tags'),
    layoutTags: document.getElementById('layout-tags'),
    fontTags: document.getElementById('font-tags'),
    moodTags: document.getElementById('mood-tags'),
    promptText: document.getElementById('prompt-text'),
    copyPromptBtn: document.getElementById('copy-prompt-btn'),
    regeneratePromptBtn: document.getElementById('regenerate-prompt-btn'),
    addToFavBtn: document.getElementById('add-to-fav-btn'),
    
    // 对比功能
    compareUpload1: document.getElementById('compare-upload-1'),
    compareUpload2: document.getElementById('compare-upload-2'),
    compareFile1: document.getElementById('compare-file-1'),
    compareFile2: document.getElementById('compare-file-2'),
    comparePreview1: document.getElementById('compare-preview-1'),
    comparePreview2: document.getElementById('compare-preview-2'),
    compareImg1: document.getElementById('compare-img-1'),
    compareImg2: document.getElementById('compare-img-2'),
    extractCompare1: document.getElementById('extract-compare-1'),
    extractCompare2: document.getElementById('extract-compare-2'),
    compareResults: document.getElementById('compare-results'),
    compareResults1: document.getElementById('compare-results-1'),
    compareResults2: document.getElementById('compare-results-2'),
    compareSummary: document.getElementById('compare-summary'),
    
    // 收藏功能
    categoryBtns: document.querySelectorAll('.category-btn'),
    favoritesContainer: document.getElementById('favorites-container'),
    emptyFavorites: document.getElementById('empty-favorites'),
    clearAllFav: document.getElementById('clear-all-fav'),
    goToExtract: document.getElementById('go-to-extract'),
    
    // 通知
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message')
};

// 初始化
function init() {
    updateFavCount();
    setupEventListeners();
    checkFavoritesEmpty();
}

// 设置事件监听器
function setupEventListeners() {
    // 导航切换
    elements.navTabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.id.replace('tab-', '')));
    });
    
    elements.mobileNavTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.id.replace('mobile-tab-', ''));
            elements.mobileMenu.classList.add('hidden');
        });
    });
    
    elements.mobileMenuBtn.addEventListener('click', () => {
        elements.mobileMenu.classList.toggle('hidden');
    });
    
    // 图片上传
    elements.uploadArea.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', handleFileUpload);
    
    // 拖拽上传
    elements.uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.uploadArea.classList.add('border-primary');
    });
    
    elements.uploadArea.addEventListener('dragleave', () => {
        elements.uploadArea.classList.remove('border-primary');
    });
    
    elements.uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        elements.uploadArea.classList.remove('border-primary');
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    
    // URL加载
    elements.loadUrlBtn.addEventListener('click', loadImageFromUrl);
    elements.imageUrl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loadImageFromUrl();
    });
    
    // 清除图片
    elements.clearImageBtn.addEventListener('click', clearImage);
    
    // 提取风格
    elements.extractBtn.addEventListener('click', extractStyle);
    
    // 复制功能
    elements.copyColorsBtn.addEventListener('click', copyColors);
    elements.copyPromptBtn.addEventListener('click', copyPrompt);
    
    // 重新生成提示词
    elements.regeneratePromptBtn.addEventListener('click', regeneratePrompt);
    
    // 添加到收藏
    elements.addToFavBtn.addEventListener('click', addToFavorites);
    
    // 对比功能
    elements.compareUpload1.addEventListener('click', () => elements.compareFile1.click());
    elements.compareUpload2.addEventListener('click', () => elements.compareFile2.click());
    elements.compareFile1.addEventListener('change', (e) => handleCompareFile(e, 1));
    elements.compareFile2.addEventListener('change', (e) => handleCompareFile(e, 2));
    elements.extractCompare1.addEventListener('click', () => extractCompareStyle(1));
    elements.extractCompare2.addEventListener('click', () => extractCompareStyle(2));
    
    // 收藏功能
    elements.categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => filterFavorites(btn.dataset.category));
    });
    
    elements.clearAllFav.addEventListener('click', clearAllFavorites);
    elements.goToExtract.addEventListener('click', () => switchTab('extract'));
}

// 切换标签页
function switchTab(tabName) {
    // 更新导航状态
    elements.navTabs.forEach(tab => {
        tab.classList.remove('active', 'text-primary');
        tab.classList.add('text-neutral-400');
    });
    
    elements.mobileNavTabs.forEach(tab => {
        tab.classList.remove('active', 'text-primary');
        tab.classList.add('text-neutral-400');
    });
    
    document.getElementById(`tab-${tabName}`)?.classList.add('active', 'text-primary');
    document.getElementById(`mobile-tab-${tabName}`)?.classList.add('active', 'text-primary');
    
    // 显示对应页面
    elements.pages.forEach(page => page.classList.add('hidden'));
    document.getElementById(`${tabName}-page`).classList.remove('hidden');
    
    // 如果是收藏页，刷新收藏列表
    if (tabName === 'favorites') {
        renderFavorites();
    }
}

// 处理文件上传
function handleFileUpload(e) {
    if (e.target.files.length) {
        handleFile(e.target.files[0]);
    }
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        showToast('请上传图片文件', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        currentImageData = e.target.result;
        showPreview(currentImageData);
    };
    reader.readAsDataURL(file);
}

// 从URL加载图片
function loadImageFromUrl() {
    const url = elements.imageUrl.value.trim();
    if (!url) {
        showToast('请输入图片链接', 'error');
        return;
    }
    
    // 检查URL是否有效
    try {
        new URL(url);
    } catch {
        showToast('请输入有效的URL', 'error');
        return;
    }
    
    // 显示加载状态
    elements.loadUrlBtn.disabled = true;
    elements.loadUrlBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> 加载中';
    
    // 创建图片对象加载图片
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
        // 使用canvas转换为dataURL
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        currentImageData = canvas.toDataURL('image/jpeg', 0.9);
        
        showPreview(currentImageData);
        elements.loadUrlBtn.disabled = false;
        elements.loadUrlBtn.innerHTML = '加载';
    };
    
    img.onerror = () => {
        showToast('图片加载失败，请检查链接', 'error');
        elements.loadUrlBtn.disabled = false;
        elements.loadUrlBtn.innerHTML = '加载';
    };
    
    img.src = url;
}

// 显示图片预览
function showPreview(imageData) {
    elements.previewImage.src = imageData;
    elements.previewContainer.classList.remove('hidden');
    elements.extractBtn.disabled = false;
    elements.resultsContainer.classList.add('hidden');
}

// 清除图片
function clearImage() {
    currentImageData = null;
    currentExtractedData = null;
    elements.previewContainer.classList.add('hidden');
    elements.previewImage.src = '';
    elements.extractBtn.disabled = true;
    elements.resultsContainer.classList.add('hidden');
    elements.fileInput.value = '';
    elements.imageUrl.value = '';
}

// 提取视觉风格
function extractStyle() {
    if (!currentImageData) return;
    
    // 显示加载状态
    elements.extractBtn.disabled = true;
    elements.extractBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> 提取中...';
    
    // 模拟处理延迟，让用户有反馈
    setTimeout(() => {
        const img = new Image();
        img.onload = () => {
            // 提取颜色
            const colors = extractColors(img);
            
            // 分析风格（基于颜色和图像特征的简单分析）
            const styleAnalysis = analyzeStyle(colors, img);
            
            // 生成提示词
            const prompt = generatePrompt(colors, styleAnalysis);
            
            // 保存提取的数据
            currentExtractedData = {
                imageData: currentImageData,
                colors: colors,
                style: styleAnalysis,
                prompt: prompt,
                timestamp: Date.now()
            };
            
            // 显示结果
            displayResults(colors, styleAnalysis, prompt);
            
            elements.extractBtn.disabled = false;
            elements.extractBtn.innerHTML = '<i class="fa fa-magic mr-2"></i> 提取视觉风格';
            elements.resultsContainer.classList.remove('hidden');
            
            // 滚动到结果区域
            elements.resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        img.src = currentImageData;
    }, 800);
}

// 提取主要颜色
function extractColors(img, count = 5) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 缩小图片以提高性能
    const width = canvas.width = Math.min(img.width, 100);
    const height = canvas.height = Math.min(img.height, 100);
    
    ctx.drawImage(img, 0, 0, width, height);
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    
    // 统计颜色出现频率
    const colorCount = {};
    
    for (let i = 0; i < pixels.length; i += 4) {
        const r = Math.round(pixels[i] / 32) * 32;
        const g = Math.round(pixels[i + 1] / 32) * 32;
        const b = Math.round(pixels[i + 2] / 32) * 32;
        const a = pixels[i + 3];
        
        // 跳过透明像素
        if (a < 128) continue;
        
        const hex = rgbToHex(r, g, b);
        colorCount[hex] = (colorCount[hex] || 0) + 1;
    }
    
    // 排序并返回前count个颜色
    const sortedColors = Object.entries(colorCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, count)
        .map(entry => entry[0]);
    
    return sortedColors;
}

// RGB转HEX
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

// HEX转RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// 计算颜色亮度
function getBrightness(hex) {
    const rgb = hexToRgb(hex);
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}

// 分析风格
function analyzeStyle(colors, img) {
    // 基于颜色分析风格
    const brightness = colors.reduce((sum, color) => sum + getBrightness(color), 0) / colors.length;
    const isLight = brightness > 128;
    
    // 计算颜色饱和度（简化版）
    let saturation = 0;
    colors.forEach(color => {
        const rgb = hexToRgb(color);
        const max = Math.max(rgb.r, rgb.g, rgb.b);
        const min = Math.min(rgb.r, rgb.g, rgb.b);
        saturation += max === 0 ? 0 : (max - min) / max;
    });
    saturation /= colors.length;
    
    // 随机选择标签（实际应用中可以使用更复杂的算法）
    const getRandomTags = (tags, count) => {
        const shuffled = [...tags].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };
    
    // 根据颜色特征调整标签选择
    let styleTagsSelected, layoutTagsSelected, fontTagsSelected, moodTagsSelected;
    
    if (isLight && saturation < 0.4) {
        // 浅色低饱和度 - 极简/现代风格
        styleTagsSelected = ['极简主义', '现代简约', '北欧风格'].sort(() => 0.5 - Math.random()).slice(0, 2);
        layoutTagsSelected = ['留白充足', '居中对齐', '扁平化布局'].sort(() => 0.5 - Math.random()).slice(0, 2);
        fontTagsSelected = ['无衬线字体', '细体字'].sort(() => 0.5 - Math.random()).slice(0, 2);
        moodTagsSelected = ['清新自然', '冷静专业', '优雅高贵'].sort(() => 0.5 - Math.random()).slice(0, 2);
    } else if (saturation > 0.6) {
        // 高饱和度 - 活力/艺术风格
        styleTagsSelected = ['波普艺术', '孟菲斯风格', '赛博朋克'].sort(() => 0.5 - Math.random()).slice(0, 2);
        layoutTagsSelected = ['不对称布局', '满版构图', '层次感强'].sort(() => 0.5 - Math.random()).slice(0, 2);
        fontTagsSelected = ['粗体字', '艺术字体', '卡通字体'].sort(() => 0.5 - Math.random()).slice(0, 2);
        moodTagsSelected = ['活力四射', '科技未来', '可爱俏皮'].sort(() => 0.5 - Math.random()).slice(0, 2);
    } else {
        // 中等饱和度 - 通用风格
        styleTagsSelected = getRandomTags(styleTags, 2);
        layoutTagsSelected = getRandomTags(layoutTags, 2);
        fontTagsSelected = getRandomTags(fontTags, 2);
        moodTagsSelected = getRandomTags(moodTags, 2);
    }
    
    return {
        style: styleTagsSelected,
        layout: layoutTagsSelected,
        font: fontTagsSelected,
        mood: moodTagsSelected,
        brightness: isLight ? '明亮' : '深色',
        saturation: saturation < 0.3 ? '低饱和度' : saturation < 0.6 ? '中等饱和度' : '高饱和度'
    };
}

// 生成AI提示词
function generatePrompt(colors, styleAnalysis) {
    const colorStr = colors.join(', ');
    
    return `UI设计，${styleAnalysis.style.join('，')}风格，${styleAnalysis.mood.join('，')}的氛围，
主色调：${colorStr}，${styleAnalysis.brightness}色调，${styleAnalysis.saturation}，
采用${styleAnalysis.layout.join('和')}布局，
使用${styleAnalysis.font.join('和')}，
留白充足，视觉层次清晰，现代感强，高质量，细节丰富`;
}

// 显示提取结果
function displayResults(colors, styleAnalysis, prompt) {
    // 显示颜色
    elements.colorsContainer.innerHTML = '';
    elements.colorValues.innerHTML = '';
    
    colors.forEach((color, index) => {
        const brightness = getBrightness(color);
        const textColor = brightness > 128 ? 'text-neutral-500' : 'text-white';
        
        const swatch = document.createElement('div');
        swatch.className = `color-swatch h-16 rounded-lg cursor-pointer flex items-end justify-center pb-1 ${textColor} text-xs font-medium`;
        swatch.style.backgroundColor = color;
        swatch.textContent = color.toUpperCase();
        swatch.title = '点击复制色值';
        swatch.addEventListener('click', () => {
            copyToClipboard(color);
            showToast(`已复制 ${color}`);
        });
        elements.colorsContainer.appendChild(swatch);
        
        const valueItem = document.createElement('div');
        valueItem.className = 'flex justify-between';
        valueItem.innerHTML = `
            <span>主色${index + 1}</span>
            <span>${color.toUpperCase()}</span>
        `;
        elements.colorValues.appendChild(valueItem);
    });
    
    // 显示风格标签
    displayTags(elements.styleTags, styleAnalysis.style);
    displayTags(elements.layoutTags, styleAnalysis.layout);
    displayTags(elements.fontTags, styleAnalysis.font);
    displayTags(elements.moodTags, styleAnalysis.mood);
    
    // 显示提示词
    elements.promptText.value = prompt;
}

// 显示标签
function displayTags(container, tags) {
    container.innerHTML = '';
    tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.className = 'px-3 py-1 bg-neutral-50 text-neutral-400 rounded-full text-sm';
        tagEl.textContent = tag;
        container.appendChild(tagEl);
    });
}

// 复制颜色
function copyColors() {
    if (!currentExtractedData) return;
    
    const colorStr = currentExtractedData.colors.join(', ');
    copyToClipboard(colorStr);
    showToast('已复制所有色值');
}

// 复制提示词
function copyPrompt() {
    if (!currentExtractedData) return;
    
    copyToClipboard(currentExtractedData.prompt);
    showToast('已复制AI提示词');
}

// 重新生成提示词
function regeneratePrompt() {
    if (!currentExtractedData) return;
    
    const newPrompt = generatePrompt(
        currentExtractedData.colors, 
        analyzeStyle(currentExtractedData.colors, new Image())
    );
    
    currentExtractedData.prompt = newPrompt;
    elements.promptText.value = newPrompt;
    showToast('已重新生成提示词');
}

// 添加到收藏
function addToFavorites() {
    if (!currentExtractedData) return;
    
    // 检查是否已经收藏
    const exists = favorites.some(fav => 
        fav.timestamp === currentExtractedData.timestamp ||
        fav.imageData === currentExtractedData.imageData
    );
    
    if (exists) {
        showToast('该风格已经收藏过了', 'warning');
        return;
    }
    
    // 添加分类
    const category = currentExtractedData.style.style.includes('极简') ? 'minimal' :
                   currentExtractedData.style.style.includes('现代') ? 'modern' :
                   currentExtractedData.style.style.includes('复古') ? 'vintage' : 'other';
    
    const favoriteItem = {
        ...currentExtractedData,
        id: Date.now(),
        category: category
    };
    
    favorites.unshift(favoriteItem);
    localStorage.setItem('styleFavorites', JSON.stringify(favorites));
    updateFavCount();
    showToast('已添加到收藏');
}

// 处理对比文件上传
function handleCompareFile(e, index) {
    if (e.target.files.length) {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            showToast('请上传图片文件', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = event.target.result;
            
            if (index === 1) {
                compareImage1Data = imageData;
                elements.compareImg1.src = imageData;
                elements.comparePreview1.classList.remove('hidden');
                elements.extractCompare1.disabled = false;
            } else {
                compareImage2Data = imageData;
                elements.compareImg2.src = imageData;
                elements.comparePreview2.classList.remove('hidden');
                elements.extractCompare2.disabled = false;
            }
        };
        reader.readAsDataURL(file);
    }
}

// 提取对比风格
function extractCompareStyle(index) {
    const imageData = index === 1 ? compareImage1Data : compareImage2Data;
    if (!imageData) return;
    
    const btn = index === 1 ? elements.extractCompare1 : elements.extractCompare2;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> 提取中...';
    
    setTimeout(() => {
        const img = new Image();
        img.onload = () => {
            const colors = extractColors(img);
            const styleAnalysis = analyzeStyle(colors, img);
            
            if (index === 1) {
                compareExtracted1 = { colors, style: styleAnalysis };
            } else {
                compareExtracted2 = { colors, style: styleAnalysis };
            }
            
            btn.innerHTML = '提取完成';
            btn.classList.remove('bg-primary');
            btn.classList.add('bg-green-500');
            
            // 如果两个都提取完成，显示对比结果
            if (compareExtracted1 && compareExtracted2) {
                displayCompareResults();
            }
        };
        img.src = imageData;
    }, 800);
}

// 显示对比结果
function displayCompareResults() {
    // 显示图片1结果
    elements.compareResults1.innerHTML = generateCompareResultHTML(compareExtracted1);
    
    // 显示图片2结果
    elements.compareResults2.innerHTML = generateCompareResultHTML(compareExtracted2);
    
    // 生成综合对比
    generateCompareSummary();
    
    elements.compareResults.classList.remove('hidden');
    elements.compareResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 生成对比结果HTML
function generateCompareResultHTML(data) {
    return `
        <div>
            <h5 class="text-sm font-medium text-neutral-400 mb-2">主色调</h5>
            <div class="flex gap-2 mb-3">
                ${data.colors.map(color => `
                    <div class="w-8 h-8 rounded" style="background-color: ${color}" title="${color}"></div>
                `).join('')}
            </div>
        </div>
        <div>
            <h5 class="text-sm font-medium text-neutral-400 mb-2">风格</h5>
            <div class="flex flex-wrap gap-1">
                ${data.style.style.map(tag => `
                    <span class="px-2 py-0.5 bg-neutral-50 text-neutral-300 rounded text-xs">${tag}</span>
                `).join('')}
            </div>
        </div>
        <div>
            <h5 class="text-sm font-medium text-neutral-400 mb-2">版式</h5>
            <div class="flex flex-wrap gap-1">
                ${data.style.layout.map(tag => `
                    <span class="px-2 py-0.5 bg-neutral-50 text-neutral-300 rounded text-xs">${tag}</span>
                `).join('')}
            </div>
        </div>
        <div>
            <h5 class="text-sm font-medium text-neutral-400 mb-2">字体</h5>
            <div class="flex flex-wrap gap-1">
                ${data.style.font.map(tag => `
                    <span class="px-2 py-0.5 bg-neutral-50 text-neutral-300 rounded text-xs">${tag}</span>
                `).join('')}
            </div>
        </div>
        <div>
            <h5 class="text-sm font-medium text-neutral-400 mb-2">氛围</h5>
            <div class="flex flex-wrap gap-1">
                ${data.style.mood.map(tag => `
                    <span class="px-2 py-0.5 bg-neutral-50 text-neutral-300 rounded text-xs">${tag}</span>
                `).join('')}
            </div>
        </div>
    `;
}

// 生成综合对比
function generateCompareSummary() {
    const commonStyles = compareExtracted1.style.style.filter(s => compareExtracted2.style.style.includes(s));
    const commonMoods = compareExtracted1.style.mood.filter(m => compareExtracted2.style.mood.includes(m));
    
    const brightness1 = compareExtracted1.style.brightness;
    const brightness2 = compareExtracted2.style.brightness;
    
    const saturation1 = compareExtracted1.style.saturation;
    const saturation2 = compareExtracted2.style.saturation;
    
    let summaryHTML = '';
    
    if (commonStyles.length > 0) {
        summaryHTML += `<p><strong>共同风格：</strong>${commonStyles.join('、')}</p>`;
    } else {
        summaryHTML += '<p><strong>风格差异：</strong>两张图片风格差异较大</p>';
    }
    
    if (commonMoods.length > 0) {
        summaryHTML += `<p><strong>共同氛围：</strong>${commonMoods.join('、')}</p>`;
    }
    
    summaryHTML += `<p><strong>色调对比：</strong>图片1为${brightness1}色调，图片2为${brightness2}色调</p>`;
    summaryHTML += `<p><strong>饱和度对比：</strong>图片1为${saturation1}，图片2为${saturation2}</p>`;
    
    elements.compareSummary.innerHTML = summaryHTML;
}

// 渲染收藏列表
function renderFavorites(category = 'all') {
    elements.favoritesContainer.innerHTML = '';
    
    let filteredFavorites = favorites;
    if (category !== 'all') {
        filteredFavorites = favorites.filter(fav => fav.category === category);
    }
    
    if (filteredFavorites.length === 0) {
        elements.emptyFavorites.classList.remove('hidden');
        return;
    }
    
    elements.emptyFavorites.classList.add('hidden');
    
    filteredFavorites.forEach(fav => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl card-shadow p-4 hover-lift';
        
        card.innerHTML = `
            <div class="flex gap-4 mb-4">
                <img src="${fav.imageData}" alt="收藏的图片" class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-1">
                    <div class="flex gap-1 mb-2">
                        ${fav.colors.slice(0, 4).map(color => `
                            <div class="w-6 h-6 rounded" style="background-color: ${color}"></div>
                        `).join('')}
                    </div>
                    <div class="flex flex-wrap gap-1">
                        ${fav.style.style.map(tag => `
                            <span class="px-2 py-0.5 bg-neutral-50 text-neutral-300 rounded text-xs">${tag}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="flex gap-2">
                <button class="copy-fav-prompt flex-1 px-3 py-2 bg-primary text-white rounded-lg text-sm" data-id="${fav.id}">
                    <i class="fa fa-copy mr-1"></i> 复制提示词
                </button>
                <button class="delete-fav px-3 py-2 bg-red-50 text-red-500 rounded-lg text-sm" data-id="${fav.id}">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `;
        
        elements.favoritesContainer.appendChild(card);
    });
    
    // 添加事件监听器
    document.querySelectorAll('.copy-fav-prompt').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            const fav = favorites.find(f => f.id === id);
            if (fav) {
                copyToClipboard(fav.prompt);
                showToast('已复制提示词');
            }
        });
    });
    
    document.querySelectorAll('.delete-fav').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            deleteFavorite(id);
        });
    });
}

// 筛选收藏
function filterFavorites(category) {
    elements.categoryBtns.forEach(btn => {
        btn.classList.remove('active', 'bg-primary', 'text-white');
        btn.classList.add('bg-neutral-50', 'text-neutral-400');
    });
    
    document.querySelector(`[data-category="${category}"]`).classList.add('active', 'bg-primary', 'text-white');
    document.querySelector(`[data-category="${category}"]`).classList.remove('bg-neutral-50', 'text-neutral-400');
    
    renderFavorites(category);
}

// 删除收藏
function deleteFavorite(id) {
    favorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem('styleFavorites', JSON.stringify(favorites));
    updateFavCount();
    renderFavorites();
    showToast('已删除收藏');
}

// 清空所有收藏
function clearAllFavorites() {
    if (confirm('确定要清空所有收藏吗？此操作不可恢复。')) {
        favorites = [];
        localStorage.setItem('styleFavorites', JSON.stringify(favorites));
        updateFavCount();
        renderFavorites();
        showToast('已清空所有收藏');
    }
}

// 更新收藏数量
function updateFavCount() {
    elements.favCount.textContent = favorites.length;
}

// 检查收藏是否为空
function checkFavoritesEmpty() {
    if (favorites.length === 0) {
        elements.emptyFavorites.classList.remove('hidden');
    } else {
        elements.emptyFavorites.classList.add('hidden');
    }
}

// 复制到剪贴板
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(() => {
        // 降级方案
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
}

// 显示通知
function showToast(message, type = 'success') {
    elements.toastMessage.textContent = message;
    
    // 根据类型修改颜色
    elements.toast.classList.remove('bg-neutral-500', 'bg-red-500', 'bg-yellow-500');
    if (type === 'error') {
        elements.toast.classList.add('bg-red-500');
    } else if (type === 'warning') {
        elements.toast.classList.add('bg-yellow-500');
    } else {
        elements.toast.classList.add('bg-neutral-500');
    }
    
    // 显示通知
    elements.toast.classList.remove('translate-y-20', 'opacity-0');
    
    // 3秒后隐藏
    setTimeout(() => {
        elements.toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);

{\rtf1\ansi\ansicpg936\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs32 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 // ==================== \uc0\u20851 \u38190 \u20462 \u25913 \u20301 \u32622 3: \u21151 \u33021 \u37197 \u32622 \u21644 \u25968 \u25454  ====================\
// \uc0\u39118 \u26684 \u26631 \u31614 \u24211  - \u21487 \u20197 \u26681 \u25454 \u38656 \u35201 \u28155 \u21152 \u26356 \u22810 \u26631 \u31614 \
const styleTags = [\
    '\uc0\u26497 \u31616 \u20027 \u20041 ', '\u29616 \u20195 \u31616 \u32422 ', '\u21271 \u27431 \u39118 \u26684 ', '\u26085 \u24335 \u21644 \u39118 ', '\u24037 \u19994 \u39118 ', \
    '\uc0\u22797 \u21476 \u24576 \u26087 ', '\u27874 \u26222 \u33402 \u26415 ', '\u36187 \u21338 \u26379 \u20811 ', '\u33976 \u27773 \u27874 ', '\u23391 \u33778 \u26031 \u39118 \u26684 ',\
    '\uc0\u25153 \u24179 \u21270 ', '\u25311 \u29289 \u21270 ', '3D\u31435 \u20307 ', '\u25163 \u32472 \u25554 \u30011 ', '\u27700 \u24425 \u39118 \u26684 ',\
    '\uc0\u22269 \u28526 \u39118 ', '\u26032 \u20013 \u24335 ', '\u27431 \u24335 \u21476 \u20856 ', '\u21733 \u29305 \u24335 ', '\u24052 \u27931 \u20811 '\
];\
\
const layoutTags = [\
    '\uc0\u23621 \u20013 \u23545 \u40784 ', '\u24038 \u23545 \u40784 ', '\u32593 \u26684 \u24067 \u23616 ', '\u19981 \u23545 \u31216 \u24067 \u23616 ', '\u30041 \u30333 \u20805 \u36275 ',\
    '\uc0\u28385 \u29256 \u26500 \u22270 ', '\u20998 \u21106 \u24335 \u24067 \u23616 ', '\u23545 \u35282 \u32447 \u26500 \u22270 ', '\u19977 \u35282 \u24418 \u26500 \u22270 ', 'S\u24418 \u26500 \u22270 ',\
    '\uc0\u23618 \u27425 \u24863 \u24378 ', '\u25153 \u24179 \u21270 \u24067 \u23616 ', '\u21345 \u29255 \u24335 \u35774 \u35745 ', '\u21333 \u26639 \u24067 \u23616 ', '\u22810 \u26639 \u24067 \u23616 '\
];\
\
const fontTags = [\
    '\uc0\u26080 \u34924 \u32447 \u23383 \u20307 ', '\u34924 \u32447 \u23383 \u20307 ', '\u25163 \u20889 \u20307 ', '\u33402 \u26415 \u23383 \u20307 ', '\u31895 \u20307 \u23383 ',\
    '\uc0\u32454 \u20307 \u23383 ', '\u31561 \u23485 \u23383 \u20307 ', '\u20070 \u27861 \u23383 \u20307 ', '\u21345 \u36890 \u23383 \u20307 ', '\u22797 \u21476 \u23383 \u20307 '\
];\
\
const moodTags = [\
    '\uc0\u28165 \u26032 \u33258 \u28982 ', '\u28201 \u26262 \u27835 \u24840 ', '\u20919 \u38745 \u19987 \u19994 ', '\u27963 \u21147 \u22235 \u23556 ', '\u20248 \u38597 \u39640 \u36149 ',\
    '\uc0\u31070 \u31192 \u28145 \u36995 ', '\u31185 \u25216 \u26410 \u26469 ', '\u25991 \u33402 \u22797 \u21476 ', '\u21487 \u29233 \u20431 \u30382 ', '\u20005 \u32899 \u24196 \u37325 '\
];\
\
// \uc0\u20840 \u23616 \u21464 \u37327 \
let currentImageData = null;\
let currentExtractedData = null;\
let compareImage1Data = null;\
let compareImage2Data = null;\
let compareExtracted1 = null;\
let compareExtracted2 = null;\
let favorites = JSON.parse(localStorage.getItem('styleFavorites') || '[]');\
\
// DOM\uc0\u20803 \u32032 \
const elements = \{\
    // \uc0\u23548 \u33322 \
    navTabs: document.querySelectorAll('.nav-tab'),\
    mobileNavTabs: document.querySelectorAll('.mobile-nav-tab'),\
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),\
    mobileMenu: document.getElementById('mobile-menu'),\
    favCount: document.getElementById('fav-count'),\
    \
    // \uc0\u39029 \u38754 \
    pages: document.querySelectorAll('.page'),\
    extractPage: document.getElementById('extract-page'),\
    comparePage: document.getElementById('compare-page'),\
    favoritesPage: document.getElementById('favorites-page'),\
    \
    // \uc0\u25552 \u21462 \u21151 \u33021 \
    uploadArea: document.getElementById('upload-area'),\
    fileInput: document.getElementById('file-input'),\
    imageUrl: document.getElementById('image-url'),\
    loadUrlBtn: document.getElementById('load-url-btn'),\
    previewContainer: document.getElementById('preview-container'),\
    previewImage: document.getElementById('preview-image'),\
    clearImageBtn: document.getElementById('clear-image-btn'),\
    extractBtn: document.getElementById('extract-btn'),\
    resultsContainer: document.getElementById('results-container'),\
    \
    // \uc0\u32467 \u26524 \u23637 \u31034 \
    colorsContainer: document.getElementById('colors-container'),\
    colorValues: document.getElementById('color-values'),\
    copyColorsBtn: document.getElementById('copy-colors-btn'),\
    styleTags: document.getElementById('style-tags'),\
    layoutTags: document.getElementById('layout-tags'),\
    fontTags: document.getElementById('font-tags'),\
    moodTags: document.getElementById('mood-tags'),\
    promptText: document.getElementById('prompt-text'),\
    copyPromptBtn: document.getElementById('copy-prompt-btn'),\
    regeneratePromptBtn: document.getElementById('regenerate-prompt-btn'),\
    addToFavBtn: document.getElementById('add-to-fav-btn'),\
    \
    // \uc0\u23545 \u27604 \u21151 \u33021 \
    compareUpload1: document.getElementById('compare-upload-1'),\
    compareUpload2: document.getElementById('compare-upload-2'),\
    compareFile1: document.getElementById('compare-file-1'),\
    compareFile2: document.getElementById('compare-file-2'),\
    comparePreview1: document.getElementById('compare-preview-1'),\
    comparePreview2: document.getElementById('compare-preview-2'),\
    compareImg1: document.getElementById('compare-img-1'),\
    compareImg2: document.getElementById('compare-img-2'),\
    extractCompare1: document.getElementById('extract-compare-1'),\
    extractCompare2: document.getElementById('extract-compare-2'),\
    compareResults: document.getElementById('compare-results'),\
    compareResults1: document.getElementById('compare-results-1'),\
    compareResults2: document.getElementById('compare-results-2'),\
    compareSummary: document.getElementById('compare-summary'),\
    \
    // \uc0\u25910 \u34255 \u21151 \u33021 \
    categoryBtns: document.querySelectorAll('.category-btn'),\
    favoritesContainer: document.getElementById('favorites-container'),\
    emptyFavorites: document.getElementById('empty-favorites'),\
    clearAllFav: document.getElementById('clear-all-fav'),\
    goToExtract: document.getElementById('go-to-extract'),\
    \
    // \uc0\u36890 \u30693 \
    toast: document.getElementById('toast'),\
    toastMessage: document.getElementById('toast-message')\
\};\
\
// \uc0\u21021 \u22987 \u21270 \
function init() \{\
    updateFavCount();\
    setupEventListeners();\
    checkFavoritesEmpty();\
\}\
\
// \uc0\u35774 \u32622 \u20107 \u20214 \u30417 \u21548 \u22120 \
function setupEventListeners() \{\
    // \uc0\u23548 \u33322 \u20999 \u25442 \
    elements.navTabs.forEach(tab => \{\
        tab.addEventListener('click', () => switchTab(tab.id.replace('tab-', '')));\
    \});\
    \
    elements.mobileNavTabs.forEach(tab => \{\
        tab.addEventListener('click', () => \{\
            switchTab(tab.id.replace('mobile-tab-', ''));\
            elements.mobileMenu.classList.add('hidden');\
        \});\
    \});\
    \
    elements.mobileMenuBtn.addEventListener('click', () => \{\
        elements.mobileMenu.classList.toggle('hidden');\
    \});\
    \
    // \uc0\u22270 \u29255 \u19978 \u20256 \
    elements.uploadArea.addEventListener('click', () => elements.fileInput.click());\
    elements.fileInput.addEventListener('change', handleFileUpload);\
    \
    // \uc0\u25302 \u25341 \u19978 \u20256 \
    elements.uploadArea.addEventListener('dragover', (e) => \{\
        e.preventDefault();\
        elements.uploadArea.classList.add('border-primary');\
    \});\
    \
    elements.uploadArea.addEventListener('dragleave', () => \{\
        elements.uploadArea.classList.remove('border-primary');\
    \});\
    \
    elements.uploadArea.addEventListener('drop', (e) => \{\
        e.preventDefault();\
        elements.uploadArea.classList.remove('border-primary');\
        if (e.dataTransfer.files.length) \{\
            handleFile(e.dataTransfer.files[0]);\
        \}\
    \});\
    \
    // URL\uc0\u21152 \u36733 \
    elements.loadUrlBtn.addEventListener('click', loadImageFromUrl);\
    elements.imageUrl.addEventListener('keypress', (e) => \{\
        if (e.key === 'Enter') loadImageFromUrl();\
    \});\
    \
    // \uc0\u28165 \u38500 \u22270 \u29255 \
    elements.clearImageBtn.addEventListener('click', clearImage);\
    \
    // \uc0\u25552 \u21462 \u39118 \u26684 \
    elements.extractBtn.addEventListener('click', extractStyle);\
    \
    // \uc0\u22797 \u21046 \u21151 \u33021 \
    elements.copyColorsBtn.addEventListener('click', copyColors);\
    elements.copyPromptBtn.addEventListener('click', copyPrompt);\
    \
    // \uc0\u37325 \u26032 \u29983 \u25104 \u25552 \u31034 \u35789 \
    elements.regeneratePromptBtn.addEventListener('click', regeneratePrompt);\
    \
    // \uc0\u28155 \u21152 \u21040 \u25910 \u34255 \
    elements.addToFavBtn.addEventListener('click', addToFavorites);\
    \
    // \uc0\u23545 \u27604 \u21151 \u33021 \
    elements.compareUpload1.addEventListener('click', () => elements.compareFile1.click());\
    elements.compareUpload2.addEventListener('click', () => elements.compareFile2.click());\
    elements.compareFile1.addEventListener('change', (e) => handleCompareFile(e, 1));\
    elements.compareFile2.addEventListener('change', (e) => handleCompareFile(e, 2));\
    elements.extractCompare1.addEventListener('click', () => extractCompareStyle(1));\
    elements.extractCompare2.addEventListener('click', () => extractCompareStyle(2));\
    \
    // \uc0\u25910 \u34255 \u21151 \u33021 \
    elements.categoryBtns.forEach(btn => \{\
        btn.addEventListener('click', () => filterFavorites(btn.dataset.category));\
    \});\
    \
    elements.clearAllFav.addEventListener('click', clearAllFavorites);\
    elements.goToExtract.addEventListener('click', () => switchTab('extract'));\
\}\
\
// \uc0\u20999 \u25442 \u26631 \u31614 \u39029 \
function switchTab(tabName) \{\
    // \uc0\u26356 \u26032 \u23548 \u33322 \u29366 \u24577 \
    elements.navTabs.forEach(tab => \{\
        tab.classList.remove('active', 'text-primary');\
        tab.classList.add('text-neutral-400');\
    \});\
    \
    elements.mobileNavTabs.forEach(tab => \{\
        tab.classList.remove('active', 'text-primary');\
        tab.classList.add('text-neutral-400');\
    \});\
    \
    document.getElementById(`tab-$\{tabName\}`)?.classList.add('active', 'text-primary');\
    document.getElementById(`mobile-tab-$\{tabName\}`)?.classList.add('active', 'text-primary');\
    \
    // \uc0\u26174 \u31034 \u23545 \u24212 \u39029 \u38754 \
    elements.pages.forEach(page => page.classList.add('hidden'));\
    document.getElementById(`$\{tabName\}-page`).classList.remove('hidden');\
    \
    // \uc0\u22914 \u26524 \u26159 \u25910 \u34255 \u39029 \u65292 \u21047 \u26032 \u25910 \u34255 \u21015 \u34920 \
    if (tabName === 'favorites') \{\
        renderFavorites();\
    \}\
\}\
\
// \uc0\u22788 \u29702 \u25991 \u20214 \u19978 \u20256 \
function handleFileUpload(e) \{\
    if (e.target.files.length) \{\
        handleFile(e.target.files[0]);\
    \}\
\}\
\
function handleFile(file) \{\
    if (!file.type.startsWith('image/')) \{\
        showToast('\uc0\u35831 \u19978 \u20256 \u22270 \u29255 \u25991 \u20214 ', 'error');\
        return;\
    \}\
    \
    const reader = new FileReader();\
    reader.onload = (e) => \{\
        currentImageData = e.target.result;\
        showPreview(currentImageData);\
    \};\
    reader.readAsDataURL(file);\
\}\
\
// \uc0\u20174 URL\u21152 \u36733 \u22270 \u29255 \
function loadImageFromUrl() \{\
    const url = elements.imageUrl.value.trim();\
    if (!url) \{\
        showToast('\uc0\u35831 \u36755 \u20837 \u22270 \u29255 \u38142 \u25509 ', 'error');\
        return;\
    \}\
    \
    // \uc0\u26816 \u26597 URL\u26159 \u21542 \u26377 \u25928 \
    try \{\
        new URL(url);\
    \} catch \{\
        showToast('\uc0\u35831 \u36755 \u20837 \u26377 \u25928 \u30340 URL', 'error');\
        return;\
    \}\
    \
    // \uc0\u26174 \u31034 \u21152 \u36733 \u29366 \u24577 \
    elements.loadUrlBtn.disabled = true;\
    elements.loadUrlBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> \uc0\u21152 \u36733 \u20013 ';\
    \
    // \uc0\u21019 \u24314 \u22270 \u29255 \u23545 \u35937 \u21152 \u36733 \u22270 \u29255 \
    const img = new Image();\
    img.crossOrigin = 'anonymous';\
    \
    img.onload = () => \{\
        // \uc0\u20351 \u29992 canvas\u36716 \u25442 \u20026 dataURL\
        const canvas = document.createElement('canvas');\
        canvas.width = img.width;\
        canvas.height = img.height;\
        const ctx = canvas.getContext('2d');\
        ctx.drawImage(img, 0, 0);\
        currentImageData = canvas.toDataURL('image/jpeg', 0.9);\
        \
        showPreview(currentImageData);\
        elements.loadUrlBtn.disabled = false;\
        elements.loadUrlBtn.innerHTML = '\uc0\u21152 \u36733 ';\
    \};\
    \
    img.onerror = () => \{\
        showToast('\uc0\u22270 \u29255 \u21152 \u36733 \u22833 \u36133 \u65292 \u35831 \u26816 \u26597 \u38142 \u25509 ', 'error');\
        elements.loadUrlBtn.disabled = false;\
        elements.loadUrlBtn.innerHTML = '\uc0\u21152 \u36733 ';\
    \};\
    \
    img.src = url;\
\}\
\
// \uc0\u26174 \u31034 \u22270 \u29255 \u39044 \u35272 \
function showPreview(imageData) \{\
    elements.previewImage.src = imageData;\
    elements.previewContainer.classList.remove('hidden');\
    elements.extractBtn.disabled = false;\
    elements.resultsContainer.classList.add('hidden');\
\}\
\
// \uc0\u28165 \u38500 \u22270 \u29255 \
function clearImage() \{\
    currentImageData = null;\
    currentExtractedData = null;\
    elements.previewContainer.classList.add('hidden');\
    elements.previewImage.src = '';\
    elements.extractBtn.disabled = true;\
    elements.resultsContainer.classList.add('hidden');\
    elements.fileInput.value = '';\
    elements.imageUrl.value = '';\
\}\
\
// \uc0\u25552 \u21462 \u35270 \u35273 \u39118 \u26684 \
function extractStyle() \{\
    if (!currentImageData) return;\
    \
    // \uc0\u26174 \u31034 \u21152 \u36733 \u29366 \u24577 \
    elements.extractBtn.disabled = true;\
    elements.extractBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> \uc0\u25552 \u21462 \u20013 ...';\
    \
    // \uc0\u27169 \u25311 \u22788 \u29702 \u24310 \u36831 \u65292 \u35753 \u29992 \u25143 \u26377 \u21453 \u39304 \
    setTimeout(() => \{\
        const img = new Image();\
        img.onload = () => \{\
            // \uc0\u25552 \u21462 \u39068 \u33394 \
            const colors = extractColors(img);\
            \
            // \uc0\u20998 \u26512 \u39118 \u26684 \u65288 \u22522 \u20110 \u39068 \u33394 \u21644 \u22270 \u20687 \u29305 \u24449 \u30340 \u31616 \u21333 \u20998 \u26512 \u65289 \
            const styleAnalysis = analyzeStyle(colors, img);\
            \
            // \uc0\u29983 \u25104 \u25552 \u31034 \u35789 \
            const prompt = generatePrompt(colors, styleAnalysis);\
            \
            // \uc0\u20445 \u23384 \u25552 \u21462 \u30340 \u25968 \u25454 \
            currentExtractedData = \{\
                imageData: currentImageData,\
                colors: colors,\
                style: styleAnalysis,\
                prompt: prompt,\
                timestamp: Date.now()\
            \};\
            \
            // \uc0\u26174 \u31034 \u32467 \u26524 \
            displayResults(colors, styleAnalysis, prompt);\
            \
            elements.extractBtn.disabled = false;\
            elements.extractBtn.innerHTML = '<i class="fa fa-magic mr-2"></i> \uc0\u25552 \u21462 \u35270 \u35273 \u39118 \u26684 ';\
            elements.resultsContainer.classList.remove('hidden');\
            \
            // \uc0\u28378 \u21160 \u21040 \u32467 \u26524 \u21306 \u22495 \
            elements.resultsContainer.scrollIntoView(\{ behavior: 'smooth', block: 'start' \});\
        \};\
        img.src = currentImageData;\
    \}, 800);\
\}\
\
// \uc0\u25552 \u21462 \u20027 \u35201 \u39068 \u33394 \
function extractColors(img, count = 5) \{\
    const canvas = document.createElement('canvas');\
    const ctx = canvas.getContext('2d');\
    \
    // \uc0\u32553 \u23567 \u22270 \u29255 \u20197 \u25552 \u39640 \u24615 \u33021 \
    const width = canvas.width = Math.min(img.width, 100);\
    const height = canvas.height = Math.min(img.height, 100);\
    \
    ctx.drawImage(img, 0, 0, width, height);\
    \
    const imageData = ctx.getImageData(0, 0, width, height);\
    const pixels = imageData.data;\
    \
    // \uc0\u32479 \u35745 \u39068 \u33394 \u20986 \u29616 \u39057 \u29575 \
    const colorCount = \{\};\
    \
    for (let i = 0; i < pixels.length; i += 4) \{\
        const r = Math.round(pixels[i] / 32) * 32;\
        const g = Math.round(pixels[i + 1] / 32) * 32;\
        const b = Math.round(pixels[i + 2] / 32) * 32;\
        const a = pixels[i + 3];\
        \
        // \uc0\u36339 \u36807 \u36879 \u26126 \u20687 \u32032 \
        if (a < 128) continue;\
        \
        const hex = rgbToHex(r, g, b);\
        colorCount[hex] = (colorCount[hex] || 0) + 1;\
    \}\
    \
    // \uc0\u25490 \u24207 \u24182 \u36820 \u22238 \u21069 count\u20010 \u39068 \u33394 \
    const sortedColors = Object.entries(colorCount)\
        .sort((a, b) => b[1] - a[1])\
        .slice(0, count)\
        .map(entry => entry[0]);\
    \
    return sortedColors;\
\}\
\
// RGB\uc0\u36716 HEX\
function rgbToHex(r, g, b) \{\
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');\
\}\
\
// HEX\uc0\u36716 RGB\
function hexToRgb(hex) \{\
    const result = /^#?([a-f\\d]\{2\})([a-f\\d]\{2\})([a-f\\d]\{2\})$/i.exec(hex);\
    return result ? \{\
        r: parseInt(result[1], 16),\
        g: parseInt(result[2], 16),\
        b: parseInt(result[3], 16)\
    \} : null;\
\}\
\
// \uc0\u35745 \u31639 \u39068 \u33394 \u20142 \u24230 \
function getBrightness(hex) \{\
    const rgb = hexToRgb(hex);\
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;\
\}\
\
// \uc0\u20998 \u26512 \u39118 \u26684 \
function analyzeStyle(colors, img) \{\
    // \uc0\u22522 \u20110 \u39068 \u33394 \u20998 \u26512 \u39118 \u26684 \
    const brightness = colors.reduce((sum, color) => sum + getBrightness(color), 0) / colors.length;\
    const isLight = brightness > 128;\
    \
    // \uc0\u35745 \u31639 \u39068 \u33394 \u39281 \u21644 \u24230 \u65288 \u31616 \u21270 \u29256 \u65289 \
    let saturation = 0;\
    colors.forEach(color => \{\
        const rgb = hexToRgb(color);\
        const max = Math.max(rgb.r, rgb.g, rgb.b);\
        const min = Math.min(rgb.r, rgb.g, rgb.b);\
        saturation += max === 0 ? 0 : (max - min) / max;\
    \});\
    saturation /= colors.length;\
    \
    // \uc0\u38543 \u26426 \u36873 \u25321 \u26631 \u31614 \u65288 \u23454 \u38469 \u24212 \u29992 \u20013 \u21487 \u20197 \u20351 \u29992 \u26356 \u22797 \u26434 \u30340 \u31639 \u27861 \u65289 \
    const getRandomTags = (tags, count) => \{\
        const shuffled = [...tags].sort(() => 0.5 - Math.random());\
        return shuffled.slice(0, count);\
    \};\
    \
    // \uc0\u26681 \u25454 \u39068 \u33394 \u29305 \u24449 \u35843 \u25972 \u26631 \u31614 \u36873 \u25321 \
    let styleTagsSelected, layoutTagsSelected, fontTagsSelected, moodTagsSelected;\
    \
    if (isLight && saturation < 0.4) \{\
        // \uc0\u27973 \u33394 \u20302 \u39281 \u21644 \u24230  - \u26497 \u31616 /\u29616 \u20195 \u39118 \u26684 \
        styleTagsSelected = ['\uc0\u26497 \u31616 \u20027 \u20041 ', '\u29616 \u20195 \u31616 \u32422 ', '\u21271 \u27431 \u39118 \u26684 '].sort(() => 0.5 - Math.random()).slice(0, 2);\
        layoutTagsSelected = ['\uc0\u30041 \u30333 \u20805 \u36275 ', '\u23621 \u20013 \u23545 \u40784 ', '\u25153 \u24179 \u21270 \u24067 \u23616 '].sort(() => 0.5 - Math.random()).slice(0, 2);\
        fontTagsSelected = ['\uc0\u26080 \u34924 \u32447 \u23383 \u20307 ', '\u32454 \u20307 \u23383 '].sort(() => 0.5 - Math.random()).slice(0, 2);\
        moodTagsSelected = ['\uc0\u28165 \u26032 \u33258 \u28982 ', '\u20919 \u38745 \u19987 \u19994 ', '\u20248 \u38597 \u39640 \u36149 '].sort(() => 0.5 - Math.random()).slice(0, 2);\
    \} else if (saturation > 0.6) \{\
        // \uc0\u39640 \u39281 \u21644 \u24230  - \u27963 \u21147 /\u33402 \u26415 \u39118 \u26684 \
        styleTagsSelected = ['\uc0\u27874 \u26222 \u33402 \u26415 ', '\u23391 \u33778 \u26031 \u39118 \u26684 ', '\u36187 \u21338 \u26379 \u20811 '].sort(() => 0.5 - Math.random()).slice(0, 2);\
        layoutTagsSelected = ['\uc0\u19981 \u23545 \u31216 \u24067 \u23616 ', '\u28385 \u29256 \u26500 \u22270 ', '\u23618 \u27425 \u24863 \u24378 '].sort(() => 0.5 - Math.random()).slice(0, 2);\
        fontTagsSelected = ['\uc0\u31895 \u20307 \u23383 ', '\u33402 \u26415 \u23383 \u20307 ', '\u21345 \u36890 \u23383 \u20307 '].sort(() => 0.5 - Math.random()).slice(0, 2);\
        moodTagsSelected = ['\uc0\u27963 \u21147 \u22235 \u23556 ', '\u31185 \u25216 \u26410 \u26469 ', '\u21487 \u29233 \u20431 \u30382 '].sort(() => 0.5 - Math.random()).slice(0, 2);\
    \} else \{\
        // \uc0\u20013 \u31561 \u39281 \u21644 \u24230  - \u36890 \u29992 \u39118 \u26684 \
        styleTagsSelected = getRandomTags(styleTags, 2);\
        layoutTagsSelected = getRandomTags(layoutTags, 2);\
        fontTagsSelected = getRandomTags(fontTags, 2);\
        moodTagsSelected = getRandomTags(moodTags, 2);\
    \}\
    \
    return \{\
        style: styleTagsSelected,\
        layout: layoutTagsSelected,\
        font: fontTagsSelected,\
        mood: moodTagsSelected,\
        brightness: isLight ? '\uc0\u26126 \u20142 ' : '\u28145 \u33394 ',\
        saturation: saturation < 0.3 ? '\uc0\u20302 \u39281 \u21644 \u24230 ' : saturation < 0.6 ? '\u20013 \u31561 \u39281 \u21644 \u24230 ' : '\u39640 \u39281 \u21644 \u24230 '\
    \};\
\}\
\
// \uc0\u29983 \u25104 AI\u25552 \u31034 \u35789 \
function generatePrompt(colors, styleAnalysis) \{\
    const colorStr = colors.join(', ');\
    \
    return `UI\uc0\u35774 \u35745 \u65292 $\{styleAnalysis.style.join('\u65292 ')\}\u39118 \u26684 \u65292 $\{styleAnalysis.mood.join('\u65292 ')\}\u30340 \u27675 \u22260 \u65292 \
\uc0\u20027 \u33394 \u35843 \u65306 $\{colorStr\}\u65292 $\{styleAnalysis.brightness\}\u33394 \u35843 \u65292 $\{styleAnalysis.saturation\}\u65292 \
\uc0\u37319 \u29992 $\{styleAnalysis.layout.join('\u21644 ')\}\u24067 \u23616 \u65292 \
\uc0\u20351 \u29992 $\{styleAnalysis.font.join('\u21644 ')\}\u65292 \
\uc0\u30041 \u30333 \u20805 \u36275 \u65292 \u35270 \u35273 \u23618 \u27425 \u28165 \u26224 \u65292 \u29616 \u20195 \u24863 \u24378 \u65292 \u39640 \u36136 \u37327 \u65292 \u32454 \u33410 \u20016 \u23500 `;\
\}\
\
// \uc0\u26174 \u31034 \u25552 \u21462 \u32467 \u26524 \
function displayResults(colors, styleAnalysis, prompt) \{\
    // \uc0\u26174 \u31034 \u39068 \u33394 \
    elements.colorsContainer.innerHTML = '';\
    elements.colorValues.innerHTML = '';\
    \
    colors.forEach((color, index) => \{\
        const brightness = getBrightness(color);\
        const textColor = brightness > 128 ? 'text-neutral-500' : 'text-white';\
        \
        const swatch = document.createElement('div');\
        swatch.className = `color-swatch h-16 rounded-lg cursor-pointer flex items-end justify-center pb-1 $\{textColor\} text-xs font-medium`;\
        swatch.style.backgroundColor = color;\
        swatch.textContent = color.toUpperCase();\
        swatch.title = '\uc0\u28857 \u20987 \u22797 \u21046 \u33394 \u20540 ';\
        swatch.addEventListener('click', () => \{\
            copyToClipboard(color);\
            showToast(`\uc0\u24050 \u22797 \u21046  $\{color\}`);\
        \});\
        elements.colorsContainer.appendChild(swatch);\
        \
        const valueItem = document.createElement('div');\
        valueItem.className = 'flex justify-between';\
        valueItem.innerHTML = `\
            <span>\uc0\u20027 \u33394 $\{index + 1\}</span>\
            <span>$\{color.toUpperCase()\}</span>\
        `;\
        elements.colorValues.appendChild(valueItem);\
    \});\
    \
    // \uc0\u26174 \u31034 \u39118 \u26684 \u26631 \u31614 \
    displayTags(elements.styleTags, styleAnalysis.style);\
    displayTags(elements.layoutTags, styleAnalysis.layout);\
    displayTags(elements.fontTags, styleAnalysis.font);\
    displayTags(elements.moodTags, styleAnalysis.mood);\
    \
    // \uc0\u26174 \u31034 \u25552 \u31034 \u35789 \
    elements.promptText.value = prompt;\
\}\
\
// \uc0\u26174 \u31034 \u26631 \u31614 \
function displayTags(container, tags) \{\
    container.innerHTML = '';\
    tags.forEach(tag => \{\
        const tagEl = document.createElement('span');\
        tagEl.className = 'px-3 py-1 bg-neutral-50 text-neutral-400 rounded-full text-sm';\
        tagEl.textContent = tag;\
        container.appendChild(tagEl);\
    \});\
\}\
\
// \uc0\u22797 \u21046 \u39068 \u33394 \
function copyColors() \{\
    if (!currentExtractedData) return;\
    \
    const colorStr = currentExtractedData.colors.join(', ');\
    copyToClipboard(colorStr);\
    showToast('\uc0\u24050 \u22797 \u21046 \u25152 \u26377 \u33394 \u20540 ');\
\}\
\
// \uc0\u22797 \u21046 \u25552 \u31034 \u35789 \
function copyPrompt() \{\
    if (!currentExtractedData) return;\
    \
    copyToClipboard(currentExtractedData.prompt);\
    showToast('\uc0\u24050 \u22797 \u21046 AI\u25552 \u31034 \u35789 ');\
\}\
\
// \uc0\u37325 \u26032 \u29983 \u25104 \u25552 \u31034 \u35789 \
function regeneratePrompt() \{\
    if (!currentExtractedData) return;\
    \
    const newPrompt = generatePrompt(\
        currentExtractedData.colors, \
        analyzeStyle(currentExtractedData.colors, new Image())\
    );\
    \
    currentExtractedData.prompt = newPrompt;\
    elements.promptText.value = newPrompt;\
    showToast('\uc0\u24050 \u37325 \u26032 \u29983 \u25104 \u25552 \u31034 \u35789 ');\
\}\
\
// \uc0\u28155 \u21152 \u21040 \u25910 \u34255 \
function addToFavorites() \{\
    if (!currentExtractedData) return;\
    \
    // \uc0\u26816 \u26597 \u26159 \u21542 \u24050 \u32463 \u25910 \u34255 \
    const exists = favorites.some(fav => \
        fav.timestamp === currentExtractedData.timestamp ||\
        fav.imageData === currentExtractedData.imageData\
    );\
    \
    if (exists) \{\
        showToast('\uc0\u35813 \u39118 \u26684 \u24050 \u32463 \u25910 \u34255 \u36807 \u20102 ', 'warning');\
        return;\
    \}\
    \
    // \uc0\u28155 \u21152 \u20998 \u31867 \
    const category = currentExtractedData.style.style.includes('\uc0\u26497 \u31616 ') ? 'minimal' :\
                   currentExtractedData.style.style.includes('\uc0\u29616 \u20195 ') ? 'modern' :\
                   currentExtractedData.style.style.includes('\uc0\u22797 \u21476 ') ? 'vintage' : 'other';\
    \
    const favoriteItem = \{\
        ...currentExtractedData,\
        id: Date.now(),\
        category: category\
    \};\
    \
    favorites.unshift(favoriteItem);\
    localStorage.setItem('styleFavorites', JSON.stringify(favorites));\
    updateFavCount();\
    showToast('\uc0\u24050 \u28155 \u21152 \u21040 \u25910 \u34255 ');\
\}\
\
// \uc0\u22788 \u29702 \u23545 \u27604 \u25991 \u20214 \u19978 \u20256 \
function handleCompareFile(e, index) \{\
    if (e.target.files.length) \{\
        const file = e.target.files[0];\
        if (!file.type.startsWith('image/')) \{\
            showToast('\uc0\u35831 \u19978 \u20256 \u22270 \u29255 \u25991 \u20214 ', 'error');\
            return;\
        \}\
        \
        const reader = new FileReader();\
        reader.onload = (event) => \{\
            const imageData = event.target.result;\
            \
            if (index === 1) \{\
                compareImage1Data = imageData;\
                elements.compareImg1.src = imageData;\
                elements.comparePreview1.classList.remove('hidden');\
                elements.extractCompare1.disabled = false;\
            \} else \{\
                compareImage2Data = imageData;\
                elements.compareImg2.src = imageData;\
                elements.comparePreview2.classList.remove('hidden');\
                elements.extractCompare2.disabled = false;\
            \}\
        \};\
        reader.readAsDataURL(file);\
    \}\
\}\
\
// \uc0\u25552 \u21462 \u23545 \u27604 \u39118 \u26684 \
function extractCompareStyle(index) \{\
    const imageData = index === 1 ? compareImage1Data : compareImage2Data;\
    if (!imageData) return;\
    \
    const btn = index === 1 ? elements.extractCompare1 : elements.extractCompare2;\
    btn.disabled = true;\
    btn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> \uc0\u25552 \u21462 \u20013 ...';\
    \
    setTimeout(() => \{\
        const img = new Image();\
        img.onload = () => \{\
            const colors = extractColors(img);\
            const styleAnalysis = analyzeStyle(colors, img);\
            \
            if (index === 1) \{\
                compareExtracted1 = \{ colors, style: styleAnalysis \};\
            \} else \{\
                compareExtracted2 = \{ colors, style: styleAnalysis \};\
            \}\
            \
            btn.innerHTML = '\uc0\u25552 \u21462 \u23436 \u25104 ';\
            btn.classList.remove('bg-primary');\
            btn.classList.add('bg-green-500');\
            \
            // \uc0\u22914 \u26524 \u20004 \u20010 \u37117 \u25552 \u21462 \u23436 \u25104 \u65292 \u26174 \u31034 \u23545 \u27604 \u32467 \u26524 \
            if (compareExtracted1 && compareExtracted2) \{\
                displayCompareResults();\
            \}\
        \};\
        img.src = imageData;\
    \}, 800);\
\}\
\
// \uc0\u26174 \u31034 \u23545 \u27604 \u32467 \u26524 \
function displayCompareResults() \{\
    // \uc0\u26174 \u31034 \u22270 \u29255 1\u32467 \u26524 \
    elements.compareResults1.innerHTML = generateCompareResultHTML(compareExtracted1);\
    \
    // \uc0\u26174 \u31034 \u22270 \u29255 2\u32467 \u26524 \
    elements.compareResults2.innerHTML = generateCompareResultHTML(compareExtracted2);\
    \
    // \uc0\u29983 \u25104 \u32508 \u21512 \u23545 \u27604 \
    generateCompareSummary();\
    \
    elements.compareResults.classList.remove('hidden');\
    elements.compareResults.scrollIntoView(\{ behavior: 'smooth', block: 'start' \});\
\}\
\
// \uc0\u29983 \u25104 \u23545 \u27604 \u32467 \u26524 HTML\
function generateCompareResultHTML(data) \{\
    return `\
        <div>\
            <h5 class="text-sm font-medium text-neutral-400 mb-2">\uc0\u20027 \u33394 \u35843 </h5>\
            <div class="flex gap-2 mb-3">\
                $\{data.colors.map(color => `\
                    <div class="w-8 h-8 rounded" style="background-color: $\{color\}" title="$\{color\}"></div>\
                `).join('')\}\
            </div>\
        </div>\
        <div>\
            <h5 class="text-sm font-medium text-neutral-400 mb-2">\uc0\u39118 \u26684 </h5>\
            <div class="flex flex-wrap gap-1">\
                $\{data.style.style.map(tag => `\
                    <span class="px-2 py-0.5 bg-neutral-50 text-neutral-300 rounded text-xs">$\{tag\}</span>\
                `).join('')\}\
            </div>\
        </div>\
        <div>\
            <h5 class="text-sm font-medium text-neutral-400 mb-2">\uc0\u29256 \u24335 </h5>\
            <div class="flex flex-wrap gap-1">\
                $\{data.style.layout.map(tag => `\
                    <span class="px-2 py-0.5 bg-neutral-50 text-neutral-300 rounded text-xs">$\{tag\}</span>\
                `).join('')\}\
            </div>\
        </div>\
        <div>\
            <h5 class="text-sm font-medium text-neutral-400 mb-2">\uc0\u23383 \u20307 </h5>\
            <div class="flex flex-wrap gap-1">\
                $\{data.style.font.map(tag => `\
                    <span class="px-2 py-0.5 bg-neutral-50 text-neutral-300 rounded text-xs">$\{tag\}</span>\
                `).join('')\}\
            </div>\
        </div>\
        <div>\
            <h5 class="text-sm font-medium text-neutral-400 mb-2">\uc0\u27675 \u22260 </h5>\
            <div class="flex flex-wrap gap-1">\
                $\{data.style.mood.map(tag => `\
                    <span class="px-2 py-0.5 bg-neutral-50 text-neutral-300 rounded text-xs">$\{tag\}</span>\
                `).join('')\}\
            </div>\
        </div>\
    `;\
\}\
\
// \uc0\u29983 \u25104 \u32508 \u21512 \u23545 \u27604 \
function generateCompareSummary() \{\
    const commonStyles = compareExtracted1.style.style.filter(s => compareExtracted2.style.style.includes(s));\
    const commonMoods = compareExtracted1.style.mood.filter(m => compareExtracted2.style.mood.includes(m));\
    \
    const brightness1 = compareExtracted1.style.brightness;\
    const brightness2 = compareExtracted2.style.brightness;\
    \
    const saturation1 = compareExtracted1.style.saturation;\
    const saturation2 = compareExtracted2.style.saturation;\
    \
    let summaryHTML = '';\
    \
    if (commonStyles.length > 0) \{\
        summaryHTML += `<p><strong>\uc0\u20849 \u21516 \u39118 \u26684 \u65306 </strong>$\{commonStyles.join('\u12289 ')\}</p>`;\
    \} else \{\
        summaryHTML += '<p><strong>\uc0\u39118 \u26684 \u24046 \u24322 \u65306 </strong>\u20004 \u24352 \u22270 \u29255 \u39118 \u26684 \u24046 \u24322 \u36739 \u22823 </p>';\
    \}\
    \
    if (commonMoods.length > 0) \{\
        summaryHTML += `<p><strong>\uc0\u20849 \u21516 \u27675 \u22260 \u65306 </strong>$\{commonMoods.join('\u12289 ')\}</p>`;\
    \}\
    \
    summaryHTML += `<p><strong>\uc0\u33394 \u35843 \u23545 \u27604 \u65306 </strong>\u22270 \u29255 1\u20026 $\{brightness1\}\u33394 \u35843 \u65292 \u22270 \u29255 2\u20026 $\{brightness2\}\u33394 \u35843 </p>`;\
    summaryHTML += `<p><strong>\uc0\u39281 \u21644 \u24230 \u23545 \u27604 \u65306 </strong>\u22270 \u29255 1\u20026 $\{saturation1\}\u65292 \u22270 \u29255 2\u20026 $\{saturation2\}</p>`;\
    \
    elements.compareSummary.innerHTML = summaryHTML;\
\}\
\
// \uc0\u28210 \u26579 \u25910 \u34255 \u21015 \u34920 \
function renderFavorites(category = 'all') \{\
    elements.favoritesContainer.innerHTML = '';\
    \
    let filteredFavorites = favorites;\
    if (category !== 'all') \{\
        filteredFavorites = favorites.filter(fav => fav.category === category);\
    \}\
    \
    if (filteredFavorites.length === 0) \{\
        elements.emptyFavorites.classList.remove('hidden');\
        return;\
    \}\
    \
    elements.emptyFavorites.classList.add('hidden');\
    \
    filteredFavorites.forEach(fav => \{\
        const card = document.createElement('div');\
        card.className = 'bg-white rounded-xl card-shadow p-4 hover-lift';\
        \
        card.innerHTML = `\
            <div class="flex gap-4 mb-4">\
                <img src="$\{fav.imageData\}" alt="\uc0\u25910 \u34255 \u30340 \u22270 \u29255 " class="w-20 h-20 object-cover rounded-lg">\
                <div class="flex-1">\
                    <div class="flex gap-1 mb-2">\
                        $\{fav.colors.slice(0, 4).map(color => `\
                            <div class="w-6 h-6 rounded" style="background-color: $\{color\}"></div>\
                        `).join('')\}\
                    </div>\
                    <div class="flex flex-wrap gap-1">\
                        $\{fav.style.style.map(tag => `\
                            <span class="px-2 py-0.5 bg-neutral-50 text-neutral-300 rounded text-xs">$\{tag\}</span>\
                        `).join('')\}\
                    </div>\
                </div>\
            </div>\
            <div class="flex gap-2">\
                <button class="copy-fav-prompt flex-1 px-3 py-2 bg-primary text-white rounded-lg text-sm" data-id="$\{fav.id\}">\
                    <i class="fa fa-copy mr-1"></i> \uc0\u22797 \u21046 \u25552 \u31034 \u35789 \
                </button>\
                <button class="delete-fav px-3 py-2 bg-red-50 text-red-500 rounded-lg text-sm" data-id="$\{fav.id\}">\
                    <i class="fa fa-trash"></i>\
                </button>\
            </div>\
        `;\
        \
        elements.favoritesContainer.appendChild(card);\
    \});\
    \
    // \uc0\u28155 \u21152 \u20107 \u20214 \u30417 \u21548 \u22120 \
    document.querySelectorAll('.copy-fav-prompt').forEach(btn => \{\
        btn.addEventListener('click', (e) => \{\
            const id = parseInt(e.currentTarget.dataset.id);\
            const fav = favorites.find(f => f.id === id);\
            if (fav) \{\
                copyToClipboard(fav.prompt);\
                showToast('\uc0\u24050 \u22797 \u21046 \u25552 \u31034 \u35789 ');\
            \}\
        \});\
    \});\
    \
    document.querySelectorAll('.delete-fav').forEach(btn => \{\
        btn.addEventListener('click', (e) => \{\
            const id = parseInt(e.currentTarget.dataset.id);\
            deleteFavorite(id);\
        \});\
    \});\
\}\
\
// \uc0\u31579 \u36873 \u25910 \u34255 \
function filterFavorites(category) \{\
    elements.categoryBtns.forEach(btn => \{\
        btn.classList.remove('active', 'bg-primary', 'text-white');\
        btn.classList.add('bg-neutral-50', 'text-neutral-400');\
    \});\
    \
    document.querySelector(`[data-category="$\{category\}"]`).classList.add('active', 'bg-primary', 'text-white');\
    document.querySelector(`[data-category="$\{category\}"]`).classList.remove('bg-neutral-50', 'text-neutral-400');\
    \
    renderFavorites(category);\
\}\
\
// \uc0\u21024 \u38500 \u25910 \u34255 \
function deleteFavorite(id) \{\
    favorites = favorites.filter(fav => fav.id !== id);\
    localStorage.setItem('styleFavorites', JSON.stringify(favorites));\
    updateFavCount();\
    renderFavorites();\
    showToast('\uc0\u24050 \u21024 \u38500 \u25910 \u34255 ');\
\}\
\
// \uc0\u28165 \u31354 \u25152 \u26377 \u25910 \u34255 \
function clearAllFavorites() \{\
    if (confirm('\uc0\u30830 \u23450 \u35201 \u28165 \u31354 \u25152 \u26377 \u25910 \u34255 \u21527 \u65311 \u27492 \u25805 \u20316 \u19981 \u21487 \u24674 \u22797 \u12290 ')) \{\
        favorites = [];\
        localStorage.setItem('styleFavorites', JSON.stringify(favorites));\
        updateFavCount();\
        renderFavorites();\
        showToast('\uc0\u24050 \u28165 \u31354 \u25152 \u26377 \u25910 \u34255 ');\
    \}\
\}\
\
// \uc0\u26356 \u26032 \u25910 \u34255 \u25968 \u37327 \
function updateFavCount() \{\
    elements.favCount.textContent = favorites.length;\
\}\
\
// \uc0\u26816 \u26597 \u25910 \u34255 \u26159 \u21542 \u20026 \u31354 \
function checkFavoritesEmpty() \{\
    if (favorites.length === 0) \{\
        elements.emptyFavorites.classList.remove('hidden');\
    \} else \{\
        elements.emptyFavorites.classList.add('hidden');\
    \}\
\}\
\
// \uc0\u22797 \u21046 \u21040 \u21098 \u36148 \u26495 \
function copyToClipboard(text) \{\
    navigator.clipboard.writeText(text).catch(() => \{\
        // \uc0\u38477 \u32423 \u26041 \u26696 \
        const textarea = document.createElement('textarea');\
        textarea.value = text;\
        document.body.appendChild(textarea);\
        textarea.select();\
        document.execCommand('copy');\
        document.body.removeChild(textarea);\
    \});\
\}\
\
// \uc0\u26174 \u31034 \u36890 \u30693 \
function showToast(message, type = 'success') \{\
    elements.toastMessage.textContent = message;\
    \
    // \uc0\u26681 \u25454 \u31867 \u22411 \u20462 \u25913 \u39068 \u33394 \
    elements.toast.classList.remove('bg-neutral-500', 'bg-red-500', 'bg-yellow-500');\
    if (type === 'error') \{\
        elements.toast.classList.add('bg-red-500');\
    \} else if (type === 'warning') \{\
        elements.toast.classList.add('bg-yellow-500');\
    \} else \{\
        elements.toast.classList.add('bg-neutral-500');\
    \}\
    \
    // \uc0\u26174 \u31034 \u36890 \u30693 \
    elements.toast.classList.remove('translate-y-20', 'opacity-0');\
    \
    // 3\uc0\u31186 \u21518 \u38544 \u34255 \
    setTimeout(() => \{\
        elements.toast.classList.add('translate-y-20', 'opacity-0');\
    \}, 3000);\
\}\
\
// \uc0\u39029 \u38754 \u21152 \u36733 \u23436 \u25104 \u21518 \u21021 \u22987 \u21270 \
window.addEventListener('DOMContentLoaded', init);}
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');

// 配置参数
const API_URL = 'https://www.dmoe.cc/random.php';
const INTERVAL_TIME = 5000; // 5秒
const DOWNLOAD_DIR = path.join(__dirname, 'images'); // 指定下载目录

// 确保下载目录存在
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`已创建目录: ${dirPath}`);
    }
}

// 下载图片的函数
async function downloadImage(imageUrl) {
    const timestamp = new Date().getTime();
    const filename = path.join(DOWNLOAD_DIR, `${timestamp}.jpg`);

    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filename);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                console.log(`图片已保存: ${filename}`);
                resolve();
            });
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('下载图片时出错:', error.message);
        throw error;
    }
}

// 获取随机图片并处理重定向
async function fetchRandomImage() {
    try {
        // 添加时间戳避免缓存
        const urlWithTimestamp = `${API_URL}?t=${new Date().getTime()}`;

        // 使用axios跟随重定向
        const response = await axios.get(urlWithTimestamp, {
            maxRedirects: 5, // 允许最多5次重定向
            validateStatus: status => status >= 200 && status < 400 // 允许所有成功状态码
        });

        // 获取最终重定向后的URL
        const finalUrl = response.request.res.responseUrl || urlWithTimestamp;

        // 下载图片
        await downloadImage(finalUrl);
    } catch (error) {
        console.error('获取图片时出错:', error.message);
    }
}

// 初始化并启动定时器
async function startDownloading() {
    console.log('开始定时获取图片...');
    ensureDirectoryExists(DOWNLOAD_DIR);

    // 立即执行一次
    await fetchRandomImage();

    // 设置定时器，每5秒执行一次
    const intervalId = setInterval(fetchRandomImage, INTERVAL_TIME);

    // 提供停止功能
    process.on('SIGINT', () => {
        clearInterval(intervalId);
        console.log('已停止定时获取图片');
        process.exit();
    });
}

// 启动脚本
startDownloading().catch(console.error);
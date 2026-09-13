const fs = require('fs');
const path = require('path');

// 先处理Markdown文件中的图片
console.log('开始处理Markdown图片...');
try {
  const { processAllMarkdownFiles } = require('./articles/processImages.js');
  processAllMarkdownFiles();
  console.log('Markdown图片处理完成！');
} catch (error) {
  console.error('处理Markdown图片时出错:', error.message);
}

// 源目录和目标目录
const sourceDir = path.join(__dirname, 'articles');
const targetDir = path.join(__dirname, 'dist', 'articles');

// 确保目标目录存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 复制所有Markdown文件
fs.readdirSync(sourceDir).forEach(file => {
  if (file.endsWith('.md')) {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`复制Markdown: ${file}`);
  }
});

// 复制images目录
const sourceImagesDir = path.join(sourceDir, 'images');
const targetImagesDir = path.join(targetDir, 'images');

if (fs.existsSync(sourceImagesDir)) {
  // 确保目标images目录存在
  if (!fs.existsSync(targetImagesDir)) {
    fs.mkdirSync(targetImagesDir, { recursive: true });
  }
  
  // 复制所有图片文件
  fs.readdirSync(sourceImagesDir).forEach(imageFile => {
    const sourceImage = path.join(sourceImagesDir, imageFile);
    const targetImage = path.join(targetImagesDir, imageFile);
    fs.copyFileSync(sourceImage, targetImage);
    console.log(`复制图片: ${imageFile}`);
  });
}

console.log('所有文件复制完成！');
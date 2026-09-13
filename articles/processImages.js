const fs = require('fs');
const path = require('path');

// 处理单个Markdown文件的图片
function processMarkdownImages(markdownFile) {
  const content = fs.readFileSync(markdownFile, 'utf8');
  let modifiedContent = content;
  
  // 匹配Markdown中的图片语法 ![alt](path)
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  const processedImages = [];
  
  while ((match = imageRegex.exec(content)) !== null) {
    const altText = match[1];
    let imagePath = match[2];
    
    // 处理所有类型的图片路径
    try {
      // 检查是否是网络图片
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        console.log(`跳过网络图片: ${imagePath}`);
        continue;
      }
      
      // 获取图片文件名
      const fileName = path.basename(imagePath);
      const destPath = path.join(__dirname, 'images', fileName);
      
      // 确定图片的源路径
      let sourcePath;
      if (imagePath.includes(':/') || imagePath.includes('\\')) {
        // 绝对路径
        sourcePath = imagePath;
      } else if (imagePath.startsWith('./')) {
        // 相对路径 - 相对于markdown文件所在目录
        sourcePath = path.join(path.dirname(markdownFile), imagePath);
      } else {
        // 相对路径（无./前缀）
        sourcePath = path.join(path.dirname(markdownFile), 'images', imagePath);
      }
      
      // 检查源文件是否存在
      if (fs.existsSync(sourcePath)) {
        // 复制图片到articles/images目录
        fs.copyFileSync(sourcePath, destPath);
        console.log(`复制图片: ${sourcePath} -> ${destPath}`);
        
        // 替换为正确的相对路径 - ./articles/images/
        const relativePath = `./articles/images/${fileName}`;
        modifiedContent = modifiedContent.replace(
          `!${match[0].substring(1)}`,
          `![${altText}](${relativePath})`
        );
        
        processedImages.push({
          original: imagePath,
          newPath: relativePath,
          fileName: fileName
        });
      } else {
        console.warn(`图片文件不存在: ${sourcePath}`);
      }
    } catch (error) {
      console.error(`处理图片失败 ${imagePath}:`, error.message);
    }
  }
  
  // 如果有图片被处理，保存修改后的Markdown文件
  if (processedImages.length > 0) {
    fs.writeFileSync(markdownFile, modifiedContent, 'utf8');
    console.log(`已处理 ${processedImages.length} 张图片并更新文件: ${path.basename(markdownFile)}`);
  } else {
    console.log(`未发现需要处理的图片: ${path.basename(markdownFile)}`);
  }
  
  return processedImages;
}

// 处理articles目录下所有Markdown文件
function processAllMarkdownFiles() {
  const articlesDir = __dirname;
  const files = fs.readdirSync(articlesDir);
  
  // 确保images目录存在
  const imagesDir = path.join(articlesDir, 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('创建images目录');
  }
  
  let totalProcessed = 0;
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(articlesDir, file);
      console.log(`\n处理文件: ${file}`);
      
      const processed = processMarkdownImages(filePath);
      totalProcessed += processed.length;
    }
  });
  
  console.log(`\n=== 处理完成 ===`);
  console.log(`总共处理了 ${totalProcessed} 张图片`);
  
  return totalProcessed;
}

// 导出函数供其他脚本使用
module.exports = {
  processMarkdownImages,
  processAllMarkdownFiles
};

// 如果直接运行此脚本，则处理所有文件
if (require.main === module) {
  processAllMarkdownFiles();
}
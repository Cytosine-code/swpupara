<template>
  <div class="news-page">
    <div class="news-container">
      <!-- 左侧文章导航栏 -->
      <div class="articles-nav">
        <div class="nav-header">
          <h2>实验室最新动态</h2>
        </div>
        <div class="articles-list">
          <div 
            v-for="article in articles" 
            :key="article.idx"
            :class="['article-card', { active: selectedArticle?.idx === article.idx }]"
            @click="selectArticle(article)"
          >
            <h3 class="article-title">{{ article.title }}</h3>
            <span class="article-date">{{ formatDate(article.date) }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧文章内容 -->
      <div class="article-content">
        <div v-if="selectedArticle" class="content-wrapper">
          <article class="markdown-article">
            <div v-html="articleContent"></div>
          </article>
        </div>
        <div v-else class="placeholder">
          <div class="placeholder-content">
            <h2>欢迎阅读最新动态</h2>
            <p>请从左侧选择一篇文章开始阅读</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';
import { articles } from '../articles/articles.js';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown.css';

// 配置marked选项
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
});

export default {
  name: 'NewsPage',
  data() {
    return {
      articles: [],
      selectedArticle: null,
      articleContent: ''
    };
  },
  async mounted() {
    this.articles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 检查URL参数，如果有文件名则选择对应文章
    const urlParams = new URLSearchParams(window.location.search);
    const filename = urlParams.get('filename');
    
    if (filename) {
      const targetArticle = this.articles.find(article => article.filename === filename);
      if (targetArticle) {
        await this.selectArticle(targetArticle);
        return;
      }
    }
    
    // 默认选择最新文章
    if (this.articles.length > 0) {
      await this.selectArticle(this.articles[0]);
    }
  },
  methods: {
    async selectArticle(article) {
      this.selectedArticle = article;
      
      // 更新URL，添加文件名参数
    const url = new URL(window.location);
    url.searchParams.set('filename', article.filename);
    window.history.replaceState({}, '', url);
      
      try {
        // 使用fetch加载Markdown文件（基于 base 相对路径，兼容 GitHub Pages 子路径部署）
        const response = await fetch(`${import.meta.env.BASE_URL}articles/${article.filename}`);
        if (!response.ok) throw new Error('文件加载失败');
        const markdownText = await response.text();
        this.articleContent = marked.parse(markdownText);
        
        // 在下一个DOM更新周期后高亮代码块并添加复制功能
    this.$nextTick(() => {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
        this.addCopyButton(block);
      });
    });
      } catch (error) {
        console.error('加载文章失败:', error);
        this.articleContent = '<p>文章加载失败，请稍后再试。</p>';
      }
    },
    
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    },
    
    // 添加复制按钮到代码块
    addCopyButton(codeBlock) {
      const preElement = codeBlock.closest('pre');
      if (preElement && !preElement.querySelector('.copy-button')) {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = 'copyCode';
        copyButton.title = '复制代码';
        copyButton.style.cssText = `
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 3px;
          padding: 0.3rem 0.5rem;
          font-size: 0.75rem;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s ease;
        `;
        
        copyButton.addEventListener('click', () => {
          const code = codeBlock.textContent;
          navigator.clipboard.writeText(code).then(() => {
            copyButton.innerHTML = '✅';
            setTimeout(() => {
              copyButton.innerHTML = 'CopyCode';
            }, 2000);
          });
        });
        
        preElement.style.position = 'relative';
        preElement.appendChild(copyButton);
        
        // 鼠标悬停时显示复制按钮
        preElement.addEventListener('mouseenter', () => {
          copyButton.style.opacity = '1';
        });
        preElement.addEventListener('mouseleave', () => {
          copyButton.style.opacity = '0';
        });
      }
    }
  }
};
</script>

<style scoped>
.news-page {
  min-height: calc(100vh - 120px);
  padding: 2rem;
  background-color: #f8f9fa;
}

.news-container {
  display: grid;
  grid-template-columns: 1fr 3fr; /* 调整比例：左侧1份，右侧3份 */
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 600px;
}

/* 左侧文章导航栏样式 */
.articles-nav {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(8, 8, 8, 0.379);
  height: fit-content;
  max-height: 480px; /* 限制最大高度，大约显示6张卡片 */
  overflow-y: auto;
  position: relative;
}

.nav-header h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 400px; /* 确保内容区域有滚动空间 */
}

.article-card {
  padding: 0.8rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.article-card:hover {
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
  border-left-color: #007bff;
}

.article-card.active {
  border-color: #0173ed;
  background: #e3f2fd;
  border-left-color: #007bff;
}

.article-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.3rem;
  line-height: 1.3;
}

.article-excerpt {
  color: #6c757d;
  font-size: 0.8rem;
  line-height: 1.3;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-date {
  font-size: 0.7rem;
  color: #adb5bd;
  font-weight: 500;
}

/* 右侧文章内容样式 */
.article-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 600px;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.markdown-article {
  line-height: 1.8;
  color: #495057;
}

/* 应用GitHub风格的Markdown样式 */
.markdown-article {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

.markdown-article :deep(h1) {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.markdown-article :deep(h2) {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.markdown-article :deep(h3) {
  font-size: 1.25rem;
  color: #2c3e50;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.markdown-article :deep(p) {
  margin-bottom: 1.5rem;
}

.markdown-article :deep(ul),
.markdown-article :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.markdown-article :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown-article :deep(code) {
  background: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
}

/* 图片样式 */
.markdown-article :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.5rem auto;
  border-radius: 6px;
}

/* 代码块样式 */
.markdown-article :deep(pre) {
  background: #f6f8fa;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid #e1e4e8;
}

.markdown-article :deep(pre code) {
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* 引用栏样式 */
.markdown-article :deep(blockquote) {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-left: 4px solid #003366;
  margin: 1.5rem 0;
  padding: 1.5rem 1.5rem 1.5rem 2rem;
  border-radius: 0 8px 8px 0;
  position: relative;
  font-style: italic;
  color: #495057;
  box-shadow: 0 2px 8px rgba(0, 51, 102, 0.1);
}

.markdown-article :deep(blockquote::before) {
  content: "\201C";
  font-size: 3rem;
  color: #003366;
  opacity: 0.3;
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  font-family: Georgia, serif;
}

.markdown-article :deep(blockquote p) {
  margin: 0;
  line-height: 1.6;
  font-size: 1.1rem;
}

.markdown-article :deep(blockquote cite) {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #6c757d;
  font-style: normal;
  font-weight: 500;
}

/* 代码复制按钮样式 */
.markdown-article :deep(.copy-button) {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.3rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.markdown-article :deep(pre:hover .copy-button) {
  opacity: 1;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #6c757d;
}

.placeholder-content {
  text-align: center;
}

.placeholder-content h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #495057;
}

.placeholder-content p {
  font-size: 1rem;
  color: #6c757d;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .news-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .articles-nav {
    max-height: 300px;
    overflow-y: auto;
  }
  
  .article-content {
    padding: 1.5rem;
    min-height: auto;
    box-sizing: border-box;
    overflow: hidden;
  }
  
  .markdown-article :deep(h1) {
    font-size: 1.5rem;
  }
  
  .article-card {
    padding: 1rem;
  }
  
  .placeholder {
    height: 300px;
  }
  
  /* 修复手机上代码块宽度问题 */
  .markdown-article :deep(pre) {
    box-sizing: border-box;
    width: 100%;
    padding: 0.75rem;
    margin: 1rem 0;
  }
  
  .markdown-article :deep(pre code) {
    font-size: 0.85rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    line-height: 1.5;
  }
}
</style>
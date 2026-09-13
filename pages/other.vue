<template>
  <div class="other-container">
    <!-- 左右布局容器 -->
    <div class="two-column-layout">
      <!-- 左侧：算力资源部分 -->
      <section class="computing-resources">
        <div class="section-header">
          <h2>算力服务</h2>
          <p>强大的计算平台支持您的科研与创新</p>
        </div>
        <div class="resources-grid">
          <!-- 第一张卡片 -->
          <div class="resource-card">
            <img src="/computer1.jpg" alt="算力资源1" class="card-image" />
            <div class="card-content">
              <h3>西南石油大学高性能计算平台</h3>
              <p>西南石油大学自主搭建的高性能计算平台，提供强大的GPU计算资源，支持深度学习、科学计算和大规模并行计算任务。部署并私有化Deepseek模型。访问前请确保已经接入校园网并申请了机时。</p>
              <button class="go-button" @click="goToExternal('https://hpc.swpu.edu.cn/')">GO!</button>
            </div>
          </div>
          
          <!-- 第二张卡片 -->
          <div class="resource-card">
            <img src="/computer2.jpg" alt="算力资源2" class="card-image" />
            <div class="card-content">
              <h3>北京超级云计算中心</h3>
              <p>第三方付费计算平台，支持双节点64CPUs并行。具备公网访问能力，快捷上传文件。供团队日常训练，学习。</p>
              <button class="go-button" @click="goToExternal('https://cloud.blsc.cn/')">GO!</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 右侧：友情团队部分 -->
      <section class="friendly-teams">
        <div class="section-header">
          <h2>友情团队</h2>
          <p>西南石油大学(NC)的其它学科竞赛团队</p>
        </div>
        <div class="teams-grid">
          <!-- 团队卡片1 -->
          <div class="team-card">
            <div class="team-info">
              <h3>ACM团队</h3>
              <p>专注于算法竞赛。于国内众多高含金量程序设计竞赛争金夺银</p>
              <button class="go-button" @click="goToExternal('http://acm.mangata.ltd/')">GO!</button>
            </div>
            <img src="/labdeco1.jpg" alt="ACM团队" class="team-image" />
          </div>

          <!-- 团队卡片2 -->
          <div class="team-card">
            <div class="team-info">
              <h3>NSSCTF</h3>
              <p>网络安全实验室。专注于信息安全、网络攻防和密码学技术的研究。</p>
              <button class="go-button" @click="goToExternal('https://www.nssctf.cn')">GO!</button>
            </div>
            <img src="/labdeco2.jpg" alt="NSSCTF" class="team-image" />
          </div>

          <!-- 团队卡片3 -->
          <div class="team-card">
            <div class="team-info">
              <h3>灵创新媒</h3>
              <p>制作 游戏、影视 CG 等数字媒体项目的团队。让计算机技术可视化，让创意实现，让乐趣无限。</p>
              <button class="go-button" @click="goToExternal('https://www.lcxm.site/')">GO!</button>
            </div>
            <img src="/labdeco3.jpg" alt="灵创新媒" class="team-image" />
          </div>

          <!-- 团队卡片4 -->
          <div class="team-card">
            <div class="team-info">
              <h3>乐程团队</h3>
              <p>专注于计算机各项技术，包括前端，后端，嵌入式，机器学习和微课</p>
              <button class="go-button" @click="goToExternal('#')">GO!</button>
            </div>
            <img src="/labdeco4.jpg" alt="乐程团队" class="team-image" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OtherComponent',
  methods: {
    goToExternal(url) {
      // 在新标签页打开外部链接
      window.open(url, '_blank');
    }
  },
  mounted() {
    // 页面加载时滚动到顶部
    window.scrollTo(0, 0);
  }
}
</script>

<style scoped>
.other-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

/* 左右布局 */
.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

/* 算力资源部分样式 */
.computing-resources {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(30, 136, 229, 0.15);
  border: 1px solid #90caf9;
}

/* 友情团队部分样式 */
.friendly-teams {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(156, 39, 176, 0.15);
  border: 1px solid #ce93d8;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  color: #003366;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  font-weight: bold;
}

.section-header p {
  color: #666;
  font-size: 1rem;
  font-style: italic;
}

.resources-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.resource-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  min-height: 280px; /* 最小高度而不是固定高度 */
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0; /* 防止图片被压缩 */
}

.card-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1; /* 让内容区域自动扩展 */
}

.card-content h3 {
  color: #003366;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  flex-shrink: 0; /* 防止标题被压缩 */
}

.card-content p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 0.9rem;
  flex: 1; /* 描述文字自动扩展 */
  min-height: 60px; /* 确保有足够空间显示文字 */
}

/* 确保按钮始终在底部 */
.card-content .go-button {
  margin-top: auto; /* 自动上边距，将按钮推到底部 */
  align-self: flex-start;
}

/* 友情团队部分样式 */
.teams-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.team-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
  min-height: 140px;
  display: flex;
  align-items: stretch;
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.team-info {
  flex: 1;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
}

.team-info h3 {
  color: #003366;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  flex-shrink: 0;
}

.team-info p {
  color: #666;
  margin-bottom: 0.75rem;
  line-height: 1.5;
  font-size: 0.9rem;
  flex: 1;
  min-height: 40px;
}

.team-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin: 10px;
  border-radius: 8px;
  align-self: center;
  flex-shrink: 0;
}

/* 确保按钮始终在底部 */
.team-info .go-button {
  margin-top: auto;
  align-self: flex-start;
}

/* GO按钮样式 */
.go-button {
  background: linear-gradient(135deg, #003366, #0066cc);
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  align-self: flex-start;
}

.go-button:hover {
  background: linear-gradient(135deg, #0066cc, #004080);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.4);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .two-column-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .computing-resources,
  .friendly-teams {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .other-container {
    padding: 1rem;
  }
  
  .team-card {
    flex-direction: column;
    height: auto;
  }
  
  .team-image {
    width: 100%;
    height: 150px;
    margin: 0;
    border-radius: 0;
  }
  
  .card-image {
    height: 160px;
  }
  
  .section-header h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .computing-resources,
  .friendly-teams {
    padding: 1rem;
  }
  
  .card-content,
  .team-info {
    padding: 1rem;
  }
  
  .go-button {
    padding: 0.5rem 1.2rem;
    font-size: 0.85rem;
  }
}
</style>
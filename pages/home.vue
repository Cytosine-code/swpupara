<template>
  <div class="home-container">
    <!-- 左侧导航 -->
    <aside class="sidebar">
      <nav class="side-nav">
        <ul>
          <li><a @click="scrollToSection('intro')">简介</a></li>
          <li><a @click="scrollToSection('research')">研究方向</a></li>
          <li><a @click="scrollToSection('honors')">主要荣誉</a></li>
          <li><a @click="scrollToSection('presence')">团队风采</a></li>
          <li><a @click="scrollToSection('members')">指导老师</a></li>
        </ul>
      </nav>
    </aside>

    <!-- 主内容区域 -->
    <main class="main-content">
      <section id="intro" class="section">
        <h1>团队简介</h1>
        <img src="/backboard.jpg" alt="团队照片" class="team-photo" />
        <p>
          实验室团队主要面向国内或国际的超算类型比赛，开展已有程序的优化、算子的优化、程序的设计、加速高性能计算（HPC）平台的基准测试等工作。通过在比赛中学习计算机相关知识，研究程序运行原理，运用各种技术加速手段，为学校在相关赛事赢得荣誉，同时提升团队成员自身技术水平。
        </p>
        <p>
          我们的目标是通过持续的创新研究，解决实际问题，为社会创造价值。欢迎有志于超算研究的优秀人才加入我们，
          共同探索科技的无限可能。
        </p>
      </section>

      <section id="research" class="section research-section">
        <h2>研究方向</h2>
        <p class="research-intro">
          我们的研究主要集中在以下几个前沿方向：
        </p>
        <div class="slanted-cards-container">
          <div class="slanted-card" data-category="hpc">
            <div class="card-bg" style="background-image: url('/photo.jpg');"></div>
            <div class="card-content">
              <div class="research-icon">🧠</div>
              <h3>人工智能</h3>
              <p>深度学习、卷积神经网络、计算机视觉</p>
              <div class="research-details">
                <span>机器学习</span>
                <span>CNN</span>
                <span>CV算法</span>
              </div>
            </div>
          </div>
          
          <div class="slanted-card" data-category="ai">
            <div class="card-bg" style="background-image: url('/photo.jpg');"></div>
            <div class="card-content">
              <div class="research-icon">🚀</div>
              <h3>高性能计算</h3>
              <p>GPU计算、程序性能优化、算子开发</p>
              <div class="research-details">
                <span>并行计算</span>
                <span>性能调优</span>
                <span>GPU加速</span>
              </div>
            </div>
          </div>
          
          <div class="slanted-card" data-category="parallel">
            <div class="card-bg" style="background-image: url('/photo.jpg');"></div>
            <div class="card-content">
              <div class="research-icon">⚡</div>
              <h3>并行程序设计</h3>
              <p>openMP，SIMD，MPI，AVX应用</p>
              <div class="research-details">
                <span>多线程</span>
                <span>向量化</span>
                <span>分布式</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="honors" class="section">
        <h2>主要荣誉</h2>
        <ul>
          <li>2021年 ASC世界大学生超级计算机竞赛二等奖🏆</li>
          <li>2022年 ASC世界大学生超级计算机竞赛二等奖🏆</li>
          <li>2022年 IPCC国际并行计算挑战赛初赛二等奖 优胜奖🏆</li>
          <li>2023年 Intel OneAPI校园黑客松竞赛全国三等奖🏆</li>
          <li>2023年 第四届“先导杯”计算应用大赛全国二等奖🏆</li>
          <li>2024年 PAC全国并行应用挑战赛应用组一等奖 🏆</li>
          <li>2024年 第四届线性解法器算法与性能优化竞赛三等奖🏆</li>
        </ul>
      </section>

      <section id="presence" class="section">
        <h2>团队风采</h2>
        <div class="gallery-container">
          <div class="gallery-scroll">
            <div class="gallery-track">
              <div class="gallery-item">
                <img src="/show1.png" alt="团队风采展示1" />
              </div>
              <div class="gallery-item">
                <img src="/show2.png" alt="团队风采展示2" />
              </div>
              <div class="gallery-item">
                <img src="/show3.png" alt="团队风采展示3" />
              </div>
              <div class="gallery-item">
                <img src="/show4.png" alt="团队风采展示4" />
              </div>
              <div class="gallery-item">
                <img src="/show5.png" alt="团队风采展示5" />
              </div>
              <div class="gallery-item">
                <img src="/show6.png" alt="团队风采展示6" />
              </div>
              <div class="gallery-item">
                <img src="/show7.png" alt="团队风采展示7" />
              </div>
            </div>
          </div>
          <div class="gallery-controls">
            <button class="gallery-btn prev" @click="scrollGallery(-1)">
              &lt;
            </button>
            <button class="gallery-btn next" @click="scrollGallery(1)">
              &gt;
            </button>
          </div>
        </div>
      </section>

      <section id="members" class="section">
        <h2>指导老师</h2>
        <div class="members-grid">
          <div class="member-card">
            <img src="/teacher1.jpg" alt="成员照片" />
            <h3>彭博</h3>
            <p>教授，副院长，硕士生导师，四川大学博士，美国密歇根理工大学博士后。清华大学国内中青年骨干教师访问学者。四川省学术和技术带头人后备人选。CCF YOCSEF成都（2021-2022）学术委员会主席。IPPC团队负责人。主要从事医学图像与信号处理、医学超声成像、高性能计算及基于深度学习/机器学习的交叉学科应用的研究。</p>
          </div>
          <div class="member-card">
            <img src="/teacher2.jpg" alt="成员照片" />
            <h3>张全</h3>
            <p>副教授，硕士生导师，中国科学院大学与电子科技大学联合培养博士。曾在中国电子科技集团公司第三十研究所，保密通信重点实验室，担任工程师。主要从事图像处理、计算机视觉、地震/油气压裂信号处理、高性能计算方向研究。</p>
          </div>
          <div class="member-card">
            <img src="/teacher3.jpg" alt="成员照片" />
            <h3>李艳</h3>
            <p>讲师，专业从事大数据分析和机器学习等领域的应用研究工作10余年。发表相关期刊论文7篇，其中SCI论文3篇，申请国家发明专利6项，授权4项。</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    scrollGallery(direction) {
      const galleryScroll = this.$el.querySelector('.gallery-scroll');
      const galleryTrack = this.$el.querySelector('.gallery-track');
      const galleryItem = this.$el.querySelector('.gallery-item');
      
      if (galleryScroll && galleryTrack && galleryItem) {
        const itemWidth = galleryItem.offsetWidth + 20; // 包括间距
        const scrollAmount = itemWidth * 3; // 每次滚动3个图片的宽度
        
        if (direction === 1) {
          // 向右滚动
          galleryScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
          // 向左滚动
          galleryScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  },
  mounted() {
    // 页面加载时滚动到顶部
    window.scrollTo(0, 0);
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
}

.sidebar {
  flex: 0 0 250px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.side-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-nav li {
  margin-bottom: 0.5rem;
}

.side-nav a {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.side-nav a:hover,
.side-nav a:focus {
  background-color: #003366;
  color: white;
}

.main-content {
  flex: 1;
  max-height: 100vh; /* 限制最大高度 */
  overflow-y: auto;   /* 允许垂直滚动 */
}

.section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  scroll-margin-top: 80px;
}

.section h1,
.section h2 {
  color: #003366;
  margin-top: 0;
}

.team-photo {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
  display: block;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.2rem;
  margin-top: 1rem;
}

.member-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.2rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.member-card:hover {
  transform: translateY(-5px);
}

.member-card img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 0.8rem;
}

.member-card h3 {
  margin: 0 0 0.5rem 0;
  color: #003366;
}

.member-card p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

/* 斜卡片研究方向样式 */
.research-section {
  overflow: hidden;
}

.research-intro {
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.slanted-cards-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 0 auto;
  max-width: 1200px;
  perspective: 1000px;
}

.slanted-card {
  flex: 1;
  min-width: 280px;
  height: 380px;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.5s ease;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 51, 102, 0.2);
}

.slanted-card:nth-child(1) {
  transform: rotate(-5deg) translateY(20px);
}

.slanted-card:nth-child(2) {
  transform: rotate(0deg) translateY(0px);
}

.slanted-card:nth-child(3) {
  transform: rotate(5deg) translateY(20px);
}

.slanted-card:hover {
  transform: rotate(0deg) translateY(-15px) scale(1.05);
  box-shadow: 0 30px 60px rgba(0, 51, 102, 0.3);
  z-index: 10;
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.7) contrast(1.1);
  transition: all 0.5s ease;
}

.slanted-card:hover .card-bg {
  filter: brightness(0.8) contrast(1.2);
  transform: scale(1.1);
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(0, 51, 102, 0.9) 0%,
    rgba(74, 144, 226, 0.8) 100%
  );
  color: white;
  text-align: center;
}

.research-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}

.slanted-card:hover .research-icon {
  transform: scale(1.2) rotate(10deg);
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
}

.slanted-card h3 {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.slanted-card > .card-content > p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  opacity: 0.95;
}

.research-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
}

.research-details span {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.slanted-card:hover .research-details span {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* 不同研究方向的主题色 */
.slanted-card[data-category="hpc"] .card-content {
  background: linear-gradient(135deg, #00264d, #003366);
}

.slanted-card[data-category="ai"] .card-content {
  background: linear-gradient(135deg, #000e66, #0053a5);
}

.slanted-card[data-category="parallel"] .card-content {
  background: linear-gradient(135deg, #003366, #004080);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .slanted-cards-container {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  
  .slanted-card {
    min-width: 320px;
    max-width: 400px;
  }
  
  .slanted-card:nth-child(1),
  .slanted-card:nth-child(2),
  .slanted-card:nth-child(3) {
    transform: none;
    margin: 0;
  }
  
  .slanted-card:hover {
    transform: translateY(-10px) scale(1.03);
  }
}

@media (max-width: 768px) {
  .slanted-card {
    min-width: 280px;
    height: 350px;
  }
  
  .research-icon {
    font-size: 3rem;
  }
  
  .slanted-card h3 {
    font-size: 1.4rem;
  }
}

@media (max-width: 768px) {
  .home-container {
    flex-direction: column;
    padding: 1rem;
  }

  .sidebar {
    display: none; /* 移动设备宽度时隐藏左侧导航栏 */
  }
}

/* 画廊样式 */
.gallery-container {
  position: relative;
  margin-top: 1.5rem;
  max-height: 400px; /* 限制画廊最大高度 */
}

.gallery-scroll {
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  max-height: 350px; /* 限制滚动区域高度 */
}

.gallery-scroll::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.gallery-track {
  display: flex;
  gap: 20px;
  padding: 10px 0;
}

.gallery-item {
  flex: 0 0 calc(33.33% - 14px); /* 每行显示3个，考虑间距 */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.gallery-item img {
  width: 100%;
  object-fit: cover;
  display: block;
  aspect-ratio: 4/3; /* 设置图片比例为4:3 */
}

.gallery-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.gallery-btn {
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.gallery-btn:hover:not(:disabled) {
  background-color: #002244;
  transform: scale(1.1);
}

.gallery-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .gallery-item {
    flex: 0 0 calc(50% - 10px); /* 中等屏幕每行显示2个 */
  }
}

@media (max-width: 640px) {
  .gallery-item {
    flex: 0 0 100%; /* 小屏幕每行显示1个 */
  }
  
  .gallery-track {
    gap: 15px;
  }
  
  .gallery-btn {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}
</style>
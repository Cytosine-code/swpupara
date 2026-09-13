<template>
  <header class="header">
    <div class="header-content">
      <img src="/teamdeco.png" alt="Team Logo" class="logo" />
      <nav class="nav">
        <button @click="navigateTo('home')" class="nav-button">团队简介</button>
        <button @click="navigateTo('news')" class="nav-button">最新动态</button>
        <button @click="navigateTo('ai')" class="nav-button">西柚AI</button>
        <div class="dropdown">
          <button class="nav-button dropdown-button">前往</button>
          <div class="dropdown-content">
            <button @click="goToUrl('判题系统')" class="dropdown-item">在线判题系统</button>
            <button @click="navigateTo('other')" class="dropdown-item">算力服务</button>
            <button @click="navigateTo('other')" class="dropdown-item">友情团队</button>
          </div>
        </div>
      </nav>
      <!-- 汉堡菜单按钮，仅在移动端显示 -->
      <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="打开菜单">
        <span class="menu-icon"></span>
      </button>
    </div>
    <!-- 移动端导航菜单 -->
    <div class="mobile-menu" v-if="showMobileMenu">
      <button @click="navigateWithClose('home')" class="mobile-menu-button">团队简介</button>
      <button @click="navigateWithClose('news')" class="mobile-menu-button">最新动态</button>
      <button @click="navigateWithClose('ai')" class="mobile-menu-button">西柚AI</button>
      <div class="mobile-dropdown">
        <button class="mobile-menu-button dropdown-toggle" @click="toggleMobileDropdown">前往 <span class="dropdown-arrow" :class="{ 'rotate': showMobileDropdown }">▼</span></button>
        <div class="mobile-dropdown-content" :class="{ 'show': showMobileDropdown }" v-if="showMobileDropdown">
          <button @click="goToUrl('判题系统')" class="mobile-dropdown-item">在线判题系统</button>
          <button @click="navigateWithClose('other')" class="mobile-dropdown-item">算力服务</button>
          <button @click="navigateWithClose('other')" class="mobile-dropdown-item">友情团队</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      showMobileMenu: false,
      showMobileDropdown: false
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    navigateWithClose(route) {
      this.navigateTo(route);
      this.closeMobileMenu();
    },
    goToUrl(type) {
      // 配置具体的跳转链接
      const urls = {
        '判题系统': 'http://47.109.181.79',
        '算力资源': '#', // 暂时留空
        '友情团队': '#'  // 暂时留空
      };
      
      if (urls[type]) {
        if (urls[type].startsWith('http')) {
          // 在当前页面跳转
          window.location.href = urls[type];
        } else if (urls[type] !== '#') {
          // 对于内部路由
          this.$router.push(urls[type]);
        }
      }
      // 关闭移动端菜单
      this.closeMobileMenu();
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    closeMobileMenu() {
      this.showMobileMenu = false;
      this.showMobileDropdown = false;
    },
    toggleMobileDropdown() {
      this.showMobileDropdown = !this.showMobileDropdown;
    }
  },
  mounted() {
    // 添加窗口大小变化监听，用于在窗口变宽时关闭移动端菜单
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeMobileMenu();
      }
    });
  },
  beforeUnmount() {
    // 移除事件监听器
    window.removeEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeMobileMenu();
      }
    });
  }
}
</script>

<style scoped>
.header {
  background-color: #003366; /* 深蓝色 */
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  height: 40px;
  /* 添加响应式缩放 */
  max-width: 100%;
  height: auto;
  max-height: 40px;
}

/* 桌面端导航样式 */
.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-button {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #003366;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 1001;
  right: 0;
  border-radius: 4px;
  overflow: hidden;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-item {
  color: white;
  padding: 0.75rem 1rem;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 移动端汉堡菜单按钮 */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background-color: white;
  position: relative;
  transition: background-color 0.3s;
}

.menu-icon:before,
.menu-icon:after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: white;
  transition: transform 0.3s;
}

.menu-icon:before {
  top: -8px;
}

.menu-icon:after {
  bottom: -8px;
}

/* 移动端菜单样式 */
.mobile-menu {
  display: none;
  background-color: #003366;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  z-index: 999;
}

/* 下拉箭头样式 */
.dropdown-arrow {
  display: inline-block;
  margin-left: 5px;
  transition: transform 0.3s ease;
  font-size: 0.7em;
}

/* 下拉箭头旋转动画 */
.dropdown-arrow.rotate {
  transform: rotate(180deg);
}

.mobile-menu-button {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 1rem 2rem;
  width: 100%;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
}

.mobile-menu-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-dropdown {
  position: relative;
}

.mobile-dropdown-content {
  /* 移除 display: none，通过 v-if 控制显示/隐藏 */
  background-color: #002244;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  /* 添加一些过渡动画 */
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

/* 当下拉菜单显示时 */
.mobile-dropdown-content.show {
  max-height: 300px;
  transition: max-height 0.3s ease-in;
}

.mobile-dropdown-item {
  color: white;
  padding: 1rem 3rem;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
}

.mobile-dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 响应式设计 - 中等屏幕 */
@media (max-width: 992px) {
  .header {
    padding: 0.75rem 1.5rem;
  }
  
  .logo {
    max-height: 35px;
  }
  
  .nav-button {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
}

/* 响应式设计 - 小屏幕 */
@media (max-width: 768px) {
  .nav {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .mobile-menu {
    display: block;
  }
  
  .logo {
    max-height: 30px;
  }
}

/* 响应式设计 - 超小屏幕 */
@media (max-width: 480px) {
  .header {
    padding: 0.5rem 1rem;
  }
  
  .logo {
    max-height: 25px;
  }
  
  .mobile-menu-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .mobile-dropdown-item {
    padding: 0.8rem 2rem;
    font-size: 0.85rem;
  }
}
</style>
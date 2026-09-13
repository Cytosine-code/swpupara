import { createRouter, createWebHashHistory } from 'vue-router'
import HomeComponent from './pages/home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/other',
    name: 'other',
    component: () => import('./pages/other.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('./pages/news.vue')
  },
  {
    path: '/ai',
    name: 'ai',
    component: () => import('./pages/aichat.vue')  
  }
]

const router = createRouter({
  // 使用哈希模式替代HTML5历史模式，这样可以直接双击HTML文件打开
  history: createWebHashHistory(),
  routes
})

export default router
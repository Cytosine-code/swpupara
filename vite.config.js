import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.VITE_DEV_SERVER_PORT) || 3000
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // 设置为相对路径，这样构建后的文件可以直接双击打开
  base: './',
  // 构建配置，确保articles目录被复制到dist中
  build: {
    rollupOptions: {
      // 复制静态资源到dist目录
      output: {
        assetFileNames: (assetInfo) => {
          // 将articles目录下的文件复制到dist/articles目录
          if (assetInfo.name && assetInfo.name.includes('articles')) {
            return 'articles/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
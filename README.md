# SWPU PARA

西南石油大学（南充校区）超算与并行计算团队门户网站。

基于 **Vue 3 + Vite** 的纯前端静态网站，文章以 Markdown 管理，无需后端服务，构建产物可直接托管至 GitHub Pages。

## 技术栈

- Vue 3 + Vue Router
- [marked](https://marked.js.org/)：Markdown 解析
- [highlight.js](https://highlightjs.org/)：代码高亮
- github-markdown-css：GitHub 风格文章排版
- Coze WebChat SDK：西柚 AI 对话服务

## 页面内容

1. 团队简介：首页长文档形式展示实验室概况 \[home.vue]
2. 最新动态：Markdown 文章列表与正文阅读，含代码高亮、一键复制 \[news.vue]
3. 西柚 AI：接入 Coze 智能体 WebChat SDK \[aichat.vue]
4. 前往：
   - 在线判题系统：URL 按钮，跳转 OJ
   - 算力资源：两个 URL 按钮，跳转算力平台 \[other.vue]
   - 友情团队：四个按钮，跳转友队门户网站 \[other.vue]

## 本地开发

要求 Node.js 16 及以上。

```bash
npm install        # 首次运行前安装依赖
npm run dev        # 启动开发服务器，默认 http://localhost:3000
npm run build      # 打包，产物输出到 docs/
npm run serve       # 本地预览构建产物（docs/）
```

### 环境变量（.env）

项目根目录需存在 `.env` 文件：

```ini
VITE_COZE_BOT_TOKEN=pat_xxxxxxxxxxxxxxxxxxxxxxxx
VITE_DEV_SERVER_PORT=3000
```

- `VITE_COZE_BOT_TOKEN`：西柚 AI 使用的 Coze 智能体访问令牌，在 [Coze 平台](https://www.coze.cn/) 获取。令牌耗尽后 AI 对话将访问失败。
- `VITE_DEV_SERVER_PORT`：开发服务器端口，缺省为 3000。

## 添加文章与解析

### 添加一篇文章

1. 将文章文件（如 `myPost.md`）放入 `articles/` 目录。
2. 在 `articles/articles.js` 的数组中追加一条记录：
   ```js
   {
     idx: 4,                              // 唯一编号，不与已有记录重复
     title: "文章标题",                    // 左侧列表中展示
     date: "2025-9-10",                   // 按日期倒序排列，最新的在前
     filename: "myPost.md"                // 必须与 articles/ 下的文件名完全一致
   }
   ```
   - 列表顺序由 `date` 决定（建议写成 `YYYY-MM-DD`，需能被 `new Date()` 正确解析），`idx` 仅用作渲染 key。
3. 文章中的图片：
   - 统一放入 `articles/images/`，Markdown 中按如下路径引用：
     ```markdown
     ![图片说明](./articles/images/xxx.png)
     ```
   - 网络图片直接写 URL 即可，构建时会自动跳过。
   - 从 Typora、语雀等笔记软件导出的 Markdown，若图片是本地绝对路径或相对路径，**无需手动处理**：构建时 `processImages.js` 会自动把这些图片复制进 `articles/images/` 并把正文里的引用改写为 `./articles/images/文件名`（前提是执行构建的电脑上源图片仍然存在）。
4. 保存后在开发页面刷新即可看到新文章，无需其他注册步骤。

### 文章是如何被解析展示的

整个过程发生在浏览器端，由 [pages/news.vue](pages/news.vue) 完成：

1. `import { articles } from '../articles/articles.js'` 读取文章登记表，页面加载时按 `date` 倒序排序。
2. 点击文章（首次进入默认打开最新一篇）后，通过 `fetch(import.meta.env.BASE_URL + 'articles/<filename>')` 拉取原始 Markdown 文本（相对 base 的路径，兼容 GitHub Pages 子路径部署）。
3. 调用 `marked.parse()` 将 Markdown 转为 HTML（开启 GFM 与换行转换），通过 `v-html` 渲染到右侧正文区。
4. 渲染完成后 `highlight.js` 对所有代码块做语法高亮，并自动为每个代码块注入“复制代码”按钮。
5. 正文排版样式由 github-markdown-css 及 news.vue 中的样式提供。
6. 支持通过 URL 参数直接定位文章，例如：
   ```
   /#/news?filename=labFAQ.md
   ```

### 构建时文章如何进入产物

`npm run build` 执行 `vite build`，随后 package.json 中的 `postbuild` 钩子会**自动**执行 `node copy-articles.js`：

1. 调用 `articles/processImages.js` 归一化所有 Markdown 中的图片路径；
2. 将 `articles/*.md` 与 `articles/images/` 复制到 `docs/articles/`。

Vite 本身不会打包项目根目录下的 Markdown 文件，因此这一步是线上文章 `fetch` 能正常访问的必要条件，请勿删除该脚本或 postbuild 配置。

## 部署到 GitHub Pages

项目配置为直接将构建产物输出到仓库内的 `docs/` 目录（`vite.config.js` 中 `build.outDir: 'docs'`），这是 GitHub Pages 原生支持的发布方式：

1. 运行 `npm run build`，得到（或更新）`docs/` 目录（已内含 articles）。
2. 将 `docs/` 一并提交并推送到仓库的默认分支（如 `main`）。注意 `docs/` **不能**写进 `.gitignore`。
3. 在仓库 Settings → Pages → Build and deployment 中，Source 选择 **Deploy from a branch**，Branch 选择对应分支、目录选择 **`/docs`**，保存后等待 Pages 构建即可。
4. `vite.config.js` 中已设置 `base: './'`，路由使用 hash 模式，文章请求也基于 base 相对路径，因此站点位于 `用户名.github.io/仓库名/` 子路径下也能正常工作。

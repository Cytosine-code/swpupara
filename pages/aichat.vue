<template>
  <div class="ai-chat-container">
    <div id="coze-chat-container"></div>
  </div>
</template>

<script>
export default {
  name: 'AIChat',
  data() {
    return {
      cozeSDK: null
    };
  },
  mounted() {
    this.initializeCozeSDK();
  },
  beforeUnmount() {
    this.destroyCozeSDK();
  },
  methods: {
    initializeCozeSDK() {
      // Create a script element for the Coze SDK
      const script = document.createElement('script');
      script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js';
      script.onload = () => {
        // 确保DOM已经渲染完成后再初始化SDK
        this.$nextTick(() => {
          // 生成随机会话ID，确保每次刷新页面都创建新对话
          const randomSessionId = 'session_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
          
          // Initialize the SDK when the script is loaded
          this.cozeSDK = new CozeWebSDK.WebChatClient({
            config: {
              type: 'bot',
              bot_id: '7547340876381847586',
              isIframe: false,
              conversation_id: randomSessionId,
            },
            auth: {
              type: 'token',
              token: import.meta.env.VITE_COZE_BOT_TOKEN,
              onRefreshToken: async () => 'token'
            },
            userInfo: {
              id: 'user',
              url: 'https://favicon.im/quora.com',
              nickname: 'User',
            },
            ui: {
              base: {
                icon: 'https://favicon.im/quora.com',
                layout: 'pc',
                lang: 'zh-CN',
                zIndex: 1000
              },
              header: {
                isShow: true,
                isNeedClose: false,
              },
              asstBtn: {
                isNeed: false
              },
              footer: {
                isShow: true,
                expressionText: 'Powered by Cytosine',
              },
              chatBot: {
                title: '西柚AI',
                uploadable: true,
                isNeedAudio: false,
                isNeedFunctionCallMessage: false,
                width: '100%',
                height: '100%',
                el: this.$el.querySelector('#coze-chat-container')
              },
            },
          });
          
          // 使用showChatBot方法打开聊天栏
          if (this.cozeSDK && typeof this.cozeSDK.showChatBot === 'function') {
            this.cozeSDK.showChatBot();
          }
        });
      };
      document.body.appendChild(script);
    },
    destroyCozeSDK() {
      // Clean up the SDK instance when the component is unmounted
      if (this.cozeSDK && typeof this.cozeSDK.destroy === 'function') {
        this.cozeSDK.destroy();
      }
      this.cozeSDK = null;
      
      // Remove the script element
      const script = document.querySelector('script[src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    }
  }
};
</script>

<style scoped>
/* 确保body和html也支持全屏布局 */
:global(body),
:global(html) {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

/* 确保#app容器在AI页面时使用flex布局 */
:global(#app) {
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.ai-chat-container {
  /* 容器样式 - 确保占满剩余空间（不包括header） */
  flex: 1;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#coze-chat-container {
  /* Coze聊天栏容器样式 - 确保完全填充父容器 */
  flex: 1;
  width: 100%;
  height: 100%;
}
</style>
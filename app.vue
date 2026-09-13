<template>
  <div id="app">
    <HeaderComponent />
    <PageTransition>
      <router-view :key="$route.fullPath" />
    </PageTransition>
    <FooterComponent v-if="$route.path !== '/ai'" />
  </div>
</template>

<script>
import HeaderComponent from './componments/header.vue'
import FooterComponent from './componments/foot.vue'
import PageTransition from './componments/PageTransition.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    PageTransition
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
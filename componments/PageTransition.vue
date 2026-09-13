<template>
  <transition
    :name="transitionName"
    :mode="transitionMode"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'PageTransition',
  data() {
    return {
      transitionName: 'slide-right',
      transitionMode: 'out-in'
    };
  }
};
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
  position: relative;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
  position: relative;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
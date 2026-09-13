<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; {{ currentYear }} powered by ParaLab-Cytosine</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #e0e0e0;
  margin-top: auto;
}

.footer-content p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
</style>
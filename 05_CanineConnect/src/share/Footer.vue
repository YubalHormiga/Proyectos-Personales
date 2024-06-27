<!-- Footer.vue OK-->
<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <footer class="footer-container">
    <div itemscope itemtype="http://schema.org/WPFooter">
      <p class="footer-text" itemprop="copyrightHolder">
        &copy; 2024 <span itemprop="name">Yubal Hormiga</span>
      </p>
    </div>
    <div class="footer-links">
      <div class="links">
        <a href="contact.html" itemprop="url">Contact</a>
      </div>
      <div>
        <RouterLink :to="{ name: 'privacy-policy' }" itemprop="url">Privacy Policy</RouterLink>
      </div>
    </div>
  </footer>
</template>
<!-- Se ha añadido un esquema de microdatos usando itemscope y itemtype para definir el WPFooter. También se ha añadido itemprop a los elementos relevantes para indicar el titular del copyright y las URLs. -->
<style scoped>
.footer-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #f8f8f8;
}

@media (min-width: 767px) {
  .footer-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
  }
}

.footer-text {
  margin: 0;
  text-align: center;
  color: rgb(134, 134, 134);

}

.footer-links {
  list-style-type: none;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.footer-links a {
  text-decoration: none;
  color: rgb(134, 134, 134);

}

.footer-links a:hover {
  text-decoration: underline;
}
</style>

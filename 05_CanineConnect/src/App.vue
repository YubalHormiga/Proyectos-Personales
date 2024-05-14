<script setup>
import { RouterView } from "vue-router";
import Header from "../src/share/Header.vue";
import Footer from "../src/share/Footer.vue";
</script>

<template>
  <div class="wrapper">
    <Header />
    <div class="router-container">
      <RouterView  class="container"/>
    </div>
    <Footer class="footer" />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.router-container {
  flex: 1;
  margin-bottom: 1rem; /* Ajusta según sea necesario para dar espacio al footer */
}

.footer {
  background-color: #333;
  opacity: 0.3;
  color: #fff;
  padding: 1rem;
  text-align: center;
  margin-top: auto; /* Coloca el footer al final del contenedor */
}
.container {
  padding: 0 1rem;
  text-align: justify;

}
@media (min-width: 640px) {
  .container {
    max-width: 120rem;
    margin: 0 auto;
  }
}
</style>

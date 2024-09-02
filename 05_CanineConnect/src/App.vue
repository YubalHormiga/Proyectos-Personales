<!-- App OK -->
<script setup>
import { RouterView } from "vue-router";
import Header from "../src/share/Header.vue";
import Footer from "../src/share/Footer.vue";
import MainNavigation from "./share/MainNavigation.vue";
</script>

<template>
  <div class="wrapper">
    <div class="image">
      <MainNavigation class="navegation" />
      <Header />
    </div>
    <div class="router-container">
      <div class="container">
        <RouterView />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.image {
  background-image: url("../src/assets/images/dogs.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 33%;
  margin-bottom: 2rem
}

.navegation {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}
.router-container {
  flex: 1;
  margin-bottom: 1rem;
  padding: 1rem;
}

/* @media (min-width: 640px) {
  .container {
    max-width: 120rem;
    margin: 0 auto;
  }
} */
</style>

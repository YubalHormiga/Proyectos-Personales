<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="nav">
    <router-link class="nav-link" to="#">Consejos de cuidado </router-link>
    <router-link class="nav-link" :to="{ name: 'breeds' }">Razas de perros</router-link>
    <router-link class="nav-link" to="#">Tenencia responsable</router-link>
  </nav>
  <RouterView />
</template>
<style scoped>
nav {
  justify-content: center;
  gap: 0.5rem;
  top: 1rem;
  display: flex;
  background-color: rgba(201, 172, 172, 0.7);
}
.nav-link {
  text-decoration: none;
  text-align: center;
  color: #333;
  padding: 0.5rem;
}
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.7);
  display: inline-block;
 
}
</style>

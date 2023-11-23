<script setup>
import { RouterView, RouterLink } from "vue-router";
const authRoutes = [
  { name: "register", text: "Crear Cuenta" },
  { name: "login", text: "Iniciar Sesión" },
];
</script>

<template>
<div class="container">
  <RouterView />
  <nav class="nav">
    <RouterLink
      v-for="authRoute in authRoutes"
      :to="{ name: authRoute.name }"
      class="nav-link"
    >{{ authRoute.text }}</RouterLink>
  </nav>
</div>

</template>
<style scoped>
  .container {
    display: flex;
    flex-direction: column;
  }

  .nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    text-decoration: none;
    text-transform: uppercase;
    gap: 10px;
  }

  .nav a {
    text-decoration: none;
    text-transform: uppercase;
  }
</style>

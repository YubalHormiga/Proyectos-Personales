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
        >{{ authRoute.text }}</RouterLink
      >
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
  justify-content: center;
  align-items: center;
  text-decoration: none;
  text-transform: uppercase;
  gap: 4rem;
  margin-top: 2rem;
}

.nav a {
  text-decoration: none;
  color: #800055;
  opacity: 0.7;
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.3rem;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  padding: 1rem;
}
.nav a:hover {
  text-decoration: none;
  color: #fff;
  background-color: rgba(128, 0, 85, 0.7);
  opacity: 0.7;
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.3rem;
  margin: 0;
}
</style>

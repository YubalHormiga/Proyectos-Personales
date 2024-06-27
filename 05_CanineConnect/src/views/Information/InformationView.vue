<!-- CareTipsView OK -->
<script setup>
import { RouterLink, RouterView } from "vue-router"; 
</script>

<template>
  <nav class="nav">
    <!-- Enlaces de navegación -->
    <router-link active-class="active-link" class="nav-link" :to="{ name: 'care' }">Cuidado Canino</router-link>
    <router-link active-class="active-link" class="nav-link" :to="{ name: 'breeds' }">Razas de perros</router-link>
    <router-link active-class="active-link" class="nav-link" :to="{ name: 'stewardship' }">Tenencia responsable</router-link>
  </nav>
  
  <!-- Componente para renderizar vistas según la ruta -->
  <RouterView />
</template>

<style scoped>
/* Estilos para el contenedor de navegación */
nav {
  justify-content: center;
  gap: 1rem;
  top: 1rem;
  display: flex;
  padding: 1rem;
  border-radius: 0 0 3px 3px;
}

/* Estilos para los enlaces de navegación */
.nav-link {
  text-decoration: none;
  text-align: center;
  color: #333;
  padding: 0.5rem;
}

/* Efecto hover para los enlaces de navegación */
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.7);
  display: inline-block;
}

/* Estilos para el enlace activo */
.active-link {
  color: rgba(184, 89, 89, 0.7);
  font-weight: 700;
}
</style>

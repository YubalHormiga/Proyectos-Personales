<!-- HomeView OK -->
<script setup>
import { RouterLink } from "vue-router";

</script>

<template>
  <section class="call-to-action-section">
    <h2 class="cta-heading">¿Quieres ayudar?<span> en Construcción</span></h2>
    <ul class="cta-list">
      <!-- Cada item de la lista será una sección -->
      <li class="cta-item">
        <!-- Enlace a la página de adopción -->
        <RouterLink :to="{ name: 'adoption' }" class="cta-link">Adopta un perro</RouterLink>
      </li>
      <li class="cta-item">
        <!-- Enlace a la página de donaciones -->
        <RouterLink :to="{ name: 'donate' }" class="cta-link">Dona para ayudar a los perros sin hogar</RouterLink>
      </li>
      <li class="cta-item">
        <!-- Enlace a la página de voluntariado -->
        <a href="#" class="cta-link">Sé voluntario</a>
      </li>
      <li class="cta-item">
        <!-- Enlace para compartir la página -->
        <a href="#" class="cta-link">Comparte esta página web</a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.cta-item {
  list-style: none;
}

.cta-link {
  text-decoration: none;
}
span{
  color: red;
}
</style>

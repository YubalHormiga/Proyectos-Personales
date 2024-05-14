<script setup>
import { RouterLink } from "vue-router";
</script>


<template>
  <section class="call-to-action-section">
    <h2 class="cta-heading">¿Quieres ayudar?</h2>
    <ul class="cta-list">
      <li class="cta-item">
        <router-link :to="{ name: 'adoption' }" class="cta-link">Adopta un perro</router-link>
      </li>
      <li class="cta-item">
        <a href="donar.html" class="cta-link"
          >Dona para ayudar a los perros sin hogar</a
        >
      </li>
      <li class="cta-item">
        <a href="voluntariado.html" class="cta-link">Sé voluntario</a>
      </li>
      <li class="cta-item">
        <a href="compartir.html" class="cta-link">Comparte esta página web</a>
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
</style>

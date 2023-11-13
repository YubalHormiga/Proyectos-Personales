<script setup>
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <nav class="navigation">
    <RouterLink
      :to="{ name: 'new-booking' }"
      class="navigation__link"
      :class="{ 'active-link': route.name === 'new-booking' }"
    >
      Servicios
    </RouterLink>

    <RouterLink
      :to="{ name: 'booking-details' }"
      class="navigation__link"
      :class="{ 'active-link': route.name === 'booking-details' }"
    >
      Resumen Reserva
    </RouterLink>
  </nav>
  <RouterView />
</template>
<style scoped>
.navigation {
  display: flex;
  justify-content: space-around;
  margin: 2rem;
  gap: 1rem;
}

.navigation__link {
  flex: 1;
  padding: 10px;
  background-color: #00bfff;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  color: #fff;
  transition: background-color 0.3s ease;
}

.navigation__link:hover {
  background-color: #555;
}
.active-link {
  background-color: #000080;
}
</style>

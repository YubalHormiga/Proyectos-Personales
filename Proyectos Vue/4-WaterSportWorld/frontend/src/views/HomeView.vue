<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="title">
    <RouterLink :to="{ name: 'bookings' }" class="no-underline">
      
      <h1>Water<span>Sport</span>Workd</h1>
    </RouterLink>
  </div>
</template>
<style scoped>
h1 {
  font-size: 9vw; /* Utiliza unidades "vw" para que el tamaño se ajuste al ancho de la pantalla */
  color: #fff;
  opacity: 0.7;
  text-align: center; /* Centra el texto horizontalmente */
  margin: 0; /* Elimina el margen predeterminado del <h1> */
}
span {
  color: #000080;
  opacity: 0.7;
}
.no-underline {
  text-decoration: none;
}
</style>

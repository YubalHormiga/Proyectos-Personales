<script setup>
import ServicesItem from "../../components/ServicesItem.vue";
import { useServicesStore } from "../../stores/services";

const servicesStore = useServicesStore();
</script>

<template>
  <h2>Servicios</h2>
  <p>A continuación elige un servicio</p>

  <div class="services-container">
    <ServicesItem
      v-for="service in servicesStore.services"
      :key="service._id"
      :service="service"
    />
  </div>
</template>
<style scoped>
.services-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 2rem; 
  margin: 0 2rem;
}
</style>

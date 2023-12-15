<script setup>
import ServicesItem from "../../components/ServicesItem.vue";
import { useServicesStore } from "../../stores/services";

const servicesStore = useServicesStore();
</script>

<template>
  <div class="container">
    <p class="instruction-text">Elige actividad</p>

    <div class="services-container">
      <ServicesItem
        v-for="service in servicesStore.services"
        :key="service._id"
        :service="service"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  margin: 0 2rem;
}

.instruction-text {
  display: inline-block;
  padding: 1rem 3rem;
  background-color: rgba(247, 247, 247, 0.5);
  border-radius: 1rem;
  font-size: 2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.services-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .container {
    margin: 0 2rem; 
  }

  .services-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

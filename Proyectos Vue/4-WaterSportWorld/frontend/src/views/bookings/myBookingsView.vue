<script setup>
import Booking from "../../components/Booking.vue";
import { useUserStore } from "../../stores/user";
const userStore = useUserStore();
</script>

<template>
  
  <h2 class="page-title">Gestiona tus reservas</h2>
  <p v-if="userStore.loading">Cargando...</p>
  <div v-else>
    <p v-if="userStore.noBookings" class="no-bookings-message">No tienes reservas próximas</p>
    <div v-else class="bookings-container">
      <Booking
        v-for="booking in userStore.userBookings"
        :booking="booking"
        key="booking._id"
      />
    </div>
  </div>
</template>
<style scoped>
h2,
.page-title {
  display: block;
  padding: 2rem;
  margin: 2rem auto;
  width: 35rem;
  text-align: center;
  background-color: rgba(247, 247, 247, 0.7);
  border-radius: 1rem;
  font-size: 2rem;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-transform: uppercase;
  color: black;
}

.bookings-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 2rem;
  
}
@media (min-width: 768px) { 
  .bookings-container {
    flex-wrap: wrap; /* Permite que los elementos se envuelvan en pantalla ancha */
    max-width: 768px; /* Establece un ancho máximo para el contenedor en pantallas más grandes */
    margin: 2rem auto; /* Centra el contenedor */
  
}
}
</style>

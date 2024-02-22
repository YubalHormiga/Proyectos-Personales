<script setup>
import { onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useBookingsStore } from "../../stores/bookings";

const route = useRoute();
const bookingStore = useBookingsStore();

onMounted(() => {
  bookingStore.clearBookingData();
});
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
  font-weight: bold;
  letter-spacing: 0.4rem;
  flex: 1;
  padding: 10px;
  background-color: #000080;
  opacity: 0.2;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  color: #fff;
  transition: background-color 0.3s ease;
}

.navigation__link:hover {
  background-color: #413e3e;
}
.active-link {
  background-color: #242222;
  opacity: 0.9;
}
</style>

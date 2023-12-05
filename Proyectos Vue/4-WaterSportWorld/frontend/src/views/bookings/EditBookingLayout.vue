<script setup>
import { onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BookingAPI from "../../api/BookingAPI";
import { useBookingsStore } from "../../stores/bookings";

const bookingStore = useBookingsStore();
const route = useRoute();
const router = useRouter();

const { id } = route.params;

onMounted(async () => {
  try {
    const { data } = await BookingAPI.getById(id);
    bookingStore.setSelectBooking(data);
  } catch (error) {
    router.push({ name: "my-bookings" });
  }
});
</script>

<template>
  <nav class="navigation">
    <RouterLink
      :to="{ name: 'edit-booking' }"
      class="navigation__link"
      :class="{ 'active-link': route.name === 'edit-booking' }"
    >
      Servicios
    </RouterLink>

    <RouterLink
      :to="{ name: 'edit-booking-details' }"
      class="navigation__link"
      :class="{ 'active-link': route.name === 'edit-booking-details' }"
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

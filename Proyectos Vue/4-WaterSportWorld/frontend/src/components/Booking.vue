<script setup>
import { useDateStore } from "../stores/date";
import { useBookingsStore } from "../stores/bookings";
import { formatCurrency } from "../helpers";
import { RouterLink } from "vue-router";

const userStore = useDateStore();
const bookingStore = useBookingsStore();

const props = defineProps({
  booking: {
    type: Object,
  },
});
</script>
<template>
  <div class="booking-details">
    <p class="booking-info">
      Fecha:
      <span class="date">{{ userStore.displayDate(booking.date) }}</span> Hora:
      <span class="time">{{ booking.hours }}</span>
    </p>
    <div
      v-for="service in booking.services"
      :key="service.id"
      class="service-details"
    >
      <p>
        Actividad: <span class="service-name">{{ service.name }}</span> Precio:
        <span class="service-price"> {{ formatCurrency(service.price) }}</span>
      </p>
      <p class="service-description">{{ service.description }}</p>
    </div>
    <p class="total-amount">
      Total a pagar:
      <span class="currency">{{ formatCurrency(booking.totalAmount) }}</span>
    </p>
    <div class="bookings-actions">
      <button @click="bookingStore.cancelBooking(booking._id)" class="delete-appointment-btn">Eliminar Actividad</button>
      <RouterLink
        :to="{name:'edit-booking', params:{id: booking._id}}"
        class="edit-appointment-btn"
        >Editar Actividad</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.booking-details {
  text-align: center;
  background-color: rgba(247, 247, 247, 0.7);
  border-radius: 1rem;
  cursor: pointer;
  margin: 0 auto;
}

.date,
.time,
.currency,
.service-name,
.service-price {
  text-transform: uppercase;
  font-size: large;
  font-weight: bold;
  color: #a13368;
}
.service-description {
  font-weight: 700;
}

.bookings-actions {
  display: flex;
  justify-content: space-between;
}

.delete-appointment-btn,
.edit-appointment-btn {
  text-decoration: none;
  font-weight: 600;
  font-size: 1.5rem;
  margin: 1rem;
  padding: 10px 30px;
  box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
  border-radius: 5px;
  transition: 1000ms;
  transform: translateY(0);
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.delete-appointment-btn {
  color: #fff;
  background-color: #d62828;
  border: solid #d62828 2px;
}
.edit-appointment-btn {
  color: #fff;
  background-color: #023e8a;
  border: solid #023e8a 2px;
}
.delete-appointment-btn:hover,
.edit-appointment-btn:hover {
  transition: 1000ms;
  padding: 10px 35px;
  transform: translateY(-0px);
  background-color: #fff;
  color: #d62828;
  border: solid 2px #d62828;
}

.delete-appointment-btn:hover {
  transition: 1000ms;
  padding: 10px 35px;
  transform: translateY(-0px);
  background-color: #fff;
  color: #d62828;
  border: solid 2px #d62828;
}
.edit-appointment-btn:hover {
  transition: 1000ms;
  padding: 10px 35px;
  transform: translateY(-0px);
  background-color: #fff;
  color: #023e8a;
  border: solid 2px #023e8a;
}
</style>

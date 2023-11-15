<script setup>
import { formatCurrency } from "../helpers";
import {useBookingsStore} from '../stores/bookings'
const props = defineProps({
  bookings: {
    type: Object,
  },
});
const bookingsStore = useBookingsStore()
</script>
<template>
  <div class="booking-container">
    <div class="booking-details">
      <button type="button" class="delete-button" @click="bookingsStore.onServiceSelected(bookings)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-trash"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#ff2825"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    </button>
      <div class="booking-info">
        <p class="booking-name">
          Actividad: <span>{{ bookings.name }}</span>
        </p>
        <p class="booking-price">
          Precio: <span>{{ formatCurrency(bookings.price) }}</span>
        </p>
      </div>
      <p class="booking-description">
        Descriptción <span>{{ bookings.description }}</span>
      </p>
    </div>

  </div>
</template>

<style scoped>
.booking-container {
  
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.7);
  justify-content: center;
  border-radius: 1rem;
}

.booking-details {
  display: flex;
  justify-content: start;
  gap: 4rem;
  align-items: center;
  width: 100%;
  padding: 10px;
}

/* Ajusta los estilos según tus necesidades */
.booking-name,
.booking-price {
  margin: 0;
  font-weight: bold;
}
.booking-info{
  flex:15%
}
.booking-description{
  flex: 80%;
}
.booking-name span,
.booking-price span {
  text-transform: uppercase;
  color: #a13368;
  font-weight: bolder;
}

.delete-button {
  border: none;
  cursor: pointer;
  padding: 0 2rem;
  background-color: rgba(255, 255, 255, 0);
}
</style>

<script setup>
import { formatCurrency } from "../helpers/index";
import { useBookingsStore } from "../stores/bookings";

const bookingsStore = useBookingsStore();
const props = defineProps({
  service: {
    type: Object,
  },
});
</script>

<template>
  <div
    @click="bookingsStore.onServiceSelected(service)"
    class="service"
    :class="{'selected': bookingsStore.isServiceSeleted(service._id)}"
  >
    <p class="title">{{ service.name }}</p>
    <p class="price">{{ formatCurrency(service.price) }}</p>
    <div class="description">
      <p class="booking">
        Reserva
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-hand-click"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#a905b6"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" />
          <path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5" />
          <path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" />
          <path
            d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"
          />
          <path d="M5 3l-1 -1" />
          <path d="M4 7h-1" />
          <path d="M14 3l1 -1" />
          <path d="M15 6h1" />
        </svg>
        <span>{{ service.name }}</span> :
        <span>{{ formatCurrency(service.price) }}</span>
      </p>

      <p class="service-description">
        {{ service.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.selected{
  opacity: 0.4;
}
.service {
  text-align: center;
  background-color: rgba(247, 247, 247, 0.5);
  border-radius: 1rem;
  position: relative;
  cursor: pointer;
}
.service-description {
  margin: 0;
}
.booking {
  margin: 0;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
}
.title,
.price {
  text-transform: uppercase;
  font-size: large;
  font-weight: bold;
}

.description {
  overflow: auto;
  text-align: justify;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.9s ease;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.service:hover .description {
  opacity: 1; /* Muestra la descripción cuando pasas el ratón sobre el div */
}

.service:hover .title,
.service:hover .price {
  opacity: 0; /* Oculta el nombre y el precio cuando pasas el ratón sobre el div */
}
span {
  text-transform: uppercase;
  font-weight: bold;
}
</style>

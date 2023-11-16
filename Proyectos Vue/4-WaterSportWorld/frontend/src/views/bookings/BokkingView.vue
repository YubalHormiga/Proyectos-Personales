<script setup>
import SelectedService from "../../components/SelectedService.vue";
import { formatCurrency } from "../../helpers";
import { useBookingsStore } from "../../stores/bookings.js";
import Calendar from "primevue/calendar";
import dayjs from "dayjs"; // Importar dayjs
import { ref, watch, computed } from "vue";

const dateNotFormated = ref(dayjs()); // Inicializar date como un objeto dayjs
const bookingsStore = useBookingsStore();

const updateDate = (newDate) => {
  dateNotFormated.value = newDate;
};

// Obtener la fecha formateada para mostrar
const formattedDate = computed(() => {
  return (bookingsStore.data = dateNotFormated.value.format("DD/MM/YY"));
});

// Vigilar cambios en la fecha y actualizar el formato cuando sea necesario
watch(dateNotFormated, (newVal) => {
  console.log("Fecha actualizada:", newVal.format("YYYY-MM-DD"));
});
</script>
<template>
  <div class="reservation-details">
    <p class="reservation-information">
      A continuación revisa la información y confirma tu actividad
    </p>
    <p v-if="bookingsStore.noServicesSelected" class="noService">
      Debe seleccionar alguna actividad
    </p>
    <div v-else class="center-booking">
      <SelectedService
        class="booking-item"
        v-for="booking in bookingsStore.services"
        :bookings="booking"
        :key="booking._id"
      />
      <p class="total-amount">
        Total a pagar:
        <span>{{ formatCurrency(bookingsStore.totalAmount) }}</span>
      </p>
    </div>
    <div class="card flex justify-content-center">
      <Calendar :value="formattedDate" @input="updateDate" showIcon />
    </div>
  </div>
  <div class="calendar"></div>
</template>

<style scoped>
.reservation-details {
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.reservation-information {
  text-align: center;
  font-weight: bold;
  font-size: larger;
  color: #fff;
  text-transform: uppercase;
  color: rgba(161, 51, 104);
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 5px;
}
.noService {
  text-align: center;
  font-weight: bold;
  font-size: larger;
  color: #fff;
  text-transform: uppercase;
  background-color: rgba(161, 51, 104, 0.7);
  padding: 2rem;
  border-radius: 5px;
  letter-spacing: 2px;
}
.center-booking {
  max-width: 200rem;
  margin: 0 auto; /* Centra el bloque horizontalmente */
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
.booking-item {
  width: 100%;
  padding: 1rem;
}
.total-amount {
  text-align: center;
  display: inline-block;
  background-color: rgba(161, 51, 104, 0.6);
  border-radius: 5px;
  padding: 1rem;
  color: #fff;
  font-size: large;

  letter-spacing: 2px;
}
.total-amount span {
  font-size: x-large;
  font-weight: bold;
}
</style>

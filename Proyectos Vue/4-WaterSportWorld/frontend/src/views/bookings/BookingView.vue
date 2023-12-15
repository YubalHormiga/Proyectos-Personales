<script setup>
import { ref, watch, computed } from "vue";
import Calendar from "primevue/calendar";
import { format, isValid } from "date-fns";

import SelectedService from "../../components/SelectedService.vue";
import { formatCurrency } from "../../helpers";
import { useBookingsStore } from "../../stores/bookings.js";
import { useDateStore } from "../../stores/date.js";

const bookingsStore = useBookingsStore();
const dateStore = useDateStore();
const dateBeforeFormatted = ref(bookingsStore.date);

const updateDate = (newDate) => {
  dateBeforeFormatted.value = newDate;
  dateStore.updateFormattedDate(format(newDate, "dd/MM/yyyy"));
};

const formattedDate = computed(() => {
  const dateValue = dateBeforeFormatted.value;

  if (dateValue && isValid(dateValue)) {
    return format(dateValue, "dd/MM/yyyy");
  } else {
    return "";
  }
});

watch(dateBeforeFormatted, (newVal) => {
  console.log("Fecha actualizada:", format(newVal, "dd-MM-yyyy"));
});

watch(formattedDate, (newVal) => {
  bookingsStore.updateDateFormatted(newVal);
});
</script>

<template>
  <div class="reservation-container">
    <p class="reservation-info">
      A continuación revisa la información y confirma tu actividad
    </p>
    <p v-if="bookingsStore.noServicesSelected" class="no-service-message">
      Debe seleccionar alguna actividad
    </p>
    <div v-else class="booking-center">
      <SelectedService
        class="booking-item"
        v-for="booking in bookingsStore.services"
        :bookings="booking"
        :key="booking._id"
      />
    </div>
    <div
      v-if="!bookingsStore.noServicesSelected"
      class="selected-services-container"
    >
      <div class="date-and-hours-container">
        <div class="calendar-container">
          <Calendar
            v-model="dateBeforeFormatted"
            @input="updateDate"
            placeholder="Selecciona la fecha"
            inline
            dateFormat="dd/mm/yy"
            :numberOfMonths="2"
            :disabledDays="[0, 6]"
            :minDate="new Date()"
          />
        </div>

        <div
          ref="hoursContainer"
          v-if="bookingsStore.isDateSelected"
          class="hours-container"
        >
          <div class="hour-item" v-for="hour in bookingsStore.hours">
            <button
              @click="bookingsStore.time = hour"
              class="hour-button"
              :class="{
                hourSelected: bookingsStore.time === hour,
                hourDisabled: bookingsStore.disableTime(hour),
              }"
              :disabled="bookingsStore.disableTime(hour)"
            >
              {{ hour }}
            </button>
          </div>
        </div>
      </div>
      <div v-if="bookingsStore.isValidReservation">
        <p class="total-amount">
          Total a pagar:
          <span>{{ formatCurrency(bookingsStore.totalAmount) }}</span>
        </p>
      </div>
    </div>
    <div v-if="bookingsStore.isValidReservation" class="container-button">
      <button @click="bookingsStore.saveBooking" class="confirm-button">
        Confimar Actividad
      </button>
    </div>
  </div>
</template>

<style scoped>
.hourDisabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.selected-services-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.reservation-container {
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 2rem;
}

.reservation-info {
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

.no-service-message {
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

.booking-center {
  max-width: 200rem;
  margin: 0 auto;
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

.date-and-hours-container {
  display: flex;
  flex-direction: column; /* Cambiamos a dirección de columna */
  align-items: center; /* Centramos los elementos en el eje transversal */
  gap: 2rem;
  margin-top: 4rem;
}

.calendar-container {
  height: 100%;
  margin: auto;
}

.hours-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
}

.hour-item {
  display: flex;
  flex: 1;
}

.hour-button {
  cursor: pointer;
  display: block;
  width: 100%;
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
.hourSelected {
  color: rgba(255, 255, 255);
  background-color: rgba(161, 51, 104, 0.7);
}
.container-button {
  display: flex;
  justify-content: end;
}
.confirm-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  line-height: 1;
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;
  border-radius: 5px;
  border: #a13368;
  padding: 1.5rem;
  font-weight: bold;
  transition: 0.3s;
  background-color: #a13368;
  letter-spacing: 2px;
}
.confirm-button:hover {
  opacity: 0.7;
}
</style>

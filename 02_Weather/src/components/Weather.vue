<script setup>
import useWeather from "../composables/useWeather";
const { convertTemperature } = useWeather();

defineProps({
  weather: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="weather">
    <h2>
      Clima de :<span>{{ weather.name }}</span>
    </h2>
    <div class="temperatureAndWind">
      <div class="actualTemperature">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-temperature"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#D9ACF5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />
            <path d="M10 9l4 0" />
          </svg>
        </div>
        <div>
          <p>{{ convertTemperature(weather.main.temp) }}&deg;C</p>
        </div>
      </div>
      <div class="windSpedd">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-wind"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#D9ACF5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
            <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
            <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
          </svg>
        </div>
        <div>
          <p>{{ weather.wind.speed }}</p>
        </div>
      </div>
    </div>
    <div class="maxMin">
      <div class="maxTemperature">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-temperature-plus"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#D9ACF5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />
            <path d="M8 9l4 0" />
            <path d="M16 9l6 0" />
            <path d="M19 6l0 6" />
          </svg>
        </div>
        <div>
          <p>{{ convertTemperature(weather.main.temp_max) }} &deg;C</p>
        </div>
      </div>
      <div class="minTemperature">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-temperature-minus"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#D9ACF5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />
            <path d="M8 9l4 0" />
            <path d="M16 9l6 0" />
          </svg>
        </div>
        <div>
          <p>{{ convertTemperature(weather.main.temp_min) }} &deg;C</p>
        </div>
      </div>
    </div>
  </div>
</template>

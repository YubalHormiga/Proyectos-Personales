<script setup>
import Form from "./components/Form.vue";
import Weather from "./components/Weather.vue";
import useWeather from "./composables/useWeather";
import Alert from './components/Alert.vue'
import Spinner from './components/Spinner.vue'

const { getWeather, weather,showWeather,error ,loading} = useWeather();

</script>

<template>
  <div>
    <h1>
      EuropaWeather: <span>Tu Guía Meteorológica por el Viejo Continente</span>
    </h1>
    <div class="container search-container">
      <Form @get-weather="getWeather" />
      <Spinner v-if="loading" />
      <Alert v-if="error">{{ error }}</Alert>
      <Weather v-if="showWeather" :weather="weather" />
    </div>
  </div>
</template>


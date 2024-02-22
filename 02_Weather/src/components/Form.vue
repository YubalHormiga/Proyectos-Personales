<script setup>
import { reactive, ref, onMounted } from "vue";
import Alert from "./Alert.vue";
import { db } from "../data/countries.js";

const contries = db;
const error = ref("");
const search = reactive({
  city: "",
  country: "",
});

const emit = defineEmits(["get-weather"]);
const checkWeather = () => {
  if (Object.values(search).includes("")) {
    error.value = "Todos los campos son obligatorios";
    return;
  }
  error.value = "";
  emit("get-weather", search);
};
</script>
<template>
  <div class="form">
    <form class="form-container" @:submit.prevent="checkWeather">
      <Alert v-if="error">{{ error }}</Alert>
      <div class="form-field">
        <label for="city">Ciudad</label>
        <input
          v-model="search.city"
          type="text"
          id="city"
          placeholder="Ingresa el nombre de la ciudad"
        />
      </div>
      <div class="form-field">
        <label for="country">País</label>
        <select id="country" v-model="search.country">
          <option value="">--Selecciona País--</option>
          <option v-for="country in contries" :value="country.code">
            {{ country.name }}
          </option>
        </select>
      </div>
      <input type="submit" value="Consulta" />
    </form>
  </div>
</template>

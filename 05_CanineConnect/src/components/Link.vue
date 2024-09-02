<!-- componente Link -->
<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="centered-container">
    <RouterLink :to="{ name: to }" class="css-button-shadow--sky"><slot></slot></RouterLink>
  </div>
</template>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.css-button-shadow--sky {
  min-width: 90px;
  height: 40px;
  text-decoration: none;
  color: #fff;
  padding: 5px 10px;
  font-weight: normal;
  cursor: pointer;
  transition: all 0.3s ease; /* Asegúrate de que esta línea esté presente */
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: none;
  background-color:var(--accent-200);
  box-shadow: 0 3px 1px -2px #ccc, 0 2px 2px 0 #ccc, 0 1px 5px 0 #ccc;
  text-align: center
}

.css-button-shadow--sky:hover {
  background-color: var(--accent-100); /* Cambia el color al hacer hover */
  box-shadow: 0 4px 2px -2px #bbb, 0 4px 4px 0 #bbb, 0 2px 6px 0 #bbb; /* Ajusta el shadow al hacer hover */
}

.css-button-shadow--sky:active {
  background-color: #3367d6; /* Color diferente al estar activo */
  box-shadow: 0 4px 2px -3px #aaa, 0 4px 5px 1px #aaa, 0 2px 7px 1px #aaa; /* Cambia el shadow al hacer clic */
}
</style>


<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  to: {
    type: String,
    require: true,
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
  min-width: 130px;
  height: 40px;
  text-decoration: none;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: none;
  background-color: #3a86ff;
  box-shadow: 0 3px 1px -2px #ccc, 0 2px 2px 0 #ccc, 0 1px 5px 0 #ccc;
}

.css-button-shadow--sky:active {
  box-shadow: 0 4px 2px -3px #ccc, 0 4px 5px 1px #ccc, 0 2px 7px 1px #ccc;
}
</style>

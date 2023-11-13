<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="title">
    <RouterLink :to="{ name: 'bookings' }" class="no-underline">
      <h1>Water<span>Sport</span>World</h1>
    </RouterLink>
  </div>
</template>
<style scoped>
h1 {
  font-size: 9vw;
  color: #fff;
  opacity: 0.7;
  text-align: center;
  margin: 0;
}
span {
  color: #000080;
  opacity: 0.7;
}
.no-underline {
  text-decoration: none;
}
</style>

<script setup>
import {useUserStore} from "../../stores/user";

const user = useUserStore()
</script>

<template>
  <h2>Tus Reservas</h2>F
  <p>Desde aquí podrás gestionar tus reservas</p>
</template>
<style scoped>
h2,
p {
  font-size: 4rem;
  color: #fff;
  opacity: 0.9;
  text-align: center;
  margin: 0;
}
</style>

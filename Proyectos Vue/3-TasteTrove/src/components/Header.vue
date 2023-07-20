<script setup>
import { RouterLink } from "vue-router";

</script>
<template>
  <header>
    <div>
      <h1>Taste<span>Trove</span></h1>
    </div>
    <nav>
      <RouterLink :to="{ name: 'home' }" class="link"> Incio </RouterLink>
      <RouterLink :to="{ name: 'collection' }"> Colección </RouterLink>
    </nav>
  </header>
</template>
<style>
.link{
    color:red
}
</style>

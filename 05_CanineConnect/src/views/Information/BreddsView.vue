<script setup>
import { onMounted, ref } from "vue";
import { fetchData } from "@/api/DogsAPI.js";
import { UseDogsStore } from "@/stores/dogStore";

const dogs = UseDogsStore();

onMounted(async () => {
  dogs.dogsData.value = await fetchData();
  console.log(fetchData());
});
</script>

<template>
  <div
    class="card-container"
    v-for="dog in dogs"
    :key="dog.id"
  >
    <div class="card">
      <div class="card-face front">
        {{ dog.name }}
      </div>
      <div class="card-face back">
        <p>Información adicional</p>
        <a href="#">Más información</a>
        <button onclick="addToFavorites()">Agregar a favoritos</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card-container {
  width: 300px;
  height: 400px;
  perspective: 1000px;
  margin: 50px auto;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  background-image: url("../../../public/images/dogs.jpg");
}

.card:hover {
  transform: rotateY(180deg);
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
}

.front {
  background: url("tu-imagen.jpg") center/cover;
}

.back {
  background-color: #f0f0f0;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.back a {
  text-decoration: none;
  color: blue;
  font-weight: bold;
}
</style>

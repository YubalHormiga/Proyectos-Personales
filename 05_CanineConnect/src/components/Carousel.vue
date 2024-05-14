<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
const images = [
  {
    id: 1,
    src: "../../public/images/dogs/dog.jpg",
    alt: "Descripción de la dog 1",
  },
  {
    id: 2,
    src: "../../public/images/dogs/dog1.jpg",
    alt: "Descripción de la dog 2",
  },
  {
    id: 0,
    src: "../../public/images/dogs/dog2.jpg",
    alt: "Descripción de la dog",
  },
  // Agrega más objetos de imagen según sea necesario
];
</script>


<template>
  <carousel :items-to-show="1.5">
    <slide v-for="image in images" :key="image.id">
      <img :src="image.src" :alt="image.alt" />
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>


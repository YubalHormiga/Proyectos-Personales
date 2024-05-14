<template>
  <div class="pet-carousel">
    <div
      class="pet-card"
      :class="{ active: index === currentIndex }"
      v-for="(image, index) in images"
      :key="index"
      :style="{ backgroundImage: `url(${image})` }"
    >
      <div class="pet-description">
        <p class="pet-lost">Se Busca</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const images = ref([
  "../../../public/images/dogs/dog1.jpg",
  "../../../public/images/dogs/dog2.jpg",
  "../../../public/images/dogs/dog3.jpg",
  // Agrega aquí todas tus imágenes
]);

const currentIndex = ref(0);

const nextImage = () => {
  currentIndex.value++;
  if (currentIndex.value >= images.value.length) {
    currentIndex.value = 0;
  }
};

const prevImage = () => {
  currentIndex.value--;
  if (currentIndex.value < 0) {
    currentIndex.value = images.value.length - 1;
  }
};

onMounted(() => {
  setInterval(() => {
    nextImage();
  }, 5000); // Cambia el intervalo de cambio de imagen según tus preferencias
});
</script>

<style scoped>
.pet-carousel {
  position: relative;
  max-width: 100%;
  height: 40rem;
  margin-top: 2rem;
  overflow: hidden;
}

.pet-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: none;
}

.pet-card.active {
  display: block;
}

.pet-description {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pet-lost {
  text-transform: uppercase;
  font-size: clamp(4.2rem, 5vw + 1.5rem, 15.25rem);  
  font-weight: 900;
  color: red;
  opacity: 0.4;
  letter-spacing: 10px;
  margin: 0;
}
</style>

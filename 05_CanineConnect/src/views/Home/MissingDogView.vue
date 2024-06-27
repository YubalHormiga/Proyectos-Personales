<!-- MissingDogView OK -->
<script setup>
import { ref, onMounted, computed } from "vue";
import {
  getStorage,
  ref as storageRef,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { useRouter } from "vue-router";
const router = useRouter();
// Obtener la instancia de Firebase Storage
const storage = getStorage();

// Referencia reactiva para almacenar las imágenes
const images = ref([]);
// Índice de la imagen actual en el carrusel
const currentIndex = ref(0);

// Función para cambiar a la siguiente imagen en el carrusel
const nextImage = () => {
  currentIndex.value++;
  if (currentIndex.value >= images.value.length) {
    currentIndex.value = 0;
  }
};

// Función para obtener y cargar las imágenes de perros perdidos desde Firebase Storage
const imageLostDogsCollection = async () => {
  // Obtener la referencia al directorio de imágenes
  const storageRefImages = storageRef(storage, "");
  try {
    // Obtener la lista de todas las imágenes en el directorio
    const listResult = await listAll(storageRefImages);
    // Iterar sobre cada imagen en la lista
    for (const item of listResult.items) {
      // Obtener el nombre de la imagen
      const imageName = item.name;
      // Verificar si la imagen es de un perro perdido
      if (imageName.includes("lostDogs_images")) {
        // Obtener la URL de descarga de la imagen
        const imageUrl = await getDownloadURL(item);
        // Añadir la URL de la imagen al array reactiva de imágenes
        images.value.push(imageUrl);
      }
    }
  } catch (error) {
    // Manejar errores si ocurrieron durante la obtención de las imágenes
    console.error("Error al obtener las imágenes:", error);
  }
};

const noResults = computed(() => {
  return images.value.length === 0;
});
// Ejecutar la función de carga de imágenes al montar el componente
onMounted(() => {
  imageLostDogsCollection();

  // Configurar un intervalo para cambiar automáticamente la imagen cada 5 segundos
  setInterval(() => {
    nextImage();
  }, 5000);
});
</script>

<template>
  <!-- Estructura del carrusel de imágenes -->

  <div v-if="!noResults" class="pet-carousel">
    <div
      @click="() => router.push({ name: 'lost-dogs' })"
      class="pet-card"
      :class="{ active: index === currentIndex }"
      v-for="(image, index) in images"
      :key="index"
      :style="{ backgroundImage: `url(${image})` }"
    >
      <!-- Descripción opcional de la imagen -->
      <div class="pet-description">
        <p class="pet-lost">Se Busca</p>
      </div>
    </div>
  </div>
  <div v-else style="display: none">
    <!-- Este div estará vacío cuando no haya imagen cargada -->
  </div>
</template>

<style scoped>
/* Estilos para el carrusel de imágenes */
.pet-carousel {
  position: relative;
  max-width: 100%;
  height: 30rem;
  overflow: hidden;
}

/* Estilos para cada imagen en el carrusel */
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
  mask-image: radial-gradient(circle, white, transparent 70%);
}

/* Mostrar solo la imagen activa */
.pet-card.active {
  display: block;
}

/* Estilos para la descripción de la imagen (opcional) */
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
  cursor: pointer;
}
</style>

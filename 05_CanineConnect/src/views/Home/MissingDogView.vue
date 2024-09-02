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

const getClass = (index) => {
  if (index === currentIndex.value) {
    return "active";
  } else if (index === (currentIndex.value + 1) % images.value.length) {
    return "next";
  } else if (
    index ===
    (currentIndex.value - 1 + images.value.length) % images.value.length
  ) {
    return "previous";
  } else {
    return "hidden";
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
  <div v-if="!noResults" class="pet-carousel">
    <div
      class="pet-description"
      @click="() => router.push({ name: 'lost-dogs' })"
    >
      <p class="pet-lost">Se Busca</p>
    </div>
    <div
      class="pet-card"
      :class="getClass(index)"
      v-for="(image, index) in images"
      :key="index"
      :style="{ backgroundImage: `url(${image})` }"
    >
      <!-- Descripción opcional de la imagen -->
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
  margin: 0 auto;
  width: 100%;
  height: 30rem;
  overflow: hidden;
  border-radius: 0.625rem;
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
}
@media (min-width: 640px) {
  .pet-carousel {
    border-radius: 0;
    box-shadow: none;
  }
}
/* Estilos para cada imagen en el carrusel */
.pet-card {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  transition: transform 0.5s, opacity 0.5s;
  transform-style: preserve-3d;

  
}

/* Estilos para la imagen activa */
.pet-card.active {
  transform: translateX(0) scale(1);
  opacity: 1;
  z-index: 2;

}

/* Estilos para las imágenes anteriores */
.pet-card.previous {
  transform: translateX(-30%) scale(0.7);
  opacity: 0.6;
  z-index: 1;
}

/* Estilos para las imágenes siguientes */
.pet-card.next {
  transform: translateX(30%) scale(0.7);
  opacity: 0.6;
  z-index: 1;
}

/* Estilos para imágenes ocultas */
.pet-card.hidden {
  display: none;
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
  z-index: 100;
}

.pet-lost {
  text-transform: uppercase;
  font-size:clamp(4rem, 4vw + 1.5rem, 13.25rem);
  font-weight: 900;
  color: red;
  opacity: 0.4;
  letter-spacing: 3px;
  margin: 0;
  cursor: pointer;
}
</style>

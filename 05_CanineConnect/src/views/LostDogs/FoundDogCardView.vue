<!-- FoundDogCardView ok -->
<script setup>
/* Importaciones de bibliotecas externas */
import { computed } from "vue";
import { RouterLink} from "vue-router";

/* Importaciones de stores */
import { useLostDogsStore } from "@/stores/lostDogsStore";
import { useAuthStore } from "@/stores/authStore";


// Definir las propiedades esperadas para el componente
const props = defineProps({
  lostDog: {
    type: Object,
    required: true,
  },
});

// Inicializar los stores necesarios
const lostDogsStore = useLostDogsStore();
const authStore = useAuthStore();

// Computed property para verificar si el usuario actual es el propietario del perro perdido
const isOwner = computed(() => {
  return props.lostDog.userId === authStore.userData.uid;
});
</script>

<template>
  <div class="card">
    <!-- Contenedor de la imagen del perro perdido -->
    <div class="card-image-container">
      <img
        :src="lostDog.image"
        :alt="'Imagen de ' + lostDog.name"
        class="card-img"
      />
    </div>
    <!-- Contenido de la tarjeta -->
    <div class="card-content">
      <h3 class="card-title">
        Nombre: <span>{{ lostDog.name }}</span>
      </h3>
      <!-- Información de contacto del propietario -->
      <div>
        <p class="card-text"><span>Email:</span> {{ lostDog.email }}</p>
        <p class="card-text"><span>Teléfono:</span> {{ lostDog.phone }}</p>
      </div>
      <!-- Ubicación y detalles del perro perdido -->
      <div class="card-section">
        <span>Ubicación y detalles:</span>
        <div class="card-text-content">{{ lostDog.location }}</div>
      </div>
      <!-- Fecha en la que se encontró el perro perdido -->
      <p class="card-text"><span>Fecha:</span> {{ lostDog.date }}</p>
    </div>
    <!-- Encabezado de la tarjeta con botones de editar y eliminar si el usuario es el propietario -->
    <div v-if="isOwner" class="card-header">
      <!-- Botón para editar el perro perdido -->
      <div class="button-container">
        <router-link
          :to="{ name: 'edit-lostDog-found', params: { id: lostDog.id } }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-pencil"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
          </svg>
        </router-link>
      </div>
      <!-- Botón para eliminar el perro perdido -->
      <div class="button-container">
        <button type="button" @click="lostDogsStore.deleteLostDog(lostDog.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-trash"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ff2825"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos generales de la tarjeta */
.card {
  display: flex;
  flex-direction: column;
  width: 35rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  margin: 0 auto;
  padding: 1rem;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Contenedor de la imagen */
.card-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-img {
  max-width: 100%;
  max-height: 13rem;
  border-bottom: 1px solid #ddd;
}

/* Contenido de la tarjeta */
.card-content {
  padding: 1rem;
  flex-grow: 1;
}

.card-title {
  margin: 0 0 8px;
  color: #333;
}

.card-text,
.card-title span {
  margin: 0 0 8px;
  color: #666;
}

.card-text span,
.card-section span {
  color: #333;
  font-weight: bold;
}

/* Contenido de texto dentro de la tarjeta */
.card-text-content {
  width: 100%;
  padding: 8px;
  border: none;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 100px; /* Altura máxima del contenedor */
}

/* Encabezado de la tarjeta */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

/* Contenedor del botón */
.button-container {
  display: flex;
  justify-content: center; /* Centrar el botón horizontalmente */
  align-items: center;
  margin-top: 1rem; /* Margen superior para separación */
}

/* Botón de reclamar/cerrar contacto */
.claim-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f8f8;
  cursor: pointer;
  transition: background-color 0.3s;
}

.claim-button:hover {
  background-color: #e0e0e0;
}

/* Botón sin estilos específicos */
button {
  border: none;
  background: none;
  cursor: pointer;
}
</style>

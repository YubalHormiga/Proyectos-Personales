<!-- FoundItemCardView OK -->
<script setup>
/* Importaciones de bibliotecas externas */
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

/* Importaciones de stores */
import { useItemsStore } from "@/stores/itemsStore";
import { useAuthStore } from "@/stores/authStore";

/* Importaciones de composable */
import useLocationMap from "@/composables/useLocationMap";

/* Definición de propiedades (props) */
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

/* Usamos el store de items */
const items = useItemsStore();
const authStore = useAuthStore();

const { zoom, pin } = useLocationMap();

/* Propiedad computada para verificar si el usuario actual es el propietario del objeto */
const isOwner = computed(() => props.item.userId === authStore.userData?.uid);

/* Estado reactivo para controlar la visibilidad de la información de contacto */
const showContactInfo = ref(false);

/* Función para alternar la visibilidad de la información de contacto */
const toggleContactInfo = () => {
  showContactInfo.value = !showContactInfo.value;
};

/* Propiedad computada para cambiar dinámicamente el texto del botón */
const buttonText = computed(() =>
  showContactInfo.value ? "Cerrar Contacto" : "Reclamar"
);
</script>

<template>
  <div class="card">
    <!-- Contenedor de la imagen del objeto -->
    <div class="card-image-container">
      <img :src="item.image" alt="Imagen del objeto perdido" class="card-img" />
    </div>
    <!-- Contenido de la tarjeta -->
    <div class="card-content">
      <h3 class="card-title">
        Nombre: <span>{{ item.name }}</span>
      </h3>
      <!-- Información de contacto que se muestra u oculta según el estado -->
      <div v-if="showContactInfo">
        <p class="card-text"><span>Email:</span> {{ item.email }}</p>
        <p class="card-text"><span>Teléfono:</span> {{ item.phone }}</p>
      </div>
      <!-- Descripción del objeto -->
      <div class="card-section">
        <span>Descripción:</span>
        <div class="card-text-content">{{ item.description }}</div>
      </div>
      <!-- Ubicación del objeto -->
      <!-- <div class="card-section">
        <span>Ubicación:</span>
        <div class="card-text-content">{{ item.location }}</div>
      </div> -->
      <!-- Fecha en la que se encontró el objeto -->
      <p class="card-text"><span>Fecha:</span> {{ item.date }}</p>
      <!-- Observaciones adicionales -->
      <div class="card-section">
        <span>Observaciones:</span>
        <div class="card-text-content">{{ item.observations }}</div>
      </div>
      <!-- Contenedor de la mapa del objeto -->
      <div class="map-container">
        <LMap
          ref="map"
          v-model:zoom="zoom"
          :center="[item.map[0], item.map[1]]"
          :use-global-leaflet="false"
        >
          <LMarker
            :lat-lng="[item.map[0], item.map[1]]"
            draggable
            @moveend="pin"
          />
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></LTileLayer>
        </LMap>
      </div>

      <!-- Botón para reclamar o cerrar contacto -->
      <div class="button-container">
        <button @click="toggleContactInfo" class="claim-button">
          {{ buttonText }}
        </button>
      </div>
    </div>

    <!-- Encabezado de la tarjeta con botones de editar y eliminar si el usuario es el propietario -->
    <div class="card-header" v-if="isOwner">
      <!-- Botón para editar el objeto -->
      <div class="button-container">
        <router-link :to="{ name: 'edit-item-found', params: { id: item.id } }">
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
      <!-- Botón para eliminar el objeto -->
      <div class="button-container">
        <button type="button" @click="items.deleteItem(item.id)">
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
/* Contenedor Mapa */
.map-container {
  height: 30rem;
  margin-bottom: 1rem;
}
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
  color: #666;
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

/* Estilos del botón de reclamar/cerrar contacto */
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

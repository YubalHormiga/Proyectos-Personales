<!-- FoundItemCardView OK -->
<script setup>
/* Importaciones de bibliotecas externas */
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

/* Importaciones de componentes locales */
import EditIcon from "../../assets/icons/EditIcon.vue";
import DeleteIcon from "../../assets/icons/DeleteIcon.vue";

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
      <div class="card-content-inner">
        <h2 class="card-title">{{ item.name }}</h2>

        <div class="card-details">
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
          <p class="card-description">{{ item.description }}</p>
          <p class="card-text"><span>Fecha:</span> {{ item.date }}</p>
          <p class="card-text"><span>Teléfono:</span> {{ item.phone }}</p>
          <p class="card-text"><span>Email:</span> {{ item.email }}</p>
          <p class="card-text-content">
            <span>Observaciones: </span> {{ item.observations }}
          </p>

          <div class="card-header" v-if="isOwner">
            <div class="button-container">
              <router-link
                :to="{ name: 'edit-item-found', params: { id: item.id } }"
              >
                <EditIcon />
              </router-link>
            </div>
            <div class="button-container">
              <button type="button" @click="items.deleteItem(item.id)">
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor Mapa */
.map-container {
  height: 20rem;
  margin: 3rem 0 1rem;
}

p {
  font-size: 1rem;
  color: white;
  margin-bottom: 1rem;
  margin: 0;
}

/* Estilos generales de la tarjeta */
.card {
  position: relative;
  width: 100vw;
  max-width: 25rem;
  height: 50rem;
  overflow: hidden;
  border-radius: 0.625rem;
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.3s ease;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
}

.card-image-container {
  width: 100%;
  height: 66%;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30%; /* Ajuste del alto del contenido visible */

  color: #fff;
  padding: 1rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transform: translateY(0);
}

.card:hover {
  transform: scale(1.05);
  transition: transform 500ms ease-in;
}
.card-content {
  height: 100%; /* Ocupa el 100% de la tarjeta al hacer hover */
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 0%, 0.05) 0%,
    hsla(0, 0%, 0%, 0.5) 70%,
    hsl(0, 0%, 0%, 0.8) 100%
  );
}

.card-content-inner {
  opacity: 1;
}

.card-title {
  font-weight: bold;
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
  position: absolute;
}

.card-description {
  margin-bottom: 1rem;
}

.card-details {
  display: none;
  flex-direction: column;
  transition: opacity 0.3s ease;
}
.card-details span {
  font-weight: 700;
  text-decoration: underline;
  color: var(--accent-100);
}

.card:hover .card-details {
  display: flex;
}

.card-text {
  margin: 0.5rem 0;
}

.card-text-content {
  max-height: 8rem;
  overflow-y: auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
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
button:hover {
  border: none;
  background: none;
  cursor: pointer;
}
</style>

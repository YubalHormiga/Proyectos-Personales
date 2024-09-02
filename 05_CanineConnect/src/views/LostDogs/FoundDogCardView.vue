<!-- FoundDogCardView ok -->
<script setup>
/* Importaciones de bibliotecas externas */
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

/* Importaciones de componentes locales */
import EditIcon from "../../assets/icons/EditIcon.vue";
import DeleteIcon from "../../assets/icons/DeleteIcon.vue";

/* Importaciones de stores */
import { useLostDogsStore } from "@/stores/lostDogsStore";
import { useAuthStore } from "@/stores/authStore";

/* Importaciones de composable */
import useLocationMap from "@/composables/useLocationMap";

// Definir las propiedades esperadas para el componente
const props = defineProps({
  lostDog: {
    type: Object,
    required: true,
  },
});

// Estado para mostrar o esconder contenido adicional
const showContent = ref(false);
// Inicializar los stores necesarios
const lostDogsStore = useLostDogsStore();
const authStore = useAuthStore();
const { zoom, pin } = useLocationMap();

// Computed property para verificar si el usuario actual es el propietario del perro perdido
const isOwner = computed(() => {
  return props.lostDog.userId === authStore.userData.uid;
});
</script>

<template>
  <article class="card">
    <img
      class="card-background"
      :src="lostDog.image"
      alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
      width="1920"
      height="2193"
    />
    <div class="card-content | flow">
      <div class="card-content-container | flow">
        <h2 class="card-title">{{ lostDog.dogName }}</h2>
        <p class="card-description">
          {{ lostDog.observations }}
        </p>
      </div>

      <div v-if="showContent">
        <!-- Encabezado de la tarjeta con botones de editar y eliminar si el usuario es el propietario -->
        <div class="card-header">
          <div class="map-container">
            <LMap
              ref="map"
              v-model:zoom="zoom"
              :center="[lostDog.map[0], lostDog.map[1]]"
              :use-global-leaflet="false"
            >
              <LMarker
                :lat-lng="[lostDog.map[0], lostDog.map[1]]"
                draggable
                @moveend="pin"
              />
              <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              ></LTileLayer>
            </LMap>
          </div>
          <div class="card-details">
            <p><span>Fecha de la desaparición:</span> {{ lostDog.date }}</p>
            <p><span>Email:</span> {{ lostDog.email }}</p>
            <p><span>Teléfono:</span> {{ lostDog.phone }}</p>
          </div>
          <!-- Botón para editar el perro perdido -->
          <div class="buttons-container" v-if="isOwner">
            <div class="button-container">
              <router-link
                :to="{ name: 'edit-lostDog-found', params: { id: lostDog.id } }"
              >
                <EditIcon />
              </router-link>
            </div>
            <!-- Botón para eliminar el perro perdido -->
            <div class="button-container">
              <div
                class="custom-icon"
                @click="lostDogsStore.deleteLostDog(lostDog.id)"
                role="button"
                tabindex="0"
              >
                <DeleteIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Botones para mostrar/ocultar contenido -->
      <button
        @click="showContent = !showContent"
        v-if="!showContent"
        class="card-button"
        aria-expanded="false"
        aria-controls="additional-content"
      >
        Más Información
      </button>
      <button
        @click="showContent = !showContent"
        v-else
        class="card-button"
        aria-expanded="true"
        aria-controls="additional-content"
      >
        Cerrar
      </button>
    </div>
  </article>
</template>

<style scoped>
.map-container {
  height: 15rem;
  margin-bottom: 1rem;
}
/* Estilos específicos para el icono de eliminar */
.custom-icon {
  cursor: pointer;
  display: inline-block; /* Para evitar espacios adicionales */
  background-color: transparent; /* Fondo transparente */
}
.buttons-container {
  display: flex;
  justify-content: space-between;
  padding: 2rem 0 0;
}
h2 {
  font-size: 2.25rem;
  color: white;
}

p {
  font-size: 1rem;
  color: white;
  margin-bottom: 1rem;
  margin: 0;
}
.card-description {
  margin: 1rem auto;
}

/* CARD COMPONENT */

.card {
  display: grid;
  place-items: center;
  width: 90vw;
  max-width: 25rem;
  height: 50rem;
  overflow: hidden;
  border-radius: 0.625rem;
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
}

.card > * {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.card-background {
  object-fit: cover;
  max-width: 100%;
  height: 100%;
}

.card-content {
  --flow-space: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: flex-end;
  height: 100%;
  padding: 15% 1.25rem 10.5rem;
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 0%, 0) 0%,
    hsla(0, 0%, 0%, 0.3) 10%,
    hsl(0, 0%, 0%) 100%
  );
}

.card-content-container {
  --flow-space: 1.25rem;
}

.card-title {
  position: relative;
  width: fit-content;
  width: -moz-fit-content; /* Prefijo necesario para Firefox  */
}
.card-details span {
  font-weight: 700;
  text-decoration: underline;
  color: var(--accent-100);
}
.card-title::after {
  content: "";
  position: absolute;
  height: 0.3125rem;
  width: calc(100% + 1.25rem);
  bottom: calc((1.25rem - 0.5rem) * -1);
  left: -1.25rem;
  background-color: var(--accent-100);
}

.card-button {
  padding: 0.75em 1.6em;
  width: fit-content;
  width: -moz-fit-content;
  font-variant: small-caps;
  font-weight: bold;
  border-radius: 0.45em;
  border: none;
  background-color: var(--accent-100);
  font-size: 1.125rem;
  color: black;
  margin-top: 1rem;
}

.card-button:focus {
  outline: 2px solid black;
  outline-offset: -5px;
}

@media (any-hover: hover) and (any-pointer: fine) {
  .card-content {
    transform: translateY(62%);
    transition: transform 500ms ease-out;
    transition-delay: 500ms;
  }

  .card-title::after {
    opacity: 0;
    transform: scaleX(0);
    transition: opacity 1000ms ease-in, transform 500ms ease-out;
    transition-delay: 500ms;
    transform-origin: right;
  }

  .card-background {
    transition: transform 500ms ease-in;
  }

  .card-content-container > :not(.card-title),
  .card-button {
    opacity: 0;
    transition: transform 500ms ease-out, opacity 500ms ease-out;
  }

  .card:hover,
  .card:focus-within {
    transform: scale(1.05);
    transition: transform 500ms ease-in;
  }

  .card:hover .card-content,
  .card:focus-within .card-content {
    transform: translateY(0);
    transition: transform 500ms ease-in;
  }

  .card:focus-within .card-content {
    transition-duration: 0ms;
  }

  .card:hover .card-background,
  .card:focus-within .card-background {
    transform: scale(1.3);
  }

  .card:hover .card-content-container > :not(.card-title),
  .card:hover .card-button,
  .card:focus-within .card-content-container > :not(.card-title),
  .card:focus-within .card-button {
    opacity: 1;
    transition: opacity 500ms ease-in;
    transition-delay: 1000ms;
  }

  .card:hover .card-title::after,
  .card:focus-within .card-title::after {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: left;
    transition: opacity 500ms ease-in, transform 500ms ease-in;
    transition-delay: 500ms;
  }
}
</style>

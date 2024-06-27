<!-- ReportFoundItemView OK -->
<script setup>
/* Importaciones de bibliotecas externas */
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

/* Importaciones de componentes locales */
import Link from "@/components/Link.vue";
import Spinner from "@/components/Spinner.vue";

/* Importaciones de stores */
import { useItemsStore } from "@/stores/itemsStore.js";
import { useAuthStore } from "@/stores/authStore";

/* Importaciones de composables */
import useImage from "@/composables/useImage";
import useLocationMap from "@/composables/useLocationMap";
/* Importaciones de helpers */
import { limitCharacters } from "@/helpers";

// Usamos el composable para el manejo de imágenes y extraemos las propiedades necesarias
const { url, onFileChange, isImageUploaded, spinner } =
  useImage("lostItems_images");
const { center, zoom, pin, getUserLocation } = useLocationMap();

// Usamos el store de items y de auth
const items = useItemsStore();
const authStore = useAuthStore();
// Inicializamos hooks de Vue Router
const router = useRouter();

// Definimos los datos del formulario de manera reactiva
const formData = reactive({
  map: "",
  image: "",
  date: "",
  name: "",
  email: "",
  phone: "",
  description: "",
  observations: "",
});

// Función para manejar el envío del formulario
const handleSubmit = async (data) => {
  const { image, map, ...values } = data;

  try {
    // Creamos un nuevo item usando el store
    await items.createItem({
      ...values,
      userId: authStore.userData.uid, // Incorporamos userId con el UID del usuario autenticado
      image: url.value, // Usamos la URL de la imagen subida
      map: center.value,
    });
    // Redirigimos a la página de "lost-items" después de la creación
    router.push({ name: "lost-items" });
  } catch (error) {
    console.log(error); // Manejamos cualquier error que ocurra durante la creación
  }
};

// Función para manejar la limitación de caracteres
const handleLimitCharacters = (field, maxLength) => {
  limitCharacters(formData, field, maxLength);
};
</script>

<template>
  <div class="container">
    <h4 class="gratitude-note">
      ¡Gracias por tu ayuda en la recuperación de objetos perdidos!
    </h4>
    <p>
      Si has encontrado algún objeto perdido en el pipican y deseas reportarlo
      para que el propietario pueda recuperarlo, por favor sigue estos pasos:<br />
      Completa el siguiente formulario con la información requerida sobre el
      objeto que encontraste. Asegúrate de proporcionar detalles precisos, como
      la descripción del objeto, la ubicación donde lo encontraste y cualquier
      otra información relevante. Si es posible, adjunta una foto del objeto
      para ayudar a identificarlo más fácilmente. Una vez enviado, nuestro
      equipo revisará la información y la agregará a la sección de "Objetos
      Encontrados" para que los propietarios puedan buscar y reclamar sus
      pertenencias perdidas. Gracias por tu colaboración en la recuperación y
      devolución de objetos perdidos.
    </p>
    <!-- Enlace para volver a la lista de objetos perdidos -->
    <Link to="lost-items">Volver a Objetos Perdidos</Link>
    <p class="gratitude-note">
      Tu ayuda es fundamental para mantener nuestro pipican un lugar seguro y
      acogedor para todos.
    </p>
    <!-- Formulario -->
    <div class="form">
      <FormKit type="form" submit-label="Enviar" @submit="handleSubmit">
        <!-- Campos del formulario -->
        <!-- Campos de Geolocalización -->
        <div class="geolocation-container">
          <button class="geolocation-button" @click="getUserLocation">
            Obtener Ubicación
          </button>
          <p class="pin">o desplázate con el pin</p>
        </div>
        <div class="map-container">
          <LMap
            ref="map"
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
          >
            <LMarker :lat-lng="center" draggable @moveend="pin" />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>

        <FormKit
          type="file"
          label="Añade una imagen del objeto y espera a que se cargue"
          name="image"
          placeholder="Imagen"
          validation="required"
          :validation-messages="{
            required: 'La imagen es obligatoria',
          }"
          @change="onFileChange"
          v-model.trim="formData.image"
        />
        <!-- Spinner y previsualización de la imagen -->
        <div v-if="spinner" class="spinner">
          <Spinner />
        </div>
        <div v-else-if="isImageUploaded" class="image-container">
          <img :src="url" alt="Nueva imagen producto" class="image" />
        </div>
        <FormKit
          type="date"
          name="date"
          label="Fecha en la que se encontró"
          validation="blur | required"
          validation-visibility="live"
          format="DD MM YY"
          v-model.trim="formData.date"
          :validation-messages="{
            required: 'La fecha en la que se encontró es requerida',
          }"
        />
        <FormKit
          type="text"
          label="Nombre"
          name="name"
          placeholder="Nombre"
          validation="required"
          :validation-messages="{
            required: 'El Nombre es Obligatorio',
          }"
          v-model.trim="formData.name"
        />
        <FormKit
          type="email"
          label="Email"
          name="email"
          placeholder="Email"
          validation="required"
          :validation-messages="{
            required: 'El email es Obligatorio',
          }"
          v-model.trim="formData.email"
        />
        <FormKit
          type="tel"
          label="Teléfono"
          name="phone"
          placeholder="Número de teléfono"
          validation="required"
          :validation-messages="{
            required: 'El Teléfono es Obligatorio',
          }"
          v-model.trim="formData.phone"
        />
        <FormKit
          type="textarea"
          label="Descripción del objeto encontrado"
          name="description"
          placeholder="Breve descripción del objeto encontrado"
          :help="`${formData.description.length} / 120`"
          validation="required | length:0,120"
          :validation-messages="{
            required: 'La descripción es obligatoria',
            length: 'La descripción no puede tener más de 120 caracteres.',
          }"
          validation-visibility="blur"
          v-model.trim="formData.description"
          @input="handleLimitCharacters('description', 120)"
        />
        <FormKit
          type="textarea"
          label="Observaciones adicionales"
          name="observations"
          placeholder="Observaciones adicionales"
          :help="`${formData.observations.length} / 120`"
          validation="length:0,120"
          :validation-messages="{
            length: 'La descripción no puede tener más de 120 caracteres',
          }"
          validation-visibility="blur"
          v-model.number="formData.observations"
          @input="handleLimitCharacters('observations', 120)"
        />
      </FormKit>
    </div>
  </div>
</template>

<style scoped>
/* Estilo para el spinner */
.spinner {
  display: flex;
  justify-content: space-around;
  margin-top: 6rem;
}

/* Nota de agradecimiento */
.gratitude-note {
  text-align: center;
}

/* Estilo del formulario */
.form {
  display: flex;
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  min-height: 50vh; /* Altura mínima para centrar verticalmente */
}

.form > * {
  max-width: 40rem; /* Ancho máximo del formulario */
  width: 100%; /* Hace que el formulario ocupe todo el ancho disponible */
  margin: 0 auto;
  margin-bottom: 1rem; /* Espaciado entre elementos del formulario */
}

/* Estilos para geolocalización */
.geolocation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}
.geolocation-button {
  display: block;
  border: none;
  cursor: pointer;
  color: #3367d6;
}
.geolocation-button:hover {
  display: block;
  cursor: pointer;
  font-weight: 700;
}
.pin {
  display: block;
}

/* Contenedor Mapa */
.map-container {
  height: 30rem;
  margin-bottom: 2rem;
}
/* Contenedor para la imagen */
.image-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 1rem;
}

/* Estilo de la imagen */
.image {
  max-width: 20rem; /* Ajusta el ancho de la imagen */
  height: auto; /* Mantiene la proporción de la imagen */
  max-height: 20rem; /* Limita la altura máxima de la imagen */
}
</style>

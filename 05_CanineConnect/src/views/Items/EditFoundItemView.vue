<!-- EditFoundItemView OK -->
<script setup>
/* Importaciones de bibliotecas externas */
import { reactive, watch, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { doc } from "firebase/firestore";
import { useDocument, useFirestore } from "vuefire";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

/* Importaciones de componentes locales */
import Link from "@/components/Link.vue";
import SpinnerDog from "@/components/SpinnerDog.vue";

/* Importaciones de stores */
import { useItemsStore } from "@/stores/itemsStore.js";

/* Importaciones de composables */
import useImage from "@/composables/useImage.js";
import useLocationMap from "@/composables/useLocationMap";

/* Importaciones de helpers */
import { limitCharacters } from "@/helpers";

// Usamos el composable para el manejo de imágenes y extraemos las propiedades necesarias
const { url, onFileChange, isImageUploaded, spinner } = useImage();
const { center, zoom, pin, getUserLocation } = useLocationMap();
// Usamos el store de items
const items = useItemsStore();

// Inicializamos hooks de Vue Router
const router = useRouter();
const route = useRoute();

// Consultamos la base de datos usando Firestore y vuefire
const db = useFirestore(); // Obtenemos una referencia a Firestore
const docRef = doc(db, "items", route.params.id); // Creamos una referencia a un documento específico en la colección "items", usando el ID de la ruta actual
const item = useDocument(docRef); // Usamos el hook de vuefire para obtener el documento y mantenerlo sincronizado

// Definimos los datos del formulario de manera reactiva
const formData = reactive({
  map: "",
  name: "",
  email: "",
  phone: "",
  description: "",
  location: "",
  date: "",
  image: "",
  observations: "",
});

// Estado para verificar si los datos están listos
const isDataReady = ref(false);

// Observamos cambios en el item y actualizamos formData cuando cambie
watch(item, async (item) => {
  if (!item) {
    // Si el item no existe, redirigimos a la página de "lost-items"
    router.push({ name: "lost-items" });
  } else {
    Object.assign(formData, item); // Actualizamos formData con los datos del item
    center.value = [item.map[0], item.map[1]];
    isDataReady.value = true;
    await nextTick(); // Aseguramos que Vue actualiza el DOM
  }
});
// Función para manejar el envío del formulario
const handleSubmit = async (data) => {
  try {
    // Actualizamos el documento en Firestore con los nuevos datos y la URL de la imagen
    const updatedData = {
      ...data,
      map: [center.value[0], center.value[1]],
      url,
    };
    await items.updateItem(docRef, updatedData);
    router.push({ name: "lost-items" }); // Redirigimos a la página de "lost-items" después de la actualización
  } catch (error) {
    console.log(error); // Manejamos cualquier error que ocurra durante la actualización
  }
};

// Función para manejar la limitación de caracteres
const handleLimitCharacters = (field, maxLength) => {
  limitCharacters(formData, field, maxLength);
};
</script>

<template>
  <div class="container">
    <h4 class="header-note">Editar Información del Objeto Encontrado</h4>
    <p>
      Por favor, utiliza el siguiente formulario para actualizar la información
      del objeto que encontraste. Asegúrate de proporcionar detalles precisos,
      como la descripción del objeto, la ubicación donde lo encontraste y
      cualquier otra información relevante. Si es posible, adjunta una foto del
      objeto para ayudar a identificarlo más fácilmente. Una vez que hayas
      completado los cambios, haz clic en "Enviar" para guardar la información
      actualizada.
    </p>
    <!-- Enlace para volver a la lista de objetos perdidos -->
    <Link to="lost-items">Volver a Objetos Perdidos</Link>
    <!-- Formulario -->
    <div class="form">
      <!-- Campos de Geolocalización -->
      <div class="geolocation-container">
        <button class="geolocation-button" @click="getUserLocation">
          Obtener Ubicación
        </button>
        <p class="pin">o desplázate con el pin</p>
      </div>
      <!-- Campos del formulario -->
      <FormKit
        type="form"
        :value="formData"
        submit-label="Guardar Cambios"
        incomplete-message="No se pudo enviar, revisa los mensajes"
        @submit="handleSubmit"
        :actions="false"
      >
        <!-- Campos del mapa -->
        <div class="map-container">
          <LMap
            v-if="isDataReady"
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
          type="date"
          name="date"
          label="Fecha en la que se encontró"
          validation="required"
          validation-visibility="live"
          format="DD MM YY"
          v-model.trim="formData.date"
        />
        <!-- Sección de imagen y spinner -->
        <div v-if="spinner" class="spinner">
          <SpinnerDog />
        </div>
        <div v-else-if="isImageUploaded" class="image-container">
          <p class="image">Imagen Nueva:</p>
          <img :src="url" alt="Nueva imagen Producto" class="image" />
        </div>
        <div v-else class="image-container">
          <p class="image">Imagen Actual:</p>
          <img
            :src="formData.image"
            :alt="'Imagen de ' + formData.image"
            class="image"
          />
        </div>
        <!-- Campo para cambiar la imagen -->
        <FormKit
          type="file"
          label="Cambiar Imagen"
          name="image"
          multiple="false"
          accept=".jpg"
          @change="onFileChange"
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
          validation="required | length:0,120"
          :validation-messages="{
            required: 'Las observaciones son obligatorias',
            length: 'La descripción no puede tener más de 120 caracteres',
          }"
          v-model.trim="formData.observations"
        />
        <!-- Botón de submit -->
        <FormKit type="submit">Guardar Cambios</FormKit>
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
/* Contenedor Mapa */
.map-container {
  height: 30rem;
  margin-bottom: 1rem;
}
/* Contenedor para las imágenes */
.image-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

/* Estilo de las imágenes */
.image {
  font-weight: bold;
  max-width: 20rem;
  max-height: 20rem;
}
/* Nota de agradecimiento */
.gratitude-note {
  text-align: center;
}

/* Estilo del formulario */
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  flex-direction: column;
}

.form > * {
  max-width: 40rem;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1rem;
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
  background-color: #fff;
  display: block;
  font-weight: 600;
  color: var(--text-100);
  text-decoration: underline;
}
.geolocation-button:hover {
  display: block;
  font-weight: 900;
  color: var(--text-200);
}
.pin {
  display: block;
}
</style>

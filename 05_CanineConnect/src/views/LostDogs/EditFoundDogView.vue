<!-- EditFoundDogView ok -->
<script setup>
/* Importaciones de bibliotecas externas */
import { reactive, watch, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDocument, useFirestore } from "vuefire";
import { doc } from "firebase/firestore";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

/* Importaciones de componentes locales */
import Link from "@/components/Link.vue";
import SpinnerDog from "@/components/SpinnerDog.vue";

/* Importaciones de stores */
import { useLostDogsStore } from "@/stores/lostDogsStore";

/* Importaciones de composables */
import useImage from "@/composables/useImage";
import useLocationMap from "@/composables/useLocationMap";

/* Importaciones de helpers */
import { limitCharacters } from "@/helpers";

// Usamos los composables para el manejo de imágenes y extraemos las propiedades necesarias
const { url, onFileChange, isImageUploaded, spinner } =
  useImage("lostDogs_images");
const { center, zoom, pin, getUserLocation } = useLocationMap();
// Usamos el store de perros perdidos
const lostDogsStore = useLostDogsStore();

// Inicializamos hooks de Vue Router
const router = useRouter();
const route = useRoute();

// Consultamos la base de datos usando Firestore y vuefire
const db = useFirestore(); // Obtenemos una referencia a Firestore
const docRef = doc(db, "lostDogs", route.params.id); // Creamos una referencia a un documento específico en la colección "lostDogs", usando el ID de la ruta actual
const dog = useDocument(docRef); // Usamos el hook de vuefire para obtener el documento y mantenerlo sincronizado

// Definimos los datos del formulario de manera reactiva
const formData = reactive({
  image: "",
  name: "",
  phone: "",
  email: "",
  observations: "",
  date: "",
  location: "",
});

// Estado para verificar si los datos están listos
const isDataReady = ref(false);

// Observamos cambios en el dog y actualizamos formData cuando cambie
watch(dog, async (dog) => {
  if (!dog) {
    // Si el dog no existe, redirigimos a la página de "lost-dogs"
    router.push({ name: "lost-dogs" });
  } else {
    Object.assign(formData, dog); // Actualizamos formData con los datos del dog
    center.value = [dog.map[0], dog.map[1]];
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
    await lostDogsStore.updateLostDog(docRef, updatedData); // Actualizamos el documento en Firestore con los nuevos datos y la URL de la imagen
    router.push({ name: "lost-dogs" }); // Redirigimos a la página de "lost-dogs" después de la actualización
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
    <h4 class="header-note">Editar Información de la Mascota Encontrada</h4>
    <p>
      Por favor, utiliza el siguiente formulario para actualizar la información
      de la mascota que encontraste. Asegúrate de proporcionar detalles
      precisos, la ubicación donde lo encontraste y cualquier otra información
      relevante. Una vez que hayas completado los cambios, haz clic en "Enviar"
      para guardar la información actualizada.
    </p>
    <!-- Enlace para volver a la lista de objetos perdidos -->
    <Link to="lost-dogs">Volver a Se Busca</Link>
    <p class="gratitude-note">
      ¡Tu ayuda es fundamental para reunificación de mascotas perdidas!
    </p>
    <!-- Campos de Geolocalización -->
    <div class="geolocation-container">
      <button class="geolocation-button" @click="getUserLocation">
        Obtener Ubicación
      </button>
      <p class="pin">o desplázate con el pin</p>
    </div>
    <!-- Formulario -->
    <div class="form">
      <FormKit type="form" submit-label="Enviar" @submit="handleSubmit">
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
        <!--Sección Fecha-->
        <FormKit
          class="message-input"
          type="date"
          label="Fecha del hallazgo"
          name="date"
          format="DD MM YY"
          placeholder="Fecha en que se encontró la mascota"
          validation="required"
          :validation-messages="{
            required: 'La fecha es obligatoria',
          }"
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
            required: 'El nombre es Obligatorio',
          }"
          v-model.trim="formData.name"
        />
        <!-- Campo para el nombre del perro -->
        <FormKit
          type="text"
          label="Nombre del perro"
          name="dogName"
          placeholder="Nombre del perro"
          validation="required"
          :validation-messages="{
            required: 'El nombre es Obligatorio',
          }"
          v-model.trim="formData.dogName"
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
          type="email"
          label="Email"
          name="email"
          placeholder="Dirección de email"
          validation="required"
          :validation-messages="{
            required: 'El email es Obligatorio',
          }"
          v-model.trim="formData.email"
        />
        <FormKit
          type="textarea"
          label="Ubicación y detalles"
          name="observations"
          placeholder="Dónde se encontró y cualquier detalle relevante"
          :help="`${formData.observations.length} / 200`"
          validation="required | length:0,200"
          :validation-messages="{
            required: 'La ubicación es obligatoria',
            length: 'La ubicación no puede tener más de 200 caracteres.',
          }"
          validation-visibility="blur"
          v-model="formData.observations"
          @input="handleLimitCharacters('observations', 200)"
        />
      </FormKit>
    </div>
  </div>
</template>

<style scoped>
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
/* Contenedor Mapa */
.map-container {
  height: 30rem;
  margin-bottom: 1rem;
}
/* Nota de agradecimiento */
.gratitude-note {
  text-align: center;
}

/* Estilo del formulario */
.form {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  align-items: center;
  min-height: 50vh;
}

.form > * {
  max-width: 40rem;
  width: 100%; /* Hace que el formulario ocupe todo el ancho disponible */
  margin: 0 auto;
  margin-bottom: 1rem; /* Espaciado entre elementos del formulario */
}

/* Estilo para el spinner */
.spinner {
  display: flex;
  justify-content: space-around;
  margin-top: 6rem;
}

/* Contenedor para la imagen */
.image-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

/* Estilo de la imagen */
.image {
  max-width: 20rem; /* Ajusta el ancho de la imagen */
  height: auto; /* Mantiene la proporción de la imagen */
  max-height: 20rem; /* Limita la altura máxima de la imagen */
}
</style>

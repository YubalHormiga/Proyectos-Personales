<!-- ReportDogFoundView ok -->
<script setup>
/* Importaciones de bibliotecas externas */
import { reactive } from "vue";
import { useRouter } from "vue-router";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
/* Importaciones de componentes locales */
import Link from "@/components/Link.vue";
import SpinnerDog from "@/components/SpinnerDog.vue";

/* Importaciones de stores */
import { useLostDogsStore } from "@/stores/lostDogsStore";
import { useAuthStore } from "@/stores/authStore.js";

/* Importaciones de composables */
import useImage from "@/composables/useImage";
import useLocationMap from "@/composables/useLocationMap";
// Importación de helpers
import { limitCharacters } from '@/helpers';

// Uso del composable useImage para manejar la carga de imágenes
const { url, onFileChange, isImageUploaded, spinner } = useImage("lostDogs_images");
const { center, zoom, pin, getUserLocation } = useLocationMap();
// Uso de useRouter para la navegación programática
const router = useRouter();

// Inicialización de los stores
const lostDogsStore = useLostDogsStore();
const authStore = useAuthStore();

// Datos reactivos para el formulario
const formData = reactive({
  image: "",
  name: "",
  dogName:'',
  phone: "",
  email: "",
  observations: "",
  date: "",
});

// Manejo del envío del formulario
const handleSubmit = async (data) => {
  const { image,map, ...values } = data;
  try {
    await lostDogsStore.addLostDog({
      ...values,
      userId: authStore.userData.uid,
      image: url.value,
      map: center.value,
    });
    // Redirección a la página de "lost-dogs"
    router.push({ name: "lost-dogs" });
  } catch (error) {
    console.log(error);
  }
};

// Función para limitar los caracteres en los campos de texto
const handleLimitCharacters = (field, maxLength) => {
  limitCharacters(formData, field, maxLength);
};
</script>

<template>
  <!-- Contenedor principal -->
  <div class="container">
    <!-- Nota de gratitud -->
    <h4 class="gratitude-note">
      ¡Gracias por tu ayuda en la reunificación de mascotas perdidas!
    </h4>
    <!-- Instrucciones para el formulario -->
    <p>
      Si has encontrado una mascota y deseas reportarlo para que su dueño pueda
      recuperarla, por favor sigue estos pasos: Completa el siguiente formulario
      con la información requerida sobre la mascota que encontraste. Asegúrate
      de proporcionar detalles precisos, como la descripción de la mascota, la
      ubicación donde la encontraste y cualquier otra información relevante.
      Adjunta una foto de la mascota para ayudar a identificarla más fácilmente.
      Una vez enviada la información se agregará a la sección de "Se Busca" para
      que los propietarios puedan buscar y reclamar a sus mascotas perdidas.
      Gracias por tu colaboración en la reunificación y devolución de mascotas
      perdidas.
    </p>
    <!-- Enlace para volver a la lista de objetos perdidos -->
    <Link to="lost-dogs">Volver a Se Busca</Link>
    <p class="gratitude-note">
      ¡Tu ayuda es fundamental para reunificación de mascotas perdidas!
    </p>
  </div>
  <!-- Formulario para reportar mascota encontrada -->
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
      <!-- Campo para cargar imagen -->
      <FormKit
        type="file"
        label="Añade una imagen y espera a que se cargue"
        name="image"
        placeholder="Imagen"
        validation="required"
        :validation-messages="{
          required: 'La imagen es obligatoria',
        }"
        @change="onFileChange"
        v-model.trim="formData.image"
      />
      <!-- Spinner mientras se carga la imagen -->
      <div v-if="spinner" class="spinner">
        <SpinnerDog />
      </div>
      <!-- Previsualización de la imagen cargada -->
      <div v-else-if="isImageUploaded" class="image-container">
        <img :src="url" alt="Nueva imagen producto" class="image" />
      </div>
      <!-- Campo para la fecha del hallazgo -->
      <FormKit
        class="message-input"
        type="date"
        label="¿Desde cuando lleva desaparecido?"
        name="date"
        format="DD MM YY"
        validation="required"
        :validation-messages="{
          required: 'La fecha es obligatoria',
        }"
        v-model.trim="formData.date"
      />
      <!-- Campo para el nombre -->
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
      <!-- Campo para el teléfono -->
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
      <!-- Campo para el email -->
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
      <!-- Campo para la ubicación y detalles -->
      <FormKit
        type="textarea"
        label="Observaciones"
        name="observations"
        placeholder="Cualquier detalle relevante que nos ayude a identificar a su perro, como raza, peso, etc"
        :help="`${formData.observations.length} / 200`"
        validation="required | length:0,200"
        :validation-messages="{
          required: 'Debe añadir observaciones',
          length: 'Las obsrevaciones no pueden superar los 200 caracteres.',
        }"
        validation-visibility="blur"
        v-model="formData.observations"
        @input="handleLimitCharacters('observations', 200)"
      />
    </FormKit>
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
  margin-bottom: 2rem;
}
/* Estilos para el contenedor principal */
.container {
  padding: 2rem;
}

/* Estilos para el contenedor de la nota de gratitud */
.gratitude-note {
  text-align: center;
}

/* Estilos para el formulario */
.form {
  display: flex;
  justify-content: center; /* Centrar horizontalmente */
  margin-top: 2rem;
  align-items: center; /* Centrar verticalmente */
  min-height: 50vh; /* Altura mínima para centrar verticalmente */
}

.form > * {
  max-width: 40rem; /* Ancho máximo del formulario */
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
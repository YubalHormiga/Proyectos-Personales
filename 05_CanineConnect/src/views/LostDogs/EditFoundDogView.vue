<!-- EditFoundDogView ok -->
<script setup>
/* Importaciones de bibliotecas externas */
import { reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDocument, useFirestore } from "vuefire";
import { doc } from "firebase/firestore";

/* Importaciones de componentes locales */
import Link from "@/components/Link.vue";
import Spinner from "@/components/Spinner.vue";

/* Importaciones de stores */
import { useLostDogsStore } from "@/stores/lostDogsStore";

/* Importaciones de composables */
import useImage from "@/composables/useImage";

/* Importaciones de helpers */
import { limitCharacters } from '@/helpers';

// Usamos el composable para el manejo de imágenes y extraemos las propiedades necesarias
const { url, onFileChange, isImageUploaded, spinner } = useImage("lostDogs_images");

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
  location: "",
  date: "",
});

// Observamos cambios en el dog y actualizamos formData cuando cambie
watch(dog, (dog) => {
  if (!dog) {
    // Si el dog no existe, redirigimos a la página de "lost-dogs"
    router.push({ name: "lost-dogs" });
  } else {
    Object.assign(formData, dog); // Actualizamos formData con los datos del dog
  }
});

// Función para manejar el envío del formulario
const handleSubmit = async (data) => {
  try {
    await lostDogsStore.updateLostDog(docRef, { ...data, url }); // Actualizamos el documento en Firestore con los nuevos datos y la URL de la imagen
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
    <!-- Formulario -->
    <div class="form">
      <FormKit type="form" submit-label="Enviar" @submit="handleSubmit">
               <!-- Sección de imagen y spinner -->
               <div v-if="spinner" class="spinner">
          <Spinner />
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
          name="location"
          placeholder="Dónde se encontró y cualquier detalle relevante"
          :help="`${formData.location.length} / 200`"
          validation="required | length:0,200"
          :validation-messages="{
            required: 'La ubicación es obligatoria',
            length: 'La ubicación no puede tener más de 200 caracteres.',
          }"
          validation-visibility="blur"
          v-model="formData.location"
          @input="handleLimitCharacters('location', 200)"
        />
      </FormKit>
    </div>
  </div>
</template>

<style scoped>
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


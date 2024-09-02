<!-- ReportFoundItemView OK -->
<script setup>
/* Importaciones de bibliotecas externas */
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";

/* Importaciones de componentes locales */
import Link from "@/components/Link.vue";
import SpinnerDog from "@/components/SpinnerDog.vue";

/* Importaciones de stores */
import { useAuthStore } from "@/stores/authStore";
import { useStoryStore } from "@/stores/storyStore";

/* Importaciones de composables */
import useImage from "@/composables/useImage";
/* Importaciones de helpers */
import { limitCharacters } from "@/helpers";

// Usamos el composable para el manejo de imágenes y extraemos las propiedades necesarias
const { url, onFileChange, isImageUploaded, spinner } =
  useImage("inspiring_stories");

// Usamos el store de items y de auth
const authStore = useAuthStore();
const storyStore = useStoryStore();
// Inicializamos hooks de Vue Router
const router = useRouter();

// Definimos los datos del formulario de manera reactiva
const formData = reactive({
  refugeName: "",
  contactName: "",
  email: "",
  phone: "",
  dogName: "",
  dogBreed: "",
  dogAge: "",
  sex: "",
  rescueDate: "",
  rescueLocation: "",
  medicalHistory: "",
  currentStatus: "",
  image: "",
  storyTitle: "",
  rescuedDog: "",
  overcomingFear: "",
  dogPersonality: "",
  urlWeb: "",
});

// Función para manejar el envío del formulario
const handleSubmit = async (data) => {
  const { image, ...values } = data;

  try {
    // Creamos un nuevo item usando el store
    await storyStore.createStory({
      ...values,
      userId: authStore.userData.uid, // Incorporamos userId con el UID del usuario autenticado
      image: url.value, // Usamos la URL de la imagen subida
    });
    // Redirigimos a la página de "lost-items" después de la creación
    router.push({ name: "inspiring-stories" });
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
    <h1 class="gratitude-note">
      Comparte la historia extraordinaria de tu perro y ayúdalo a inspirar a
      otros
    </h1>
    <p>
      En Canicine Connect, creemos que cada perro tiene una historia que contar.
      Tu perro es un héroe, un compañero leal, un amigo incondicional. A través
      de este formulario, puedes compartir su historia inspiradora con el mundo
      y ayudar a otros a ver el increíble poder del vínculo entre perros y
      humanos.
    </p>
    <h2>¿Qué tipo de historia puedes compartir?</h2>
    <ul>
      <li>
        Historias de perros que han superado la adversidad (enfermedad, lesión,
        abandono)
      </li>
      <li>
        Historias de perros que han brindado amor y apoyo a otros (terapia,
        asistencia)
      </li>
      <li>Historias de perros que han realizado actos heroicos</li>
      <li>
        Historias de perros que han demostrado una lealtad y valentía
        excepcionales
      </li>
      <li>
        Historias de perros que han formado un vínculo inquebrantable con sus
        humanos
      </li>
    </ul>
    <p>
      ¡Juntos, podemos celebrar el espíritu inspirador de los perros y hacer del
      mundo un lugar mejor!
    </p>
    <!-- Enlace para volver a la lista de objetos perdidos -->
    <Link to="inspiring-stories">Volver a Historias</Link>

    <!-- Formulario -->
    <div class="form">
      <FormKit type="form" submit-label="Enviar" @submit="handleSubmit">
        <!-- Campos del formulario -->
        <h3>Información General</h3>
        <FormKit
          type="text"
          label="Nombre del Refugio"
          name="refugeName"
          placeholder="Nombre del Refugio"
          validation="required"
          :validation-messages="{ required: 'El Nombre es Obligatorio' }"
          v-model.trim="formData.refugeName"
        />
        <FormKit
          type="text"
          label="Nombre del Contacto"
          name="contactName"
          placeholder="Nombre del Contacto"
          validation="required"
          :validation-messages="{ required: 'El Contacto es Obligatorio' }"
          v-model.trim="formData.contactName"
        />
        <FormKit
          type="email"
          label="Email"
          name="email"
          placeholder="Email"
          validation="required"
          :validation-messages="{ required: 'El Email es Obligatorio' }"
          v-model.trim="formData.email"
        />
        <FormKit
          type="tel"
          label="Teléfono"
          name="phone"
          placeholder="Número de Teléfono"
          validation="required"
          :validation-messages="{ required: 'El Teléfono es Obligatorio' }"
          v-model.trim="formData.phone"
        />
        <h3>Información del Perro</h3>

        <FormKit
          type="text"
          label="Nombre del Perro"
          name="dogName"
          placeholder="Nombre del Perro"
          validation="required"
          :validation-messages="{ required: 'El Nombre es Obligatorio' }"
          v-model.trim="formData.dogName"
        />
        <!-- Imagen -->
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
          <SpinnerDog />
        </div>
        <div v-else-if="isImageUploaded" class="image-container">
          <img :src="url" alt="Nueva imagen producto" class="image" />
        </div>

        <FormKit
          type="text"
          label="Raza"
          name="dogBreed"
          placeholder="Raza"
          validation="required"
          :validation-messages="{ required: 'La Raza es Obligatoria' }"
          v-model.trim="formData.dogBreed"
        />
        <FormKit
          type="number"
          label="Edad"
          name="dogAge"
          placeholder="Edad"
          validation="required"
          :validation-messages="{ required: 'La Edad es Obligatoria' }"
          v-model.trim="formData.dogAge"
        />
        <FormKit
          type="radio"
          label="Sexo del Perro"
          name="sex"
          :options="['Indiferente','Macho', 'Hembra']"
          validation="required"
          :validation-messages="{ required: 'Seleccionar Sexo es Obligatorio' }"
          v-model="formData.sex"
        />
        <FormKit
          type="date"
          label="Fecha de Rescate"
          name="rescueDate"
          placeholder="Fecha de Rescate"
          validation="required"
          :validation-messages="{ required: 'La Fecha es Obligatoria' }"
          v-model.trim="formData.rescueDate"
        />
        <FormKit
          type="text"
          label="Ubicación del Rescate"
          name="rescueLocation"
          placeholder="Ubicación del Rescate"
          validation="required"
          :validation-messages="{ required: 'La Ubicación es Obligatoria' }"
          v-model.trim="formData.rescueLocation"
        />
        <FormKit
          type="textarea"
          label="Historial Médico"
          name="medicalHistory"
          placeholder="Historial Médico"
          :help="`${formData.medicalHistory.length} / 300`"
          validation="length:0,300"
          :validation-messages="{
            length: 'La Descripción no puede tener más de 300 caracteres',
          }"
          validation-visibility="blur"
          v-model.number="formData.medicalHistory"
          @input="handleLimitCharacters('medicalHistory', 300)"
        />
        <FormKit
          type="textarea"
          label="Estado Actual"
          name="currentStatus"
          placeholder="Estado Actual"
          :help="`${formData.currentStatus.length} / 300`"
          validation="length:0,300"
          :validation-messages="{
            length: 'La Descripción no puede tener más de 300 caracteres',
          }"
          validation-visibility="blur"
          v-model.number="formData.currentStatus"
          @input="handleLimitCharacters('currentStatus', 300)"
        />
        <FormKit
          type="checkbox"
          label="Permiso de Uso de Imagen"
          name="terms"
          :value="true"
          validation="accepted"
          validation-visibility="dirty"
          :validation-messages="{ required: 'Acepta Uso de Imagen' }"
          v-model="formData.terms"
        />
        <h3>Contenido de la Historia</h3>
        <FormKit
          type="text"
          label="Título de la Historia"
          name="storyTitle"
          placeholder="Título"
          validation="required"
          :validation-messages="{ required: 'El Título es Obligatorio' }"
          v-model.trim="formData.storyTitle"
        />
        <FormKit
          type="textarea"
          label="Cómo llegó el perro al refugio"
          name="rescuedDog"
          placeholder="Breve descripción"
          :help="`${formData.rescuedDog.length} / 300`"
          validation="required | length:0,300"
          :validation-messages="{
            required: 'La Descripción es Obligatoria',
            length: 'La Descripción no puede tener más de 300 caracteres',
          }"
          validation-visibility="blur"
          v-model.trim="formData.rescuedDog"
          @input="handleLimitCharacters('rescuedDog', 300)"
        />
        <FormKit
          type="textarea"
          label="Desafíos que ha Superado"
          name="overcomingFear"
          placeholder="Desafíos"
          :help="`${formData.overcomingFear.length} / 300`"
          validation="length:0,300"
          :validation-messages="{
            length: 'La Descripción no puede tener más de 300 caracteres',
          }"
          validation-visibility="blur"
          v-model.number="formData.overcomingFear"
          @input="handleLimitCharacters('overcomingFear', 300)"
        />
        <FormKit
          type="textarea"
          label="Personalidad y Talentos Únicos"
          name="dogPersonality"
          placeholder="Personalidad"
          :help="`${formData.dogPersonality.length} / 300`"
          validation="length:0,300"
          :validation-messages="{
            length: 'La Descripción no puede tener más de 300 caracteres',
          }"
          validation-visibility="blur"
          v-model.number="formData.dogPersonality"
          @input="handleLimitCharacters('dogPersonality', 300)"
        />
        <FormKit
          type="url"
          label="Agrega Enlace"
          name="urlWeb"
          placeholder="https://www.example.com..."
          validation="required|url"
          :validation-messages="{ required: 'El Enlace es Obligatorio' }"
          v-model.trim="formData.urlWeb"
        />
      </FormKit>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: 1rem auto;
  color: var(--accent-200);
}
ul {
  list-style: disc;
}
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

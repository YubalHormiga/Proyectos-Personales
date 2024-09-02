<!-- ReportFoundItemView OK -->
<script setup>
/* Importaciones de bibliotecas externas */
import { reactive, watch, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDocument, useFirestore } from "vuefire";
import { doc } from "firebase/firestore";

/* Importaciones de componentes locales */
import Link from "@/components/Link.vue";
import SpinnerDog from "@/components/SpinnerDog.vue";

/* Importaciones de stores */
import { useAuthStore } from "@/stores/authStore";
import { useAdoptionStore } from "@/stores/adoptionStore";

/* Importaciones de composables */
import useImage from "@/composables/useImage";
/* Importaciones de helpers */
import { limitCharacters } from "@/helpers";

// Usamos el composable para el manejo de imágenes y extraemos las propiedades necesarias
const { url, onFileChange, isImageUploaded, spinner } =
  useImage("adoptions_dogs");

// Usamos el store de items y de auth
const adoptionStore = useAdoptionStore();
// Inicializamos hooks de Vue Router
const router = useRouter();
const route = useRoute();

const nameCanineProtector = ref([
  {
    label: "--Selecciona Protectora--",
    value: "",
    attrs: {
      disabled: true,
    },
  },
  { label: "Huellas Amigables", value: "Huellas Amigables" },
  { label: "Hogar de Colas Wagging", value: "Hogar de Colas Wagging" },
  { label: "Refugio Canino Amoroso", value: "Refugio Canino Amoroso" },
  { label: "Patitas Protegidas", value: "Patitas Protegidas" },
  { label: "Un Segundo Ladrido", value: "Un Segundo Ladrido" },
  { label: "Peludos con Futuro", value: "Peludos con Futuro" },
  { label: "Compañeros Caninos", value: "Compañeros Caninos" },
  {
    label: "Narices Húmedas, Corazones Grandes",
    value: "Narices Húmedas, Corazones Grandes",
  },
  { label: "Huellas de Esperanza", value: "Huellas de Esperanza" },
  {
    label: "Amor Canino Sin Condiciones",
    value: "Amor Canino Sin Condiciones",
  },
]);

const db = useFirestore();
const docRef = doc(db, "adoptions", route.params.id);
const dog = useDocument(docRef);

const isDataReady = ref("false");

watch(dog, async (dog) => {
  if (!dog) {
    await router.push({ name: "adoption-list" });
  } else {
    Object.assign(formData, dog);
    isDataReady.value = "true";
    await nextTick();
  }
});

// Definimos los datos del formulario de manera reactiva
const formData = reactive({
  refugeName: "",
  website: "",
  contactName: "",
  email: "",
  phone: "",
  dogName: "",
  adoptionStatus: "",
  rescueDate: "",
  rescueLocation: "",
  dogBreed: "",
  dogAge: "",
  weight: "",
  energy: "",
  sex: "",
  size: "",
  medicalHistory: "",
  currentStatus: "",
  description: "",
  requirements: "",
  dogStory: "",
  title: "",
  image: "",
});
// Función para manejar el envío del formulario
const handleSubmit = async (data) => {
  try {
    // Actualizamos el documento en Firestore con los nuevos datos y la URL de la imagen
    const updatedData = {
      ...data,
      url,
    };
    await adoptionStore.updateAdoptionDog(docRef, updatedData); // Actualizamos el documento en Firestore con los nuevos datos y la URL de la imagen
    router.push({ name: "adoption-list" }); // Redirigimos a la página de "lost-dogs" después de la actualización
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
  <Link to="adoption">Volver</Link>
  <header>
    <h2>Realiza los cambios necesaros</h2>
  </header>
  <main>
    <!-- Formulario -->
    <div class="form">
      <FormKit type="form" submit-label="Enviar" @submit="handleSubmit">
        <!-- Campos del formulario -->
        <h3>Información General</h3>
        <FormKit
          type="select"
          label="Selecciona tu protectora?"
          name="refugeName"
          validation="required"
          :validation-messages="{
            required: 'Seleccionar el nombre tu protectora es obligatorio',
          }"
          :options="nameCanineProtector"
          v-model="formData.refugeName"
        />
        <FormKit
          type="url"
          label="Tu website"
          name="website"
          placeholder="https://www.example.com..."
          validation="required|url"
          :validation-messages="{
            required: 'Añade la dirección de tu website',
            url: 'Introduce correctamente tu website',
          }"
          v-model.trim="formData.website"
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
          accept=".jpg,.webp, jpeg"
          @change="onFileChange"
        />
        <FormKit
          type="select"
          label="¿Cual es el estado de adopción?"
          name="adoptionStatus"
          :options="[
            {
              label: '--Selecciona el estado--',
              value: '',
              attrs: { disabled: true },
            },
            'En adopción',
            'Adopciones  dobles',
            'En acogida',
            'Casos especiales',
            'Adoptados',
          ]"
          validation="required"
          :validation-messages="{ required: 'El estado es      Obligatorio' }"
          v-model.trim="formData.adoptionStatus"
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
          v-model.number="formData.dogAge"
          min="1"
        />
        <FormKit
          type="radio"
          label="Sexo del Perro"
          name="sex"
          :options="['Macho', 'Hembra']"
          validation="required"
          :validation-messages="{ required: 'Seleccionar Sexo es Obligatorio' }"
          v-model="formData.sex"
        />
        <FormKit
          type="radio"
          label="Tamaño del perro"
          name="size"
          :options="[
            'Pequeño, hasta 35 cm',
            'Mediano, entre 35 y 55 cm',
            'Grande,  entre 55 y 75 cm',
            'Gigante,  más de 75 cm',
          ]"
          validation="required"
          :validation-messages="{
            required: 'Seleccionar tamaño es Obligatorio',
          }"
          v-model="formData.size"
        />
        <FormKit
          type="radio"
          label="Peso del perro"
          name="weight"
          :options="[
            'Hasta 10 kg',
            'Entre 10 y 25 kg',
            ' 25 y 45 kg',
            'Más de 75 cm',
          ]"
          validation="required"
          :validation-messages="{
            required: 'Seleccionar el peso es Obligatorio',
          }"
          v-model="formData.weight"
        />
        <FormKit
          type="range"
          :label="`Indique el nivel de actividad del perro: ${
            formData.energy || 50
          } `"
          number
          step="10"
          name="energy"
          min="0"
          max="100"
          v-model="formData.energy"
          help="Indique el nivel de actividad típico del perro (bajo, medio o alto)"
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
          v-model.trim="formData.medicalHistory"
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
          v-model.trim="formData.currentStatus"
          @input="handleLimitCharacters('currentStatus', 300)"
        />
        <FormKit
          type="textarea"
          label="Descripción"
          name="description"
          placeholder="Una descripción detallada de la personalidad, el temperamento y las necesidades especiales del perro."
          :help="`${formData.description.length} / 600`"
          validation="length:0,600"
          :validation-messages="{
            length: 'La Descripción no puede tener más de 600 caracteres',
          }"
          validation-visibility="blur"
          v-model.trim="formData.description"
          @input="handleLimitCharacters('currentStatus', 600)"
        />
        <FormKit
          type="textarea"
          label="Requisitos"
          name="requirements"
          placeholder="Describa cualquier requisito específico para adoptar al perro (por ejemplo, patio cercado, experiencia con ciertas razas)."
          :help="`${formData.requirements.length} / 600`"
          validation="length:0,600"
          :validation-messages="{
            length: 'La Descripción no puede tener más de 600 caracteres',
          }"
          validation-visibility="blur"
          v-model.number="formData.requirements"
          @input="handleLimitCharacters('currentStatus', 600)"
        />
        <FormKit
          type="textarea"
          label="Historia"
          name="dogStory"
          placeholder="Cuéntanos la historia,¿Cómo llegó  a tu refugio/protectora? ¿Qué experiencias ha tenido en el pasado?¿Qué puede ofrecer a una familia? ¿Qué tipo de amor y lealtad puede dar? "
          :help="`${formData.dogStory.length} / 900`"
          validation="length:0,900"
          :validation-messages="{
            length: 'La historia no puede tener más de 900 caracteres',
          }"
          validation-visibility="blur"
          v-model.trim="formData.dogStory"
          @input="handleLimitCharacters('currentStatus', 900)"
        />
        <FormKit
          type="text"
          label="Titulo"
          name="title"
          placeholder="Ejemplos:
      'Sociable y cariñoso','Todo energía'"
          validation="required | length:0,030"
          :validation-messages="{
            required: 'El título es Obligatorio',
            length: 'El titulo no puede tener mas de 30 caracteres ',
          }"
          v-model.trim="formData.title"
          :help="`${formData.dogStory.length} / 30 `"
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
      </FormKit>
    </div>
  </main>
</template>
<style scoped>
img {
  height: 20px;
  width: 20px;
}
h1,
h2,
h3,
span {
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
}

/* Estilo del formulario */
.form {
  display: flex;
  justify-content: center;
  /* Centrar horizontalmente */
  align-items: center;
  /* Centrar verticalmente */
  min-height: 50vh;
  /* Altura mínima para centrar verticalmente */
}

.form > * {
  max-width: 40rem;
  /* Ancho máximo del formulario */
  width: 100%;
  /* Hace que el formulario ocupe todo el ancho disponible */
  margin: 0 auto;
  margin-bottom: 1rem;
  /* Espaciado entre elementos del formulario */
}

/* Contenedor para la imagen */
.image-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

/* Estilo de la imagen */
.image {
  width: 20rem;
  height: 20rem;
}
</style>

<!-- ReportFoundItemView OK -->
<script setup>
/* Importaciones de bibliotecas externas */
import { reactive, watch, ref } from "vue";
import { useRouter } from "vue-router";

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
const authStore = useAuthStore();
const adoptionStore = useAdoptionStore();
// Inicializamos hooks de Vue Router
const router = useRouter();

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
  const { image, ...values } = data;
  try {
    // Creamos un nuevo item usando el store
    await adoptionStore.createAdoption({
      ...values,
      userId: authStore.userData.uid, // Incorporamos userId con el UID del usuario autenticado
      image: url.value, // Usamos la URL de la imagen subida
    });
    // Redirigimos a la página de "lost-items" después de la creación
    router.push({ name: "adoption-list" });
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
  <Link to="adoption">Volver</Link>
  <header>
    <h1>¡Bienvenidos a CaniniConnect!</h1>
  </header>

  <main>
    <p>
      En CaniniConnect, nuestra misión es encontrar hogares amorosos para cada
      perro que lo necesite. Nos enorgullece colaborar con protectoras y
      refugios para hacer realidad este sueño.
    </p>
  </main>
  <section>
    <h2>¿Cómo funciona?</h2>
    <article>
      <h3>Publica Perfiles de Perros:</h3>
      <p>
        Explora nuestra aplicación hoy y descubre cómo puedes cambiar una vida y
        la tuya. Si tienes alguna pregunta o necesitas ayuda, nuestro equipo
        está disponible para asistirte. <br />
      </p>
    </article>
    <article>
      <h3>Conecta con Adoptantes:</h3>
      <p>
        Recibe solicitudes de adopción y gestiona las consultas directamente a
        través de nuestra plataforma.
      </p>
    </article>
    <article>
      <h3>Hacemos el Resto:</h3>
      <p>
        Nosotros nos encargamos de difundir los perfiles y ayudar a encontrar la
        mejor familia para cada uno de tus perros.
      </p>
    </article>
  </section>
  <section>
    <h2>¿Por qué elegir CaniniConnect?</h2>
    <article>
      <h3>Visibilidad Ampliada:</h3>
      <p>
        Nuestra aplicación llega a una amplia audiencia de posibles adoptantes
        comprometidos.
      </p>
    </article>
    <article>
      <h3>Facilidad de Uso:</h3>
      <p>
        Herramientas intuitivas para gestionar perfiles, solicitudes y
        comunicaciones.
      </p>
    </article>
    <article>
      <h3>Soporte Continuo:</h3>
      <p>
        Nuestro equipo está aquí para ayudarte en cada paso del proceso.
        <br />
        <span>¡Únete a nosotros y marca la diferencia! </span>
      </p>
    </article>
  </section>

  <!-- Formulario -->
  <div class="form">
    <FormKit type="form" submit-label="Enviar" @submit="handleSubmit">
      <h2>Rellena Formulario</h2>
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
        type="select"
        label="¿Cual es el estado de adopción?"
        name="adoptionStatus"
        :options="[
          {
            label: '--Selecciona el estado--',
            value: '',
            attrs: { disabled: true },
          },
          {
            label: 'En adopción',
            value: 'inAdoptionProcess',
            attrs: { disabled: false },
          },
          {
            label: 'Adopciones  dobles',
            value: 'doubleAdoption',
            attrs: { disabled: false },
          },
          {
            label: 'En acogida',
            value: 'inFosterCare',
            attrs: { disabled: false },
          },
          {
            label: 'Casos especiales',
            value: 'specialCases',
            attrs: { disabled: false },
          },
          {
            label: 'Adoptados',
            value: 'adopted',
            attrs: { disabled: false },
          },
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
        :options="[
          { label: 'Macho', value: 'male' },
          { label: 'Hembra', value: 'female' },
        ]"
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
        :validation-messages="{ required: 'Seleccionar tamaño es Obligatorio' }"
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
</template>
<style scoped>
h1 {
  text-align: center;
}

h2,
p {
  margin-bottom: 1rem;
}

span {
  display: block;
  text-align: center;
  color: var(--accent-100);
  font-weight: bold;
}

/* Estilo del formulario */
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.form > * {
  max-width: 40rem;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1rem;
}
.form h2 {
  text-align: center;
}
.form h3 {
  text-align: center margin;
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
  max-width: 20rem;
  /* Ajusta el ancho de la imagen */
  height: auto;
  /* Mantiene la proporción de la imagen */
  max-height: 20rem;
  /* Limita la altura máxima de la imagen */
}
</style>

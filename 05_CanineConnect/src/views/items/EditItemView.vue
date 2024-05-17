<script setup>
import { reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { doc } from "firebase/firestore";
import { useDocument, useFirestore } from "vuefire";
import Link from "@/components/Link.vue";
import { useItemsStore } from "@/stores/itemsStore.js";
import useImage from "@/composables/useImage.js";

const { url, onFileChange, isImageUploaded } = useImage();
const items = useItemsStore();

const router = useRouter();
const route = useRoute();

//Consultamos la base de datos
console.log(route.params.id);
const db = useFirestore();
const docRef = doc(db, "items", route.params.id);

const item = useDocument(docRef);

const formData = reactive({
  name: "",
  email: "",
  phone: "",
  description: "",
  location: "",
  date: "",
  image: "",
  observations: "",
});

watch(item, (item) => {
  if (!item) {
    router.push({ name: "lost-items" });
  }
  Object.assign(formData, item);
});

const handleSubmit = async (data) => {
  try {
    await items.updateItem(docRef, { ...data, url });

    router.push({ name: "lost-items" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="container">
    <!-- Título de la sección -->
    <h4 class="header-note">Editar Información del Objeto Encontrado</h4>
    <!-- Descripción del formulario -->
    <p>
      Por favor, utiliza el siguiente formulario para actualizar la información
      del objeto que encontraste. Asegúrate de proporcionar detalles precisos,
      como la descripción del objeto, la ubicación donde lo encontraste y
      cualquier otra información relevante. Si es posible, adjunta una foto del
      objeto para ayudar a identificarlo más fácilmente. Una vez que hayas
      completado los cambios, haz clic en "Enviar" para guardar la información
      actualizada.
    </p>
    <Link to="lost-items">Volver a Objetos Perdidos </Link>
    <!-- Formulario -->
    <div class="form">
      <FormKit
        type="form"
        :value="formData"
        submit-label="Guardar Cambios"
        incomplete-message="No se pudo enviar, revisa los mensajes"
        @submit="handleSubmit"
        :actions="false"
      >
        <!-- Campos del formulario -->
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
          validation="required"
          :validation-messages="{
            required: 'La descripción es obligatoria',
          }"
          v-model.trim="formData.description"
        />
        <FormKit
          type="textarea"
          label="Ubicación donde se encontró el objeto"
          name="location"
          placeholder="En donde se ha encontrado"
          validation="required"
          :validation-messages="{
            required: 'La ubicación es obligatoria',
          }"
          v-model.trim="formData.location"
        />
        <FormKit
          type="date"
          name="date"
          label="Fecha en la que se encontró"
          validation="required"
          validation-visibility="live"
          format="DD MM YY"
          v-model.trim="formData.date"
        />
        <div v-if="isImageUploaded">
          <p class="image">Imagen Nueva:</p>
          <img :src="url" alt="Nueva imagen Producto" class="image" />
        </div>

        <div v-else>
          <p class="font-black">Imagen Actual:</p>
          <img
            :src="formData.image"
            :alt="'Imagen de' + formData.image"
            class="image"
          />
        </div>

        <FormKit
          type="file"
          label="Cambiar Imagen"
          name="image"
          multiple="false"
          accept=".jpg"
          @change="onFileChange"
        />

        <FormKit
          type="textarea"
          label="Observaciones adicionales"
          name="observations"
          placeholder="Observaciones adicionales"
          validation="required"
          :validation-messages="{
            required: 'Las observaciones son obligatorias',
          }"
          v-model.number="formData.observations"
        />

        <FormKit type="submit">Guardar Cambios</FormKit>
      </FormKit>
    </div>
  </div>
</template>

<style scoped>
.gratitude-note {
  text-align: center;
}

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
.image-container {
  display: flex;
  justify-content: center;
}
.image {
  font-weight: bold;
  max-width: 20rem; /* Ajusta el ancho de la imagen */
  max-height: 20rem; /* Limita la altura máxima de la imagen */
}
</style>

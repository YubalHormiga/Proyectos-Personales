<script setup>
import { reactive } from 'vue';
import useImage from '../composables/useImage.js'
import { useFoundItemsStore } from '@/stores/foundItemsStore.js';
import Link from '@/components/Link.vue';

const { url, onFileChange, isImageUploaded } = useImage();

const { foundProduct }=useFoundItemsStore()

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  description: '',
  location: '',
  date:'',
  image: '',
  observations: ''

})

const handleSubmit = async (data) => {
  const { image, ...values } = data;

  try {
    await foundProduct({
      ...values,
      image: url.value
    })

  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="container">
    <!-- Título de agradecimiento -->
    <h4 class="gratitude-note">
      ¡Gracias por tu ayuda en la recuperación de objetos perdidos!
    </h4>
    <!-- Descripción del formulario -->
    <p>
      Si has encontrado algún objeto perdido en el pipican y deseas reportarlo
      para que el propietario pueda recuperarlo, por favor sigue estos pasos:<br>
      Completa el siguiente formulario con la información requerida sobre el
      objeto que encontraste. Asegúrate de proporcionar detalles precisos, como
      la descripción del objeto, la ubicación donde lo encontraste y cualquier
      otra información relevante. Si es posible, adjunta una foto del objeto
      para ayudar a identificarlo más fácilmente. Una vez enviado, nuestro
      equipo revisará la información y la agregará a la sección de "Objetos
      Encontrados" para que los propietarios puedan buscar y reclamar sus
      pertenencias perdidas. Gracias por tu colaboración en la recuperación y devolución de objetos perdidos.
    </p>
      <Link to="lost-items">Volver a Objetos Perdidos</Link>
    <p class="gratitude-note">Tu ayuda es fundamental para mantener nuestro pipican un lugar seguro y acogedor para
      todos.</p>
    <!-- Formulario -->
    <div class="form">
      <FormKit type="form" submit-label="Enviar" @submit='handleSubmit'>
        <!-- Campos del formulario -->
        <FormKit type="text" label="Nombre" name="name" placeholder="Nombre" validation="required" :validation-messages="{
          required: 'El Nombre es Obligatorio',
        }" v-model.trim="formData.name" />
        <FormKit type="email" label="Email" name="email" placeholder="Email" validation="required" :validation-messages="{
          required: 'El email es Obligatorio',
        }" v-model.trim="formData.email" />
        <FormKit type="tel" label="Teléfono" name="phone" placeholder="Número de teléfono" validation="required"
          :validation-messages="{
            required: 'El Teléfono es Obligatorio',
          }" v-model.trim="formData.phone" />
        <FormKit type="textarea" label="Descripción del objeto encontrado" name="description"
          placeholder="Breve descripción del objeto encontrado" validation="required" :validation-messages="{
            required: 'La descripción es obligatoria',
          }" v-model.trim="formData.description" />
        <FormKit type="textarea" label="Ubicación donde se encontró el objeto" name="location"
          placeholder="En donde se ha encontrado" validation="required" :validation-messages="{
            required: 'La ubicación es obligatoria',
          }" v-model.trim="formData.location" />
        <FormKit type="date"  name="date" label="Fecha en la que se encontró" validation="required"
          validation-visibility="live"  format="DD MM YY" v-model.trim="formData.date" />

        <FormKit type="file" label="Añade una imagen del objeto" name="image" placeholder="Imagen" validation="required"
          :validation-messages="{
            required: 'La imagen es obligatoria',
          }" @change="onFileChange" v-model.trim="formData.image" />
        <div v-if="isImageUploaded">
          <img :src="url" alt="Nueva imagen producto" class="image" />
        </div>
        <FormKit type="textarea" label="Observaciones adicionales" name="observations"
          placeholder="Observaciones adicionales" validation="required" :validation-messages="{
            required: 'Las observaciones son obligatorias',
          }" v-model.number="formData.observations" />
      </FormKit>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0 1rem;
  text-align: justify;
  max-width: 120rem;
  /* Ancho máximo del contenedor */
  margin: 0 auto;
  /* Centrar el contenedor horizontalmente */
}

.gratitude-note {
  text-align: center;
}

.form {
  display: flex;
  justify-content: center;
  /* Centrar el formulario horizontalmente */

}

.form>* {
  max-width: 40rem;
  /* Ancho máximo del formulario */
  width: 100%;
  /* Hace que el formulario ocupe todo el ancho disponible */
  margin: 0 auto;
  margin-bottom: 1rem;
  /* Espaciado entre elementos del formulario */
}

.image {
  width: 10;
  height: 15rem;
}
</style>
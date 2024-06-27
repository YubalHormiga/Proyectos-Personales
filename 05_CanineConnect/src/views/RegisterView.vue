<!-- RegisterView.vue -->
<script setup>
import { ref, inject } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { authSchema } from "../validation/authSchema.js";

const authStore = useAuthStore();
const { register } = authStore;

const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");

const error = ref({});

const handleSubmit = async () => {
  // Resteamos errores
  error.value = {};
  // Verificamos reglas de validación
  const emailError = authSchema.email(email.value);
  const passwordError = authSchema.password(password.value);
  // Si hay errores, establece los mensajes de error
  if (!emailError) {
    error.value.email = emailError;
  }

  if (!passwordError) {
    error.value.password = passwordError;
  }

  if (Object.keys(error.value).length > 0) {
    return;
  }
  // Si no hay errores, procede con el registro
  const displayName = `${firstName.value} ${lastName.value}`;
  await register(
    email.value,
    password.value,
    displayName
  );
};
</script>

<template>
  <div class="container">
    <p class="wellcome-message">
      ¡Bienvenido a CanineConnect! Estamos encantados de dar la bienvenida a
      todos los amantes de los perros a nuestra comunidad en línea. En
      CanineConnect, no solo encontrarás un lugar para conectarte con otros
      dueños de mascotas, sino también una plataforma llena de recursos útiles,
      consejos expertos y un espacio para compartir experiencias. Desde consejos
      de entrenamiento hasta recomendaciones de cuidado de la salud, estamos
      aquí para apoyarte en cada paso del camino mientras te embarcas en esta
      aventura emocionante junto a tu fiel amigo peludo. ¡Regístrate ahora para
      empezar a explorar todo lo que CanineConnect tiene para ofrecerte!
      ¡Gracias por unirte a nuestra manada! El equipo de CanineConnect
    </p>
    <div class="login-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="firstName">Nombre:</label>
          <input type="text" v-model.trim="firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Apellidos:</label>
          <input type="text" v-model.trim="lastName" required />
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input type="email" v-model.trim="email" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" v-model.trim="password" required />
        </div>
        <button type="submit" class="buttons">Registrar</button>
        <div class="linkBack">
          <router-link class="linkBack" :to="{ name: 'login' }"
            >Atras</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0 1rem;
}
@media (min-width: 767px) {
  .container {
    max-width: 120rem;
    margin: 0 auto;
  }
}
.wellcome-message {
  text-align: justify;
}
.login-form,
.register-container {
  max-width: 400px;
  margin: 4rem auto;
}

.form-group {
  margin-bottom: 1rem;
}
.register-message {
  text-align: center;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 1rem;
  font-size: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}
.linkBack {
  text-decoration: none;
  text-align: center;
  margin-top: 3rem;
  color: #007bff;
}
.linkBack:hover {
  text-align: center;
  text-decoration: underline;
}
</style>

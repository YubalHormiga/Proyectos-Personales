<!-- RegisterView.vue -->

<script setup>
import { ref, inject } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { authSchema } from "../validation/authSchema.js";

const authStore = useAuthStore();
const { register } = authStore;

const email = ref("correo@correo.com");
const password = ref("123123123");

const error = ref({});

const hadleSubmit = async () => {
  //Resteamos errores
  error.value = {};
  //Verificamos reglas de validació
  const emailError = authSchema.email(email.value);
  const passwordError = authSchema.password(password.value);
  // Si hay errores, establece los mensajes de error
  if (!emailError) {
    email.value.email = emailError;
  }

  if (!passwordError) {
    password.value.password = passwordError;
  }

  if (Object.keys(error.value).length > 0) {
    return;
  }
  // Si no hay errores, procede con el registro
  await register(email.value, password.value);
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
      <form @submit.prevent="hadleSubmit">
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
@media (min-width: 640px) {
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
input[type="password"] {
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
</style>

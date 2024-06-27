<script setup>
import { ref} from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const { login } = authStore;
const email = ref("correo@correo.com");
const password = ref("123123123");


const submitForm = async () => {
  await login(email.value, password.value);
};
</script>

<template>
  <div class="container">
    <p class="wellcome-message">
      ¡Bienvenido de nuevo! Estamos encantados de verte de vuelta. Por favor,
      inicia sesión para acceder a tu cuenta y disfrutar de todas las
      características y beneficios que tenemos preparados para ti.
    </p>
    <div class="login-form">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input type="email" v-model.trim="email" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" v-model.trim="password" required />
        </div>
        <button type="submit" class="buttons">Iniciar sesión</button>
      </form>
    </div>
    <div class="register-container">
      <p class="register-message">¿Eres nuevo en CanineConnect?</p>
      <router-link :to="{ name: 'register' }" class="register-button">
        Crea tu cuenta de CanineConnect
      </router-link>
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
  margin-top: 1rem;
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
  border: 1px solid #ccc;
  border-radius: 3px;
}
p {
  margin: 0;
}
.buttons {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
}

.buttons:hover {
  background-color: #0056b3;
}
.register-button {
  display: block;
  text-align: center;
  text-decoration: none;
  color: #007bff;
  padding: 1rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
}
.register-button:hover {
  display: block;
  text-align: center;
  text-decoration: underline;
  color: #007bff;
  cursor: pointer;
  width: 100%;
}
</style>

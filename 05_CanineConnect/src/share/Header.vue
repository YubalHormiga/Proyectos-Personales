<script setup class="script-setup">
import { RouterLink, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import MainNavigation from "../share/MainNavigation.vue";

const authStore = useAuthStore();
const route = useRoute();

// Extraemos las referencias necesarias del store de autenticación
const { isLoggedIn, userData } = storeToRefs(authStore);
const { logoutUser } = authStore;
</script>

<template class="header-template">
  <header class="header">
    <!-- Contenido dependiendo del estado de autenticación -->
    <div class="welcome" v-if="isLoggedIn && route.name !== 'login'">
      <div class="welcome-content">
        Bienvenid@ <span>{{ userData?.email }}</span>
      </div>
      <!-- Enlace para cerrar sesión -->
      <div class="logout-link">
        <router-link
          class="logoutUser"
          @click="logoutUser"
          :to="{ name: 'home' }"
          >Cerrar Sesión</router-link
        >
      </div>
    </div>
    <div
      class="login-form"
      v-else-if="route.name !== 'login' && route.name !== 'register'"
    >
      <div class="login-container">
        <!-- Enlace para ir a la página de inicio de sesión -->
        <router-link :to="{ name: 'login' }" class="login-link">
          <div class="identity">
            <!-- Texto de identificación -->
            <p class="identify-text">
              Inicia Sesión o Regístrate
            </p>
            <!-- Icono de usuario -->
          </div>
        </router-link>
      </div>
    </div>
    <!-- Nombre del sitio -->
    <div class="site-name">
      <h1 class="name">CanineConnect</h1>
      <h2 class="neighborhood">Sant Martí</h2>
    </div>

    <!-- Navegación principal -->
    <div class="navigation">
      <MainNavigation />
    </div>
  </header>
</template>

<style scoped class="header-styles">
/* Estilos para el encabezado */
.header {
  background-image: url("../public/images/dogs.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 33%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 70rem; /* Aplicado a todas las resoluciones */
}
@media (min-width: 640px) {
  .header {
    background-image: url("../public/images/dogs.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 33%;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    height: 40rem; /* Aplicado a todas las resoluciones */
  }
}

/* Estilos para el contenedor del formulario de inicio de sesión */
.login-container {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 0.5rem;
}

/* Estilos para el botón de inicio de sesión */
.login-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 3px;
  text-decoration: none;
}

/* Estilos para el bloque de identificación */
.identity {
}

/* Estilos para el texto de identificación */
.identify-text {
  font-size: larger;
  letter-spacing: 0.3px;
  margin: 0;
  color: rgba(184, 89, 89, 0.7);
}

/* Estilos para el nombre del sitio */
.name {
  font-size: clamp(4.5rem, 4vw + 1.5rem, 13.25rem);
  margin: 0;
}

/* Estilos para bienvenida */
.welcome {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0.5rem;
  text-align: center;
  border-radius: 3px;
  color: #333;
  padding: 0.5rem;
}
@media (min-width: 640px) {
  .welcome {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

.welcome span {
  text-transform: uppercase;
  font-weight: 700;
}

.site-name {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (min-width: 640px) {
  .site-name {
    display: flex;
    flex-direction: row;
    gap: 4rem;
    align-items: baseline;
  }
}

.neighborhood {
  font-size: clamp(0.5rem, 4vw + 1.5rem, 5.25rem);
  margin: 0;
  text-align: center;
  font-family: "Whisper", cursive;
  font-weight: 900;
  font-style: normal;
  margin: 0;
}

/* Estilos para la navegación principal */
.navigation {
  padding: 1rem;
  margin: 1rem auto;
}

/* Estilos para el mensaje de bienvenida */
.welcome-message {
  margin: 2rem;
  text-align: center;
  font-size: larger;
  font-weight: 700;
}
.logoutUser {
  text-decoration: none;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.7);
}
.welcome-content {
  font-weight: 700;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}
</style>

<!-- MainNavigation.vue   OK -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";

// Definición de los elementos de navegación
const navItems = [
  { text: "Inicio", to: "/" },
  { text: "Peludos Perdidos", to: { name: "lost-dogs" } },
  { text: "Objetos Perdidos", to: { name: "lost-items" } },
  { text: "Información", to: { name: "care" } },
  { text: "Adopción", to: { name: "adoption" } },
  { text: "Recursos", to: { name: "resources" } },
  { text: "Blog", to: { name: "blog" } },
  { text: "Donar", to: { name: "donate" } },
  { text: "Chat", to: { name: "chat" } },
  // { text: "Administación", to: { name: "admin" } },
];

// Uso del store de autenticación
const authStore = useAuthStore();

const route = useRoute();
const { isLoggedIn, userData, isAdmin } = storeToRefs(authStore);
const { logoutUser } = authStore;
const isMenuOpen = ref(false);
// Función para alternar el menú
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Función para cerrar el menú al hacer clic fuera de él
const closeMenu = (event) => {
  if (!event.target.closest(".navigation")) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeMenu);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeMenu);
});
</script>

<template>
  <div class="nav-container" :class="{ open: isMenuOpen }">
    <nav class="navigation">
      <!-- Sección izquierda: Menú hamburguesa -->
      <div class="left-section">
        <div
          class="hamburger-menu"
          @click="toggleMenu"
          aria-label="Toggle Menu"
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
      <!-- Sección central: Elementos de navegación -->
      <div :class="['nav-items', { open: isMenuOpen }]">
        <div class="nav-item" v-for="(item, index) in navItems" :key="index">
          <router-link
            active-class="active-link"
            class="nav-link"
            :to="item.to"
            >{{ item.text }}</router-link
          >
        </div>
        <!-- Enlace de administración visible solo para administradores -->
        <div v-if="isAdmin" class="nav-item">
          <router-link
            active-class="active-link"
            class="nav-link"
            :to="{ name: 'admin' }"
            >Administación</router-link
          >
        </div>
      </div>
      <!-- Sección derecha: Bienvenida y cierre de sesión -->
      <div class="center-section" v-if="isLoggedIn && route.name !== 'login'">
        <div class="welcome-content">
          <span>{{ userData?.displayName ?? "Usuario" }}</span>
        </div>
      </div>
      <div class="right-section">
        <div v-if="isLoggedIn && route.name !== 'login'" class="logout-link">
          <router-link
            class="logoutUser"
            @click="logoutUser"
            :to="{ name: 'home' }"
            >Cerrar Sesión</router-link
          >
        </div>
        <div
          v-else-if="route.name !== 'login' && route.name !== 'register'"
          class="login-container"
        >
          <router-link :to="{ name: 'login' }" class="login-link">
            <div class="identity">
              <p class="identify-text">Inicia Sesión</p>
            </div>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* Contenedor principal de la navegación */
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  transition: background-color 0.3s ease;
}

/* Navegación */
.navigation {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  z-index: 10000;
}

/* Secciones */
.left-section,
.center-section,
.right-section {
  display: flex;
  align-items: center;
  margin-left: 0.3rem;
}

.center-section {
  flex: 1;
  justify-content: center;
  text-align: center;
}

.right-section {
  justify-content: flex-end;
}
@media (min-width: 640px) {
  .right-section {
    justify-content: flex-end;
    padding-right: 1rem;
  }
}

.welcome-content,
.logout-link,
.login-container {
  margin-left: 1rem;
}

.logout-link,
.login-container {
  display: flex;
}

/* Menú hamburguesa */
.hamburger-menu {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.hamburger-menu .bar {
  width: 30px;
  height: 3px;
  background-color: #ffffff;
  margin: 4px 0;
  transition: 0.4s;
}

/* Elementos de navegación */
.nav-items {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.nav-item {
  display: flex;
  text-align: center;
}

.nav-link {
  justify-content: center;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  padding: 1rem;
}

.active-link {
  color: rgba(184, 89, 89, 0.7);
  font-weight: 700;
}

/* Media Queries para diferentes tamaños de pantalla */
@media (max-width: 640px) {
  .hamburger-menu {
    display: flex;
  }

  .nav-items {
    position: absolute;
    top: 100%;
    left: 0;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    display: none;
    transition: max-height 0.3s ease;
    overflow: hidden;
    max-height: 0;
  }

  .nav-items.open {
    display: flex;
    max-height: max-content;
  }

  .nav-item {
    width: 100%;
    text-align: center;
  }

  .left-section,
  .right-section,
  .center-section {
    flex: 1;
  }

  .center-section {
    justify-content: center;
  }

  .right-section {
    justify-content: flex-end;
  }

  .welcome-content,
  .logout-link,
  .login-container {
    margin-left: 0;
    margin-right: 1rem;
  }
}

@media (min-width: 641px) {
  .nav-items {
    flex: 1;
    justify-content: center;
  }

  .left-section {
    display: none;
  }

  .center-section {
    display: none;
  }

  .right-section {
    flex: none;
  }
}

/* Estilos para el enlace de inicio de sesión */
.login-link {
  text-decoration: none;
  color: #ffffff;
  text-align: center;
}

.login-link:hover {
  text-decoration: underline;
}

.identify-text {
  margin: 0;
  text-align: center;
}

/* Estilos para el enlace de cerrar sesión */
.logoutUser {
  text-decoration: none;
  color: #ffffff;
  text-align: center;
}

.logoutUser:hover {
  text-decoration: underline;
}

.welcome-content {
  color: #ffffff;
  text-align: center;
}
</style>

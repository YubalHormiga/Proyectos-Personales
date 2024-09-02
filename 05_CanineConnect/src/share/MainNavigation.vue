<!-- MainNavigation.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import LogoutUser from "@/assets/icons/LogoutUser.vue";
import LoginUser from "@/assets/icons/LoginUser.vue";

import { useAuthStore } from "@/stores/authStore";

const navItems = [
  { text: "Inicio", to: "/" },
  { text: "Peludos Perdidos", to: { name: "lost-dogs" } },
  { text: "Objetos Perdidos", to: { name: "lost-items" } },
  { text: "Adopción", to: { name: "adoption" } },
  /* { text: "Recursos", to: { name: "resources" } },*/
  { text: "Historias Inspiradoras", to: { name: "inspiring-stories" } },
  { text: "Chat", to: { name: "chat" } },
  { text: "Donar", to: { name: "donate" } },
  { text: "Información", to: { name: "care" } },
];

const authStore = useAuthStore();
const route = useRoute();
const { isLoggedIn, userData, isAdmin } = storeToRefs(authStore);
const { logoutUser } = authStore;
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = (event) => {
  if (!event.target.closest(".navigation")) {
    isMenuOpen.value = false;
  }
};

const darkMode = () => {
  document.body.classList.toggle("darkMode");
};

const handleNavItemClick = () => {
  isMenuOpen.value = false;
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
      <div class="left-section">
        <div
          class="hamburger-menu"
          :class="{ open: isMenuOpen }"
          @click="toggleMenu"
          aria-label="Toggle Menu"
        >
          <span class="bar bar1"></span>
          <span class="bar bar2"></span>
          <span class="bar bar3"></span>
        </div>
      </div>
      <div v-if="isLoggedIn && route.name !== 'login'" class="welcome-content">
        <p>
          Hola: <span> {{ userData?.displayName ?? "Usuario" }}</span>
        </p>
      </div>
      <div :class="['nav-items', { open: isMenuOpen }]">
        <div class="nav-item" v-for="(item, index) in navItems" :key="index">
          <router-link
            active-class="active-link"
            class="nav-link"
            :to="item.to"
            @click="handleNavItemClick"
            >{{ item.text }}</router-link
          >
        </div>
        <div v-if="isAdmin" class="nav-item">
          <router-link
            active-class="active-link"
            class="nav-link"
            :to="{ name: 'admin' }"
            @click="handleNavItemClick"
            >Administración</router-link
          >
        </div>
      </div>

      <div class="right-section">
        <div v-if="isLoggedIn && route.name !== 'login'" class="logout-link">
          <router-link
            class="logoutUser"
            @click="logoutUser"
            :to="{ name: 'home' }"
          >
            <LogoutUser />
          </router-link>
        </div>
        <div
          v-else-if="route.name !== 'login' && route.name !== 'register'"
          class="login-container"
        >
          <router-link :to="{ name: 'login' }" class="login-link">
            <LoginUser />
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* DarkMode */
.darkModeIcon {
  width: 3rem;
  height: auto;
  filter: invert(100%);
  cursor: pointer;
  margin-left: 1rem;
  /* visibility: hidden; */
}

/* Hamburguer */
.hamburger-menu {
  display: none;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hamburger-menu .bar {
  width: 30px;
  height: 3px;
  background-color: #ffffff;
  margin: 5px 0;
  transition: all 0.3s ease;
}

.hamburger-menu.open .bar1 {
  transform: rotate(45deg) translate(10px, 8px);
}

.hamburger-menu.open .bar2 {
  opacity: 0;
}

.hamburger-menu.open .bar3 {
  transform: rotate(-45deg) translate(10px, -8px);
}

@media (max-width: 640px) {
  .hamburger-menu {
    display: flex;
  }

  .nav-items {
    position: absolute;
    top: 100%;
    left: 0;
    flex-direction: column;
    background-color: rgba(40, 68, 49, 0.3);
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
  .right-section {
    flex: 1;
  }

  .right-section {
    justify-content: flex-end;
  }

  .welcome-content,
  .logout-link,
  .login-container {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}

/* Resto del CSS */
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
  background-color: rgba(40, 68, 49, 0.3);
  transition: background-color 0.3s ease;
}

.navigation {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  z-index: 10000;
}

.left-section,
.right-section {
  display: flex;
  align-items: center;
  margin-left: 0.3rem;
}

.right-section {
  justify-content: flex-end;
}

.logout-link,
.login-container {
  display: flex;
  margin: 0.5rem;
}

.welcome-content {
  margin: 0 0.5rem;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.3rem;
  color: var(--bg-0);
}

.welcome-content span {
  color: var(--accent-100);
}

.nav-items {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  transition: max-height 0.3s ease;
}

.nav-items.open {
  max-height: max-content;
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
  color: var(--accent-100);
  font-weight: 700;
}

@media (min-width: 640px) {
  .nav-items {
    flex: 1;
    justify-content: center;
  }

  .left-section {
    display: none;
  }

  .right-section {
    flex: none;
  }

  .welcome-content {
    display: flex;
  }
}
</style>

<script setup>
import { RouterLink } from "vue-router";

const navItems = [
  { text: "Inicio", to: "/" },
  { text: "Información", to: { name: "care" } },
  { text: "Adopción", to: { name: "adoption" } },
  { text: "Recursos", to: { name: "resources" } },
  { text: "Blog", to: { name: "blog" } },
  { text: "Objetos Perdidos", to: { name: "lost-items" } },
  { text: "Donar", to: { name: "gift" } },
  { text: "Se Busca", to: { name: "lost-dogs" } },
  { text: "Chat", to: { name: "chat" } },
];
</script>

<template>
  <nav class="navigation">
    <div class="nav-item" v-for="(item, index) in navItems" :key="index">
      <router-link   active-class="active-link" class="nav-link" :to="item.to" disabled="false" >{{
        item.text
      }}</router-link>
    </div>
  </nav>
</template>
<style scoped>
/*Navegation*/
.navigation {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 3px;
}
@media (min-width: 640px) {
  .navigation {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.nav-item {
  text-align: center;
}
@media (min-width: 640px) {
  .nav-item {
    display: flex
  }
}
.nav-link {
  text-decoration: none;
  color: #333;
  padding: 1rem;
}

.nav-item:hover {
  background-color: rgba(201, 172, 172, 0.7);
}
.active-link {
color: rgba(184, 89, 89, 0.7);
font-weight:700;
}

</style>


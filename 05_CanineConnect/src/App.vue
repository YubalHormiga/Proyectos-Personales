<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="header">
    <div class="site-name">
      <h1>CanineConnect</h1>
    </div>
    <nav class="navigation">
      <div class="nav-item">
        <router-link class="nav-link" to="/">Inicio</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" :to="{ name: 'information' }"
          >Información</router-link
        >
      </div>
      <div class="nav-item">
        <router-link class="nav-link" to="#">Adopción</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" to="#">Recursos</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" to="#">Blog</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" to="#"
          >Objetos perdidos y encontrados</router-link
        >
      </div>
      <div class="nav-item">
        <router-link class="nav-link" to="#">Regalo de objetos</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" to="#">Perros Perdidos</router-link>
      </div>
    </nav>
  </div>
  <RouterView  class="container"/>
  <footer class="footer-container">
    <p class="footer-text">Copyright &copy; 2023 Yubal Hormiga</p>
    <ul class="footer-links">
      <li><a href="contact.html">Contact</a></li>
      <li><a href="privacy-policy.html">Privacy Policy</a></li>
    </ul>
  </footer>
</template>

<style scoped>


h1 {
  font-size: 4rem;
  margin: 0;
}
@media (min-width: 640px) {
  h1 {
   font-size: 7rem;
  }
}
@media (min-width: 640px) {
  .site-name {
    margin-top: 3rem;
  }
}
.header {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-around;
  background-image: url("../public/images/dogs.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 33%;
  position: relative;
  color: white;
  height: 41rem;
}
@media (min-width: 640px) {
  .header {
    position: relative;
    color: white;
    height: 30rem;
  }
}

/*Navegation*/
.navigation {
  position: absolute;
  bottom: 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 3px;
}
@media (min-width: 640px) {
  .navigation {
    display: flex;
    gap: 1rem;
  }
}
.nav-item {
  text-align: center;
  padding: 0.5rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  padding: 1rem;
}

.nav-item:hover {
  background-color: rgba(201, 172, 172, 0.7);
}
/*Footer*/

.footer-container {
  text-align: center;
}
.footer-links {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.footer-links a {
  text-decoration: none;
  color: white;
}
</style>

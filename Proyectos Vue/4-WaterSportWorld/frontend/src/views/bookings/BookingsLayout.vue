<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <div class="header-container">
    <div class="logo-container">
      <h1>Water<span>Sport</span>World</h1>
    </div>
    <div class="user-info-container">
      <p>Hola: Usuario</p>
      <button type="button" class="logout-button">Cerrar Sesión</button>
    </div>
  </div>
  <nav class="navegation-container">
    <button class="nav-button">Mis Reservas</button>
    <RouterLink :to="{ name: 'new-booking' }" class="new-booking-link">
      Nueva Reserva
    </RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
<style scoped>
h1 {
  font-size: 4rem;
  color: #fff;
  opacity: 0.7;
  text-align: center;
  margin: 0;
}
span {
  color: #000080;
  opacity: 0.7;
}
.header-container {
  display: flex;
  justify-content: space-between;
  margin: 0 2rem;
  
}

.user-info-container{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 4rem;
}
.navegation-container{
    display: flex;
    justify-content: end;
    gap: 2rem;
    margin: 0 2rem;
}
.logout-button {
  min-width: 130px;
  color: #fff;
  padding:1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: 2px solid #d90429;
  background: #d90429;
}
.logout-button:hover {
  background: #fff;
  color: #d90429
}

.nav-button {
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: 2px solid #57cc99;
  background: #57cc99;
}
.nav-button:hover {
  background: #fff;
  color: #57cc99
}
.new-booking-link {
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: 2px solid #4433ff;
  background: #4433ff;
  text-decoration: none;
}
.new-booking-link:hover {
  background: #fff;
  color: #4433ff
}
</style>

<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <div class="header-container">
    <div>
      <RouterLink :to="{ name: 'bookings' }" class="logo">
        <h1>Water<span>Sport</span>World</h1>
      </RouterLink>
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
.logo {
  text-decoration: none;
}
.user-info-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 4rem;
}
.navegation-container {
  display: flex;
  justify-content: end;
  gap: 2rem;
  margin: 0 2rem;
}
.logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;
  border-radius: 5px;
  border: #f44336;
  padding: 1.5rem;
  font-weight: bold;
  transition: 0.3s;
  background-color: #f44336;
}

.logout-button:hover {
  opacity: 0.7;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;
  border-radius: 5px;
  border: #a13368;
  padding: 1.5rem;
  font-weight: bold;
  transition: 0.3s;
  background-color: #a13368;
}

.logout-button:hover {
  opacity: 0.7;
}

.nav-button:hover {
  opacity: 0.7;
}
.new-booking-link {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;
  border-radius: 5px;
  border: #000080;
  padding: 1.5rem;
  font-weight: bold;
  transition: 0.3s;
  background-color: #000080;
}

.new-booking-link:hover {
  opacity: 0.7;
}
</style>

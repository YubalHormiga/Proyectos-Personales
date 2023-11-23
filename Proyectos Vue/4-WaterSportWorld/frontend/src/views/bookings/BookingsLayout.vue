<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <div class="header-container">
    <RouterLink :to="{ name: 'bookings' }" class="logo-link">
      <h1>Water<span class="accent-text">Sport</span>World</h1>
    </RouterLink>
    <div class="user-info-container">
      <p>Hello: User</p>
      <button type="button" class="logout-button">Cerrar Sesión</button>
    </div>
  </div>
  <nav class="navigation-container">
    <button class="nav-button">Mis Reservas</button>
    <RouterLink :to="{ name: 'new-booking' }" class="new-booking-link">
      Nueva Reserva
    </RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
/* Header Styles */
h1 {
  font-size: 4rem;
  color: #fff;
  opacity: 0.7;
  text-align: center;
  margin: 0;
}
.accent-text {
  color: #000080;
  opacity: 0.7;
}

@media (min-width: 640px) {
  .header-container {
    display: flex;
    justify-content: space-between;
    margin: 0 2rem;
  }
}

.logo-link {
  text-decoration: none;
}
.user-info-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 4rem;
}

/* Navigation Styles */
@media (min-width: 640px) {
  .navigation-container {
    display: flex;
    align-items: center;
  }
}

.navigation-container {
  justify-content: flex-end;
  gap: 2rem;
  margin: 0 2rem;
}

.logout-button,
.nav-button,
.new-booking-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;
  border-radius: 5px;
  font-weight: bold;
  transition: 0.3s;
}

/* Logout Button Styles */
.logout-button {
  border: none;
  padding: 1.5rem;
  background-color: #f44336;
}
.logout-button:hover,
.nav-button:hover,
.new-booking-link:hover {
  opacity: 0.7;
}

/* Navigation Button Styles */
.nav-button {
  width: 100%;
  border: none;
  padding: 1.5rem;
  background-color: #a13368;
  margin-bottom: 1rem;
}
@media (min-width: 640px) {
  .nav-button {
    width: auto;
    margin: 0;
  }
}

/* New Booking Link Styles */
.new-booking-link {
  border: none;
  padding: 1.5rem;
  background-color: #000080;
}
</style>

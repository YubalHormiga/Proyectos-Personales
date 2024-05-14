<template>
  <div class="error-not-found">
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la página que estás buscando no se encuentra.</p>
    <!-- Puedes personalizar este mensaje con instrucciones específicas -->
    <router-link :to="{ name: 'home' }"
      >Volver a la página de inicio</router-link
    >
  </div>
</template>

<style scoped>
.error-not-found {
  text-align: center;
  margin-top: 50px;
}
.error-not-found h1 {
  font-size: 36px;
  color: #ff0000;
}
.error-not-found p {
  font-size: 18px;
}
.error-not-found router-link {
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}
</style>

<!-- Header  OK-->
<template>
  <header class="header">
    <!-- Nombre del sitio -->
    <div class="site-name">
      <h1 class="name">CanineConnect</h1>
      <h2 class="neighborhood">Sant Martí</h2>
    </div>
  </header>
</template>

<style scoped>
/* Estilos para el encabezado */

.header {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  min-height: 15vh;
  height: auto;
  padding: 2rem;
}
.name {
  font-size: clamp(4.5rem, 4vw + 1.5rem, 13.25rem);
  margin: 3rem 0 0 0;
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
</style>

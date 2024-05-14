<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container">
    <div class="content">
      <h2 class="title">Información sobre el cuidado de perros</h2>
      <h3 class="subtitle">Consejos para tener un perro feliz y saludable</h3>
    </div>
    <section class="section">
      ¡Hola! CanineConnect es un espacio dedicado a la conexión entre personas y
      perros. En esta sección, queremos ayudarte a tener una relación sana y
      feliz con tu mejor amigo peludo.
    </section>
    <h3 class="subtitle">Sabías que...</h3>
    <section class="section">
      Cada año, miles de perros son abandonados en España. La falta de
      información sobre el cuidado adecuado es una de las principales causas de
      abandono. Un perro bien cuidado puede vivir una vida larga y saludable. En
      CanineConnect, , queremos ayudarte a tener una relación sana y feliz con
      tu mejor amigo peludo. Descubre cómo elegir la raza adecuada para tu
      estilo de vida
      <router-link class="nav-link" :to="{ name: 'breeds' }"
        >Razas de perros</router-link
      >
      y aprende sobre la importancia de la tenencia responsable
      <router-link class="nav-link" :to="{ name: 'stewardship' }">
        Tenencia responsable</router-link
      >.
    </section>
  </div>
</template>

<style scoped>

.container {
  padding: 0 1rem;
  text-align: justify;

}
@media (min-width: 640px) {
  .container {
    max-width: 120rem;
    margin: 0 auto;
  }
}
.content {
  margin-bottom: 1rem;
}
.title {
  color: #333;
}
.subtitle {
  color: #666;
  font-style: italic;
}
.section {
  margin-bottom: 1.5rem;
}
@media (min-width: 640px) {
  .container {
    max-width: 120rem;
    margin: 0 auto;
  }
}

.nav-link {
  text-decoration: none;
  text-align: center;
  padding: 0.5rem;
  color: rgba(184, 89, 89, 0.7);
  font-weight: 700;
}
</style>
RouterLink,

<!-- LostAndFoundDogsView ok -->
<script setup>
/* Importaciones de componentes locales */
import Link from "@/components/Link.vue";
import FoundDogCardView from "./FoundDogCardView.vue";

/* Importaciones de stores */
import { useLostDogsStore } from "@/stores/lostDogsStore";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore()

// Inicializar el store de perros perdidos
const lostDogsStore = useLostDogsStore();
</script>

<template>
  <div class="lostDog-container">
    <!-- Título de bienvenida -->
    <h2>Bienvenido a la Sección de Mascota Perdida</h2>
    <!-- Instrucciones para reportar una mascota encontrada -->
    <p>
      Por favor, utiliza este formulario para proporcionar información sobre la mascota que has encontrado o perdido. Completa todos los campos obligatorios para ayudarnos a reunir al animal con su dueño o facilitar su búsqueda. Asegúrate de incluir detalles precisos y una imagen clara de la mascota si es posible.
    </p>
    <!-- Enlace para reportar una mascota encontrada -->
    <div v-if="authStore.isAdmin" class="report-link-container" > <!--Modificar si queremos que no lo ean los usuarios-->
      <Link to="found-dogs" class="report-link">
        Reportar Mascota
      </Link>
    </div>
    <!-- Título de la lista de mascotas perdidas -->
    <h3 class="list-title">Lista Mascotas Perdidas</h3>
    <!-- Contenedor de la lista de mascotas perdidas -->
    <div class="found-dog">
      <ul class="dog-list">
        <!-- Iterar sobre la colección de perros perdidos y mostrar cada uno en una tarjeta -->
        <FoundDogCardView
          v-for="lostDog in lostDogsStore.lostDogsCollection"
          :key="lostDog.id"
          :lostDog="lostDog"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para los títulos */
h2, h3 {
  text-align: center;
}

/* Contenedor principal */
.lostDog-container {
  padding: 2rem;
}

/* Estilos para la sección de objetos encontrados */
.found-dog {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Estilos para la lista de perros */
.dog-list {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap:2rem
}
</style>

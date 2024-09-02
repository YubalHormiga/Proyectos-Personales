<script setup>
import { useRoute } from "vue-router";
import { useDocument, useFirestore } from "vuefire";
import Link from "@/components/Link.vue";
import { doc } from "firebase/firestore";

const route = useRoute();

const db = useFirestore();
const docRef = doc(db, "adoptions", route.params.id);
const dog = useDocument(docRef);
</script>

<template>
  <div class="information-container" v-if="dog">
    <div class="image-container">
      <img :src="dog.image" alt="Pet Image" class="pet-image" :alt="dog" />
    </div>
    <div class="information">
      <div class="basic-information">
        <h3 class="pet-name">{{ dog.dogName }}</h3>
        <p class="pet-status">{{ dog.adoptionStatus }}</p>
      </div>
      <div class="additional-information">
        <section class="section-data">
          <h3 class="section-title">Mis datos</h3>
          <div class="data-list">
            <p class="data-item">
              Entrada: <span>{{ dog.rescueDate }}</span>
            </p>
            <p class="data-item">
              Donde se encontró: <span>{{ dog.rescueLocation }}</span>
            </p>
            <p class="data-item">
              Raza: <span>{{ dog.dogBreed }}</span>
            </p>
            <p class="data-item">
              Edad: <span>{{ dog.dogAge }}</span>
            </p>
            <p class="data-item">
              Sexo: <span>{{ dog.sex }}</span>
            </p>
            <p class="data-item">
              Tamaño:<span> {{ dog.size }}</span>
            </p>
            <p class="data-item">
              Energía: <span>{{ dog.energy }}</span>
            </p>
          </div>
        </section>
        <section class="section-history">
          <h3 class="pet-title">{{ dog.title }}</h3>
          <h3 class="section-title">Historia</h3>
          <p class="history-description">{{ dog.dogStory }}</p>
        </section>
        <section class="section-medical-history">
          <div class="medical-history">
            <h3 class="medical-title">Historial Medico</h3>
            <p class="medical-description">{{ dog.medicalHistory }}</p>
          </div>
          <div class="current-status">
            <h3 class="status-title">Estado Actual</h3>
            <p class="status-description">{{ dog.currentStatus }}</p>
          </div>
        </section>
        <section class="section-description">
          <h3 class="section-title">Descripción</h3>
          <p class="description-text">{{ dog.description }}</p>
        </section>
        <section class="section-requirements">
          <h3 class="section-title">Requisitos</h3>
          <p class="requirements-text">{{ dog.requirements }}</p>
        </section>
      </div>
    </div>
  </div>
  <Link to="adoption-list" class="link"> Volver</Link>
</template>

<style scoped>
.information-container {
  display: grid;
  gap: 2rem;
}
@media (min-width: 640px) {
  .information-container {
    grid-template-columns: 1fr 2fr;
  }
}

.image-container {
  /* estilos para el contenedor de la imagen */
}
.pet-image {
  /* estilos para la imagen de la mascota */
}
.basic-information {
  /* estilos para la sección de información */
}
.pet-name {
  /* estilos para el nombre de la mascota */
}

.pet-status span {
  color: var(--accent-100);
  font-weight: bolder;
}
.pet-status,
.pet-title {
  font-weight: bold;
  color:var(--accent-100)
}
.additional-information {
  /* estilos para la información adicional */
}
.section-data,
.section-history,
.section-medical-history,
.section-description,
.section-requirements {
  /* estilos para las secciones */
}
.section-title {
  /* estilos para los títulos de las secciones */
}
.data-list {
  /* estilos para la lista de datos */
}
.data-item span {
  font-weight: bold;
}
.data-item,
.history-description,
.medical-title,
.medical-description,
.status-title,
.status-description,
.description-text,
.requirements-text {
  /* estilos para los ítems de datos, historia, historial médico, estado actual, descripción y requisitos */
}
.link{
  display: grid;
  place-items: center;
}
</style>

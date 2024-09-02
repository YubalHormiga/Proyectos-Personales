<script setup>
import { ref } from "vue";
import { useStoryStore } from "@/stores/storyStore";
import { useAuthStore } from "@/stores/authStore";

import InspiringStoriesCard from "./InspiringStoriesCard.vue";
import InspiringStoriesModal from "./InspiringStoriesModal.vue";
import Link from "@/components/Link.vue";

const storyStore = useStoryStore();
const authStore = useAuthStore();
const showModal = ref(false);
const selectedStory = ref(null);

const openModal = (story) => {
  selectedStory.value = story;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <Link v-if="authStore.isAdmin" to="add-inspiring-story"
    >Agrega tu Historia</Link
  >

  <h2>Un mundo de amor, lealtad y heroísmo te espera</h2>

  <p>
    Adéntrate en un espacio donde la bondad canina brilla con luz propia.
    Descubre conmovedoras historias de perros que han desafiado obstáculos,
    salvado vidas y brindado amor incondicional. Sus relatos te llenarán de
    esperanza, te inspirarán a ser una mejor persona y te recordarán el
    increíble poder que tiene la conexión entre humanos y animales.
  </p>

  <span
    >Más que mascotas, estos perros son héroes, amigos y compañeros
    excepcionales.</span
  >

  <p>
    Sumérgete en sus inspiradoras historias y descubre el verdadero significado
    de la lealtad, la valentía y el amor incondicional.
  </p>

  <p>
    Prepárate para reír, llorar y sentirte emocionado mientras exploras estas
    narraciones que te cautivarán y te transportarán a un mundo donde los perros
    son más que animales.
  </p>

  <p>
    En Canicine Connect, celebramos el espíritu inspirador de los perros y
    compartimos historias que te conmoverán el corazón. Explora las diferentes
    categorías y descubre historias que te sorprenderán, te motivarán y te
    recordarán el poder transformador del amor y la amistad. ¡Únete a nuestra
    comunidad y forma parte de este homenaje a los perros que hacen del mundo un
    lugar mejor!
  </p>

  <section class="inspiring-stories-section">
    <h3 class="stories-heading">Historias inspiradoras</h3>
    <!-- Cada elemento de la lista representa una historia inspiradora -->
    <InspiringStoriesCard
      class="stories-list"
      v-for="story in storyStore.storiesCollection.slice(0, 5)"
      :story="story"
      :key="story.id"
      @click="openModal(story)"
    />
    <!-- Modal -->
    <div class="modal" v-if="showModal">
      <InspiringStoriesModal
        :selectedStory="selectedStory"
        @click="closeModal"
      />
    </div>
  </section>
</template>

<style scoped>
h2 {
  margin: 1rem 0;
  text-align: center;
}
.inspiring-stories-section {
  margin-bottom: 4rem;
}

.stories-list {
  cursor: pointer;
}
/* Estilos para el modal */
.modal {
  display: block;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
  overflow: auto; /* Permitir desplazamiento si el contenido es largo */
}
</style>

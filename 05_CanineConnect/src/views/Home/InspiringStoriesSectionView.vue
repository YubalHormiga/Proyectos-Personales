<!-- InspiringStoriesSectionView OK -->
<script setup>
import { useStoryStore } from "@/stores/storyStore";
import { useAuthStore } from "@/stores/authStore";

import InspiringStoriesCard from "../InspiringStories/InspiringStoriesCard.vue";
import InspiringStoriesModal from "../InspiringStories/InspiringStoriesModal.vue";

import { ref } from "vue";

const storyStore = useStoryStore();

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
  <section class="inspiring-stories-section">
    <h2 class="stories-heading">Historias inspiradoras:</h2>
    <InspiringStoriesCard
      class="stories-list"
      v-for="story in storyStore.storiesCollection.slice(0, 5)"
      :story="story"
      :key="story.id"
      @click="openModal(story)"
    />
    <!-- Modal -->
    <div class="modal" v-if="showModal" @click.self="closeModal">
      <InspiringStoriesModal
        :selectedStory="selectedStory"
        @click="closeModal"
      />
    </div>
  </section>
</template>

<style scoped>
.inspiring-stories-section {
  margin-bottom: 4rem;
}
h2 {
  margin: 1rem 0 0;
}
.story-item {
  list-style: none;
  cursor: pointer;
}
.story-link {
  text-decoration: none;
}
.story-image {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  float: left; /* Izquierda para esquina izquierda, derecha para esquina derecha */
  margin: 0 10px 0 0; /* Agrega espacio alrededor de la imagen */
}
span {
  color: red;
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

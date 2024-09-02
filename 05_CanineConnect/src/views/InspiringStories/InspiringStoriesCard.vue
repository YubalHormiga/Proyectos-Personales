<!-- InspiringStoriesCard -->
<script setup>
/* Definición de propiedades (props) */
const props = defineProps({
  story: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["openModal"]);
</script>

<template>
  <div class="card-container">
    <div class="story-image-container">
      <h3 class="story-title">{{ story.storyTitle }}</h3>
      <img
        :src="story.image"
        :alt="story.storyTitle"
        class="story-image"
        loading="lazy"
      />
      <p>{{ story.overcomingFear }}</p>
    </div>
    <div>
      <a
        class="info"
        @click="$emit('openModal', story)"
        >+Info</a
      >
    </div>
  </div>
</template>
<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin-bottom: 2rem;
  border-radius: 0.625rem;
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
.card-container:hover {
  transform: scale(1.05);
  transition: transform 500ms ease-in;
}
h2 {
  display: inline-block;
}
.story-image-container {
  padding: 1rem;
}
.story-image {
  width: 10rem;
  height: 10rem;
  float: left;
  border-radius: 50%;
  border: 3px solid var(--accent-100);
  margin: 0 10px 0 0; /* Agrega espacio alrededor de la imagen */
}
.info {
  background-color: var(--accent-200);
  border-radius: 5px;
  cursor: pointer;
  color: var(--bg-0);
  font-size: 10px;
  padding: 6px 15px;
  text-decoration: none;
  float: right;
}
.info:hover {
  background-color: var(--accent-100);
}
</style>

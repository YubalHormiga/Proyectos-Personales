<script setup>
const props = defineProps({
  selectedStory: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["closeModal"]);
</script>

<template>
  <div class="modal-content">
    <span class="close-button" @click="$emit('closeModal')">&times;</span>
    <img
      :src="selectedStory?.image"
      :alt="selectedStory?.storyTitle"
      class="modal-image"
      loading="lazy"
    />
    <h2 class="modal-title">{{ selectedStory?.storyTitle }}</h2>
    <div class="modal-details">
      <p><span>Refugio:</span> {{ selectedStory?.refugeName }}</p>
      <p>
        <span>Contacto:</span> {{ selectedStory?.contactName }} ({{
          selectedStory?.email
        }})
      </p>
      <p><span>Edad del Perro:</span> {{ selectedStory?.dogAge }}</p>
      <p><span>Sexo:</span> {{ selectedStory?.sex }}</p>
      <p><span>Fecha de Rescate:</span> {{ selectedStory?.rescueDate }}</p>
      <p>
        <span>Ubicación de Rescate:</span> {{ selectedStory?.rescueLocation }}
      </p>
      <p><span>Historial Médico:</span> {{ selectedStory?.medicalHistory }}</p>
      <p><span>Estado Actual:</span> {{ selectedStory?.currentStatus }}</p>
      <p>
        <span>Desafíos Superados:</span> {{ selectedStory?.overcomingFear }}
      </p>
      <p>
        <span>Personalidad y Talentos:</span>
        {{ selectedStory?.dogPersonality }}
      </p>
      <p class="url">
        URL Web
        <br />
        <a :href="selectedStory?.urlWeb" target="_blank">{{
          selectedStory?.urlWeb
        }}</a>
      </p>
    </div>
  </div>
</template>
<style scoped>
.modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 90%;
  max-width: 45rem;
  border-radius: 8px;
  position: relative;
}
@media (min-width: 640px) {
  .modal-content {
    max-width: 55rem;
  }
}
p span {
  color: var(--accent-200);
}
.url {
  text-align: center;
}
.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-image {
  width: 100%;
  height: 30rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.modal-details {
  margin-bottom: 1rem;
}

.modal-details p {
  margin-bottom: 0.5rem;
}

.modal-details span {
  font-weight: bold;
}

.modal-details a {
  color: var(--accent-100);
  text-decoration: none;
}

.modal-details a:hover {
  text-decoration: underline;
}
</style>

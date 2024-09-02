<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

import { useAdoptionStore } from "@/stores/adoptionStore";
import { useAuthStore } from "@/stores/authStore";

import EditIcon from "../../assets/icons/EditIcon.vue";
import DeleteIcon from "../../assets/icons/DeleteIcon.vue";

const props = defineProps({
  adoption: {
    type: Object,
    require: true,
  },
});

const authStore = useAuthStore();
/* Propiedad computada para verificar si el usuario actual es el propietario del objeto */
const isOwner = computed(
  () => props.adoption.userId === authStore.userData?.uid
);

const adoptionStore = useAdoptionStore();
</script>
<template>
  <div class="list-dogs">
    <div class="card-container">
      <div class="image-container">
        <img :src="adoption.image" :alt="adoption.name" />
      </div>
      <div class="text-container">
        <h2 class="name">{{ adoption.dogName }}</h2>
        <h3 class="waiting">{{ adoption.dogBreed }}</h3>
        <h4 class="needs">{{ adoption.title }}</h4>
      </div>
      <div class="button-container">
        <RouterLink
          :to="{ name: 'dog-information', params: { id: adoption.id } }"
          class="more-info"
          >Más informacion</RouterLink
        >
      </div>
      <div class="isOwner" v-if="isOwner">
        <div>
          <RouterLink
            :to="{ name: 'edit-adoption', params: { id: adoption.id } }"
          >
            <EditIcon />
          </RouterLink>
        </div>
        <div>
          <button
            type="button"
            @click="adoptionStore.deleteAdoptionDog(adoption.id)"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h2 {
  color: var(--accent-100);
}
h3 {
  color: var(--accent-200);
}
.gender {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.card-container {
  width: 25rem;
  overflow: hidden;
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;
  text-align: center;
}
.image-container {
}
.image-container img {
  width: 100%;
  height: 20rem;
  display: block;
  object-fit: cover;
}
.text-container {
}
.name {
}
.waiting {
}
.needs {
}
.button-container {
  cursor: pointer;
  background-color: var(--bg-100);
  padding: 0.3rem;
}
.isOwner {
  display: flex;
  background-color: var(--bg-100);
  justify-content: space-between;
  padding: 0.5rem;
}
.more-info {
  color: var(--bg-0);
  text-decoration: none;
}
</style>

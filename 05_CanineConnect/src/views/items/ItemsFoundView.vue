<script setup>
import { useItemsStore } from "@/stores/itemsStore";
import { RouterLink } from "vue-router";

const props = defineProps({
  item: {
    type: Object,
  },
});

const items = useItemsStore();
</script>

<template>
  <div class="card">
    <div class="card-image-container">
      <img :src="item.image" alt="Item Image" class="card-img" />
    </div>
    <div class="card-content">
      <h3 class="card-title">Name: {{ item.name }}</h3>
      <p class="card-text"><strong>Email:</strong> {{ item.email }}</p>
      <p class="card-text"><strong>Phone:</strong> {{ item.phone }}</p>
      <p class="card-text">
        <strong>Description:</strong> {{ item.description }}
      </p>
      <p class="card-text"><strong>Location:</strong> {{ item.location }}</p>
      <p class="card-text"><strong>Date:</strong> {{ item.date }}</p>
      <p class="card-text">
        <strong>Observations:</strong> {{ item.observations }}
      </p>
    </div>
    <div class="card-header">
      <div class="edit-button-container">
        <RouterLink :to="{ name: 'editItemFound', params: { id: item.id } }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-pencil"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
          </svg>
        </RouterLink>
      </div>
      <div class="delete-button-container">
        <button type="button" @click="items.deleteProduct(item.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-trash"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ff2825"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.svg {
  width: 20px;
  height: 20px;
}
.card {
  display: flex;
  max-width: 60rem;
  max-height: 30rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  margin: 20px auto; /* Center the card */
}
.card-header {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-evenly
}
.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-img {
  max-width: 20rem;
  max-height: 20rem;
}

.card-content {
  padding: 16px;
}

.card-title {
  margin: 0 0 8px;
  font-size: 1.25rem;
  color: #333;
}

.card-text {
  margin: 0 0 8px;
  font-size: 1rem;
  color: #666;
}

.card-text strong {
  color: #333;
}

button {
  border: none;
}
</style>

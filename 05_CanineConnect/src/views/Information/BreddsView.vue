//BreddsView.vue

<script setup>
import { ref, onMounted, watch } from "vue";
import { UseDogsStore } from "@/stores/dogStore.js";
import { breedoptions } from "@/api/dogsApi.js";

import usePagination from "@/composables/usePagination.js";
import Spinner from "@/components/Spinner.vue";

const dogs = UseDogsStore();
const { dogsToShow, updateDogsToShow, currentPage, totalPages } =
  usePagination();

const expanded = ref(false);
const selectedBreed = ref(false);

onMounted(async () => {
  try {
    await dogs.getData();
    dogsToShow.value = dogs.dogData.value;
    selectedBreed.value = false;
    updateDogsToShow(currentPage.value);
  } catch (error) {
    // Manejar errores en la carga inicial de datos
    console.error("Error al cargar datos iniciales:", error);
    // Manejar el error de otra manera
    throw new Error("Error al cargar datos iniciales");
  }
});

watch(
  () => dogs.selectedBreed,
  (newBreed) => {
    selectedBreed.value = !!newBreed;
    dogsToShow.value = selectedBreed.value
      ? dogs.dogsSameBreed()
      : dogs.dogData;
  }
);

watch(currentPage, (newPage) => {
  updateDogsToShow(newPage);
});

watch(selectedBreed, () => {
  updateDogsToShow(currentPage.value);
});

const prevIcon = "arrow_back";
const nextIcon = "arrow_forward";
</script>

<template>
  <div v-if="dogs.loadingspinner" class="loading-spinner">
    <Spinner />
  </div>
  <div v-else>
    <div class="breed-selector">
      <div class="breed-dropdown">
        <label for="selectedBreed">Select Breed</label>
        <select id="selectedBreed" v-model="dogs.selectedBreed">
          <option
            v-for="(option, index) in breedoptions"
            :key="index"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="container">
      <!-- Card -->
      <!-- Loop starts here -->
      <div
        v-for="(dato, index) in dogsToShow"
        :key="index"
        class="card-container"
      >
        <div class="card-wrapper">
          <img
            class="card-image"
            :src="dato.image?.url || '../../public/cat.jpg'"
            :alt="dato.name"
          />
          <div class="card-section">
            <div class="breed-group">
              {{ dato.breed_group }}
            </div>
            <div class="dog-name">{{ dato.name }}</div>
            <div class="bred-for">{{ dato.bred_for }}</div>
          </div>
          <div class="card-buttons">
            <button class="share-btn" flat color="brown-10">Share</button>
            <button class="favorite-btn" @click="dogs.addToFavorites(dato.id)">
              <i class="icon">favorite</i>
            </button>
            <div class="spacer"></div>
            <button class="expand-btn" @click="expanded = !expanded">
              <i v-if="expanded" class="icon">keyboard_arrow_up</i>
              <i v-else class="icon">keyboard_arrow_down</i>
            </button>
          </div>
          <div class="additional-info">
            <div v-show="expanded">
              <hr class="divider" />
              <div class="temperament-info">
                <span class="label">Temperament: </span>
                {{ dato.temperament }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Loop ends here -->
    </div>
  </div>

  <div v-if="totalPages > 1" class="pagination-section">
    <button :disabled="currentPage === 1" @click="currentPage -= 1">
      {{ prevIcon }}
    </button>

    <span>{{ currentPage }} / {{ totalPages }}</span>

    <button :disabled="currentPage === totalPages" @click="currentPage += 1">
      {{ nextIcon }}
    </button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.card-container {
  background-color: red;
  width: 19rem;
}

.card-wrapper {
  width: 100%;
}

.card-image {
  width: 100%;
  height: 20rem;
}

.card-section,
.card-buttons {
  width: 100%;
}

.breed-selector {
  
}

.breed-dropdown {
  
}

.breed-group,
.dog-name,
.bred-for {
  
}

.card-buttons {
  
}

.share-btn,
.favorite-btn,
.expand-btn {
  
}

.spacer {
  
}

.additional-info {
  
}

.divider {
  
}

.temperament-info {
  
}

.pagination-section {
  margin-top: 20px;
}

.pagination-section button {
  
}

.pagination-section .active {
  
}
</style>
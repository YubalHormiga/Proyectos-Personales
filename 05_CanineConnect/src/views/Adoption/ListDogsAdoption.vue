<script setup>
import { ref, computed } from "vue";
import Link from "@/components/Link.vue";

import AdoptionCardView from "./AdoptionCardView.vue";

import { useAdoptionStore } from "@/stores/adoptionStore";

const adoptionStore = useAdoptionStore();

const selectedGender = ref("indifferent");
const selectedCategory = ref("inAdoptionProcess");

const sexSelect = (e) => {
  selectedGender.value = e.target.value;
};

const categorySelect = (e) => {
  selectedCategory.value = e.target.value;
};

const filteredAdoptions = computed(() => {
  // Filtrar por género
  const genderFiltered =
    selectedGender.value === "indifferent"
      ? adoptionStore.adoptionsCollection
      : adoptionStore.adoptionsCollection.filter(
          (adoption) => adoption.sex === selectedGender.value
        );

  // Filtrar por categoría
  const categoryFiltered = genderFiltered.filter(
    (adoption) => adoption.adoptionStatus === selectedCategory.value
  );

  return categoryFiltered;
});
</script>

<template>
  <div class="adoption-container">
    <div class="section">
      <section class="categories-container">
        <h2>Selecciona categoría</h2>
        <div class="categories">
          <div>
            <label>
              <input
                type="radio"
                name="category"
                value="inAdoptionProcess"
                @change="categorySelect"
                checked
              />
              En adopción
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="category"
                value="doubleAdoption"
                @change="categorySelect"
              />
              Adopciones dobles
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="category"
                value="inFosterCare"
                @change="categorySelect"
              />
              En acogida
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="category"
                value="specialCases"
                @change="categorySelect"
              />
              Casos especiales
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="category"
                value="adopted"
                @change="categorySelect"
              />
              Adoptados
            </label>
          </div>
        </div>
      </section>
      <section class="gender-container">
        <h2>Selecciona sexo</h2>
        <div class="gender">
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="indifferent"
                @change="sexSelect"
                checked
              />
              Indiferente
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                @change="sexSelect"
              />
              Masculino
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                @change="sexSelect"
              />
              Femenino
            </label>
          </div>
        </div>
      </section>
      <div>
        <Link to="adoption">Volver </Link>
      </div>
    </div>
    <div class="adoptionCardView">
      <AdoptionCardView
        v-for="adoption in filteredAdoptions"
        :key="adoption.id"
        :adoption="adoption"
      />
    </div>
  </div>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  margin: 0 2rem 2rem 0;
}
.adoptionCardView {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}
@media (min-width: 640px) {
  .adoption-container {
    display: flex;
  }
}

.categories {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.noData {
  display: flex;
  flex-direction: column;
}
@media (min-width: 640px) {
  .noData {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
}
.noData h4 {
  display: block;
  text-align: center;
}
.noData p {
  display: block;
  text-align: center;
  color: rgb(160, 25, 25);
  font-weight: bold;
}
</style>

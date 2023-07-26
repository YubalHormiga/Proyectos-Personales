<script setup>
import { useCollectionStore } from "../stores/collection";
import { useMealsStore } from "../stores/meals";

const collection = useCollectionStore();
const meals = useMealsStore();
</script>

<template>
  <div class="foodRecipes-container">
    <p v-if="collection.noneInCollection">Añade Recetas a tu Colección</p>
    <div
      v-else
      v-for="meal in collection.collection"
      :key="meal.idMeal"
      class="meal-item"
    >
      <div class="image-container">
        <img :src="meal.strMealThumb" :alt="meal.strMeal" />
      </div>
      <h2>{{ meal.strMeal }}</h2>
      <button @click="meals.selectMeal(meal.idMeal)" type="button">
        Receta
      </button>
    </div>
  </div>
</template>

<style scoped>
.foodRecipes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  margin: 0 4rem;
}
.foodRecipes-container p {
  font-weight: 900;
}
.meal-item {
  flex: 0 0 40rem;
  max-width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.meal-item:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.image-container {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meal-item h2 {
  margin-top: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meal-item button {
  width: 100%;
  padding: 1rem;
  text-transform: uppercase;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 900;
  font-size: large;
  background-color: #885400;
  color: #efefef;
  transition: background-color 0.3s ease;
}

.meal-item button:hover {
  background-color: #2b2b2b;
}
</style>

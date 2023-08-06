<script setup>
import { useMealsStore } from "../stores/meals";

const meals = useMealsStore();

</script>

<template>
  <div class="foodRecipes-container">
    <div v-if="meals.noneFoodRecipes" class="noneFoodRecipes">
      <h2>Añade Recetas a tu Colección</h2>
      <p>Utiliza el Buscador</p>
    </div>

    <div v-else v-for="meal in meals.foodRecipes" :key="meal.idMeal">
      <div class="meal-item">
        <div class="image-container">
          <img :src="meal.strMealThumb" alt="meal.strMeal" />
        </div>
        <h2>{{ meal.strMeal }}</h2>
        <button 
        @click="meals.selectMeal(meal.idMeal)"
        type="button"
        >Receta</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.foodRecipes-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  gap: 4rem;
  margin: 0 4rem;
}
.noneFoodRecipes p{
margin: 0 auto;
}

.meal-item {
  max-width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
}
.meal-item:hover {
  transform: scale(
    1.1
  ); 
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); 
}

.meal-item img {
  display: block;
  max-width: 100%;
  height: auto;
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
  transition: background-color 0.3s ease
}
.meal-item button:hover{
  background-color: #2b2b2b;
}

</style>

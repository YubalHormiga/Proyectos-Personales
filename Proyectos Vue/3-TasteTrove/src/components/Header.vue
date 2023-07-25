<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useMealsStore } from "../stores/meals";

const meals = useMealsStore();

const route = useRoute();
const homePage = computed(() => route.name === "home");


const handleSubmit = ()=>{

  meals.getMealRecipe()
}
</script>
<template>
  <header :class="homePage ? 'header' : 'favorites'">
    <div class="nav-container">
      <div>
        <h1>Taste<span>Trove</span></h1>
      </div>
      <nav>
        <div class="router-nav">
          <RouterLink
            :to="{ name: 'home' }"
            class="link"
            active-class="active-link"
          >
            Incio
          </RouterLink>
          <RouterLink
            :to="{ name: 'collection' }"
            class="link"
            active-class="active-link"
          >
            Colección
          </RouterLink>
        </div>
      </nav>
    </div>

    <form v-if="homePage" @submit.prevent="handleSubmit" >
      <div class="form-container">
        <h2>Ingresa datos de la busqueda</h2>
        <div class="search-container">
          <div class="search-labels">
            <label for="ingredient">Introduce ingrediente</label>
            <input v-model="meals.search.ingredient" type="text" id="ingredient" class="dudad" placeholder="Introduce ingredientes en inglés ej: garlic, bacon, onion, etc  "/>
          </div>
          <div>
            <label class="search-labels" for="category"
              >Selecciona Categoria</label
            >
            <select v-model="meals.search.categorie" class="full-width search-select" name="" id="category">
              <option value="">---Selecciona---</option>
              <option
                v-for="meal in meals.categories"
                :key="meal.strCategory"
                :value="meal.strCategory"
              >
                {{ meal.strCategory }}
              </option>
            </select>
          </div>
        </div>
        <input type="submit" value="Buscar receta" />
      </div>
    </form>
  </header>
</template>
<style scoped>
header {
  background-image: url("/img/meal.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: 4rem;
}
.favorites {
  background-image: url("/img/collection.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 35%;
}

.nav-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 3rem;
}
.router-nav {
  display: flex;
  gap: 5rem;
}
.link {
  text-decoration: none;
  font-size: 3rem;
  color: #333333;
  font-weight: 800;
  text-shadow: 0.2rem 0.2rem var(--border-100);
}
.active-link {
  color: #efefef;
}

.search-labels {
  display: flex;
  flex-direction: column;
}
.search-labels select {
  width: 100%;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-container {
  padding: 2rem;
  background-color: #ffa500;
  border-radius: 1rem;
  margin-bottom: 2rem;
}
.search-container {
  margin: 2rem auto;
}
.search-labels input[type="text"] {
  height: 3rem;
  color: #2b2b2b;
  font-size: large;
  border: none; 
  padding: 5px; 
}
.search-select {
  width: 100%;
  height: 3rem;
  background-color: #ffffff; 
  color: #2b2b2b; 
  font-size: large;
  border: none;
  padding: 5px;
  border-radius: 5px; 
}
.full-width.search-select option:first-child{
  text-align: center;
}
input[type="submit"] {
  display: block;
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
}
</style>

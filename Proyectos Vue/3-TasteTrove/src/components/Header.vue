<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useMealsStore } from "../stores/meals";

const meals = useMealsStore();
const route = useRoute();

const homePage = computed(() => route.name === "home");

const handleSubmit = () => {
  meals.getMealRecipe();
};
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

    <form v-if="homePage" @submit.prevent="handleSubmit">
      <div class="form-container">
        <h2>Ingresa datos de la busqueda</h2>
        <div class="search-container">
          <div class="search-labels">
            <label for="ingredient">Introduce ingrediente</label>
            <input
              v-model="meals.search.ingredient"
              type="text"
              id="ingredient"
              class="dudad"
              placeholder="Introduce ingredientes en inglés ej: garlic, bacon, onion, etc  "
            />
          </div>
          <div>
            <label class="search-labels" for="category"
              >Selecciona Categoria</label
            >
            <select
              v-model="meals.search.categorie"
              class="full-width search-select"
              name=""
              id="category"
            >
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

<script setup>
import { useMealsStore } from "../stores/meals";
import { useModalStore } from "../stores/modal";
import { useCollectionStore } from "../stores/collection";
import { useNotificationStore } from "../stores/notification";
import Notofication from "./Notofication.vue";

const meals = useMealsStore();
const modal = useModalStore();
const collection = useCollectionStore();
const notification = useNotificationStore();
const formatearIngredientes = () => {
  const ingredientDiv = document.createElement("DIV");

  for (let i = 1; i < 15; i++) {
    if (meals.foodRecipe[`strIngredient${i}`]) {
      const ingredient = meals.foodRecipe[`strIngredient${i}`];
      const quantity = meals.foodRecipe[`strMeasure${i}`];

      const ingredientQuantity = document.createElement("P");
      ingredientQuantity.textContent = `${ingredient} - ${quantity}`;
      ingredientDiv.appendChild(ingredientQuantity);
    }
  }
  return ingredientDiv.innerHTML; // Devuelve el contenido HTML en forma de cadena
};
</script>
<template>
  <div id="modal" class="modal">
    <div class="modal-content">
      <button class="closeTopButton" @click="modal.handleClickModal">
        &times;
      </button>
      <p class="ingredient-title">Ingredientes - Cantidades</p>
      <div v-html="formatearIngredientes()"></div>
      <p class="recipe-title">Instrucciones</p>
      <p>{{ meals.foodRecipe.strInstructions }}</p>
      <div class="button-container">
        <button class="closeBottonButton" @click="modal.handleClickModal">
          cerrar
        </button>
        <button class="addColletion" @click="collection.handleClickColletion">
          {{ modal.textButton }}
        </button>
        <Notofication v-if="notification.show" />
      </div>
    </div>
  </div>
</template>
<style>
/* Estilos para el modal */
.modal {
  /* display: none Ocultar el modal por defecto  */
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Fondo semi-transparente */
  z-index: 1;
}

.modal-content {
  background-color: #fefefe;
  margin: 4rem auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.button-container {
  display: flex;
  gap: 4rem;
}

/* Botón para el modal */
.closeBottonButton {
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
.closeBottonButton:hover {
  background-color: #2b2b2b;
}

.closeTopButton {
  /* display: block; */
  width: 5rem;
  height: 5rem;
  color: #885400;
  float: right;
  font-size: 4rem;
  font-weight: bold;
  background-color: #dd8900;
  border: none;
  border-radius: 0.5rem;
}

.closeTopButton:hover,
.closeTopButton:focus {
  color: #dd8900;
  background-color: #885400;
  text-decoration: none;
  cursor: pointer;
}

/*Para añadir a Favoritos*/
.addColletion {
  width: 100%;
  padding: 1rem;
  text-transform: uppercase;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 900;
  font-size: large;
  background-color: #dd8900;
  color: #efefef;
  transition: background-color 0.3s ease;
}
.addColletion:hover {
  background-color: #2b2b2b;
}
.ingredient-title,
.recipe-title {
  font-weight: bold;
  color: #007bff;
}
</style>

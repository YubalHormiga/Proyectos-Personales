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
</script>
<template>
  <div class="modal">
    <div class="modal-content">
      <button class="closeTopButton" @click="modal.handleClickModal">
        &times;
      </button>
      <p class="ingredient-title">Ingredientes - Cantidades</p>
      <div v-if="modal.formatearIngredientes().length === 0">
        <p>No hay ingredientes disponibles.</p>
      </div>
      <div v-else>
        <p
          v-for="ingrediente in modal.formatearIngredientes()"
          :key="ingrediente"
        >
          {{ ingrediente }}
        </p>
      </div>
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

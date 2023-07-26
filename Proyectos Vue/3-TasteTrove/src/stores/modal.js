import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCollectionStore } from '../stores/collection'
import { useMealsStore } from '../stores/meals'

export const useModalStore = defineStore('modal', () => {

  const collection = useCollectionStore()
  const meals = useMealsStore()
  const modal = ref(false)

  function handleClickModal() {
    modal.value = !modal.value
  }
  const textButton = computed(() => {
    return collection.existInCollection(meals.foodRecipe.idMeal) ? 'Elimina de Colección' : 'Agregar a colección'
  })

  function formatearIngredientes() {
    const ingredientesFormateados = [];
    for (let i = 1; i < 15; i++) {
      if (meals.foodRecipe[`strIngredient${i}`]) {
        const ingredient = meals.foodRecipe[`strIngredient${i}`];
        const quantity = meals.foodRecipe[`strMeasure${i}`];
        ingredientesFormateados.push(`${ingredient} - ${quantity}`);
      }
    }
    return ingredientesFormateados;
  }

  return {
    modal,
    handleClickModal,
    textButton,
    formatearIngredientes
  }
})


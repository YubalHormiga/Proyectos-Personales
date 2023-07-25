import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCollectionStore } from '../stores/collection'
import { useMealsStore} from '../stores/meals'

export const useModalStore = defineStore('modal', () => {

    const collection = useCollectionStore()
    const meals = useMealsStore()
    const modal = ref(false)


    function handleClickModal() {
        modal.value = !modal.value
    }
    const textButton = computed(()=>{
        return collection.existInCollection(meals.foodRecipe.idMeal) ? 'Elimina de Colección' : 'Agregar a colección'
    })


    return {
        modal,
        handleClickModal,
        textButton
    }
})
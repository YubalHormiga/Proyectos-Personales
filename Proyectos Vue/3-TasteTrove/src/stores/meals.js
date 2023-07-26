import { defineStore } from 'pinia'
import { ref, reactive, onMounted, computed } from 'vue'
import APIservices from '../services/APIservices'
import { useModalStore } from './modal'

export const useMealsStore = defineStore('meals', () => {

    const categories = ref([])
    const search = reactive({
        ingredient: '',
        categorie: ''
    })
    const foodRecipes = ref([])
    const foodRecipe = ref({})
    const modal = useModalStore()

    onMounted(async () => {
        const { data: { meals } } = await (APIservices.getCategories())
        categories.value = meals
    })

    async function getMealRecipe() {

        const { data: { meals } } = await (APIservices.searchFoodRecipes(search))
        foodRecipes.value = meals
    }

    async function selectMeal(id) {
        const { data: { meals } } = await (APIservices.searchFoodRecipe(id))
        foodRecipe.value = meals[0]
        modal.handleClickModal()
    }

    const noneFoodRecipes = computed(() => {
        return foodRecipes.value.length === 0
    })
    return {
        categories,
        search,
        getMealRecipe,
        foodRecipes,
        selectMeal,
        foodRecipe,
        noneFoodRecipes
    }
})


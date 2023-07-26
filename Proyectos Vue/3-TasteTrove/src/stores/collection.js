import { ref, onMounted, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { useMealsStore } from './meals'
import { useModalStore } from './modal'
import { useNotificationStore } from './notification'

export const useCollectionStore = defineStore('collection', () => {

    const collection = ref([])
    const meals = useMealsStore()
    const modal = useModalStore()
    const notification = useNotificationStore()

    onMounted(() => {
        collection.value = JSON.parse(localStorage.getItem('collection')) ?? []
    })

    watch(collection, () => {
        bdLocalStore()
    }, {
        deep: true
    })

    function bdLocalStore() {
        localStorage.setItem('collection', JSON.stringify(collection.value))
    }

    function addToCollection() {
        collection.value.push(meals.foodRecipe)
        notification.show = true
        notification.message = 'Se ha agredado a tu colección'
    }
    function removeCollection() {
        collection.value = collection.value.filter(collection => collection.idMeal !== meals.foodRecipe.idMeal)
        notification.show = true
        notification.message = 'Se ha eliminado de tu colección'
    }

    function existInCollection(id) {
        return collection.value.some(foodRecipe => foodRecipe.idMeal === id)
    }

    function handleClickColletion() {
        if (existInCollection(meals.foodRecipe.idMeal)) {
            removeCollection()
        } else {
            addToCollection()
        }
        modal.modal = false
    }

    const noneInCollection = computed(() => {
        return collection.value.length === 0
    })
    return {
        handleClickColletion,
        collection,
        existInCollection,
        noneInCollection,
    }
})



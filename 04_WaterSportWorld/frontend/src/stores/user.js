import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthAPI from '../api/AuthAPI.js'
import BookingAPI from '../api/BookingAPI.js'


export const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const user = ref({})
    const userBookings = ref([])
    const loading = ref(true)


    onMounted(async () => {
        try {
            const { data } = await AuthAPI.auth()
            user.value = data
            await getUserBookings()
        } catch (error) {
            console.log(error)
        }finally{
            loading.value = false
        }
    })

    async function getUserBookings() {
        const { data } = await BookingAPI.getUserBookings(user.value._id)
        userBookings.value = data
    }

    function logout() {
        localStorage.removeItem('AUTH_TOKEN')
        user.value = ''
        router.push({ name: 'login' })
    }
    const getUserName = computed(() => user.value?.name ? user.value?.name : '')
    const noBookings = computed(() => userBookings.value.length === 0)

    return {
        user,
        logout,
        getUserName,
        userBookings,
        getUserBookings,
        noBookings,
        loading
    }
})
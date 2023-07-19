import { ref, computed } from 'vue'
import axios from 'axios'

const weather = ref({})
const loading = ref(false)
const error = ref('')
export default function useWeather() {

    const getWeather = async ({ city, country }) => {
        loading.value = true
        weather.value = {}
        error.value = ''
        // ⁡⁢⁣⁣𝕀𝕞𝕡𝕠𝕣𝕥 𝔸ℙ𝕀 𝕂𝔼𝕐⁡
        const key = import.meta.env.VITE_APY_KEY
        try {
            // ⁡⁢⁣⁣𝔾𝕖𝕥 𝕝𝕒𝕥 𝕒𝕟𝕕 𝕝𝕠𝕘⁡⁡
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${key}`
            const { data } = await axios(url)
            const { lat, lon } = data[0]
            // ⁡⁢⁣⁣𝔾𝕖𝕥 𝕎𝕖𝕒𝕥𝕙𝕖𝕣⁡
            const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
            const { data: result } = await axios(urlWeather)
            weather.value = result
        } catch {
            error.value = 'Ciudad no encontrada'
        } finally {
            loading.value = false
        }

    }



    const showWeather = computed(() => {
        return Object.values(weather.value).length > 0
    })

    const convertTemperature = temperature => parseInt(temperature - 273.15)
    return {
        getWeather,
        weather,
        showWeather,
        convertTemperature,
        loading,
        error
    }
}
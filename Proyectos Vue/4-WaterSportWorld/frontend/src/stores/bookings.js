import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBookingsStore = defineStore('bookings', () => {

    const services = ref([])
    
    function onServiceSelected(service) {
        if (services.value.some(selectedService => selectedService._id === service._id)) {
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        } else {
            if(services.value.length === 1){
                alert('Máximo una reserva por servicio') 
                return
            }
            services.value.push(service)
        }

    }

    const isServiceSeleted = computed(() => {
        return (id) => services.value.some(service => service._id === id)
    })
    return {
        onServiceSelected,
        isServiceSeleted
    }
})
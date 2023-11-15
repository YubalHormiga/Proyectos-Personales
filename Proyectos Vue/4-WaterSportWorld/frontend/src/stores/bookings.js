import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const useBookingsStore = defineStore('bookings', () => {

    const services = ref([])

    function onServiceSelected(service) {
        if (services.value.some(selectedService => selectedService._id === service._id)) {
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        } else {
            if (services.value.length === 2) {
                Swal.fire({
                    icon: 'info',
                    title: 'Máximo dos servicios por reserva',
                    showConfirmButton: true,
                });
                return;
            }
            services.value.push(service)
        }
    }

    const isServiceSeleted = computed(() => {
        return (id) => services.value.some(service => service._id === id)
    })

    const noServicesSelected = computed(() => {
        return services.value.length === 0
    })

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })


    return {
        services,
        onServiceSelected,
        isServiceSeleted,
        noServicesSelected,
        totalAmount,
    }
})
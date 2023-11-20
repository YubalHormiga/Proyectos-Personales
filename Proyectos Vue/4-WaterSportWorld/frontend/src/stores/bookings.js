import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const useBookingsStore = defineStore('bookings', () => {

    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')


    onMounted(() => {
        const startHour = 9
        const endHour = 21
        for (let hour = startHour; hour < endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    function createBooking() {
       const booking = {
        services: services.value.map(service => service._id),
        date: date.value,
        hours: time.value,
        totalAmount : totalAmount.value
       }
       console.log(booking)
    }
    function onServiceSelected(service) {
        if (services.value.some(selectedService => selectedService._id === service._id)) {
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        } else {
            if (services.value.length === 2) {
                showMaxServicesAlert()
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

    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length
    })

    function updateDateFormatted(newDateFormatted) {
        date.value = newDateFormatted;
    }

    function showMaxServicesAlert() {
        Swal.fire({
            icon: 'info',
            title: 'Máximo dos servicios por reserva',
            showConfirmButton: true,
        });
    }


    return {
        services,
        date,
        hours,
        time,
        createBooking,
        updateDateFormatted,
        onServiceSelected,
        isServiceSeleted,
        noServicesSelected,
        totalAmount,
        isValidReservation
    }
})
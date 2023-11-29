import { ref, computed, onMounted, inject, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import BookingAPI from '../api/BookingAPI'
import { useDateStore } from './date'

export const useBookingsStore = defineStore('bookings', () => {

    const dateStore = useDateStore()

    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')
    const bookingsByDate = ref([])

    const toast = inject("toast")
    const router = useRouter()



    onMounted(() => {
        const startHour = 9
        const endHour = 21
        for (let hour = startHour; hour < endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    watch(date, async () => {
        time.value = ''
        if (date.value) {
            const { data } = await BookingAPI.getByDate(date.value)
            bookingsByDate.value = data
            console.log(data)
        }
    })
    async function createBooking() {
        const booking = {
            services: services.value.map(service => service._id),
            date: dateStore.convertToISO(date.value),
            hours: time.value,
            totalAmount: totalAmount.value
        }

        try {
            const { data } = await BookingAPI.create(booking)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            clearBookingData()
            router.push({ name: 'my-bookings' })
        } catch (error) {
            console.log(error)
        }
    }

    function clearBookingData() {
        services.value = []
        date.value = ''
        time.value = ''
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

    const isDateSelected = computed(() => {
        return date.value ? true : false
    })

    const disableTime = computed(() => {
        return (hour) => bookingsByDate.value.some(booking => booking.hours === hour);
    });

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
        isValidReservation,
        isDateSelected,
        disableTime,
        clearBookingData
    }
})
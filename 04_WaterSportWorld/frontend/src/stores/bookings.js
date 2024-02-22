import { ref, computed, onMounted, inject, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import BookingAPI from '../api/BookingAPI'
import { useDateStore } from '../stores/date'
import { useUserStore } from '../stores/user'

export const useBookingsStore = defineStore('bookings', () => {


    const bookingId = ref('')
    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')
    const bookingsByDate = ref([])

    const toast = inject("toast")
    const router = useRouter()

    const dateStore = useDateStore()
    const userStore = useUserStore()



    onMounted(() => {
        const startHour = 9
        const endHour = 21
        for (let hour = startHour; hour < endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    watch(date, async () => {
        time.value = '';
        if (date.value === '') return;

        try {
            const { data } = await BookingAPI.getByDate(date.value);
            console.log(data);

            if (bookingId.value) {
                const filteredBookings = data.filter(booking => booking._id === bookingId.value);

                if (filteredBookings.length > 0) {
                    bookingsByDate.value = data.filter(booking => booking._id !== bookingId.value);
                    time.value = filteredBookings[0].hours;
                } else {
                    time.value = '';
                }
            } else {
                bookingsByDate.value = data;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            console.error('Full error stack:', error.stack);
            // Puedes agregar lógica adicional de manejo de errores aquí si es necesario.
        }
    });


    function setSelectBooking(booking) {
        console.log(booking)
        services.value = booking.services
        date.value = dateStore.convertToDDMMYYYY(booking.date)
        time.value = booking.hours
        bookingId.value = booking._id

        // console.log(bookingId.value)
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

    async function saveBooking() {
        const booking = {
            services: services.value.map(service => service._id),
            date: dateStore.convertToISO(date.value),
            hours: time.value,
            totalAmount: totalAmount.value
        }
        // console.log(bookingId.value)
        // return

        if (bookingId.value) {
            try {
                const { data } = await BookingAPI.update(bookingId.value, booking)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })

            } catch (error) {
                console.log(error)
            }

        } else {

            try {
                const { data } = await BookingAPI.create(booking)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })

            } catch (error) {
                console.log(error)
            }
        }
        clearBookingData()
        userStore.getUserBookings()

        router.push({ name: 'my-bookings' })
    }




    function clearBookingData() {
        bookingId.value = ''
        services.value = []
        date.value = ''
        time.value = ''
    }

    async function cancelBooking(id) {
        try {
            const { data } = await BookingAPI.delete(id)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            userStore.userBookings = userStore.userBookings.filter(booking => booking._id !== id)
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
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
        setSelectBooking,
        saveBooking,
        cancelBooking,
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
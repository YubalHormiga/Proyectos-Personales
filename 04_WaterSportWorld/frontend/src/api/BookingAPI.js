
import api from '../lib/axios'

export default {
    create(data) {
        return api.post('/bookings', data)
    },
    getByDate(date) {
        return api.get(`/bookings?date=${date}`)
    },
    getUserBookings(userId) {
        return api.get(`/users/${userId}/bookings`)
    },
    getById(id) {
        return api.get(`/bookings/${id}`)
    },
    update(id, data) {
        return api.put(`/bookings/${id}`, data)
    },
    delete(id) {
        return api.delete(`/bookings/${id}`)
    }

}
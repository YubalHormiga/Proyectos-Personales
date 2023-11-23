import api from '../lib/axios.js'


export default {
   register(data) {
        return api.post('/auth/register', data)
    }
}
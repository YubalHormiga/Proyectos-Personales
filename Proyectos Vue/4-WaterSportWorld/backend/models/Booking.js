import mongoose from 'mongoose'

const bokkingSchema = mongoose.Schema({
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Services'
        }
    ],
    date: {
        type: Date
    },
    hours: {
        type: String
    },
    totalAmount: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Bokking = mongoose.model('Bokking', bokkingSchema)

export default Bokking

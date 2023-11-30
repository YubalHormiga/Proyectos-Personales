import Booking from "../models/Booking.js"


const getUserBookings = async (req, res) => {

    const { user } = req.params

    if (user !== req.user._id.toString()) {
        const error = new Error('Acceso Denegado')
        return res.status(400).json({
            msg: error.message
        })

    }

    try {
        const bookings = await Booking.find({
            user,
            date: {
                $gte: new Date()
            }
        }).populate('services').sort({ date: 'asc' })
        res.json(bookings)
    } catch (error) {

    }
}

export {
    getUserBookings,
}
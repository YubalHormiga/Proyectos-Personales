import Booking from '../models/Booking.js'
import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'


const createBooking = async (req, res) => {

    const booking = req.body
    booking.user = req.user._id.toString()
    try {
        const newBooking = new Booking(booking)
        await newBooking.save()
        res.json({
            msg: 'Cita Almacenada Correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const getBookingsByDate = async (req, res) => {
    const { date } = req.query

    const newDate = parse(date, 'dd/MM/yyyy', new Date())

    if (!isValid(newDate)) {
        const error = new Error('Fecha no válida')
        return res.status(400).json({
            msg: error.message
        })
    }

    const isoDate = formatISO(newDate)
    const bookings = await Booking.find({
        date: {
            $gte: startOfDay(new Date(isoDate)),
            $lte: endOfDay(new Date(isoDate))
        }
    }).select('hours')

    res.json(bookings)
}
export {
    createBooking,
    getBookingsByDate
}
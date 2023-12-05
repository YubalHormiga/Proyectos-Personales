import Booking from '../models/Booking.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'
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

const getBookingById = async (req, res) => {
    const { id } = req.params

    if (validateObjectId(id, res)) return

    const booking = await Booking.findById(id).populate('services')

    if (!booking) {
        return handleNotFoundError('La reserva no existe', res)
    }

    if (booking.user.toString() !== req.user._id.toString()) {
        const error = new Error('Acceso denegado')
        res.status(403).json({
            msg: error.message
        })

    }
    res.json(booking)

}

const updateBooking = async (req, res) => {

    console.log('desde updateBooking')
    const { id } = req.params

    if (validateObjectId(id, res)) return

    const booking = await Booking.findById(id).populate('services')

    if (!booking) {
        return handleNotFoundError('La reserva no existe', res)
    }

    if (booking.user.toString() !== req.user._id.toString()) {
        const error = new Error('Acceso denegado')
        res.status(403).json({
            msg: error.message
        })

    }

    const { services, date, hours, totalAmount } = req.body
    booking.services = services
    booking.hours = hours
    booking.totalAmount = totalAmount
    booking.date = date

    try {
        const result = await booking.save()
        res.json({ msg: "Actividad almacenada correctamente" })
    } catch (error) {
        console.log(error)
    }

}
const deleteBooking = async (req, res) => {
    const { id } = req.params

    if (validateObjectId(id, res)) return

    const booking = await Booking.findById(id).populate('services')

    if (!booking) {
        return handleNotFoundError('La reserva no existe', res)
    }

    if (booking.user.toString() !== req.user._id.toString()) {
        const error = new Error('Acceso denegado')
        res.status(403).json({
            msg: error.message
        })

    }

    try {
        await booking.deleteOne()
        res.json({ msg: 'Actividad cancelada correctamente' })
    } catch (error) {
        console.log(error)
    }
}


export {
    createBooking,
    getBookingsByDate,
    getBookingById,
    updateBooking,
    deleteBooking
}
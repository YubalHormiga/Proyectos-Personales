import express from 'express'
import { createBooking, getBookingsByDate, getBookingById, updateBooking, deleteBooking } from '../controllers/bookingController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/')
    .post(authMiddleware, createBooking)
    .get(authMiddleware, getBookingsByDate)

router.route('/:id')
    .get(authMiddleware, getBookingById)
    .put(authMiddleware, updateBooking)
    .delete(authMiddleware, deleteBooking)


export default router
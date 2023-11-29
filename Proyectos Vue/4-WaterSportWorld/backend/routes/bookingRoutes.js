import express from 'express'
import { createBooking, getBookingsByDate } from '../controllers/bookingController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/')
    .post(authMiddleware, createBooking)
    .get(authMiddleware, getBookingsByDate)
    

export default router
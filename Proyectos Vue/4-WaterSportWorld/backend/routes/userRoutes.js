import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getUserBookings } from '../controllers/userController.js'

const router = express.Router()

router.route('/:user/bookings')
    .get(authMiddleware, getUserBookings)

export default router
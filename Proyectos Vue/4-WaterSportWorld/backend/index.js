import express from "express";
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'


//𝔼𝕟𝕧𝕚𝕣𝕠𝕟𝕞𝕖𝕟𝕥 𝕧𝕒𝕣𝕚𝕒𝕓𝕝𝕖𝕤
dotenv.config()

//ℂ𝕠𝕟𝕗𝕚𝕘𝕦𝕣𝕖 𝕒𝕡𝕡
const app = express()

//ℝ𝕖𝕒𝕕 𝕕𝕒𝕥𝕒 𝕧𝕚𝕒 𝕓𝕠𝕕𝕪

app.use(express.json())

//ℂ𝕠𝕟𝕟𝕖𝕔𝕥 𝕥𝕠 𝕕𝕓
db()

//ℂ𝕠𝕟𝕗𝕚𝕘𝕦𝕣𝕖 𝕔𝕠𝕣𝕤

const whiteList = [process.env.FRONTEND_URL, undefined]
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
app.use(cors(corsOptions))

//𝔻𝕖𝕗𝕚𝕟𝕖 𝕣𝕦𝕥𝕖⁡
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)

//𝔻𝕖𝕗𝕚𝕟𝕖 ℙ𝕠𝕣𝕥
const PORT = process.env.PORT || 4000

//𝕊𝕥𝕒𝕣𝕥 𝕥𝕖𝕣𝕞𝕚𝕟𝕒𝕝
app.listen(PORT, () => {
    console.log(colors.black.bgGreen('The serve is running in port:', colors.blue.bold(PORT)))
})
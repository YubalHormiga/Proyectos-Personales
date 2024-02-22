import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransport(process.env.EMIAL_HOST, process.env.EMIAL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)


    const info = await transporter.sendMail({
        from: 'SWS <correo@watersportworld.com',
        to: 'correo@correo.com',
        subject: 'SWS - Confirma cuenta',
        text: ' SWS - Confirma tu cuenta',
        html: `<p>Hola: ${name}, confirma tu cuenta en WaterSportWorld</p>
        <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>`
    })
}

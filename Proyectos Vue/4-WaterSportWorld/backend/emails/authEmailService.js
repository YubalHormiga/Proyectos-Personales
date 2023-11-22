import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransport("sandbox.smtp.mailtrap.io", 2525, "4df2bd27a759e3", "df744c43faab98")


    const info = await transporter.sendMail({
        from: 'SWS',
        to: 'correo@correo.com',
        subject: 'SWS - Confirma cuenta',
        text: ' SWS - Confirma tu cuenta',
        html: `<p>Hola: ${name}, confirma tu cuenta en AppSalon</p>
        <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace:</p>
        <a href="http://localhost:4000/api/auth/verify/${token}">Confirmar cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>`
    })
}

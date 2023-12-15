import { createTransport } from '../config/nodemailer.js'



export async function sendEmailNewBooking({ date, time }) {

    const transporter = createTransport(
        process.env.EMIAL_HOST,
        process.env.EMIAL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD
    )

    const info = await transporter.sendMail({
        from: 'SWS <reserva@watersportworld.com',
        to: 'admin@waterworldsport.com',
        subject: 'SWS - Nueva reserva',
        text: ' SWS - Nueva reserva',
        html: `<p>Hola: Admin,tienes una nueva reserva</p>
        <p>La reserva será para el día: ${date} a las: ${time}</p>`
    })
}
export async function sendEmailUpdateBooking({ date, time }) {

    const transporter = createTransport(
        process.env.EMIAL_HOST,
        process.env.EMIAL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD
    )

    const info = await transporter.sendMail({
        from: 'SWS <reserva@watersportworld.com',
        to: 'admin@waterworldsport.com',
        subject: 'SWS - Reserva actualizada',
        text: ' SWS - Reserva actualizada',
        html: `<p>Hola: Admin,tienes una modificación</p>
        <p>La nueva reserva será para el día: ${date} a las: ${time}</p>`
    })
}


export async function sendEmailCancelBooking({ date, time }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_POST,
        process.env.EMIAL_USER,
        process.env.EMAIL_PASS
    )
    const info = await transporter.sendMail({
        from: 'AppSalon <citas@appsalon.com',
        to: 'admin@appsalon.com',
        subject: 'AppSalon - Cita Cancelada',
        text: 'AppSalon -Cita Cancelada',
        html: `<p>Hola: Admin, un usuario ha cancelado la cita</p>
        <p>La cita cancelada era para el día: ${date} a la hora: ${time}</p>
      
    `
    })
}


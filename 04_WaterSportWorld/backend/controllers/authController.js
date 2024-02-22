import User from "../models/User.js"
import { sendEmailVerification } from "../emails/authEmailService.js"
import { generateJWT } from "../utils/index.js"

const register = async (req, res) => {

    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg: error.message
        })
    }

    const { email, password, name } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({
            msg: error.message
        })
    }

    const MIN_PASSWORD_LENGTH = 8
    if (password.trim().length < MIN_PASSWORD_LENGTH) {
        const error = new Error(`El password debe contener: ${MIN_PASSWORD_LENGTH} caracteres `)
        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        const user = new User(req.body)
        const result = await user.save()
        console.log(result)
        const { name, email, token } = result
        sendEmailVerification({
            name,
            email,
            token
        })
        res.json({
            msg: 'El Usuario se creó correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const verifyAccount = async (req, res) => {
    const { token } = req.params
    const user = await User.findOne({ token })
    if (!user) {
        const error = new Error('Token no válido')
        return res.status(401).json({
            msg: error.message
        })
    }

    try {
        user.verify = true
        user.token = ''
        await user.save()
        res.json({ msg: 'Usuario Confirmado Correctamente' })
    } catch (error) {
        console.log(error)
    }
}
const login = async (req, res) => {
    const { password, email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('El usuario no existe')
        return res.status(401).json({
            msg: error.message
        })
    }

    if (!user.verify) {
        const error = new Error('El usuario no ha confirmado su cuenta')
        return res.status(401).json({
            msg: error.message
        })
    }

    if (await user.checkPassword(password)) {
        const token = generateJWT(user.id)
        res.json({
            token
        })
    } else {
        const error = new Error('El password es incorrecto')
        return res.status(401).json({
            msg: error.message
        })

    }
}

const user = (req, res) => {
    const { user } = req
    res.json(user)
}

export {
    register,
    verifyAccount,
    login,
    user
}
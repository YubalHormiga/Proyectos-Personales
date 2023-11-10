import Services from '../models/Services.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

const createService = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        const service = new Services(req.body)
        await service.save()
        res.json({
            msg: 'El Servicio se creó correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const getServices = async (req, res) => {
    try {
        const services = await Services.find()
        res.json(services)
    } catch (error) {
        console.log(error)
    }
}

const getServiceById = async (req, res) => {
    const { id } = req.params

    //𝕍𝕒𝕝𝕚𝕕𝕒𝕥𝕖 𝕆𝕓𝕛𝕖𝕔𝕥 𝕓𝕪 𝕀𝔻
    if (validateObjectId(id, res)) return

    //𝕍𝕒𝕝𝕚𝕕𝕒𝕥𝕖 𝕥𝕙𝕒𝕥 𝕚𝕥 𝕖𝕩𝕚𝕤𝕥
    const service = await Services.findById(id)
    if (!service) {
        return handleNotFoundError('El Servicio no existe', res)
    }
    //𝕊𝕙𝕠𝕨 𝕤𝕖𝕣𝕧𝕚𝕔𝕖
    res.json(service)
}

const updateService = async (req, res) => {
    const { id } = req.params

    //𝕍𝕒𝕝𝕚𝕕𝕒𝕥𝕖 𝕆𝕓𝕛𝕖𝕔𝕥 𝕓𝕪 𝕀𝔻
    if (validateObjectId(id, res)) return

    //𝕍𝕒𝕝𝕚𝕕𝕒𝕥𝕖 𝕥𝕙𝕒𝕥 𝕚𝕥 𝕖𝕩𝕚𝕤𝕥
    const service = await Services.findById(id)
    if (!service) {
        return handleNotFoundError('El Servicio no existe', res)
    }
    //𝕌𝕡𝕕𝕒𝕥𝕖 𝕕𝕒𝕥𝕒
    service.name = req.body.name || service.name
    service.price = req.body.price || service.price
    service.description = req.body.description || service.description

    try {
        await service.save()
        res.json({
            msg: 'Servicio actualizado correctamenente'
        })
    } catch (error) {
        console.log(error)
    }
}
const deleteService = async (req, res) => {
    const { id } = req.params

    //𝕍𝕒𝕝𝕚𝕕𝕒𝕥𝕖 𝕆𝕓𝕛𝕖𝕔𝕥 𝕓𝕪 𝕀𝔻
    if (validateObjectId(id, res)) return

    //𝕍𝕒𝕝𝕚𝕕𝕒𝕥𝕖 𝕥𝕙𝕒𝕥 𝕚𝕥 𝕖𝕩𝕚𝕤𝕥
    const service = await Services.findById(id)
    if (!service) {
        return handleNotFoundError('El Servicio no existe', res)
    }

    try {
        await service.deleteOne()
        res.json({ msg: 'Servicio eliminado correctamente' })
    } catch (error) {
        console.log(error)
    }
}

export {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
}
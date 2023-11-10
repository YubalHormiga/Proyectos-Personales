import moongose from 'mongoose'
import colors from 'colors'
export const db  = async ()=>{
    try {
        const db = await moongose.connect(process.env.MONGO_URI)
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(colors.green.bgWhite(`MongoDB Connected Successfully:${url}`))
    } catch (error) {
        console.log(`Error: ${error}`)
        process.exit(1)
    }
}
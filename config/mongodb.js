let Joi = require('joi')
let mongoose = require('mongoose')
let {Schema, model} = require('mongoose')
let config = require("./index")


const CONNECT = config.DBConection

let connection = null;

const createDB = async () =>{
    try {
        connection = await mongoose.connect(`${CONNECT}`)
        console.log(`Conexion de mongo creada en ${CONNECT}`)
    } 
    catch (err) {
        console.log('error al conectarse a Mongo', err)    
    }
}

createDB();

const email = Joi.string().required()
const nombre = Joi.string().required()
const apellido = Joi.string().required()
const edad = Joi.string().required()
const alias = Joi.string().required()
const text = Joi.string().required()
const fyh = Joi.date()
const avatar = Joi.string().required()
const id = Joi.number()


const msgCreateSchema = {
    author: {
        email,
        nombre, 
        apellido,
        edad,
        alias,
        avatar
    },
    text,
    fyh,
    id
}

const msgSchema = new Schema(msgCreateSchema)
const msgModel = model('messages', msgSchema)

module.exports = msgModel // Lo mando al index que va a guardar los mensajes en la base de datos


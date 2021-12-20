let {schema, normalize} = require ('normalizr')


function compression(normalizedData, denormalizedData){

    let normalizedLength = Object.values(normalizedData).length
    let denormalizedLength = denormalizedData.length    

    return (normalizedLength*100)/(denormalizedLength)
}

module.exports = (denormalizedData) => {

    let autorSchema = new schema.Entity('author', {}, {idAttribute:'email'})
    
    let mensajeSchema = new schema.Entity('post',{author: autorSchema}, {idAttribute:'id'})
    
    let mensajesSchema = new schema.Entity('posts',{denormalizedData: [mensajeSchema]}, {idAttribute:'id'})
    
    let normalizada = normalize({id:'mensajesNormalizados', denormalizedData}, mensajesSchema)
    
    let compressedPercentage = compression(normalizada.entities.post, denormalizedData)

    return {normalizada, denormalizedData, mensajesSchema, compressedPercentage } // devuelvo la data normalizada, desnormalizada y el schema para enviar al front via socket

}


console.log("desde utils.js")

const notes = document.querySelector('#notes')
const title = document.getElementById("fill-title");
const chat = document.getElementById('id-chat');
const compression = document.getElementById('compression')

const addMessage = msg => {
  console.log("desde addMessage")
  chat.innerHTML += `<div>
                    <p style="display: inline; color: blue;"><b>${msg.author.email},</b></p> 
                    <p style="display: inline; color: green;"><i>${msg.author.nombre}</i></p>
                    <p style="display: inline; color: green;"><i>${msg.text}</i></p>
                    <p style="display: inline; color: brown;">${msg.fyh}:</p>
                    </div>
                    `
}

const loadMessage = (msgs) => {
  let {normalizada, compressedPercentage} = {...msgs}

  // let denormalizedData = normalize.denormalize(normalizedData.result, mensajesSchema, normalizedData.entities)

  // let normalizedData = normalize({id:'mensajes', denormalizedData}, mensajesSchema)

  console.log(msgs)

  console.log("NORMALIZADA", Object.values(normalizada.entities.post).length) // Este es la longitud del array que tengo que recorrer
  console.log("NORMALIZADA", normalizada.entities.post[1]._doc.text)
  console.log("NORMALIZADA", normalizada.entities.post[1]._doc.author.email)
  console.log("NORMALIZADA", normalizada.entities.post[1]._doc.fyh)

  console.log("NORMALIZADA", normalizada)
  // console.log("DESNORMALIZADA", denormalizedData)



  // console.log("DESNORMALIZADA", denormalizedData)

  compression.innerHTML = `Compresion ${compressedPercentage.toFixed(2)} %`

  for (i=1; i <= Object.values(normalizada.entities.post).length; i++){
  chat.innerHTML += `<div>
  <p style="display: inline; color: blue;"><b>${normalizada.entities.post[i]._doc.author.email},</b></p> 
  <p style="display: inline; color: green;"><i>${normalizada.entities.post[i]._doc.text}</i></p>
  <p style="display: inline; color: brown;">${ normalizada.entities.post[i]._doc.fyh}:</p>
  </div>
  `
  }
}
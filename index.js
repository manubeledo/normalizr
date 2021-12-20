const faker = require("faker");
const express = require("express");
const morgan = require("morgan");
let { Server: HttpServer } = require("http");
let { Server: IOServer } = require("socket.io");
const cors = require("cors");
const path = require("path");
let msgModel = require("./config/mongodb")
const normalizar = require('./services/compression')
const PORT = 8080;

// Initializations
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Configurations
app.use(cors('*'));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname,"public")));


// Set EJS engine

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, './public')))


app.post("/api/normalizr", (req, res) => {
  messages.add(req.body)

  res.redirect('/productos')
});

app.post("/api/normalizr", (req, res) => {
  console.log(req.body)

  res.redirect('/normalizr')
});

app.get("/normalizr", (req, res, next) => {
  res.render('../views/layouts/normalizr.ejs');
});

app.get("/faker-test", (req, res, next) => {
    let productos = [];
    for (i = 0; i < 5 ; i++){
      let product = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.image()
      }
    productos.push(product)
    }
  res.render('../views/layouts/faker.ejs', {productos: productos});
});

app.get("/index", (req, res, next) => {
  res.render('../views/layouts/index.ejs');
});

httpServer.listen(PORT, () => {
  console.log(`Desafio funcionando en la URL http://localhost:${PORT}/faker-test`);
});

// let msgs = [] // Here is where the messages are been archived

let messages = []

const getMessages = async () => {
   let msgs = await msgModel.find({});
   let {normalizada, denormalizedData, mensajesSchema, compressedPercentage} = normalizar(msgs)
   return {normalizada, denormalizedData, mensajesSchema, compressedPercentage}
}

getMessages(); 

let id = 0;

//Conexion de SOCKET.IO
io.on("connection", async (socket) => {
  console.log("new connection", socket.id);   // Me Avisa si hay un logueo y me devuelve el id

  let response = await getMessages(); 
  io.sockets.emit("server:loadmessages", response)

  socket.on('client:message', async (data) => {
    id++
    const newmessage = {
      author: {
        email: data.email,
        nombre: data.nombre, 
        apellido: data.apellido,
        edad: data.edad,
        alias: data.alias,
        avatar : data.avatar
    },
    text : data.message,
    fyh : data.fyh,
    id
}
    await msgModel.create(newmessage);
    io.sockets.emit("server:newmessage", newmessage);
})

});


module.exports = app;
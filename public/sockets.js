const socket = io();

// Send message to server by client
const saveMessage = (email, nombre, apellido, edad, alias, avatar, message, fyh) => {
  console.log(email)
  socket.emit('client:message', {
    email,
    nombre,
    apellido,
    edad,
    alias,
    avatar,
    message,
    fyh
  })
};


socket.on('server:newmessage', addMessage);

socket.on('server:loadmessages', loadMessage);
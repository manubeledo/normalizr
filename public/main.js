      //Chat
      const formchat = document.getElementById('id-form-chat');
      const email = document.getElementById('id-mail');
      const nombre = document.getElementById('id-nombre');
      const apellido = document.getElementById('id-apellido');
      const edad = document.getElementById('id-edad');
      const alias = document.getElementById('id-alias');
      const avatar = document.getElementById('id-avatar');
      const message = document.getElementById('id-chat-message');


      formchat.addEventListener('submit', e =>{
        e.preventDefault();
        let fyh = new Date().toUTCString();
        fyh = fyh.split(' ').slice(0, 5).join(' ');
        console.log("desde el boton enviar mensajes");
        saveMessage(email.value, nombre.value, apellido.value, edad.value, alias.value, avatar.value, message.value, fyh);
      })

        

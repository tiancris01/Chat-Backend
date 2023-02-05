const { comprobarJWT } = require('../helpers/jwt');
const{ io } = require('../index');
const {userConnected,userDisconnected, grabarMensaje} = require('../controllers/socketC');

io.on('connection',  (client) => {
    console.log('Cliente Conectado');

    //Verificar autenticación
    const[valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    if(!valido){ return client.disconnect(); }

    //Cliente autenticado
    userConnected(uid);

    //Ingresar el usuario a una sala privada through Client.Id == uid
    client.join(uid);

    client.on('msg_private', async (payload)=>{
      await grabarMensaje(payload);
      console.log(payload);
      io.to(payload.to).emit('msg_private', payload);
    })


    client.on('disconnect', () => {
        userDisconnected(uid);
     });
});

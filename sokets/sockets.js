const { comprobarJWT } = require('../helpers/jwt');
const{ io } = require('../index');
const {userConnected,userDisconnected} = require('../controllers/socketC');

io.on('connection',  (client) => {
    console.log('Cliente Conectado');

    //Verificar autenticación
    const[valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    if(!valido){ return client.disconnect(); }

    //Cliente autenticado
    userConnected(uid);

    //Ingresar el usuario a una sala privada through Client.Id == uid
    client.join(uid);

    client.on('msg_private', (payload)=>{
      console.log(payload);
    })


    client.on('disconnect', () => {
        userDisconnected(uid);
     });
});

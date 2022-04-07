const{ io } = require('../index');
// Mensajes de Sockets
// Coneccion
io.on('connection', client => {
    console.log('Cliente Conectado');
    
    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
     });
    
    // Escuchando
     client.on('mensaje', (payLoad) => {
        console.log('Hola mundo', payLoad);
        // Emitiendo
        io.emit('mensaje', {nombre: 'Servidor'});
     });
  });
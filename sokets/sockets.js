const{ io } = require('../index');
const Band = require('../models/band');
const Bandas = require('../models/bandas');

const bands = new Bandas();


bands.agregarBanda(new Band('Queen'));
bands.agregarBanda(new Band('Bon Jovi'));
bands.agregarBanda(new Band('Hereos del slencios'));
bands.agregarBanda(new Band('Kraken'));

console.log(bands);

// Mensajes de Sockets
// Coneccion
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.emit('active-bands',bands.obtenerBanda());
    
    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
     });
    
    // Escuchando desde el servidor para el el HTML
     client.on('mensaje', (payLoad) => {
        console.log('Escuchando HTML', payLoad);
        // Emitiendo
        io.emit('mensaje', {nombre: 'Servidor'});
     });

     client.on('votos', (payLoad)=>{
         bands.AgregarVotos(payLoad.id);
         io.emit('active-bands', bands.obtenerBanda());
     })

     client.on('agregar', (payLoad)=>{
        const newBand = new Band(payLoad.name);
         bands.agregarBanda(newBand);
         io.emit('active-bands', bands.obtenerBanda());
     })

     client.on('borrar', (payLoad)=>{
         bands.eliminarBanda(payLoad.id);
         io.emit('active-bands', bands.obtenerBanda());
      })

     // Escuchando desde el servidor para flutter 
     client.on('emitir mensaje', (payLoad) => {
      console.log('Escuchando Flutter', payLoad);
      // Emitiendo a solo a flutter
      // io.emit('msn', payLoad);
      client.broadcast.emit('msn', payLoad); // Emite a todos menos al que lo emitio
   });
  });
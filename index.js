// import express
const express = require("express");
const path = require('path');

// Archivo del puerto .env
require('dotenv').config();

//DataBase config
require ('./database/config').dbConnection();

// Crear una instancia de App de express
const app = express();

// Lectura y parceo del boddy
app.use(express.json());

// Crea el Server de Node
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sokets/sockets');


//   server.listen(3000);

// path public
const publicPhat = path.resolve(__dirname,'public');
app.use(express.static(publicPhat));

// Mis Rutas
app.use('/api/login', require ('./routes/auth'));
app.use('/api/usuarios', require ('./routes/usuarios'));
app.use('/api/mensajes', require ('./routes/mensajes'));

// abrir puerto para que empiece a escuchar peticiones 
server.listen(process.env.PORT,(err)=>{
    if(err)throw new Error(err);
    console.log('Servidor corriendoen puerto',process.env.PORT);
});


// import express
const express = require("express");
const path = require('path');

// Archivo del puerto .env
require('dotenv').config();

// Crear una instancia de App de express
const app = express();

// Crea el Server de Node
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sokets/sockets');


//   server.listen(3000);

// path public
const publicPhat = path.resolve(__dirname,'public');

app.use(express.static(publicPhat));


// abrir puerto para que empiece a escuchar peticiones 
server.listen(process.env.PORT,(err)=>{
    if(err)throw new Error(err);
    console.log('Servidor corriendoen puerto',process.env.PORT);
});


const jwt = require ('jsonwebtoken');
const sign = require('jsonwebtoken/sign');
const { modelName } = require('../models/usuarios');

const generarJWT = (uid)=>{

    return new Promise((resolve, reject)=>{

        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY,{
            expiresIn: '24h'
        }, (err,token)=>{
            if (err){
                //no se pudo crear el token
                reject('No se pudo generar el token')
            }else{
                // Token!
                resolve(token);
            }
        })
    });
}

module.exports = {
    generarJWT
}
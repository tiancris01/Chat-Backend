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

const comprobarJWT = (token="")=>{
  try {
    
    const {uid}= jwt.verify(token, process.env.JWT_KEY);
    return [true, uid];

    }catch(err){
      return [false, null];
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}

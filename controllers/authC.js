const {response} = require('express');
const  bcrypt = require('bcryptjs');

const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/jwt');
//const res = require('express/lib/response');

const crearUsuario = async (req, res = response)=>{

    const {email, contraseña} =  req.body;

    try{
        const existeEmail = await Usuario.findOne({email});
        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.contraseña = bcrypt.hashSync(contraseña, salt);


        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id);
    
        res.json({
            ok:true,
            usuario,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });

    }
}

const login = async (req, res = response)=>{

    const {email, contraseña} = req.body;
    
    try{

        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'El correo no se encontro'
            });
        }

        //validar la constraseña
        const validarContraseña = bcrypt.compareSync(contraseña, usuarioDB.contraseña);
        if ( !validarContraseña ){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDB.id);
    
        res.json({
            ok:true,
            usuario: usuarioDB,
            token
        });

    }catch (err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador '
        });

    }

}

const renewToken = async (req, res = response)=>{

    const uid = req.uid;
    const usuario = await Usuario.findById(uid);
    const token = await generarJWT(uid);

    res.json({
        ok:true,
        usuario,
        token
    })

}


module.exports = {
    crearUsuario,
    login,
    renewToken
}

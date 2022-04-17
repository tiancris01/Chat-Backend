const {Router, response} = require('express');
const { check } = require('express-validator');

const {crearUsuario, login, renewToken } = require('../controllers/authC');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require('../middlewares/validar_Campos');



const route =  Router();

route.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('contraseña','La contraseña es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
], crearUsuario);


route.post('/',[
    check('contraseña','La contraseña es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
], login);

route.get('/renew', validarJWT ,renewToken);


module.exports = route;
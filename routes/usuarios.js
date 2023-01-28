/* 
    Path: api/usuarios
*/


const {Router} = require('express');
const { getUsuarios } = require('../controllers/usuariosC');
const { validarJWT } = require('../middlewares/validar-JWT');


const router =  Router();


router.get('/', validarJWT, getUsuarios);


module.exports = router;

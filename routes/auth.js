/* 
    Path: api/login
*/

const {Router} = require('express');
const { check } = require('express-validator');

const {crearUsuario, login, renewToken } = require('../controllers/authC');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require('../middlewares/validar_Campos');



const router =  Router();

router.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('contraseña','La contraseña es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
], crearUsuario);


router.post('/',[
    check('contraseña','La contraseña no es valida').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
], login);

router.get('/renew', validarJWT ,renewToken);


module.exports = router;

/*
    path: /api/mensajes
*/

const {Router} = require('express');
const { getmsg } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-JWT');


const router =  Router();


router.get('/:from', validarJWT, getmsg);


module.exports = router;

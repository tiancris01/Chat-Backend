const { response } = require("express");
const Usuario = require('../models/usuarios')



const getUsuarios= async (req, res = response)=>{

 const desde = Number(req.query.desde) || 0;

 const user = await Usuario
 .find({_id: {$ne: req.uid}})
 .sort('-online')
 .skip(desde)
 .limit(20)

  res.json({
    ok: true,
    usuarios: user,
  })

}

module.exports = {
  getUsuarios
}

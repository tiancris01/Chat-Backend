const Mensaje = require('../models/mensaje')

const getmsg = async(req, res = response) =>{

  const miId = req.uid;
  const msgFrom = req.params.from;

  const last30 = await Mensaje.find({
    $or: [{ from: miId, to: msgFrom }, {from: msgFrom, to: miId}]
  }).sort({
    createdAt: 'desc'
  }).limit(30);

  res.json({
    ok: true,
    msg: last30
  })

}

module.exports = {
  getmsg
}

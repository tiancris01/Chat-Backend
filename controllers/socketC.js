const usuarios = require("../models/usuarios")

const userConnected = async(uid ='') => {
  const user = await usuarios.findById(uid);
  user.online = true;

  await user.save();
  return user;
}

const userDisconnected = async(uid ='') => {
  const user = await usuarios.findById(uid);
  user.online = false;

  await user.save();
  return user;
}

module.exports={
  userConnected,
  userDisconnected
}



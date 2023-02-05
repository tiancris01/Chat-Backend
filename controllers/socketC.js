const usuarios = require("../models/usuarios")
const Mensaje = require("../models/mensaje")

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

const grabarMensaje = async( payload )=>{
  /*
    payload {
      from: "",
      to: "",
      texto: "",
    }

  */
  try{

    const mensaje = new Mensaje( payload )
    await mensaje.save();

  }catch(error){
    return false;
  }
}

module.exports={
  userConnected,
  userDisconnected,
  grabarMensaje
}



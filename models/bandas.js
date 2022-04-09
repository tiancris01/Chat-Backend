const Band = require("./band")

class Bandas {

    constructor(){
        this.Bandas = [];
    }

    agregarBanda (band = new Band()){
        this.Bandas.push(band);
    }

    obtenerBanda(){
        return this.Bandas;

    }

    eliminarBanda (id = ''){
        this.Bandas = this.Bandas.filter(band => band.id !== id);
        return this.Bandas;
    }

    AgregarVotos(id = ''){
        console.log('Contando')
        this.Bandas = this.Bandas.map(band =>{
            if (band.id == id){
            band.votes++;
            return band;
            }else{
                return band
            }
        })
    }

}

module.exports = Bandas;
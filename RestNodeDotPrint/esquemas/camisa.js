var mongoose=require("mongoose");
var Schema = mongoose.Schema;

var camisa= new Schema({

    idCamisa: { type: String },
    genero: { type: String },
    cantidad: { type: String },
    color: { type: String },
    talla: { type: String },
    imagen: {type: String}
},{ collection : 'camisa' });

module.exports=mongoose.model("camisa",camisa);
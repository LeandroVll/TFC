  
var mongoose=require("mongoose");
var Schema = mongoose.Schema;

var diseno= new Schema({

    idDiseno: { type: String },
    categoriaDiseno: { type: String },
    precio: { type: String },
    descripcion: { type: String },
    imagen: { type: String }

},{ collection : 'diseno' });

module.exports=mongoose.model("diseno",diseno);


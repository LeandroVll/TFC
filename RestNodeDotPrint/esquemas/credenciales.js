var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var esquemaCliente = mongoose.model('esquemaCliente');

var credenciales = new Schema({
    email: {type: String, required: true},
    password:{type: String, required: true},
    cliente: {type: Schema.Types.ObjectId, ref: "cliente" } 
 
});


module.exports=mongoose.model("credenciales", credenciales, "credenciales");
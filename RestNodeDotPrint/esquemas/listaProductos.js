var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listaProductos = new Schema({
    
    credenciales: {  type: Schema.Types.ObjectId, ref:"credenciales" },
    productos: [[{ type: Schema.ObjectId, ref: "producto" } ]| {  type: Schema.Types.ObjectId, ref:"diseno" }],
    Pedido : {type: Schema.Types.ObjectId, ref: "pedido" } ,

},{ collection : 'listaProductos' });


module.exports=mongoose.model("listaProductos", listaProductos, "listaProductos");
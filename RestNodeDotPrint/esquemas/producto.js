  
var mongoose=require("mongoose");
var Schema = mongoose.Schema;

var Producto= new Schema({

    idproducto: { type: String },
    categoriaProducto: { type: String },
    nombreProducto: { type: String },
    precio: { type: String },
    descripcion: { type: String },
    imagen: { type: String },
    diseno: { type: Schema.Types.ObjectId, ref:"diseno"},        
    //camisa: { type: Schema.Types.ObjectId, ref:"camisa" }

});

module.exports=mongoose.model("Producto",Producto);
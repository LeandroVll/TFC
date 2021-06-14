var mongoose=require("mongoose");
var Schema = mongoose.Schema;
//var Direccion = require('./direccion.js');
var direccion = mongoose.model('direccion'); //<---
//var listaProductos = mongoose.model('listaProductos'); //<---


var pedido=new mongoose.Schema(
    {
        credenciales: {  type: Schema.Types.ObjectId, ref:"credenciales" },        
        fechaPedido: { type: Date },
        estadoPedido: { type: String},
        tipoGastosEnvio: { type: String },
        gastosEnvio: { type: Number },       
        subtotal: { type: Number },
        total: {type: Number},        
        listaProductos: { type: Schema.ObjectId, ref: "listaProductos" }, 
        direccion: {  type: Schema.Types.ObjectId, ref:"direccion" }
    },{ collection : 'pedido' }
);

module.exports=mongoose.model("pedido",pedido);
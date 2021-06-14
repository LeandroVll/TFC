var mongoose=require("mongoose");
var Schema = mongoose.Schema;
var credenciales = mongoose.model('credenciales');

var cliente=new Schema(
    {
        nombre: { type: String, required: true },
        primerApellido: { type: String, required: true },        
        segundoApellido: { type: String, required: true },
        fechaNacimiento: { type: Date},
        telefonoMovil: { type: String, default: " "},
        credenciales: {  type: Schema.Types.ObjectId, ref:"Credenciales" },       
        nif: { type: String, required: true, match: /^[0-9]{8}-[A-Za-z]$/, default: "00000000-A" },
        cuentaActiva: {type: Boolean, required: true},
        //pedido: {  type: Schema.Types.ObjectId, ref:"pedido" }, 
    },{ collection : 'cliente' }
)

module.exports=mongoose.model("cliente",cliente);
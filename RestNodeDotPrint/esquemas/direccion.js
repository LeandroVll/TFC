var mongoose=require("mongoose");
var Schema = mongoose.Schema;
var localidad = mongoose.model('localidad');
var provincia = mongoose.model('provincia');

var direccion=new Schema(
    {
        nif: { type: String, required: true, match: /^[0-9]{8}-[A-Za-z]$/, default: "00000000-A" },
        tipoVia: { type: String, required: true },
        nombreVia: { type: String , required: true},        
        numeroEdificio: { type: String , required: false },
        numeroPiso: { type: String , require: true},
        piso: { type: String, required: false },
        letraedificio: { type: String, required: true },
        puerta: { type: String, required: true  },       
        cp: {  type: String , required: true},
        provincia: { type: Schema.Types.ObjectId, ref:"provincia"},        
        localidad: { type: Schema.Types.ObjectId, ref:"localidad" }
    }
);

module.exports=mongoose.model("direccion",direccion, "direccion");


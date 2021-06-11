var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var localidad = new Schema({
    codpro: {type: String, default: ""},
    codmun:{type: String, default: ""},
    nombreMun:{type: String, required: true}
});


module.exports=mongoose.model("localidad", localidad, "localidad");
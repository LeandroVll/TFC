var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var provincia = new Schema({
    codProvincia: {type: String, default:" "},
    nombreProv:{type: String, required: true}
});


module.exports=mongoose.model("provincia", provincia, "provincia");
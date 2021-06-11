//fichero de configuracion del servidor web, enlace con servicio restfull
//------------------------SERVIDOR WEB EXPRESS----------------------
var express = require("express"); 
var servidor = express();   //<---servidor web
var configurador = require('./configServer/configurador');//<---modulo de configuracion importado
var hostname ="DotPrint.";  //<---localhost
var port = 3000;   
var mongoose = require('mongoose');  


configurador(servidor);  //<--- monulo de configuracion separado ...configServer/configurador.js       
servidor.listen(port,(err)=>{   

    if (!err) {
        console.log('...servidor escuchando en el puerto 3000....');
    } else {
        console.log('ERROR FATAL AL LANZAR EL SERVIDOR--->', err);
    }
});
//---------------- CONEXION AL SERVIDOR DE DATOS DE MONGODB -----------
mongoose.connect('mongodb://localhost:27017/dotPrintDB', {useNewUrlParser: true, useUnifiedTopology: true} ,(err)=>{

    if(err){
        console.log(`error al intentar conectarnos al servidor de MongoDB ${err}`)
        throw new Error(err);
    }else{
        console.log('...conectados al servidor de BD de MongoDB...')
    }
});
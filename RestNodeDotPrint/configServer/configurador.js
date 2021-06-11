const cookieParser= require('cookie-parser');
const express = require('express'); 
const enrutamiento = require('./configRouting/enrutamiento'); 
module.exports=function (servidorExpress) { //<---

    servidorExpress.use(cookieParser()); //<--- modulo para usar cookies   
    servidorExpress.use(express.json());//<--- modulo para acceder a datos en peticiones POST
    servidorExpress.use(express.urlencoded({extended: false})); //<---modulo para codificacion de datos UTF-8 
    servidorExpress.use(function(req,res,next){ //<---habilita cabeceras CORS
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Credentials",req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Origin, Authorization");
        next()
    });

 
    enrutamiento(servidorExpress); //<---modulo de configuracion de enrutamiento.js
}
const express=require('express'); //<---importa express
const router=express.Router();//    //<--- usa la funcion router de express
var mongoose= require("mongoose");
var disenoSchema=require("../../esquemas/diseno");
var localidad=require("../../esquemas/localidad");
var provincia=require("../../esquemas/provincia");
var direccion=require("../../esquemas/direccion");
var producto = require('../../esquemas/producto');
var camisa = require("../../esquemas/camisa");
var credenciales = require('../../esquemas/credenciales');
var cliente = require("../../esquemas/cliente");
var bcrypt=require('bcrypt');
const moment = require('moment');
var clienteMaiGun = require('../../esquemas/envioMail');
var codToken = require('../../servicioToken'); //<--funcion decodif de token 
const auth = require('../middleware/auth');
const { request } = require('express');
var pedido = require('../../esquemas/pedido');
var listaProductos = require("../../esquemas/listaProductos");

//=======================================================================================

/** 
 * recupera de la BD los productos disponibles 
*/
router.get('/productosDisponibes',(req, res, next)=>{
    (async function(){
        try {
            await camisa.find((err, resultado)=>{
                if (err) {
                    console.log('ERROR en el find--->',err)
                } else {
                    console.log('RESULTADO DE MONGO--->',resultado);
                    res.status(200).send(resultado);
                    next();
                }
            })
        } catch (e) {
            console.log('ERROR DE MONGO--->',e)
        }
    })();
    //console.log('PRODUCTOS DE LA BD--->',req.body)
});

//=======================================================================================
router.get('/disenosDisponibles',(req,res,next)=>{


    (async function(){
        try {
            await disenoSchema.find((err, result)=>{
                if (err) {
                    console.log("fallo con mongo");
                }
                else{
                    console.log("ok la extraccion",result);
                             
                    res.status(200).send(result);
                    next();
                }
            })

        } catch (e) {
            console.log('ERROR ASYNC-->', e)
        }
    })()

    
    
});
//=======================================================================================
router.post("/insertaDireccion",(req,res,next)=>{

console.log("datos=====>", req.body);

//----> se guradan los objetos provincia y localidad primero. primero se reciben del req
var _provincia = {};
var _localidad = {};

 _localidad=new localidad({
    _id: new mongoose.Types.ObjectId(),  
   codmun: req.body.municipio.codMunicipio,
   nombreMun: req.body.municipio.nomMunicipio
});    
_provincia = new provincia({       
    _id: new mongoose.Types.ObjectId(),   
    codpro: req.body.provincia.codProvincia,
    nombreProv: req.body.provincia.nomProvincia
});
//-----> depues se guradan los demas datos de la direccion
var _direccion = new direccion({
    _id: new mongoose.Types.ObjectId(),
    nif: req.body.nifCliente,
    tipoVia: req.body.tipoVia,
    nombreVia: req.body.nombreVia,
    numeroEdificio: req.body.numeroEdificio,
    numeroPiso: req.body.numeroPiso,
    piso: req.body.piso,
    letraedificio: req.body.letraedificio,
    puerta: req.body.puerta,
    cp: req.body.cp,
    provincia: _provincia,
    localidad: _localidad

});
console.log("_direccion*===>",_direccion);
async function guarda_Pro_loc() {
    const resultProvincia = await  _provincia.save();
    const resultLocalidad = await _localidad.save();
    console.log('INSERCION--->',resultLocalidad)
}

(async function(){
    try {
         const result= await guarda_Pro_loc();
         const dir = await _direccion.save();
         console.log('GURDADA LA DIRECCION-->', dir)
    } catch (e) {
        console.log('ERROR EN LA DIRECCION-->', e)
        res.status(400).send({message: "no se agrego una direccion"})
        next();
    }
})()

res.status(200).send({message: "se agrego una direccion"})
        next();


});

////==================================busca un obj diseño en la bbdd//=========================
router.post('/unDiseno',(req, res, next)=>{

    console.log('PRODUCTO-DISEÑO ENVIADO-->',req.body.diseno);

    (async function(){
               
        disenoSchema.findOne({idDiseno: req.body.diseno.idDiseno})
                    .populate("producto")
                    .exec((err, respuesta)=>{
                                             if (err) {
                                                console.log('error sacando diseño--->',err);    
                                             } else {
                                                console.log('diseño encontrado--->',respuesta); 
                                                //<---se crea un obdiseño, se rellenan los campos con la respuesta
                                                // de mongo y se crea otro obj producto en el que se mete diseno
                                                var disenoDevuelto= new disenoSchema({
                                                    idDiseno: respuesta.idDiseno,
                                                    categoriaDiseno: respuesta.categoriaDiseno,
                                                    precio: respuesta.precio,
                                                    descripcion: respuesta.descripcion,
                                                    imagen: respuesta.imagen
                                                })
                                                var productoAUX = new producto();
                                                productoAUX.diseno=disenoDevuelto;
                                               // console.log("###################-->", productoAUX);
                                                res.status(200)
                                                .send(productoAUX)//<---se devuelve el obj producto que contiene diseno
                                             }
                                         });
    })();
    //console.log('PRODUCTO-DISEÑO ENVIADO-->',saveDiseno);
    
});

//=======================================================================================
router.post("/unaCamisa",(req, res,next)=>{
    console.log("obj del front----->", req.body);
    camisa.findOne({_id: req.body.id})
    .populate("producto")
    .exec((err, respuesta)=>{
        if (err) {
            console.log('error sacando camisa--->',err); 
        } else {
            var _camisa= new camisa({
                idCamisa : respuesta.idCamisa,
                genero: respuesta.genero,
                cantidad: respuesta.cantidad,
                color: respuesta.color,
                talla: respuesta.talla,
                imagen: respuesta.imagen

            });
            console.log("OBJ==========>",_camisa)
            res.status(200)
            .send(_camisa)
            
        }
    })
})


//=====================================REGISTO CLIENTE============================================
router.post("/clienteNuevo",(req, res ,next)=>{
        console.log("OBJ==========>",req.body)

        var credencialesNew= new credenciales({
            email: req.body.credenciales.email,
            password: req.body.credenciales.password
        });

        var clienteNuevo= new cliente({
            nombre: req.body.nombre,
            primerApellido: req.body.primerApellido ,
            segundoApellido: req.body.segundoApellido,
            credenciales: credencialesNew,
            cuentaActiva: false

        })

        var _htmlPart = "<h2>Bienvenido "+ clienteNuevo.nombre +"</h2> </br>" + 
                                                                        "<p> Es necesario que actives tu cuenta mediante el siguiente enlace: </p><br>"+
                                                                        "<h2><a href=\"http://localhost:3000/api/panelUsuario?mail=" + credencialesNew.email + "\">ACTIVAR MI CUENTA<a/></h2>"+
                                                                        "<br><p>Si no funciona el enlace inetntelo mas tarde.<br>"+
                                                                        " Gracias de parte de Hipercor.SA</p> ";
        
           async function buscaCredenciales(){
           credenciales.findOne({email: req.body.credenciales.email})
            .populate("cliente")
            .exec((err, respuesta)=>{
                if (!err) {
                    if (respuesta!==null) {//<---si no es null encontró unas credenciales ya existentes
                        console.log("respeusta si existe==========>",respuesta)
                        
                    } else {//<---si no encuentra credenciales se guarda el obj credenciales
                        //console.log("respeusta2==========>",respuesta) 
                        bcrypt.hash( req.body.credenciales.password,10,(err, hash)=>{
                            if (!err) {//<---se hasshean ls credenciales y si va bien se gurada
                                credencialesNew.password=hash;
                                var _credenciales= credencialesNew.save()
                                var registro = clienteNuevo.save() //<---gurda el cliente
                                var _mail= mail()
                                return registro;
                               

                            } else {
                                console.log("eror en el if(err) del hassheo--->", err)
                            }
                         })
                       
                    }
                    
                } else {
                    
                    console.log("err==========>",err)
                }
            })
            
        }

        async function mail(){
            clienteMaiGun.enviarMail(   credencialesNew.email, 
                "confirmacion de registro cuenta Hipercor.com", //<--campo titulo del mail String
                " ",    //<-- asunto del email
                _htmlPart ); //<--- parte html con mensaje 
        }

    //----------------------------------------------------------------------------------------
    (async function(){//<---funcion principal 
        var verificacion= await buscaCredenciales()
        //var _mail = await mail()//<---envia email de confirmacion para activar la cuenta
        res.status(200)
            .send({
                    token: codToken.createToken(clienteNuevo),
                    fechaExpiracion:  moment().add(1, "hour").format()
                })
        next();
        })();

})


//=======================================================================================
router.post("/logarCliente", (req, res, next)=>{

    console.log("datos----->", req.body)

    async function buscar(){
        credenciales.findOne({email: req.body.credenciales.email})
        .populate("cliente")
        .exec((err, respuesta)=>{
            if (!err) {
                if (bcrypt.compareSync(req.body.credenciales.password, respuesta.password)) {
                    console.log("password correcta-->", respuesta.password)
                    var _credencialesID= respuesta._id;
                    cliente.findOne({credenciales: _credencialesID}, (err, _cliente)=>{//<--se busca el cliente
                        if (!err) {                                                  //se devuelve el token
                            console.log("cliente--->", _cliente);
                            res.status(200)
                            .send({
                                    token: codToken.createToken(_cliente),
                                    fechaExpiracion:  moment().add(1, "hour").format()
                                })
                        } else {
                            console.log("error cliente--->", err); 
                        }
                    })

                } else {
                    console.log("password incorrecta-->", req.body.credenciales.password)
                   
                }
            } else {
                console.log("ERROR--->", err)
            }
        })
    }



    (async function(){
        await buscar()
    })()

});

//=================================decode token========================================

router.post('/decodificarToken',(req, res, next)=>{
  
    var _token = req.body;
    console.log("token====>",_token )
    codToken.decodeToken(_token.token).then( (result)=>{
        console.log(result )
        res.status(200).send(result);
        next();
    })

   });


//=================================gurdadr pedido=========================================

router.post("/guardaPedido",(req, res, next)=>{
    console.log("datos====>", req.body)

    var tupla;
    for (let index = 0; index < req.body._listaProductos.length; index++) {
         const element = req.body._listaProductos[index];
         tupla=element;
         //console.log("##########--->", element);
        for (let index = 0; index < element[0].length; index++) {
            const aux = element[0];
            
        }
       
    }
    console.log("##########--->", tupla);

   //----
   _ListaProductos = new listaProductos({       
    _id: new mongoose.Types.ObjectId(),          
    credenciales: req.body._cliente.credenciales,      
    productos: tupla,
    Pedido:  req.body._pedido.idPedido
    });     

    //---inserta en el obj Pedido los valores del req 
    _pedidoInsertar = new pedido({
        _id: new mongoose.Types.ObjectId(),
        credenciales: req.body._cliente.credenciales,
        fechaPedido: req.body._pedido.fechaPedido,
        estadoPedido: "en ruta",
        tipoGastosEnvio: req.body._pedido.tipoGastosEnvio,
        gastosEnvio: req.body._pedido.gastosEnvio,
        subtotal: req.body._pedido.subtotal,
        total: req.body._pedido.total,
        listaProductos: _ListaProductos,//<--pasa la lista de productos al obj pedido 
        
    });     
    
    //-----variable html del mail
    var _htmlPart = "<p>Hola, estimado cliente. Se ha hecho una compra a nombre del NIF "+ req.body._cliente.nif +"</p> </br>" + 
    "<p> Se ha hecho una compra por el valor de:"+  req.body._pedido.subtotal +"€"  +" <br>"+
     "el dia: "+ req.body._pedido.fechaPedido +"</p>"+
    "<br><p>Su pedido llegará en unos 3 dias<br>"+
    "<strong>"+"Precio total (incluye gastos de envio): "+ req.body._pedido.total + "€" +"</strong>"
    " Gracias de parte de DotPrint.SA</p> ";

    async function buscaDireccion() 
    {        
        const direccionCliente= await direccion.findOne({ nif: req.body._cliente.nif});    
        return direccionCliente;
    }
    async function _guradaListaProdu(){
        const aux = await _ListaProductos.save()
        return aux;
    }

    async function mailFactura(){

        //primero busco las credenciales y despues mando email
        const _credenciales = await credenciales.findOne({_id: req.body._cliente.credenciales})
        console.log(_credenciales)
        const factura= clienteMaiGun.enviarMail(   _credenciales.email, 
            "Datos de copara DotPrint.com", //<--campo titulo del mail String
            "Recibo",    //<-- asunto del email
            _htmlPart ); //<--- parte html con mensaje 
            return factura;
    }

    (async function(){
        try {
            const dir= await buscaDireccion();//<-- obj direccion obtenido 

            _pedidoInsertar.direccion = dir;//<----se le agrega la direccion al obj Pedido

            const listaProductos = await _guradaListaProdu();
           console.log("listaProductos===============0>", listaProductos)
            const pedidoInsert =  await _pedidoInsertar.save();//<--guarda el obj pedido
            //console.log('pedido ASYNC-->', pedidoInsert)

            const _emailFactura= await mailFactura();//<---se envia factura por email

        } catch (e) {
            console.log('ERROR ASYNC-->', e)
        }
    })()

    res.status(200).send({message: "se evio factura por email"})

});


//=================================resupera historial de pedidos=========================================

router.post("/recuperaPedidos",(req, res , next)=>{
    console.log("ok----->", req.body)

    async function buscar(){
        const aux = await pedido.find({credenciales: req.body.credenciales})
        return aux;            
    }

    (async function(){
        var lista = await buscar()
        console.log("lista--->", lista)
        res.status(200).send(lista)//<---devuvle el array listaPedidos
    })()
});

//===============resupera lista de Productos de los pedidos=========================================

router.post("/recuperaListProdu",(req, res , next)=>{
    console.log("ok----->", req.body)

    async function buscar(){
        const aux = await listaProductos.find({credenciales: req.body.credenciales})
        return aux;            
    }

    (async function(){
        var lista = await buscar()
        console.log("lista--->", lista)
        res.status(200).send(lista)//<---devuvle el array listaPedidos
    })()
});


//===============recupera lista de direcciones decodificando el token==================================

router.post('/recuperaDirecciones',(req, res, next)=>{

    console.log('enviado por el cliente-->', req.body.nif)

    async function _direccion()
    {
        const dir = await direccion.find({nif: req.body.nif})
        return dir
    }

    
    (async function(){
        try {
            const _dir = await _direccion();
            console.log('direccions ----->', _dir)
            res.status(200).send(_dir);
            next();
        } catch (e) {
            console.log('ERROR RECUPERANDO DIRECCIONES -->', e)
            res.status(400).send('error en la direccion introducida');
            next();
        }
    })()

    


})






//---------------------------------------------------------------------------------------------
module.exports= function(servidorExpress){ //<----se exporta el modulo con el nombre servidorExpress

    servidorExpress.use("/api", router) //<---
}
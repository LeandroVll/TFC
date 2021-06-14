import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/modelos/pedido';
import { LocalstorageService } from 'src/app/servicios/localStorageService';
import { RestfullnodeService } from 'src/app/servicios/restfullNode.service';

@Component({
  selector: 'app-panel-usuario',
  templateUrl: '../../vistas/vistasZonaCliente/panel-usuario.component.html',
  styleUrls: ['../../vistas/css/panel-usuario.component.css']
})
export class PanelUsuarioComponent implements OnInit {

  public pedido: Pedido;
  public outlistaproductos=[];
  public outlistaDisenos=[];
  public _pedido:Pedido=new Pedido(); //<--se inicializa   
  public outPutPedido: Pedido[];


  constructor(private _storage: LocalstorageService, private _peticionesRest: RestfullnodeService, 
              private _router:Router) { }

  ngOnInit() {
    this.recuperaPedido()
  }

  //------------------------------se recupera del ls y se muetra en la vista-----------------------
  recuperaPedido(){
  
    this.pedido=this._storage.get("pedido");//<---se agregan al pedido default los datos nuevos
    this.pedido.tipodeEnvio="estandar"; //<--de moemnto todos estandar
    //console.log("RECUPERA PEDIDO()--->", this.pedido.listaProductos.length);
    var auxlista=[];
    var auxdisenos=[];
    var subtotal=0;
    for (let index = 0; index < this.pedido.listaProductos.length; index++) {
      
        const arrInterno = this.pedido.listaProductos[index];
          //console.log("[obj]--->",arrInterno[0]);//<---muestra los [obj] dentro del array
          //console.log("color--->",arrInterno[1]);//<---muestra los colores dentro del array
          auxlista.push(arrInterno[0]);
          auxdisenos.push(arrInterno[1]);
          //console.log("*******>", arrInterno[0]);
          for (let index = 0; index < arrInterno[0].length; index++) {
            const element = arrInterno[0][index];
            subtotal=subtotal+(element.camisa.cantidad*element.precio);
          // console.log("*******>", element);   
          }
        
    }

    //----->gurada por separado los arrays con los array de productos y de diseños 
      //------para poder ser mostrados en la vista
      this.outlistaproductos=auxlista;
      this.outlistaDisenos=auxdisenos;

    //-------------------------------------------------------------------------

      this._pedido = this.pedido;
      this.outPutPedido=[];//<---se inicializa sino da null
      this.pedido.subtotal=subtotal;
      var auxtotal =(this.pedido.subtotal)+(this.pedido.gastosEnvio);
      var total = (auxtotal * 100) / 100;
      this.pedido.total=total;
      this.outPutPedido.push(this._pedido);
      console.log("listapedido--->", this.outPutPedido);
    
  }
   //------------------------------decodifica token y gurda pedido-----------------------
  guradaPedido(){
    var _token=this._storage.get("token");
    var _pedido = this._storage.get("pedido");
   // _pedido.idPedido= (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    var _listaProductos = _pedido.listaProductos;
    var _datos={};
    //console.log("token====>",_token)
    this._peticionesRest.decodToken(_token).subscribe((_cliente)=>{//<----devuelve el token decodificado es decir 
      console.log("token====>",_cliente)
      if (_cliente) {                                               //    los datos del cliente
         // console.log("token====>",result)
          _datos={_cliente, _pedido, _listaProductos } //<---obj json q recive el node 
             this._peticionesRest.guradaPedido(_datos).subscribe((result)=>{
                  console.log("pedido======>",result)
                  //se eliminaria el pedido del ls
                  this._storage.remove("carrito")
                  this._storage.remove("pedido")
                  if (result) {
                    
                   // this._storage.clear();
                  } else {
                    
                  }
                  alert("compra realizada, Gracias!");
              })
          
      } else {
        console.log("---->error decodificando token")
      }
    })


  }







}

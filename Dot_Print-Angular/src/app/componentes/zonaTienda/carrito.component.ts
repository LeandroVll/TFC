import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camisa } from 'src/app/modelos/camisa';
import { Pedido } from 'src/app/modelos/pedido';
import { Producto } from 'src/app/modelos/producto';
import { LocalstorageService } from 'src/app/servicios/localStorageService';
import { RestfullnodeService } from 'src/app/servicios/restfullNode.service';

@Component({
  selector: 'app-carrito',
  templateUrl: '../../vistas/vistasZonaTienda/carrito.component.html',
  styleUrls: ['../../vistas/css/carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public pedido: Pedido;
  public outPutPedido: Pedido[];
  public outlistaproductos=[];
  public outlistaDisenos=[];
  public _pedido:Pedido=new Pedido(); //<--se inicializa   
  public formCamisa: FormGroup;
  public _camisa: Camisa;
  public _producto = new Producto();
//----------------------------------------------------------------------------------------------

  constructor(private _storage: LocalstorageService, private _peticionesRest: RestfullnodeService) {
          //------validator del input que modifica la cantidad del producto
          this.formCamisa = new FormGroup({
            cantModi: new FormControl("",[ Validators.required,Validators.pattern("^[1-9]{1,2}$"), 
                                          Validators.minLength(1), Validators.maxLength(2)])
          })
   }

//----------------------------------------------------------------------------------------------

  ngOnInit() {

    this.recuperaPedido();
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

        //this._pedido = this.pedido;
        this.outPutPedido=[];//<---se inicializa sino da null
        this.pedido.subtotal=subtotal;
        var auxtotal =(this.pedido.subtotal)+(this.pedido.gastosEnvio);
        var total = (auxtotal * 100) / 100;
        this.pedido.total=total;
        this.outPutPedido.push(this.pedido);
        this._storage.set("pedido",this.pedido)
        console.log("listapedido--->", this.outPutPedido);
  
}


//----------------------------------------------------------------------------------------------
ModificaPedido(camisa){
  console.log("camisa modificada---->",camisa.cantidad);
  this._camisa=camisa;//<---se pasa el obj camisa recibidoo a un obj que ira dentro de producto
  this._camisa.cantidad= this.formCamisa.controls["cantModi"].value;//<----aqui se modifica el valor cantidad
  this._producto.camisa=this._camisa;//<---pasa camisa dentro de un obj producto
  var carr=[];
  carr= this._storage.get("carrito");//<----recupera el carrito del ls para ser modificado
  var _pedido_ =this._storage.get("pedido");//<---se moficicará para actualizar pedido
  var element;
  for (let index = 0; index < carr.length; index++) {
         element = carr[index];
       // console.log("element---->",element.camisa.cantidad, "  **----->",this._producto.camisa.cantidad);
        if (element.camisa._id==camisa._id) {//<--si coinciden las id de la camisa que se le pasa de la vista
          carr[index].camisa.cantidad=this._producto.camisa.cantidad;    //con alguna de del carrito modifica la cantidad
          var auxcarr=[];
          auxcarr = _pedido_.listaProductos;//<----          
          var y= [];
          y=auxcarr[0]
          y[0]=carr;
          this._storage.set("carrito", y[0]);//<----gurada un array de json mdificado en carrito
          console.log("_pedido_==============>", _pedido_);
          this._storage.set("pedido", _pedido_);//<---se vueve a guradar actualizado el pedido en el ls
          this.recuperaPedido();
        }else {
          console.log("algo salio mal en el if---->",carr);
        }    
  }


}






}


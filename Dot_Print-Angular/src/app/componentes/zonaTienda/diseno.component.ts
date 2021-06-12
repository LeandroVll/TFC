import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Diseno } from 'src/app/modelos/diseno';
import { LocalstorageService } from 'src/app/servicios/localStorageService';
import { Pedido } from 'src/app/modelos/pedido';
import { Producto } from 'src/app/modelos/producto';
import { RestfullnodeService } from 'src/app/servicios/restfullNode.service';

@Component({
  selector: 'app-diseno',
  templateUrl: '../../vistas/vistasZonaTienda/diseno.component.html',
  styleUrls: ['../../vistas/css/diseno.component.css']
})
export class DisenoComponent implements OnInit {

  public _diseno: Diseno;
  public formDiseno: FormGroup;
  public pedido= new Pedido();
  public _producto: Producto= new Producto();
  public carrito: Producto[];
  public outputDisenos: Diseno[];
  public outlistaproductos=[];
  public outlistaDisenos=[];
  public outPutPedido=[];

  constructor(private _storage: LocalstorageService, private _peticionesRest: RestfullnodeService) { 
         //------validator de la talla
         this.formDiseno = new FormGroup({
          formColor: new FormControl("",[Validators.required])
        })
  }


  ngOnInit() {
    this.recuperaDisenosBBDD();
    this.recuperaCarrito();
  }

  //-------------------------------------------------------------------------------------------------
  reciveDiseno(diseno){//<----se recibe el diseño elegido y se agrega al array listaproductos=[producto[],diseño]
    console.log("idDiseno---> ",diseno)
    this.pedido=this._storage.get("pedido");//<---se recupera pedido del ls
    this.carrito=this._storage.get("carrito");
    //------se dan los valores al obj diseño
    this._producto.diseno=  new Diseno();
    this._producto.diseno.color = this.formDiseno.controls["formColor"].value;
    this._producto.diseno.idDiseno=diseno;
    
    
  }

  //-------------------------------------------------------------------------------------------------
  recuperaDisenosBBDD(){//recupera los diseños de la bbdd para imprimirlos en la vista
    this._peticionesRest.recuperarDisenos().subscribe((result)=>{
      //console.log("respuesta mongo--->", result)
      if (result) {
        var listadisenos=[];
        listadisenos.push(result)
        this.outputDisenos=listadisenos;
       // console.log("respuesta mongo--->", this.outputDisenos)
      } else {
        console.log("errorrrr")
      }
      
    })
  }
  //-------------------------------------------------------------------------------------------------
  recuperaDiseno(diseno){
    this.pedido=this._storage.get("pedido");//<---se recupera pedido del ls
    this.carrito=this._storage.get("carrito");
    //------se dan los valores al obj diseño
    this._producto.diseno=  new Diseno();
    this._producto.diseno.color = this.formDiseno.controls["formColor"].value;
    this._producto.diseno.idDiseno=diseno;

    //console.log("respuesta de mongo-->", this._producto);
    this._peticionesRest.recuperarDiseno(this._producto).subscribe((result)=>{
      if (result) {
        console.log("respuesta de mongo*-->", result);
        var produ = result;
        //console.log("respuesta de mongo******>", produ.respuesta.descripcion);
        this._producto.diseno.categoriaDiseno= result.diseno.categoriaDiseno;
        this._producto.diseno.descripcion=result.diseno.descripcion;
        this._producto.diseno.imagen=result.diseno.imagen;
        this._producto.diseno.precio=result.diseno.precio;
        this.pedido.listaProductos.push([this.carrito, this._producto.diseno]);
        this._storage.set("pedido",this.pedido);//<---se vuevel a guradar el pedido actualizado en ls
      } else {
        console.log("error de mongo-->", );
      }
    })

    
    //this.pedido.nifcliente="00000000A";
   
    console.log("_pedido------>",  this.pedido);
  }

  //-------------------se recupera el carrito para mstarlo en la vista-----------------------------------

  recuperaCarrito(){

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
          this.outPutPedido=[];
          this.outPutPedido.push(this.pedido);
          console.log("pedido*******>", this.pedido);   
          console.log("*******>", this.pedido);
  }










}

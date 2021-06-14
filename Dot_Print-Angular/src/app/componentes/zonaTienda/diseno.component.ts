import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Diseno } from 'src/app/modelos/diseno';
import { LocalstorageService } from 'src/app/servicios/localStorageService';
import { Pedido } from 'src/app/modelos/pedido';
import { Producto } from 'src/app/modelos/producto';
import { RestfullnodeService } from 'src/app/servicios/restfullNode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diseno',
  templateUrl: '../../vistas/vistasZonaTienda/diseno.component.html',
  styleUrls: ['../../vistas/css/diseno.component.css']
})
export class DisenoComponent implements OnInit {

  public _diseno: Diseno;
  public formDiseno: FormGroup;
  public formImg: FormGroup;
  public pedido= new Pedido();
  public _producto= new Producto();
  public carrito: Producto[];
  public outputDisenos: Diseno[];
  public outlistaproductos=[];
  public outlistaDisenos=[];
  public outPutPedido=[];
  public auxDiseno=[];

  constructor(private _storage: LocalstorageService, private _peticionesRest: RestfullnodeService,private _router:Router) { 
         //------validator de la talla
         this.formDiseno = new FormGroup({
          formColor: new FormControl("",[Validators.required])
        })

        this.formImg = new FormGroup({
          formSpan: new FormControl("",[Validators.maxLength(20)])
        })
  }


  ngOnInit() {
    this.recuperaDisenosBBDD();
    this.recuperaCarrito();
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
  recuperaDiseno(_dis){
    console.log("@@@@@@@====>",_dis)
    this.pedido=this._storage.get("pedido");//<---se recupera pedido del ls
    this.carrito=this._storage.get("carrito");
    //------se dan los valores al obj diseño
    this._producto.diseno=  new Diseno();
    this._producto.diseno.color = this.formDiseno.controls["formColor"].value;
    this._producto.diseno=_dis;
    var n = (Math.floor(Math.random()*1000));
    var foo = ""+n;
    this._producto._id=foo;//<---id del producto
    this._producto.categoriaProducto="diseños";
    this._producto.nombreProducto="diseño1"; 
    this._producto.precio=2; 
    this._producto.descripcion="diseño festivo";

    console.log("this._producto-->", this._producto);
    
    


    this.auxDiseno.push(this._producto)
    
    console.log("this.auxDiseno-->", this.auxDiseno)
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
          var xas: Diseno[];
          this.carrito=this._storage.get("carrito");
          this.pedido.listaProductos.push([this.carrito,xas]);
          this.outPutPedido.push(this.pedido);
          //console.log("pedido*******>", this.pedido);   
          //console.log("*******>", this.pedido);
  }


  guradaPedido(){
    var aux=this.auxDiseno;
    this.pedido.listaProductos.push([this.carrito, aux]);
    this._storage.set("pedido",this.pedido);//<---se vuevel a guradar el pedido actualizado en ls
    console.log("_pedido------>",  this.pedido);
    this._router.navigate(["/tienda/carrito"]);
  }







}

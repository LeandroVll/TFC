import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camisa } from 'src/app/modelos/camisa';
import { Pedido } from 'src/app/modelos/pedido';
import { Producto } from 'src/app/modelos/producto';
import { LocalstorageService } from 'src/app/servicios/localStorageService';
import { RestfullnodeService } from 'src/app/servicios/restfullNode.service';


@Component({
  selector: 'app-fiesta',
  templateUrl: '../../vistas/vistasZonaTienda/fiesta.component.html',
  styleUrls: ['../../vistas/css/fiesta.component.css']
})

export class FiestaComponent implements OnInit {

  //------
  public formCamisa: FormGroup;
  public carrito: Producto[];//<---carrito es un array de productos
  public Tallas=["tallaS","tallaM","tallaL","tallaXL"];
  public _talla: string;
  public _cantidad: string;
  public _pedido: Pedido;

  //------
  constructor(private _storage: LocalstorageService, private _peticionesRest: RestfullnodeService) { 

    
     //------validator de la talla
    this.formCamisa = new FormGroup({
      tallaCantidad: new FormControl("",[Validators.required,Validators.pattern("^[0-9]{1,2}$")]),
      formColor: new FormControl("",[Validators.required]),
      formTipoTalla: new FormControl("",[Validators.required])
    })

  }

  public indices=[];//<----var q muestra los productos aleatorimente
  public imgSelect=[];
  public _camisa = new Camisa();
  
  ngOnInit() {
   
    this.carrito=[];//<--se inicializa el carrito 
    this.recuperaProductos();
    
  }

  //------------------------------------recibe obj camisa-------------------------------------------

  reciveTalla(item){
    //console.log("valor del id--->", item);
   // var myInput = ((<HTMLInputElement>document.getElementById(item)));
  
    //console.log("valor del id--->", item.id)
   if (item.id && item.value) {
      this._cantidad=item.value;
      this._talla=item.id;
     // console.log("My input has a value!", this._talla, "-----", this._cantidad);

      
    }
    this.reciveObjetoCamisa();
  }

  reciveObjetoCamisa(){
  //  console.log(item)
    let _produ = new Producto();//<--hay q inicializar el obj producto y guradar los valores iniciales del producto
    _produ.categoriaProducto="fiestas";
    _produ.nombreProducto="camisa"; 
    _produ.precio=5; 
    _produ.descripcion="camisa de algodon";
    
    _produ.camisa= new Camisa();//<---inicializa el obj camisa dentro de producto
    _produ.camisa=this._camisa;
    _produ.camisa.cantidad = this.formCamisa.controls["tallaCantidad"].value;
    _produ.camisa.color = this.formCamisa.controls["formColor"].value;
    _produ.camisa.genero = this.formCamisa.controls["formTipoTalla"].value;
    //_produ.camisa.imagen= this.
    console.log("OBJ _CAMISA----->", _produ);
    //--------------------------------------

    _produ.camisa.talla=this._talla;
    _produ.camisa.cantidad=Number(this._cantidad);

    //--------------------------------------
    if (this.formCamisa) {
      
      this.carrito=this._storage.get("carrito");//<---se recupera carrito del ls
      this.carrito.push(_produ);//<---se mete en el array el producto
      this._storage.set("carrito",this.carrito);//<---guarda el carrito en ls cada vez que se añade un producto
      console.log("carrito===>",this.carrito);
    
    } else {
      console.log("ERROR EN EL OBJETO CAMISA ===>", this.formCamisa)
    }
  }

  //-------------------------------recupera productos camisas---------------------------
  recuperaProductos(){ 
   this._peticionesRest.recuperarProductos().subscribe((result)=>{

          if (result) {
            //console.log("respuetsa_recuperarProductos===>",result);
            
            var aux;
            for (let index = 0; index < 6; index++) {//<---le da como longitud maxima 6 para escoja 
              const element = Math.floor(Math.random()*result.length);//<---numero aleatorio del indice
              
              //console.log("RANDOM---->", element)
              aux=result[element];
              this.indices.push(aux);
            }
          } else {
            console.log("respuetsa_err===>")
          }
   })
    
  }


  //------------------------recupera una camisa seleccionada y la muesta ----------------
camisaseleccionada(idCamisa){
 // console.log("_id---->",idCamisa)
  
  this._camisa.id=idCamisa;
  this._peticionesRest.recuperaUnaCamisa(this._camisa).subscribe((result)=>{
    if (result) {
      if (this.imgSelect.length>0) {//<---si el array tiene alguna imagen la elimina y se sobreescribe
        this._camisa=result;
        //console.log("resultado _camisa--->",this._camisa)
        this.imgSelect=[];
        this.imgSelect.push(this._camisa);

      } else {
        this.imgSelect.push(this._camisa);
      }
      
     // console.log("resultado _camisa--->",this._camisa)
    } else {
      console.log("error camisa BBD--->",result)
    }
  })



}

}

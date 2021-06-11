import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/modelos/pedido';
import { Producto } from 'src/app/modelos/producto';
import { LocalstorageService } from 'src/app/servicios/localStorageService';

@Component({
  selector: 'app-portada',
  templateUrl: '../../vistas/vistasZonaTienda/portada.component.html',
  styleUrls: ['../../vistas/css/portada.component.css']
})
export class PortadaComponent implements OnInit {

  public carrito:Producto[];
  public pedido:Pedido= new Pedido(); 
  constructor(private _storage: LocalstorageService) { }

  ngOnInit() {
    this.inicializaCarrito();
    this.creaPedido();
  }
  inicializaCarrito(){//<----inicializa el [] carrito en el local storage
  
    this.carrito=[];
    this._storage.set("carrito", this.carrito);
    console.log(this.carrito);
 }

 creaPedido(){//<----crea el objeto pedido y lo guradad en ls para ser recuperado y modificado
   this.pedido.fechaPedido= new Date(Date.now());
   this.pedido.estatus="preparando pedido";
   this.pedido.gastosEnvio=5;
   this.pedido.listaProductos=[];
   this._storage.set("pedido",this.pedido);

 }

}

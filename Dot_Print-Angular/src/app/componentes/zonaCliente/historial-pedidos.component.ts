import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/modelos/pedido';
import { Producto } from 'src/app/modelos/producto';
import { LocalstorageService } from 'src/app/servicios/localStorageService';
import { RestfullnodeService } from 'src/app/servicios/restfullNode.service';

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: '../../vistas/vistasZonaCliente/historial-pedidos.component.html',
  styleUrls: ['../../vistas/css/historial-pedidos.component.css']
})
export class HistorialPedidosComponent implements OnInit {

  public outputLista = [];
  public outproductos = [];

  constructor(private _peticionesRest : RestfullnodeService, private _storage: LocalstorageService) { }

  ngOnInit() {

    this.recuperaPedidos();
  }


  recuperaPedidos(){

    var _token=this._storage.get("token");
    console.log("respeusta---->",_token)
    this._peticionesRest.decodToken(_token).subscribe((_cliente)=>{
      
        if (_cliente) {
            this._peticionesRest.recuperaPedidos(_cliente).subscribe((result)=>{
           
              console.log("respeusta---->",result)
              this.outputLista=result;
              this.listaProductos()
            })
        } else {
          console.log("error mg---->")
        }
    })
   
  }

//--------recibe [{pedido},...] se saca el id de listaProductos y se busca para mostrar
  listaProductos(){

    var _token=this._storage.get("token");
    this._peticionesRest.decodToken(_token).subscribe((_cliente)=>{
      
        if (_cliente) {
            this._peticionesRest.recuperaListProdu(_cliente).subscribe((result)=>{
              console.log("respeusta2---->",result)
              this.outproductos=result;
             
            })
        } else {
          console.log("error mg---->")
        }
    })

  }

}

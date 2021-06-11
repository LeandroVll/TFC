import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/modelos/direccion';
import { LocalstorageService } from 'src/app/servicios/localStorageService';
import { RestfullnodeService } from 'src/app/servicios/restfullNode.service';

@Component({
  selector: 'app-direcciones',
  templateUrl: '../../vistas/vistasZonaCliente/direcciones.component.html',
  styleUrls: ['../../vistas/css/direcciones.component.css']
})
export class DireccionesComponent implements OnInit {
  public listaDirecciones:Direccion[]; 

  constructor(private _peticionesRest: RestfullnodeService,  private _storage: LocalstorageService) { 

  }

  ngOnInit() {
    this.recuperaDiercciones()
  }


  recuperaDiercciones(){
    var _token=this._storage.get("token");
    this._peticionesRest.decodToken(_token).subscribe((_client)=>{
      if (_client) {  
        console.log("===>",_client)
         //-----decodifica el token que scontiene la info del cleinte y busca las direcciones
         this._peticionesRest.recuperaDirecciones(_client).subscribe((result)=>{
          if (result) {
            console.log("Resultado-->", result)
            var outPutLista=[] ; 
            outPutLista.push(result);
            this.listaDirecciones=outPutLista;
          } else {
            console.log("fallo-->")
          }
        })
      } else {
       console.log("HA OCURRIDO UN ERROR EN LA RESPUESTA DE NODE==>");
      }
    })
  }

  

}

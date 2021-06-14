import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { element } from 'protractor';
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
  public formDir: FormGroup;
  public dirSelected: Direccion;
  public  outPutLista=[] ;
  public auxdireccion;

  constructor(private _peticionesRest: RestfullnodeService,  private _storage: LocalstorageService,private _router:Router) { 
      this.formDir = new FormGroup({
        selectDir: new FormControl("",[ Validators.required])
      })
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
             
            this.outPutLista.push(result);
            this.listaDirecciones=this.outPutLista;
          } else {
            console.log("fallo-->")
          }
        })
      } else {
       console.log("HA OCURRIDO UN ERROR EN LA RESPUESTA DE NODE==>");
      }
    })
  }

  dirSeleccionada(dir: Direccion){
    //var dir= this.formDir.controls["selectDir"].value;
    /*this._peticionesRest.buscaDir(dir).subscribe((result)=>{
      if (result) {
        //console.log("direccion eliminada--->",result[0])
        this.dirSelected=result//<--vuelve en un array
        //console.log("direccion seleccionada--->",this.dirSeleccionada)
      } else {
        console.log("error direccion  NO eliminada--->",result)
      }
    })*/
    var element;
    console.log("dir--->",this.outPutLista)
    for (let index = 0; index < this.outPutLista.length; index++) {//<---saca del array el array [{diseno},...]
       element= this.outPutLista[index];
    }
    
    for (let index = 0; index < element.length; index++) {
      const aux = element[index];
      if (aux.nombreVia===dir.nombreVia) {
        
        this.auxdireccion=aux;
        console.log("direccion--->", this.auxdireccion)
      } else {
        //console.log("direccion error--->", aux)
      }
      
    }
  }

  delete(){
    console.log("direccion--->ok",this.auxdireccion)
    this._peticionesRest.eliminaDir(this.auxdireccion).subscribe((result)=>{
      if (result) {
        console.log("ok--->",result)
        this._router.navigate(["/cliente/direcciones"]);
      } else {
        console.log("no --->")
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Direccion } from 'src/app/modelos/direccion';
import { Municipio } from 'src/app/modelos/municipio';
import { Provincia } from 'src/app/modelos/Provincia';
import { LocalstorageService } from 'src/app/servicios/localStorageService';
import { RestfullnodeService } from 'src/app/servicios/restfullNode.service';

@Component({
  selector: 'app-actualizadireccion',
  templateUrl: '../../vistas/vistasZonaCliente/actualizadireccion.component.html',
  styleUrls: ['../../vistas/css/actualizadireccion.component.css']
})
export class ActualizadireccionComponent implements OnInit {

  public  outPutLista=[] ;
  public listaDirecciones:Direccion[]; 
  public formDireccion : FormGroup; 
  constructor(private _peticionesRest: RestfullnodeService,  private _storage: LocalstorageService,private _router:Router) {
    this.formDireccion=new FormGroup({
      tipovia: new FormControl("",[Validators.required,Validators.minLength(1), Validators.maxLength(20)]),
      nombrevia: new FormControl("",[Validators.required,Validators.minLength(3), Validators.maxLength(25)]),
      edificio: new FormControl("",[Validators.required,Validators.pattern("^[0-9]{1,2}$")]),
      letraedificio: new FormControl("",[ Validators.required,Validators.minLength(1),Validators.maxLength(1)]),
      piso: new FormControl("",[Validators.pattern("^[0-9]{1,2}$")]),
      puerta: new FormControl("",[Validators.maxLength(10)]),
      cp: new FormControl("",[Validators.required,Validators.pattern("^[0-9]{3,6}$")]),
      codpro: new FormControl("",[ Validators.pattern("^[0-9]{3,6}$")]),
      nombreProv: new FormControl("",[Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
      codmun: new FormControl("",[ Validators.pattern("^[0-9]{3,6}$")]),
      nombreMun: new FormControl("",[Validators.required,Validators.minLength(6), Validators.maxLength(20)])
    });
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

  //----------------------inserta una direccion nueva
  direccionEnvio(){
    console.log(this.formDireccion);
    let _direccion = new Direccion();
    _direccion.tipoVia=this.formDireccion.controls["tipovia"].value;
    _direccion.nombreVia=this.formDireccion.controls['nombrevia'].value;
    _direccion.numeroEdificio=this.formDireccion.controls['edificio'].value;
    _direccion.numeroPiso=this.formDireccion.controls['piso'].value;    
    _direccion.letraedificio=this.formDireccion.controls['letraedificio'].value;
    _direccion.cp=this.formDireccion.controls['cp'].value;
    _direccion.puerta=this.formDireccion.controls['puerta'].value;

    _direccion.provincia = new Provincia(); //<--se inicailiza
    _direccion.provincia.codProvincia=this.formDireccion.controls['codpro'].value;
    _direccion.provincia.nomProvincia=this.formDireccion.controls['nombreProv'].value;
    _direccion.municipio=new Municipio();//<--se inicailiza
    _direccion.municipio.codMunicipio=this.formDireccion.controls['codmun'].value;
    _direccion.municipio.nomMunicipio=this.formDireccion.controls['nombreMun'].value;
    //_direccion.nifCliente="0000000A";

    this._peticionesRest.insertaDireccion(_direccion).subscribe((result)=>{
      if (result) {
        console.log("respuesta del insert de direccion")
        this._router.navigate(["/cliente/panelUsuario"]);
      } else {
        console.log("respuesta del insert de direccion")
      }
    })



  }


}

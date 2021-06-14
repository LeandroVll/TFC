import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/modelos/cliente';
import { Credenciales } from 'src/app/modelos/credenciales';
import { LocalstorageService } from 'src/app/servicios/localStorageService';
import { RestfullnodeService } from 'src/app/servicios/restfullNode.service';

@Component({
  selector: 'app-registro',
  templateUrl: '../../vistas/vistasZonaCliente/registro.component.html',
  styleUrls: ['../../vistas/css/registro.component.css']
})
export class RegistroComponent implements OnInit {

  public formregistro:FormGroup;
  constructor(private _peticionesRest: RestfullnodeService, private _storage: LocalstorageService,private _router:Router) { 
    this.formregistro = new FormGroup({ //este jason tiene 
      email: new FormControl("",[Validators.required,Validators.pattern("^.*@.*"),Validators.maxLength(50)]),
      password: new FormControl("",[Validators.required,Validators.minLength(6), Validators.maxLength(25)]),
      repassword: new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(25)]),
      nombre: new FormControl("",[Validators.required,Validators.maxLength(25)]),
      primape: new FormControl("",[Validators.required,Validators.maxLength(25)]),
      secape: new FormControl("",[Validators.required,Validators.maxLength(25)])
    });
  }

  ngOnInit() {
  }

  registrarCliente(){
    //---->se recogen los dator del cliente 
    let _clienteNew = new Cliente();
     _clienteNew.nombre=this.formregistro.controls['nombre'].value;
     _clienteNew.primerApellido=this.formregistro.controls['primape'].value;
     _clienteNew.segundoApellido=this.formregistro.controls['secape'].value;
     _clienteNew.credenciales = new Credenciales();//<---inicializa credeciales que esta dentro de cliente
     _clienteNew.credenciales.email= this.formregistro.controls['email'].value;
     _clienteNew.credenciales.password= this.formregistro.controls['password'].value;

    this._peticionesRest.registraCliente(_clienteNew).subscribe((result)=>{
      console.log("respeusta---->", result);
        if (result) {
          console.log("cliente registrado---->", result);
          this._storage.set("token", result );
            this._router.navigate(["/cliente/envio"]);
        } else {
          console.log("error mongo NO registrado---->", result);
        }
    });
  }

}

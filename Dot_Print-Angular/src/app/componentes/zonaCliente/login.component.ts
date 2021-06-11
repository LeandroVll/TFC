import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/modelos/cliente';
import { Credenciales } from 'src/app/modelos/credenciales';
import { LocalstorageService } from 'src/app/servicios/localStorageService';
import { RestfullnodeService } from 'src/app/servicios/restfullNode.service';

@Component({
  selector: 'app-login',
  templateUrl: '../../vistas/vistasZonaCliente/login.component.html',
  styleUrls: ['../../vistas/css/login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin : FormGroup;

  constructor(private _peticionesRest : RestfullnodeService, private _storage: LocalstorageService,private _router:Router) { 
    this.formLogin = new FormGroup({
      email: new FormControl("",[Validators.required,Validators.pattern("^.*@.*"),Validators.maxLength(50)]),
      password: new FormControl("",[Validators.required,Validators.minLength(6), Validators.maxLength(25)])
    });
  }

  ngOnInit() {
  }

  logarCliente(){
    let _clienteNew = new Cliente();
    _clienteNew.credenciales = new Credenciales();
     _clienteNew.credenciales.email= this.formLogin.controls['email'].value;
     _clienteNew.credenciales.password= this.formLogin.controls['password'].value;

     this._peticionesRest.logarCliente(_clienteNew).subscribe((result)=>{
        //redirije a la vista 
        if(result!=null)
        {
            console.log('cliente---->',result )
            this._storage.set("token", result );
            this._router.navigate(["/cliente/panelUsuario"]);

        }
        else{
          console.log("Fallo subcripcion en el componet login");
        }

     })
     
  }
}

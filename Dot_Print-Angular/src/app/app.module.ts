//----------MODULOS--------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//----------COMPONENTES--------
import { AppComponent } from './app.component';
import { PortadaComponent } from './componentes/zonaTienda/portada.component';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FiestaComponent } from './componentes/zonaTienda/fiesta.component';
import { DisenoComponent } from './componentes/zonaTienda/diseno.component';
import { EnvioComponent } from './componentes/zonaCliente/envio.component';
import { PedidoComponent } from './componentes/zonaTienda/pedido.component';
import { CarritoComponent } from './componentes/zonaTienda/carrito.component';
import { LoginComponent } from './componentes/zonaCliente/login.component';
import { RegistroComponent } from './componentes/zonaCliente/registro.component';
import { PanelUsuarioComponent } from './componentes/zonaCliente/panel-usuario.component';
import { HistorialPedidosComponent } from './componentes/zonaCliente/historial-pedidos.component';
import { DireccionesComponent } from './componentes/zonaCliente/direcciones.component';

//------------SERVICIOS-------------


@NgModule({
  declarations: [
    AppComponent,
    PortadaComponent,
    FiestaComponent,
    DisenoComponent,
    EnvioComponent,
    PedidoComponent,
    CarritoComponent,
    LoginComponent,
    RegistroComponent,
    PanelUsuarioComponent,
    HistorialPedidosComponent,
    DireccionesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

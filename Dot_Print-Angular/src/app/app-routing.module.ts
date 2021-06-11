import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarritoComponent } from './componentes/zonaTienda/carrito.component';
import { DisenoComponent } from './componentes/zonaTienda/diseno.component';
import { EnvioComponent } from './componentes/zonaCliente/envio.component';
import { FiestaComponent } from './componentes/zonaTienda/fiesta.component';
import { PedidoComponent } from './componentes/zonaTienda/pedido.component';
import { PortadaComponent } from './componentes/zonaTienda/portada.component';
import { LoginComponent } from './componentes/zonaCliente/login.component';
import { RegistroComponent } from './componentes/zonaCliente/registro.component';
import { PanelUsuarioComponent } from './componentes/zonaCliente/panel-usuario.component';
import { HistorialPedidosComponent } from './componentes/zonaCliente/historial-pedidos.component';
import { DireccionesComponent } from './componentes/zonaCliente/direcciones.component';


const routes: Routes = [

                        {
                          path: 'tienda', children: [  //---https:localhost/tienda/portada
                                                        {path: 'portada', component: PortadaComponent},
                                                        {path: 'fiesta', component: FiestaComponent},
                                                        {path: 'diseños', component: DisenoComponent},
                                                        {path: 'carrito', component: CarritoComponent}
                                                    ]
                        },
                        {
                          path: 'cliente', children: [  //---https:localhost/cliente
                                                        {path: 'pedidos', component: PedidoComponent},
                                                        {path: 'envio', component: EnvioComponent},
                                                        {path: 'login', component: LoginComponent},
                                                        {path: 'registro', component: RegistroComponent},
                                                        {path: 'panelUsuario', component: PanelUsuarioComponent},
                                                        {path: 'historial', component: HistorialPedidosComponent},
                                                        {path: 'direcciones', component: DireccionesComponent},  
                                                    ]
                        },
                        

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

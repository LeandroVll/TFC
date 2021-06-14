import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Producto } from "../modelos/producto";
import { Observable } from "rxjs";
import { Direccion } from "../modelos/direccion";
import { Camisa } from "../modelos/camisa";
import { Cliente } from "../modelos/cliente";
import { Pedido } from "../modelos/pedido";
@Injectable({
    providedIn: 'root'
})

export class RestfullnodeService{

    //modulo HttpClient para hacer llamadas a Nodejs
    constructor(private _http: HttpClient){}

    /**
     * recuperar objetos productos
     */
    public recuperarProductos (): Observable<Producto[]> {
        return this._http.get<Producto[]>('http://localhost:3000/api/productosDisponibes',
                                            {
                                                headers : new HttpHeaders({ 
                                                    'Content-Type': 'application/json'
                                                  }) 
                                            })
    }

    /**
     * recuperar diseños 
     */
     public recuperarDisenos (): Observable<Producto[]> {
        return this._http.get<Producto[]>('http://localhost:3000/api/disenosDisponibles',
                                            {
                                                headers : new HttpHeaders({ 
                                                    'Content-Type': 'application/json'
                                                  }) 
                                            })
    }

    /**
     * 
     */
     public insertaDireccion (newDireccion: Direccion): Observable<Direccion> {
        return this._http.post<Direccion>('http://localhost:3000/api/insertaDireccion',newDireccion,
                                            {
                                                headers : new HttpHeaders({ 
                                                    'Content-Type': 'application/json'
                                                  }) 
                                            })
    }

        /**
     * recuperar un diseño seleccionado 
     */
         public recuperarDiseno (_producto: Producto): Observable<Producto> {
            return this._http.post<Producto>('http://localhost:3000/api/unDiseno',_producto,
                                                {
                                                    headers : new HttpHeaders({ 
                                                        'Content-Type': 'application/json'
                                                      }) 
                                                })
        }

    /**
     * recuperar ucamisa
     */
             public recuperaUnaCamisa (_camisa: Camisa): Observable<Camisa> {
                return this._http.post<Camisa>('http://localhost:3000/api/unaCamisa',_camisa,
                                                    {
                                                        headers : new HttpHeaders({ 
                                                            'Content-Type': 'application/json'
                                                          }) 
                                                    })
            }
    
    /**
     * registar un cliente 
     */ 
         public registraCliente(_cliente: Cliente): Observable<Cliente> {
            return this._http.post<Cliente>('http://localhost:3000/api/clienteNuevo',_cliente,
                                                {
                                                    headers : new HttpHeaders({ 
                                                        'Content-Type': 'application/json'
                                                      }) 
                                                })
        }  
        
            /**
     * recuperar un diseño seleccionado 
     */ 
        public logarCliente(_cliente: Cliente): Observable<Cliente> {
                return this._http.post<Cliente>('http://localhost:3000/api/logarCliente',_cliente,
                                                    {
                                                        headers : new HttpHeaders({ 
                                                            'Content-Type': 'application/json'
                                                          }) 
                                                    })
        }  

        /* recuperar un diseño seleccionado 
        */ 
           public guradaPedido(_pedido: any): Observable<Pedido> {
                   return this._http.post<Pedido>('http://localhost:3000/api/guardaPedido',_pedido,
                                                       {
                                                           headers : new HttpHeaders({ 
                                                               'Content-Type': 'application/json'
                                                             }) 
                                                       })
        }  
        

        /**
         * decodifica el token y devuelve datos del cliente
         * */
        public decodToken(newtoken: any): Observable<any> {


            return this._http.post<any>(  'http://localhost:3000/api/decodificarToken',
                                            newtoken,
                                            {
                                                headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                            }
            );
            
        }

        /**
         * recupera arr de pedidos
         * */
        public recuperaPedidos(_cliente: any): Observable<Pedido[]> {


            return this._http.post<Pedido[]>(  'http://localhost:3000/api/recuperaPedidos',_cliente,
                                            {
                                                headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                            }
            );
    
}


/**
         * recupera arr de pedidos
         * */
 public recuperaListProdu(_cliente: any): Observable<Producto[]> {


        return this._http.post<Producto[]>(  'http://localhost:3000/api/recuperaListProdu',_cliente,
                                        {
                                            headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                        }
        );
    }

    /**
    * recupera lista direcciones
     * */
    public recuperaDirecciones(_cliente: any): Observable<Direccion[]> {


        return this._http.post<Direccion[]>(  'http://localhost:3000/api/recuperaDirecciones',_cliente,
                                        {
                                            headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                        }
        );
    }
    
    /**
    * recupera lista direcciones
     * */
     public eliminaDir(_direccion: any): Observable<Direccion> {


        return this._http.post<Direccion>(  'http://localhost:3000/api/eliminaDir',_direccion,
                                        {
                                            headers : new HttpHeaders({ 'Content-Type': 'application/json' })
                                        }
        );
    }
}
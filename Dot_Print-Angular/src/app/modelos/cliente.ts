import { Credenciales } from "./credenciales";
import { DatosPago } from "./datosPago";
import { Direccion } from "./direccion";
import { Pedido } from "./pedido";

export class Cliente{
    nif: string;
    nombre : string;
    primerApellido: string;
    segundoApellido: string;
    fechaNacimiento: Date;
    telefono: string;
    movil: string;
    
    credenciales: Credenciales;
    datosPago: DatosPago;
    direccion: Direccion[]; //pueden haber varias direcciones
   // pedido: Pedido[]; //pueden haber varios pedidos
}
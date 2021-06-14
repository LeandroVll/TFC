import { DatosPago } from "./datosPago";
import { Direccion } from "./direccion";
import { Diseno } from "./diseno";
import { Producto } from "./producto";

export class Pedido{
    idPedido: string;
    nifcliente: string;
    listaProductos: Array<[Producto[], Diseno[]]>; //[(producto,cantidadProducto), diseño]
    direccion: Direccion;
    datosPago: DatosPago;
    tipodeEnvio: string;
    gastosEnvio: number;
    subtotal: number;
    total: number;
    fechaPedido: Date;
    estatus:string= ("enviado"|| "en reparto"|| "entregado");

}
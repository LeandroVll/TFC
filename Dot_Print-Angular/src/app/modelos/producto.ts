import { Camisa } from "./camisa";
import { Diseno } from "./diseno";

//---caracteristicas basicas de cualquier producto
export class Producto {
    _id: string;
    categoriaProducto: string;
    nombreProducto: string;
    precio: number;
    descripcion: string;
    imagen: string;

    //-------tipos de productos
    camisa: Camisa;
    diseno: Diseno;
}
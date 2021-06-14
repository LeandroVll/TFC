import { Municipio } from "./municipio";
import { Provincia } from "./Provincia";

export class Direccion{
    
    tipoVia: string;
    nifCliente: string;
    nombreVia: string;
    numeroEdificio: string;    
    letraedificio: string;
    numeroPiso: string;
    puerta: string;
    cp: string;
    escalera: string;
    provincia: Provincia;
    municipio: Municipio;

}
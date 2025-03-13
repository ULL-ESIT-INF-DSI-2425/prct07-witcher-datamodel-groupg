import { Bien, IBien } from "../src/bien";
import { Mercader, IMercader } from "../src/mercader";
import { Cliente, ICliente } from "../src/cliente";

/**
 * Representa una transacción en el sistema.
 */
export interface ITransaccion {
  id: string;
  tipo: "compra" | "venta" | "devolución";
  fecha: Date;
  bienes: IBien[];
  cantidadCoronas: number;
  involucrado: IMercader | ICliente;
}

/**
 * Implementación de la clase Transacción.
 */
export class Transaccion implements ITransaccion {
  constructor(
    public id: string,
    public tipo: "compra" | "venta" | "devolución",
    public fecha: Date,
    public bienes: IBien[],
    public cantidadCoronas: number,
    public involucrado: IMercader | ICliente
  ) {}
}
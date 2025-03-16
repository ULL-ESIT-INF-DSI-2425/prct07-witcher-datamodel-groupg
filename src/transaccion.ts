import { IBien } from "../src/bien.js";
import { IMercader } from "../src/mercader.js";
import { ICliente } from "../src/cliente.js";
import {v4 as uuidv4} from 'uuid';

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
  public id: string = uuidv4();
  constructor(
    public tipo: "compra" | "venta" | "devolución",
    public fecha: Date,
    public bienes: IBien[],
    public cantidadCoronas: number,
    public involucrado: IMercader | ICliente
  ) {}
}
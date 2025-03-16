import { IBien } from "../src/bien.js";
import { IMercader } from "../src/mercader.js";
import { ICliente } from "../src/cliente.js";
import {v4 as uuidv4} from 'uuid';

/**
 * Representa una transacción en el sistema.
 */
export interface ITransaccion {
  /** Identificador único de la transacción. */
  id: string;
  /** Tipo de la transacción: "compra", "venta" o "devolución". */
  tipo: "compra" | "venta" | "devolución";
  /** Fecha en la que se realizó la transacción. */
  fecha: Date;
  /** Lista de bienes involucrados en la transacción. */
  bienes: IBien[];
  /** Cantidad de coronas involucradas en la transacción. */
  cantidadCoronas: number;
  /** Mercader o cliente involucrado en la transacción. */
  involucrado: IMercader | ICliente;
}

/**
 * Implementación de la clase Transacción.
 */
export class Transaccion implements ITransaccion {
  /** Identificador único de la transacción, generado automáticamente. */
  public id: string = uuidv4();

  /**
   * Crea una nueva instancia de la clase Transacción.
   * @param tipo - Tipo de la transacción: "compra", "venta" o "devolución".
   * @param fecha - Fecha en la que se realizó la transacción.
   * @param bienes - Lista de bienes involucrados en la transacción.
   * @param cantidadCoronas - Cantidad de coronas involucradas en la transacción.
   * @param involucrado - Mercader o cliente involucrado en la transacción.
   */
  constructor(
    public tipo: "compra" | "venta" | "devolución",
    public fecha: Date,
    public bienes: IBien[],
    public cantidadCoronas: number,
    public involucrado: IMercader | ICliente
  ) {}
}
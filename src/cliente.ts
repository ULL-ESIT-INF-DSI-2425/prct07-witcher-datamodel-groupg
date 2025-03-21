import { v4 as uuidv4 } from "uuid";

/**
 * Representa a un cliente que compra bienes.
 */
export interface ICliente {
  /** Identificador único del cliente. */
  id: string;
  /** Nombre del cliente. */
  nombre: string;
  /** Raza del cliente. */
  raza: string;
  /** Ubicación del cliente. */
  ubicacion: string;
}

/**
 * Implementación de la clase Cliente.
 */
export class Cliente implements ICliente {
  /** Identificador único del cliente, generado automáticamente. */
  public id: string = uuidv4();

  /**
   * Crea una nueva instancia de la clase Cliente.
   * @param nombre - Nombre del cliente.
   * @param raza - Raza del cliente.
   * @param ubicacion - Ubicación del cliente.
   */
  constructor(
    public nombre: string,
    public raza: string,
    public ubicacion: string,
  ) {}
}

import {v4 as uuidv4} from 'uuid';

/**
 * Representa un bien en el inventario.
 */
export interface IBien {
  /** Identificador único del bien. */
  id: string;
  /** Nombre del bien. */
  nombre: string;
  /** Descripción del bien. */
  descripcion: string;
  /** Material del que está hecho el bien. */
  material: string;
  /** Peso del bien en kilogramos. */
  peso: number;
  /** Valor monetario del bien. */
  valor: number;
}

/**
 * Implementación de la clase Bien.
 */
export class Bien implements IBien {
  /** Identificador único del bien, generado automáticamente. */
  public id: string = uuidv4();

  /**
   * Crea una nueva instancia de la clase Bien.
   * @param nombre - Nombre del bien.
   * @param descripcion - Descripción del bien.
   * @param material - Material del que está hecho el bien.
   * @param peso - Peso del bien en kilogramos.
   * @param valor - Valor monetario del bien.
   */
  constructor(
    public nombre: string,
    public descripcion: string,
    public material: string,
    public peso: number,
    public valor: number
  ) {}
}
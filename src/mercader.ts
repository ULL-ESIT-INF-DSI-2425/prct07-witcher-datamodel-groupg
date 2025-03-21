import { v4 as uuidv4 } from "uuid";

/**
 * Representa a un mercader.
 */
export interface IMercader {
  /** Identificador único del mercader. */
  id: string;
  /** Nombre del mercader. */
  nombre: string;
  /** Tipo de mercader (por ejemplo, vendedor de armas, alquimista, etc.). */
  tipo: string;
  /** Ubicación del mercader. */
  ubicacion: string;
}

/**
 * Implementación de la clase Mercader.
 */
export class Mercader implements IMercader {
  /** Identificador único del mercader, generado automáticamente. */
  public id: string = uuidv4();

  /**
   * Crea una nueva instancia de la clase Mercader.
   * @param nombre - Nombre del mercader.
   * @param tipo - Tipo de mercader (por ejemplo, vendedor de armas, alquimista, etc.).
   * @param ubicacion - Ubicación del mercader.
   */
  constructor(
    public nombre: string,
    public tipo: string,
    public ubicacion: string,
  ) {}
}

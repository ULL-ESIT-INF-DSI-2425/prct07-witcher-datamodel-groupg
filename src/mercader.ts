import {v4 as uuidv4} from 'uuid';

/**
 * Representa a un mercader.
 */
export interface IMercader {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
}

/**
 * Implementación de la clase Mercader.
 */
export class Mercader implements IMercader {
  public id: string = uuidv4();
  constructor(
    public nombre: string,
    public tipo: string,
    public ubicacion: string
  ) {}
}

import {v4 as uuidv4} from 'uuid';

/**
 * Representa un bien en el inventario.
 */
export interface IBien {
  id: string;
  nombre: string;
  descripcion: string;
  material: string;
  peso: number;
  valor: number;
}

/**
 * Implementación de la clase Bien.
 */
export class Bien implements IBien {
  public id: string = uuidv4();
  constructor(
    public nombre: string,
    public descripcion: string,
    public material: string,
    public peso: number,
    public valor: number
  ) {}
}
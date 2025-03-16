import {v4 as uuidv4} from 'uuid';

/**
 * Representa a un cliente que compra bienes.
 */
export interface ICliente {
  id: string;
  nombre: string;
  raza: string;
  ubicacion: string;
}

/**
 * Implementación de la clase Cliente.
 */
export class Cliente implements ICliente {
  public id: string = uuidv4();
  constructor(
    public nombre: string,
    public raza: string,
    public ubicacion: string
  ) {}
}

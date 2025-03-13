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
  constructor(
    public id: string,
    public nombre: string,
    public raza: string,
    public ubicacion: string
  ) {}
}

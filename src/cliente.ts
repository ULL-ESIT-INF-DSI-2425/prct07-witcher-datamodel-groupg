/**
 * Representa a un cliente que compra bienes.
 */
interface ICliente {
  id: string;
  nombre: string;
  raza: string;
  ubicacion: string;
}

/**
 * Implementación de la clase Cliente.
 */
class Cliente implements ICliente {
  constructor(
    public id: string,
    public nombre: string,
    public raza: string,
    public ubicacion: string
  ) {}
}

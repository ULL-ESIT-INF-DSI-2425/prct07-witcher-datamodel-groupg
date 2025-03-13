/**
 * Representa una transacción en el sistema.
 */
interface ITransaccion {
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
class Transaccion implements ITransaccion {
  constructor(
    public id: string,
    public tipo: "compra" | "venta" | "devolución",
    public fecha: Date,
    public bienes: IBien[],
    public cantidadCoronas: number,
    public involucrado: IMercader | ICliente
  ) {}
}
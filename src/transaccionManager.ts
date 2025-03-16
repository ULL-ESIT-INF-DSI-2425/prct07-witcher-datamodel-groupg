import { LowSync } from "lowdb";
import { Transaccion, ITransaccion } from "./transaccion.js";
import { DataSchema } from "./database.js";

/**
 * Clase que gestiona las operaciones de transacciones.
 */
export class TransaccionManager {
  private db: LowSync<DataSchema>;

  constructor(db: LowSync<DataSchema>) {
    this.db = db;
  }

  /**
   * Añade una nueva transacción
   * @param transaccion - transacción a añadir
   */
  addTransaccion(transaccion: Transaccion) {
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.transacciones) {
      throw new Error(
        "La base de datos no contiene la propiedad 'transacciones'.",
      );
    }
    this.db.data.transacciones.push(transaccion);
    this.db.write();
  }

  /**
   * Obtiene las transacciones registradas.
   * @returns lista de transacciones.
   */
  getTransacciones(): Transaccion[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.transacciones) {
      throw new Error(
        "La base de datos no contiene la propiedad 'transacciones'.",
      );
    }
    return this.db.data.transacciones;
  }

  /**
   * Elimina una transaccion.
   * @param id - id de la transacción a eliminar.
   */
  removeTransaccion(id: string): boolean {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.transacciones) {
      throw new Error(
        "La base de datos no contiene la propiedad 'transacciones'.",
      );
    }
    const index = this.db.data.transacciones.findIndex((t) => t.id === id);
    if (index === -1) {
      console.log(
        "No se encontró la transacción especificada en la base de datos.",
      );
      return false;
    }
    this.db.data.transacciones.splice(index, 1);
    this.db.write();
    return true;
  }

  /**
   * Actualiza una transacción.
   * @param id - id de la transacción a actualizar.
   * @param datos - datos a actualizar.
   */
  updateTransaccion(id: string, datos: Partial<ITransaccion>): boolean {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.transacciones) {
      throw new Error(
        "La base de datos no contiene la propiedad 'transacciones'.",
      );
    }
    const index = this.db.data.transacciones.findIndex((t) => t.id === id);
    if (index === -1) {
      console.log(
        "No se encontró la transacción especificada en la base de datos.",
      );
      return false;
    }
    this.db.data.transacciones[index] = {
      ...this.db.data.transacciones[index],
      ...datos,
    };
    this.db.write();
    return true;
  }

  /**
   * Muestra por pantalla las transacciones almacenadas.
   */
  showTransacciones() {
    const transacciones = this.getTransacciones();
    if (transacciones && transacciones.length > 0) {
      console.table(transacciones);
    } else {
      console.log("No hay transacciones registradas.");
    }
  }
}
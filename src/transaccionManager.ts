import { LowSync } from "lowdb";
import { Transaccion, ITransaccion } from "./transaccion.js";
import { DataSchema } from "./database.js";

/**
 * Clase que gestiona las operaciones de transacciones.
 */
export class TransaccionManager {
  private db: LowSync<DataSchema>;

  /**
   * Crea una instancia de TransaccionManager.
   * @param db - Instancia de la base de datos.
   */
  constructor(db: LowSync<DataSchema>) {
    this.db = db;
  }

  /**
   * Añade una nueva transacción.
   * @param transaccion - Transacción a añadir.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'transacciones'.
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
   * @returns Lista de transacciones.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'transacciones'.
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
   * Elimina una transacción.
   * @param id - Identificador único de la transacción a eliminar.
   * @returns `true` si la transacción fue eliminada, `false` si no se encontró.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'transacciones'.
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
   * @param id - Identificador único de la transacción a actualizar.
   * @param datos - Objeto con los datos a actualizar.
   * @returns `true` si la transacción fue actualizada, `false` si no se encontró.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'transacciones'.
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
   * Si no hay transacciones, muestra un mensaje indicando que no hay registros.
   */
  showTransacciones() {
    const transacciones = this.getTransacciones();
    if (transacciones && transacciones.length > 0) {
      const transaccionesProcesadas = transacciones.map((t) => ({
        tipo: t.tipo,
        fecha: new Date(t.fecha).toLocaleString(), // Formatear la fecha
        bienes: t.bienes.map((b) => b.nombre).join(", "), // Extraer nombres de los bienes
        cantidadCoronas: t.cantidadCoronas,
        involucrado: t.involucrado.nombre, // Extraer el nombre del cliente o mercader
        id: t.id,
      }));
      console.table(transaccionesProcesadas);
    } else {
      console.log("No hay transacciones registradas.");
    }
  }
}

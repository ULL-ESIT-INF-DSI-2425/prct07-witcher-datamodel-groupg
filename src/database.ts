import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { Bien } from "./bien.js";
import { Mercader } from "./mercader.js";
import { Cliente } from "./cliente.js";
import { Transaccion } from "./transaccion.js";
import path from "path";

/**
 * Esquema de datos de la base de datos
 */
export type DataSchema = {
  /** Lista de bienes almacenados en la base de datos. */
  bienes: Bien[];
  /** Lista de mercaderes almacenados en la base de datos. */
  mercaderes: Mercader[];
  /** Lista de clientes almacenados en la base de datos. */
  clientes: Cliente[];
  /** Lista de transacciones almacenadas en la base de datos. */
  transacciones: Transaccion[];
};

/**
 * Archivo JSON donde se guardarán los datos
 */
const file = path.resolve(__dirname, "../databases/test-transacciones.json");

/**
 * Adaptador para manejar el archivo JSON de la base de datos.
 */
const adapter = new JSONFileSync<DataSchema>(file);

/**
 * Instancia de la base de datos utilizando LowSync.
 */
const db = new LowSync<DataSchema>(adapter);
/**
 * Función para inicializar la base de datos con datos vacíos si no existen.
 * Si el archivo de la base de datos no contiene datos, se inicializa con listas vacías.
 */
export const initDB = async () => {
  db.read();
  if (!db.data) {
    db.data = {
      bienes: [],
      mercaderes: [],
      clientes: [],
      transacciones: [],
    };
    db.write();
  }
};

/**
 * Exporta la instancia de la base de datos para ser utilizada en otras partes del sistema.
 */
export { db };

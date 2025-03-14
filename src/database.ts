import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { Bien } from './bien.js';
import { Mercader } from './mercader.js';
import { Cliente } from './cliente.js';
import { Transaccion } from './transaccion.js';

/**
 * Esquema de datos de la base de datos
 */
export type DataSchema = {
  bienes: Bien[];
  mercaderes: Mercader[];
  clientes: Cliente[];
  transacciones: Transaccion[];
};

// Archivo JSON donde se guardarán los datos
const file = "database.json";
const adapter = new JSONFileSync<DataSchema>(file);
const db = new LowSync<DataSchema>(adapter);
/**
 * Función para inicializar la base de datos con datos vacíos si no existen
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
}

export { db };

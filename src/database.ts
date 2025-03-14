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
/* No se le pueden pasar 2 argumentos al constructor de LowSync
const db = new LowSync<DataSchema>(new JSONFileSync("test-db.json"), { bienes: [], mercaderes: [], clientes: [], transacciones: [] });
*/
const db = new LowSync<DataSchema>(adapter);
/**
 * Función para inicializar la base de datos con datos vacíos si no existen
 */
export const initDB = async () => {
  await db.read();
  db.data ||= { bienes: [], mercaderes: [], clientes: [], transacciones: [] };
  await db.write();
};

export { db };

import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

/**
 * Esquema de datos de la base de datos
 */
type DataSchema = {
  bienes: any[];
  mercaderes: any[];
  clientes: any[];
  transacciones: any[];
};

// Archivo JSON donde se guardarán los datos
const file = "database.json";
const adapter = new JSONFileSync<DataSchema>(file);
const db = new LowSync<DataSchema>(new JSONFileSync("test-db.json"), { bienes: [], mercaderes: [], clientes: [], transacciones: [] });

/**
 * Función para inicializar la base de datos con datos vacíos si no existen
 */
export const initDB = async () => {
  await db.read();
  db.data ||= { bienes: [], mercaderes: [], clientes: [], transacciones: [] };
  await db.write();
};

export { db };

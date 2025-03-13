import { LowSync } from "lowdb/lib";
import { JSONFileSync } from "lowdb/node";
import { Bien } from "../src/bien";
import { Mercader } from "../src/mercader";
import { Cliente } from "../src/cliente";
import { Transaccion } from "../src/transaccion";
import { DataSchema } from "../src/database";

/**
 * Clase que representa el inventario
 */
export class Inventario {
  private db: LowSync<DataSchema>;
  constructor() {
    this.db = new LowSync<DataSchema>(new JSONFileSync("test-db.json"), {
      bienes: [],
      mercaderes: [],
      clientes: [],
      transacciones: [],
    });
    this.db.read();
    this.db.data ||= {
      bienes: [],
      mercaderes: [],
      clientes: [],
      transacciones: [],
    };
    this.db.write();
  }

  /**
   * Añade un nuevo bien
   * @param bien - bien a añadir
   */
  addBien(bien: Bien) {
    this.db.read();
    this.db.data.bienes.push(bien);
    this.db.write();
  }

  /**
   * Obtiene todos los bienes.
   * @returns Lista de los bienes
   */
  getBienes(): Bien[] {
    this.db.read();
    return this.db.data.bienes;
  }

  /**
   * Añade un nuevo mercader
   * @param bien - bien a mercader
   */
  addMercander(mercader: Mercader) {
    this.db.read();
    this.db.data.mercaderes.push(mercader);
    this.db.write();
  }

  /**
   * Obtiene todos los mercaderes.
   * @returns Lista de los mercaderes
   */
  getMercaderes(): Mercader[] {
    this.db.read();
    return this.db.data.mercaderes;
  }
}

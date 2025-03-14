import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { Bien } from "../src/bien.js";
import { Mercader } from "../src/mercader.js";
import { Cliente } from "../src/cliente.js";
import { Transaccion } from "../src/transaccion.js";
import { DataSchema } from "../src/database.js";

/**
 * Clase que representa el inventario
 */
export class Inventario {
  private db: LowSync<DataSchema>;

  constructor() {

    /* No se le pueden pasar 2 argumentos al constructor de LowSync
      this.db = new LowSync<DataSchema>(new JSONFileSync("test-db.json"), {
      bienes: [],
      mercaderes: [],
      clientes: [],
      transacciones: [],
    });*/
    this.db = new LowSync<DataSchema>(new JSONFileSync("test-db.json"));
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
    this.db.data?.bienes.push(bien);
    this.db.write();
  }

  /**
   * Obtiene todos los bienes.
   * @returns Lista de los bienes
   */
  getBienes(): Bien[] | null {
    this.db.read();
    return this.db.data?.bienes || null;
  }

  removeBien(bien: Bien) {
    this.db.read();
    if (!this.db.data) {
      console.log("La base de datos está vacía.");
      return;
    }
    if (!this.db.data.bienes) {
      console.log("La base de datos no contiene bienes.");
      return;
    }
    const index = this.db.data.bienes.findIndex(b => b.id === bien.id);
    if (index === -1) {
      console.log("No se encontró el mercader especificado en la base de datos.")
      return;
    }
    this.db.data?.bienes.splice(index, 1);
    this.db.write();
  }

  /**
   * Añade un nuevo mercader
   * @param bien - bien a mercader
   */
  addMercader(mercader: Mercader) {
    this.db.data?.mercaderes.push(mercader);
    this.db.write();
  }

  /**
   * Obtiene todos los mercaderes.
   * @returns Lista de los mercaderes
   */
  getMercaderes(): Mercader[] | null {
    this.db.read();
    return this.db.data?.mercaderes || null;
  }

  removeMercader(mercader: Mercader) {
    this.db.read();
    if (!this.db.data) {
      console.log("La base de datos está vacía.");
      return;
    }
    if (!this.db.data.mercaderes) {
      console.log("La base de datos no contiene mercaderes.");
      return;
    }
    const index = this.db.data.mercaderes.findIndex(m => m.id === mercader.id);
    if (index === -1) {
      console.log("No se encontró el mercader especificado en la base de datos.")
      return;
    }
    this.db.data?.mercaderes.splice(index, 1);
    this.db.write();
  }

  addCliente(cliente: Cliente) {
    this.db.data?.clientes.push(cliente);
    this.db.write();
  }

  getClientes(): Cliente[] | null {
    this.db.read();
    return this.db.data?.clientes || null;
  }

  removeCliente(cliente: Cliente) {
    this.db.read();
    if (!this.db.data) {
      console.log("La base de datos está vacía.");
      return;
    }
    if (!this.db.data.clientes) {
      console.log("La base de datos no contiene clientes.");
      return;
    }
    const index = this.db.data.clientes.findIndex(c => c.id === cliente.id);
    if (index === -1) {
      console.log("No se encontró el cliente especificado en la base de datos.")
      return;
    }
    this.db.data?.clientes.splice(index, 1);
    this.db.write();
  }

  addTransaccion(transaccion: Transaccion) {
    this.db.data?.transacciones.push(transaccion);
    this.db.write();
  }

  getTransacciones(): Transaccion[] | null {
    this.db.read();
    return this.db.data?.transacciones || null;
  }

  removeTransaccion(transaccion: Transaccion) {
    this.db.read();
    if (!this.db.data) {
      console.log("La base de datos está vacía.");
      return;
    }
    if (!this.db.data.transacciones) {
      console.log("La base de datos no contiene transacciones.");
      return;
    }
    const index = this.db.data.transacciones.findIndex(t => t.id === transaccion.id);
    if (index === -1) {
      console.log("No se encontró la transacción especificada en la base de datos.")
      return;
    }
    this.db.data?.transacciones.splice(index, 1);
    this.db.write();
  }
}

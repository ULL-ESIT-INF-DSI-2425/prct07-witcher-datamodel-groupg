import { LowSync } from "lowdb";
import { Cliente, ICliente } from "./cliente.js";
import { DataSchema } from "./database.js";

/**
 * Clase que gestiona las operaciones de clientes.
 */
export class ClienteManager {
  private db: LowSync<DataSchema>;

  constructor(db: LowSync<DataSchema>) {
    this.db = db;
  }

  /**
   * Añade un nuevo cliente
   * @param bien - cliente a añadir
   */
  addCliente(cliente: Cliente) {
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.clientes) {
      throw new Error("La base de datos no contiene la propiedad 'clientes'.");
    }
    this.db.data.clientes.push(cliente);
    this.db.write();
  }

  /**
   * Obtiene los clientes almacenados.
   * @returns lista de clientes
   */
  getClientes(): Cliente[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.clientes) {
      throw new Error("La base de datos no contiene la propiedad 'clientes'.");
    }
    return this.db.data.clientes;
  }

  /**
   * Elimina un cliente.
   * @param id - id del cliente a eliminar.
   */
  removeCliente(id: string): boolean {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.clientes) {
      throw new Error("La base de datos no contiene la propiedad 'clientes'.");
    }
    const index = this.db.data.clientes.findIndex((c) => c.id === id);
    if (index === -1) {
      console.log(
        "No se encontró el cliente especificado en la base de datos.",
      );
      return false;
    }
    this.db.data.clientes.splice(index, 1);
    this.db.write();
    return true;
  }

  /**
   * Actualiza un cliente.
   * @param id - id del cliente a actualizar.
   * @param datos - datos a actualizar.
   */
  updateCliente(id: string, datos: Partial<ICliente>): boolean {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.clientes) {
      throw new Error("La base de datos no contiene la propiedad 'clientes'.");
    }
    const index = this.db.data.clientes.findIndex((c) => c.id === id);
    if (index === -1) {
      console.log(
        "No se encontró el cliente especificado en la base de datos.",
      );
      return false;
    }
    this.db.data.clientes[index] = {
      ...this.db.data.clientes[index],
      ...datos,
    };
    this.db.write();
    return true;
  }

  /**
   * Muestra por pantalla los clientes almacenados.
   */
  showClientes() {
    const clientes = this.getClientes();
    if (clientes && clientes.length > 0) {
      console.table(clientes);
    } else {
      console.log("No hay clientes registrados.");
    }
  }

  /**
   * Busca un cliente dado del nombre.
   * @param nombre - nombre del cliente a buscar.
   * @returns Lista de clientes
   */
  searchClienteNombre(nombre: string): Cliente[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.clientes) {
      throw new Error("La base de datos no contiene la propiedad 'clientes'.");
    }
    const clientes = this.db.data.clientes.filter((c) => c.nombre === nombre);
    return clientes;
  }

  /**
   * Busca un cliente dado de la raza.
   * @param raza - raza del cliente a buscar.
   * @returns Lista de clientes
   */
  searchClienteRaza(raza: string): Cliente[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.clientes) {
      throw new Error("La base de datos no contiene la propiedad 'clientes'.");
    }
    const clientes = this.db.data.clientes.filter((c) => c.raza === raza);
    return clientes;
  }

  /**
   * Busca un cliente dado de la ubicación.
   * @param ubicacion - ubicación del cliente a buscar.
   * @returns Lista de clientes
   */
  searchClienteUbicacion(ubicacion: string): Cliente[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.clientes) {
      throw new Error("La base de datos no contiene la propiedad 'clientes'.");
    }
    const clientes = this.db.data.clientes.filter(
      (c) => c.ubicacion === ubicacion,
    );
    return clientes;
  }
}
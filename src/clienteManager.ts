import { LowSync } from "lowdb";
import { Cliente, ICliente } from "./cliente.js";
import { DataSchema } from "./database.js";

/**
 * Clase que gestiona las operaciones de clientes.
 */
export class ClienteManager {
  private db: LowSync<DataSchema>;

  /**
   * Crea una instancia de ClienteManager.
   * @param db - Instancia de la base de datos.
   */
  constructor(db: LowSync<DataSchema>) {
    this.db = db;
  }

  /**
   * Añade un nuevo cliente al sistema.
   * @param cliente - Cliente a añadir.
   * @throws Error si la base de datos no está inicializada, no contiene la propiedad 'clientes' o si el cliente ya existe.
   */
  addCliente(cliente: Cliente) {
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    //si esta ducpliado
    if (this.db.data.clientes.find((c) => c.id === cliente.id)) {
      throw new Error("El cliente ya existe.");
    }
    if (!this.db.data.clientes) {
      throw new Error("La base de datos no contiene la propiedad 'clientes'.");
    }
    this.db.data.clientes.push(cliente);
    this.db.write();
  }

  /**
   * Obtiene todos los clientes almacenados en la base de datos.
   * @returns Lista de clientes.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'clientes'.
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
   * Elimina un cliente del sistema.
   * @param id - Identificador único del cliente a eliminar.
   * @returns `true` si el cliente fue eliminado, `false` si no se encontró.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'clientes'.
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
   * Actualiza los datos de un cliente existente.
   * @param id - Identificador único del cliente a actualizar.
   * @param datos - Objeto con los datos a actualizar.
   * @returns `true` si el cliente fue actualizado, `false` si no se encontró.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'clientes'.
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
   * Muestra por consola los clientes almacenados en el sistema.
   * Si no hay clientes, muestra un mensaje indicando que no hay registros.
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
   * Busca clientes por nombre.
   * @param nombre - Nombre del cliente a buscar.
   * @returns Lista de clientes que coinciden con el nombre.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'clientes'.
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
   * Busca clientes por raza.
   * @param raza - Raza del cliente a buscar.
   * @returns Lista de clientes que coinciden con la raza.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'clientes'.
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
   * Busca clientes por ubicación.
   * @param ubicacion - Ubicación del cliente a buscar.
   * @returns Lista de clientes que coinciden con la ubicación.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'clientes'.
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
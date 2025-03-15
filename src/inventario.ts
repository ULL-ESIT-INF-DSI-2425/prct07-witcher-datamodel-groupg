import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { IBien, Bien } from "../src/bien.js";
import { IMercader, Mercader } from "../src/mercader.js";
import { ICliente, Cliente } from "../src/cliente.js";
import { ITransaccion, Transaccion } from "../src/transaccion.js";
import { DataSchema } from "../src/database.js";

/**
 * Clase que representa el inventario
 */
export class Inventario {
  private db: LowSync<DataSchema>;

  constructor() {
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
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.bienes) {
      throw new Error("La base de datos no contiene la propiedad 'bienes'.");
    }
    this.db.data.bienes.push(bien);
    this.db.write();
  }

  /**
   * Obtiene todos los bienes.
   * @returns Lista de los bienes
   */
  getBienes(): Bien[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.bienes) {
      throw new Error("La base de datos no contiene la propiedad 'bienes'.");
    }
    return this.db.data.bienes;
  }

  /**
   * Elimina un bien.
   * @param id - id del bien a eliminar.
   */
  removeBien(id: string): boolean {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.bienes) {
      throw new Error("La base de datos no contiene la propiedad 'bienes'.");
    }
    const index = this.db.data.bienes.findIndex((b) => b.id === id);
    if (index === -1) {
      console.log("No se encontró el bien especificado en la base de datos.");
      return false;
    }
    this.db.data.bienes.splice(index, 1);
    this.db.write();
    return true;
  }

  /**
   * Actualiza un bien.
   * @param id - id del bien a actualizar.
   * @param datos - datos a actualizar.
   */
  updateBien(id: string, datos: Partial<IBien>): boolean {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.bienes) {
      throw new Error("La base de datos no contiene la propiedad 'bienes'.");
    }
    const index = this.db.data.bienes.findIndex((b) => b.id === id);
    if (index === -1) {
      console.log("No se encontró el bien especificado en la base de datos.");
      return false;
    }
    this.db.data.bienes[index] = { ...this.db.data.bienes[index], ...datos };
    this.db.write();
    return true;
  }

  /**
   * Muestra por pantalla los bienes almacenados.
   */
  showBienes() {
    const bienes = this.getBienes();
    if (bienes && bienes.length > 0) {
      console.table(bienes);
    } else {
      console.log("No hay bienes en el inventario.");
    }
  }

  /**
   * Busca un bienes dado del nombre y un orden.
   * @param nombre - nombre del bien a buscar.
   * @param ordenarPor - campo por el que ordenar.
   * @param orden - orden de la lista.
   * @returns Lista de bienes ordenada
   */
  buscarBienNombre(
    nombre: string,
    ordenarPor: "nombre" | "valor" = "nombre",
    orden: "asc" | "desc" = "asc",
  ): Bien[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.bienes) {
      throw new Error("La base de datos no contiene la propiedad 'bienes'.");
    }
    const bienes = this.db.data.bienes.filter((b) => b.nombre === nombre);
    bienes.sort((a, b) => {
      if (ordenarPor === "nombre") {
        if (orden === "asc") {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return b.nombre.localeCompare(a.nombre);
        }
      } else {
        if (orden === "asc") {
          return a.valor - b.valor;
        } else {
          return b.valor - a.valor;
        }
      }
    });
    return bienes;
  }

  /**
   * Busca un bienes dado de la descripción y un orden.
   * @param descripcion - descripción del bien a buscar.
   * @param ordenarPor - campo por el que ordenar.
   * @param orden - orden de la lista.
   * @returns Lista de bienes ordenada
   */
  buscarBienDescripcion(
    descripcion: string,
    ordenarPor: "descripcion" | "valor" = "descripcion",
    orden: "asc" | "desc" = "asc",
  ): Bien[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.bienes) {
      throw new Error("La base de datos no contiene la propiedad 'bienes'.");
    }
    const bienes = this.db.data.bienes.filter((b) =>
      b.descripcion.includes(descripcion),
    );
    bienes.sort((a, b) => {
      if (ordenarPor === "descripcion") {
        if (orden === "asc") {
          return a.descripcion.localeCompare(b.descripcion);
        } else {
          return b.descripcion.localeCompare(a.descripcion);
        }
      } else {
        if (orden === "asc") {
          return a.valor - b.valor;
        } else {
          return b.valor - a.valor;
        }
      }
    });
    return bienes;
  }

  /**
   * Busca un bienes dado del material y un orden.
   * @param material - material del bien a buscar.
   * @param ordenarPor - campo por el que ordenar.
   * @param orden - orden de la lista.
   * @returns Lista de bienes ordenada
   */
  buscarBienMaterial(
    material: string,
    ordenarPor: "material" | "valor" = "material",
    orden: "asc" | "desc" = "asc",
  ): Bien[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.bienes) {
      throw new Error("La base de datos no contiene la propiedad 'bienes'.");
    }
    const bienes = this.db.data.bienes.filter((b) => b.material === material);
    bienes.sort((a, b) => {
      if (ordenarPor === "material") {
        if (orden === "asc") {
          return a.material.localeCompare(b.material);
        } else {
          return b.material.localeCompare(a.material);
        }
      } else {
        if (orden === "asc") {
          return a.valor - b.valor;
        } else {
          return b.valor - a.valor;
        }
      }
    });
    return bienes;
  }

  /**
   * Añade un nuevo mercader.
   * @param bien - bien a añadir.
   */
  addMercader(mercader: Mercader) {
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.mercaderes) {
      throw new Error(
        "La base de datos no contiene la propiedad 'mercaderes'.",
      );
    }
    this.db.data.mercaderes.push(mercader);
    this.db.write();
  }

  /**
   * Obtiene todos los mercaderes.
   * @returns Lista de los mercaderes
   */
  getMercaderes(): Mercader[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.mercaderes) {
      throw new Error(
        "La base de datos no contiene la propiedad 'mercaderes'.",
      );
    }
    return this.db.data.mercaderes;
  }

  /**
   * Elimina un mercader.
   * @param id - id del mercader a eliminar.
   */
  removeMercader(id: string): boolean {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.mercaderes) {
      throw new Error(
        "La base de datos no contiene la propiedad 'mercaderes'.",
      );
    }
    const index = this.db.data.mercaderes.findIndex((m) => m.id === id);
    if (index === -1) {
      console.log(
        "No se encontró el mercader especificado en la base de datos.",
      );
      return false;
    }
    this.db.data.mercaderes.splice(index, 1);
    this.db.write();
    return true;
  }

  /**
   * Actualiza un mercader.
   * @param id - id del mercader a actualizar.
   * @param datos - datos a actualizar.
   */
  updateMercader(id: string, datos: Partial<IMercader>): boolean {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.mercaderes) {
      throw new Error(
        "La base de datos no contiene la propiedad 'mercaderes'.",
      );
    }
    const index = this.db.data.mercaderes.findIndex((m) => m.id === id);
    if (index === -1) {
      console.log(
        "No se encontró el mercader especificado en la base de datos.",
      );
      return false;
    }
    this.db.data.mercaderes[index] = {
      ...this.db.data.mercaderes[index],
      ...datos,
    };
    this.db.write();
    return true;
  }

  /**
   * Muestra por pantalla los mercaderes almacenados.
   */
  showMercaderes() {
    const mercaderes = this.getMercaderes();
    if (mercaderes && mercaderes.length > 0) {
      console.table(mercaderes);
    } else {
      console.log("No hay mercaderes registrados.");
    }
  }

  /**
   * Busca un mercader dado del nombre.
   * @param nombre - nombre del mercader a buscar.
   * @returns Lista de mercaderes
   */
  buscarMercaderNombre(nombre: string): Mercader[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.mercaderes) {
      throw new Error(
        "La base de datos no contiene la propiedad 'mercaderes'.",
      );
    }
    const mercaderes = this.db.data.mercaderes.filter(
      (m) => m.nombre === nombre,
    );
    return mercaderes;
  }

  /**
   * Busca un mercader dado de la ubicación.
   * @param ubicacion - ubicación del mercader a buscar.
   * @returns Lista de mercaderes
   */
  buscarMercaderUbicacion(ubicacion: string): Mercader[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.mercaderes) {
      throw new Error(
        "La base de datos no contiene la propiedad 'mercaderes'.",
      );
    }
    const mercaderes = this.db.data.mercaderes.filter(
      (m) => m.ubicacion === ubicacion,
    );
    return mercaderes;
  }

  /**
   * Busca un mercader dado del tipo.
   * @param tipo - tipo del mercader a buscar.
   * @returns Lista de mercaderes
   */
  buscarMercaderTipo(tipo: string): Mercader[] {
    this.db.read();
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.mercaderes) {
      throw new Error(
        "La base de datos no contiene la propiedad 'mercaderes'.",
      );
    }
    const mercaderes = this.db.data.mercaderes.filter((m) => m.tipo === tipo);
    return mercaderes;
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
  buscarClienteNombre(nombre: string): Cliente[] {
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
  buscarClienteRaza(raza: string): Cliente[] {
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
  buscarClienteUbicacion(ubicacion: string): Cliente[] {
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

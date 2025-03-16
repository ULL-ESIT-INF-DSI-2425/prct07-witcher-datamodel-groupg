import { LowSync } from "lowdb";
import { Mercader, IMercader } from "./mercader.js";
import { DataSchema } from "./database.js";

/**
 * Clase que gestiona las operaciones de mercaderes.
 */
export class MercaderManager {
  private db: LowSync<DataSchema>;

  constructor(db: LowSync<DataSchema>) {
    this.db = db;
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
  searchMercaderNombre(nombre: string): Mercader[] {
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
  searchMercaderUbicacion(ubicacion: string): Mercader[] {
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
  searchMercaderTipo(tipo: string): Mercader[] {
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
}
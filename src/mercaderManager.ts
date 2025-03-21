import { LowSync } from "lowdb";
import { Mercader, IMercader } from "./mercader.js";
import { DataSchema } from "./database.js";

/**
 * Clase que gestiona las operaciones de mercaderes.
 */
export class MercaderManager {
  private readonly db: LowSync<DataSchema>;

  /**
   * Crea una instancia de MercaderManager.
   * @param db - Instancia de la base de datos.
   */
  constructor(db: LowSync<DataSchema>) {
    this.db = db;
  }

  /**
   * Añade un nuevo mercader.
   * @param mercader - Mercader a añadir.
   * @throws Error si la base de datos no está inicializada, no contiene la propiedad 'mercaderes' o si el mercader ya existe.
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
    if (this.db.data.mercaderes.some((m) => m.id === mercader.id)) {
      throw new Error("El mercader ya existe.");
    }
    this.db.data.mercaderes.push(mercader);
    this.db.write();
  }

  /**
   * Obtiene todos los mercaderes.
   * @returns Lista de los mercaderes.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'mercaderes'.
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
   * @param id - Identificador único del mercader a eliminar.
   * @returns `true` si el mercader fue eliminado, `false` si no se encontró.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'mercaderes'.
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
   * @param id - Identificador único del mercader a actualizar.
   * @param datos - Objeto con los datos a actualizar.
   * @returns `true` si el mercader fue actualizado, `false` si no se encontró.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'mercaderes'.
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
   * Si no hay mercaderes, muestra un mensaje indicando que no hay registros.
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
   * Busca mercaderes por nombre.
   * @param nombre - Nombre del mercader a buscar.
   * @returns Lista de mercaderes que coinciden con el nombre.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'mercaderes'.
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
   * Busca mercaderes por ubicación.
   * @param ubicacion - Ubicación del mercader a buscar.
   * @returns Lista de mercaderes que coinciden con la ubicación.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'mercaderes'.
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
   * Busca mercaderes por tipo.
   * @param tipo - Tipo del mercader a buscar.
   * @returns Lista de mercaderes que coinciden con el tipo.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'mercaderes'.
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

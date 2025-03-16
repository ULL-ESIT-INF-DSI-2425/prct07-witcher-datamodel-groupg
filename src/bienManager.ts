import { LowSync } from "lowdb";
import { DataSchema } from "./database.js";
import { Bien, IBien } from "./bien.js";

/**
 * Clase que gestiona las operaciones de bienes.
 */
export class BienManager {
  private db: LowSync<DataSchema>;

  constructor(db: LowSync<DataSchema>) {
    this.db = db;
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
  searchBienNombre(
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
  searchBienDescripcion(
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
  searchBienMaterial(
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
}
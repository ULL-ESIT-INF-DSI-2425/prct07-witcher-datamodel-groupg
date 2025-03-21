import { LowSync } from "lowdb";
import { DataSchema } from "./database.js";
import { Bien, IBien } from "./bien.js";

/**
 * Clase que gestiona las operaciones de bienes.
 */
export class BienManager {
  private readonly db: LowSync<DataSchema>;

  /**
   * Crea una instancia de BienManager.
   * @param db - Instancia de la base de datos.
   */
  constructor(db: LowSync<DataSchema>) {
    this.db = db;
  }

  /**
   * Añade un nuevo bien al inventario.
   * @param bien - Objeto de tipo Bien que se desea añadir.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'bienes'.
   */
  addBien(bien: Bien) {
    if (!this.db.data) {
      throw new Error("La base de datos no está inicializada.");
    }
    if (!this.db.data.bienes) {
      throw new Error("La base de datos no contiene la propiedad 'bienes.");
    }
    if (this.db.data.bienes.find((b) => b.id === bien.id)) {
      throw new Error("El bien ya existe.");
    }
    this.db.data.bienes.push(bien);
    this.db.write();
  }

  /**
   * Obtiene todos los bienes almacenados en la base de datos.
   * @returns Lista de objetos de tipo Bien.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'bienes'.
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
   * Elimina un bien del inventario.
   * @param id - Identificador único del bien a eliminar.
   * @returns `true` si el bien fue eliminado, `false` si no se encontró.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'bienes'.
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
   * Actualiza un bien existente en el inventario.
   * @param id - Identificador único del bien a actualizar.
   * @param datos - Objeto con los datos a actualizar.
   * @returns `true` si el bien fue actualizado, `false` si no se encontró.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'bienes'.
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
   * Muestra por consola los bienes almacenados en el inventario.
   * Si no hay bienes, muestra un mensaje indicando que el inventario está vacío.
   * @param type - Tipo de ordenación: "Por coronas" o "Alfabeticamente".
   * @param order - Orden de la lista: "Ascendente" o "Descendente".
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'bienes'.
   */
  showBienes(
    type: "Por coronas" | "Alfabeticamente",
    order: "Ascendente" | "Descendente",
  ) {
    const bienes = this.getBienes();
    if (bienes && bienes.length > 0) {
      bienes.sort((a, b) => {
        let comparison = 0;
        if (type === "Por coronas") {
          comparison = a.valor - b.valor;
        } else if (type === "Alfabeticamente") {
          comparison = a.nombre.localeCompare(b.nombre);
        }
        return order === "Ascendente" ? comparison : -comparison;
      });
      console.table(bienes);
    } else {
      console.log("No hay bienes en el inventario.");
    }
  }

  /**
   * Busca bienes por nombre y los ordena.
   * @param nombre - Nombre del bien a buscar.
   * @param ordenarPor - Campo por el que ordenar los resultados. Por defecto, "nombre".
   * @param orden - Orden de la lista: "asc" (ascendente) o "desc" (descendente). Por defecto, "asc".
   * @returns Lista de bienes ordenada.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'bienes'.
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
        return orden === "asc"
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre);
      }
      return orden === "asc" ? a.valor - b.valor : b.valor - a.valor;
    });
    return bienes;
  }

  /**
   * Busca bienes por descripción y los ordena.
   * @param descripcion - Descripción del bien a buscar.
   * @param ordenarPor - Campo por el que ordenar los resultados. Por defecto, "descripcion".
   * @param orden - Orden de la lista: "asc" (ascendente) o "desc" (descendente). Por defecto, "asc".
   * @returns Lista de bienes ordenada.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'bienes'.
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
        return orden === "asc"
          ? a.descripcion.localeCompare(b.descripcion)
          : b.descripcion.localeCompare(a.descripcion);
      }
      return orden === "asc" ? a.valor - b.valor : b.valor - a.valor;
    });
    return bienes;
  }

  /**
   * Busca bienes por material y los ordena.
   * @param material - Material del bien a buscar.
   * @param ordenarPor - Campo por el que ordenar los resultados. Por defecto, "material".
   * @param orden - Orden de la lista: "asc" (ascendente) o "desc" (descendente). Por defecto, "asc".
   * @returns Lista de bienes ordenada.
   * @throws Error si la base de datos no está inicializada o no contiene la propiedad 'bienes'.
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
        return orden === "asc"
          ? a.material.localeCompare(b.material)
          : b.material.localeCompare(a.material);
      }
      return orden === "asc" ? a.valor - b.valor : b.valor - a.valor;
    });
    return bienes;
  }
}

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { BienManager } from "./bienManager.js";
import { MercaderManager } from "./mercaderManager.js";
import { ClienteManager } from "./clienteManager.js";
import { TransaccionManager } from "./transaccionManager.js";
import { DataSchema } from "../src/database.js";

/**
 * Clase que representa el inventario.
 * Gestiona los bienes, mercaderes, clientes y transacciones utilizando sus respectivos managers.
 */
export class Inventario {
  private db: LowSync<DataSchema>;
  private bienManager: BienManager;
  private mercaderManager: MercaderManager;
  private clienteManager: ClienteManager;
  private transaccionManager: TransaccionManager;

  /**
   * Crea una nueva instancia de la clase Inventario.
   * @param dbFileName - Nombre del archivo de la base de datos. Si no se proporciona, se usará "./database.json".
   */
  constructor(dbFileName?: string) {
    const fileName = dbFileName || "./database.json";
    this.db = new LowSync<DataSchema>(new JSONFileSync(fileName));

    this.db.read();
    this.db.data ||= {
      bienes: [],
      mercaderes: [],
      clientes: [],
      transacciones: [],
    };
    this.db.write();
    // Inicializar los manager para que utilicen la misma db
    this.bienManager = new BienManager(this.db);
    this.mercaderManager = new MercaderManager(this.db);
    this.clienteManager = new ClienteManager(this.db);
    this.transaccionManager = new TransaccionManager(this.db);
  }

  /**
   * Getter del manager de bienes.
   * @returns Instancia del manager de bienes.
   */
  getBienManager(): BienManager {
    return this.bienManager;
  }

  /**
   * Getter del manager de mercaderes.
   * @returns Instancia del manager de mercaderes.
   */
  getMercaderManager(): MercaderManager {
    return this.mercaderManager;
  }

  /**
   * Getter del manager de clientes.
   * @returns Instancia del manager de clientes.
   */
  getClienteManager(): ClienteManager {
    return this.clienteManager;
  }

  /**
   * Getter del manager de transacciones.
   * @returns Instancia del manager de transacciones.
   */
  getTransaccionManager(): TransaccionManager {
    return this.transaccionManager;
  }
}

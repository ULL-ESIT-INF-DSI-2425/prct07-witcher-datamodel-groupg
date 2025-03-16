import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { BienManager } from "./bienManager.js";
import { MercaderManager } from "./mercaderManager.js";
import { ClienteManager } from "./clienteManager.js";
import { TransaccionManager } from "./transaccionManager.js";
import { DataSchema } from "../src/database.js";

/**
 * Clase que representa el inventario
 */
export class Inventario {
  private db: LowSync<DataSchema>;
  private bienManager: BienManager;
  private mercaderManager: MercaderManager;
  private clienteManager: ClienteManager;
  private transaccionManager: TransaccionManager;

  constructor(dbFileName?: string) {
    const fileName = dbFileName || "test-db.json";
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
   * @returns manager de bienes.
   */
  getBienManager(): BienManager {
    return this.bienManager;
  }

  /**
   * Getter del manager de mercaderes.
   * @returns manager de mercaderes.
   */
  getMercaderManager(): MercaderManager {
    return this.mercaderManager;
  }

  /**
   * Getter del manager de clientes.
   * @returns manager de clientes.
   */
  getClienteManager(): ClienteManager {
    return this.clienteManager;
  }

  /**
   * Getter del manager de transacciones.
   * @returns manager de transacciones.
   */
  getTransaccionManager(): TransaccionManager {
    return this.transaccionManager;
  }
}

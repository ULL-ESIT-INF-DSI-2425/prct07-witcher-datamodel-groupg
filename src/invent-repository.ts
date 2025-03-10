import inquirer from 'inquirer';
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';
import { Item, Merchant, Client, Transaction, DatabaseSchema } from './interfaces';

const db = new LowSync<DatabaseSchema>(new JSONFileSync("db.json"), { items: [], merchants: [], clients: [], transactions: [] });
db.read();
db.data ||= { items: [], merchants: [], clients: [], transactions: [] };

/**
 * Clase que representa un repositorio de inventario.
 */
export class InventoryRepository {
  private db: DatabaseSchema;

  /**
   * Crea una instancia de InventoryRepository.
   * @param database - La base de datos a utilizar.
   */
  constructor(database: DatabaseSchema) {
    this.db = database;
  }

  /**
   * Añade un nuevo ítem al inventario.
   * @param item - El ítem a añadir.
   */
  addItem(item: Item) {
    this.db.items.push(item);
  }

  /**
   * Obtiene todos los ítems del inventario.
   * @returns Una lista de ítems.
   */
  getItems(): Item[] {
    return this.db.items;
  }

  /**
   * Añade un nuevo comerciante.
   * @param merchant - El comerciante a añadir.
   */
  addMerchant(merchant: Merchant) {
    this.db.merchants.push(merchant);
  }

  /**
   * Obtiene todos los comerciantes.
   * @returns Una lista de comerciantes.
   */
  getMerchants(): Merchant[] {
    return this.db.merchants;
  }

  /**
   * Añade un nuevo cliente.
   * @param client - El cliente a añadir.
   */
  addClient(client: Client) {
    this.db.clients.push(client);
  }

  /**
   * Obtiene todos los clientes.
   * @returns Una lista de clientes.
   */
  getClients(): Client[] {
    return this.db.clients;
  }

  /**
   * Añade una nueva transacción.
   * @param transaction - La transacción a añadir.
   */
  addTransaction(transaction: Transaction) {
    this.db.transactions.push(transaction);
  }

  /**
   * Obtiene todas las transacciones.
   * @returns Una lista de transacciones.
   */
  getTransactions(): Transaction[] {
    return this.db.transactions;
  }
}

/**
 * Clase que representa un servicio de inventario.
 */
class InventoryService {
  /**
   * 
   * @param repository - El repositorio de inventario a utilizar.
   */
  constructor(private repository: InventoryRepository) {}

  /**
   * Lista todos los ítems del inventario.
   */
  listItems(): void {
      console.log("Lista de bienes:");
      this.repository.getItems().forEach(item => {
          console.log(`${item.name} - ${item.description} - ${item.value} coronas`);
      });
  }

  /**
   * Añade un nuevo ítem al inventario.
   */
  async addItem() {
      const answers = await inquirer.prompt([
          { type: 'input', name: 'name', message: 'Nombre del bien:' },
          { type: 'input', name: 'description', message: 'Descripción:' },
          { type: 'input', name: 'material', message: 'Material:' },
          { type: 'number', name: 'weight', message: 'Peso:' },
          { type: 'number', name: 'value', message: 'Valor en coronas:' }
      ]);
      
      const newItem: Item = {
          id: uuidv4(),
          ...answers
      };
      
      this.repository.addItem(newItem);
      console.log("Bien añadido exitosamente.");
  }
}

/**
 * Función principal que muestra el menú principal.
 */
async function mainMenu() {
  const inventory = new InventoryRepository(db.data);
  const service = new InventoryService(inventory);

  while (true) {
      const { action } = await inquirer.prompt([
          {
              type: 'list',
              name: 'action',
              message: 'Seleccione una opción:',
              choices: ['Listar bienes', 'Añadir bien', 'Salir']
          }
      ]);

      if (action === 'Listar bienes') {
          service.listItems();
      } else if (action === 'Añadir bien') {
          await service.addItem();
      } else {
          break;
      }
  }
}

mainMenu();

import inquirer from 'inquirer';
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';
import { Item, Merchant, Client, Transaction, DatabaseSchema } from './interfaces';


/**
 * Clase que representa un repositorio de inventario.
 */
export class InventoryRepository {
  //meter la db en el constructor
  private db: LowSync<DatabaseSchema>;
  constructor() {
    this.db = new LowSync<DatabaseSchema>(new JSONFileSync("test-db.json"), { items: [], merchants: [], clients: [], transactions: [] });
    this.db.read();
    this.db.data ||= { items: [], merchants: [], clients: [], transactions: [] };
    this.db.write();
  }
  /**
   * Añade un nuevo ítem al inventario.
   * @param item - El ítem a añadir.
   */
  addItem(item: Item) {
    this.db.read();
    this.db.data.items.push(item);
    this.db.write();
  }

  /**
   * Obtiene todos los ítems del inventario.
   * @returns Una lista de ítems.
   */
  getItems(): Item[] {
    this.db.read();
    return this.db.data.items;
  }

  /**
   * Añade un nuevo comerciante.
   * @param merchant - El comerciante a añadir.
   */
  addMerchant(merchant: Merchant) {
    this.db.read();
    this.db.data.merchants.push(merchant);
    this.db.write();
  }

  /**
   * Obtiene todos los comerciantes.
   * @returns Una lista de comerciantes.
   */
  getMerchants(): Merchant[] {
    this.db.read();
    return this.db.data.merchants;
  }
  /**
   * Añade un nuevo cliente.
   * @param client - El cliente a añadir.
   */
  addClient(client: Client) {
    this.db.read();
    this.db.data.clients.push(client);
    this.db.write();
  }

  /**
   * Obtiene todos los clientes.
   * @returns Una lista de clientes.
   */
  getClients(): Client[] {
    this.db.read();
    return this.db.data.clients;
  }

  /**
   * Añade una nueva transacción.
   * @param transaction - La transacción a añadir.
   */
  addTransaction(transaction: Transaction) {
    this.db.read();
    this.db.data.transactions.push(transaction);
    this.db.write();
  }

  /**
   * Obtiene todas las transacciones.
   * @returns Una lista de transacciones.
   */
  getTransactions(): Transaction[] {
    this.db.read();
    return this.db.data.transactions.map(transaction => ({
        ...transaction,
        date: new Date(transaction.date) // Convertir la fecha almacenada en string de nuevo a Date
    }));
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
    const items = this.repository.getItems();
    if (items.length === 0) {
        console.log("No hay bienes en el inventario.");
    } else {
        items.forEach(item => {
            console.log(`${item.name} - ${item.description} - ${item.value} coronas`);
        });
    }
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
  const inventory = new InventoryRepository();
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

import inquirer from 'inquirer';
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { Item, Merchant, Client, Transaction, DatabaseSchema } from './interfaces';

const db = new LowSync<DatabaseSchema>(new JSONFileSync("db.json"), { items: [], merchants: [], clients: [], transactions: [] });
db.read();
db.data ||= { items: [], merchants: [], clients: [], transactions: [] };

export class InventoryRepository {
  private db: DatabaseSchema;

  constructor(database: DatabaseSchema) {
    this.db = database;
  }

  addItem(item: Item) {
      this.db.items.push(item);
  }

  getItems(): Item[] {
      return this.db.items;
  }

  addMerchant(merchant: Merchant) {
      this.db.merchants.push(merchant);
  }

  getMerchants(): Merchant[] {
      return this.db.merchants;
  }

  addClient(client: Client) {
      this.db.clients.push(client);
  }

  getClients(): Client[] {
      return this.db.clients;
  }

  addTransaction(transaction: Transaction) {
      this.db.transactions.push(transaction);
  }

  getTransactions(): Transaction[] {
      return this.db.transactions;
  }
}

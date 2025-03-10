import { describe, it, expect, beforeEach } from 'vitest';
import { Item, Merchant, Client, Transaction } from '../src/interfaces';
import { InventoryRepository } from '../src/invent-repository';
import fs from 'fs';

const TEST_DB_PATH = 'test-db.json';

// Función para limpiar la base de datos de pruebas antes de cada test
function resetTestDatabase() {
  fs.writeFileSync(TEST_DB_PATH, JSON.stringify({ items: [], merchants: [], clients: [], transactions: [] }, null, 2));
}

describe('InventoryRepository', () => {
  let repository: InventoryRepository;

  beforeEach(() => { 
    resetTestDatabase(); // Limpia test-db.json antes de cada prueba
    repository = new InventoryRepository();
  });

  it('should add and get items', () => {
    const item: Item = { id: '1', name: 'Sword', description: 'A sharp blade', material: 'Steel', weight: 3, value: 100 };
    repository.addItem(item);
    const items = repository.getItems();
    expect(items).toContainEqual(item);
  });

  it('should add and get merchants', () => {
    const merchant: Merchant = { id: '1', name: 'John', location: 'Market', type: 'Blacksmith' };
    repository.addMerchant(merchant);
    const merchants = repository.getMerchants();
    expect(merchants).toContainEqual(merchant);
  });

  it('should add and get clients', () => {
    const client: Client = { id: '1', name: 'Doe', location: 'City', race: 'Human' };
    repository.addClient(client);
    const clients = repository.getClients();
    expect(clients).toContainEqual(client);
  });

  it('should add and get transactions', () => {
    const transaction: Transaction = { id: '1', clientId: '1', merchantId: '1', date: new Date(), total: 100, type: 'sale', items: [] };
    repository.addTransaction(transaction);
    const transactions = repository.getTransactions();
    expect(transactions).toContainEqual(transaction);
    resetTestDatabase();
  });
});

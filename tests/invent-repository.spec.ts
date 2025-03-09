import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Item, Merchant, Client, Transaction } from '../src/interfaces';
import { InventoryRepository } from '../src/invent-repository';

const mockDb = {
  items: [] as Item[],
  merchants: [] as Merchant[],
  clients: [] as Client[],
  transactions: [] as Transaction[],
};

describe('InventoryRepository', () => {
  let inventoryRepository: InventoryRepository;

  beforeEach(() => {
    // Reset mock database before each test
    mockDb.items = [];
    mockDb.merchants = [];
    mockDb.clients = [];
    mockDb.transactions = [];
    
    // Inject mockDb into repository
    inventoryRepository = new InventoryRepository(mockDb);
  });

  it('should add an item', () => {
    const item: Item = { id: '1', name: 'Sword', value: 100, description: 'A sharp blade', material: 'steel', weight: 3.5 };
    inventoryRepository.addItem(item);
    expect(mockDb.items).toContain(item);
  });

  it('should get items', () => {
    const item: Item = { id: '1', name: 'Sword', value: 100, description: 'A sharp blade', material: 'steel', weight: 3.5 };
    mockDb.items.push(item);
    const items = inventoryRepository.getItems();
    expect(items).toContain(item);
  });

  it('should add a merchant', () => {
    const merchant: Merchant = { id: '1', name: 'Geralt', type: 'blacksmith', location: 'Novigrad' };
    inventoryRepository.addMerchant(merchant);
    expect(mockDb.merchants).toContain(merchant);
  });

  it('should get merchants', () => {
    const merchant: Merchant = { id: '1', name: 'Geralt', type: 'blacksmith', location: 'Novigrad' };
    mockDb.merchants.push(merchant);
    const merchants = inventoryRepository.getMerchants();
    expect(merchants).toContain(merchant);
  });

  it('should add a client', () => {
    const client: Client = { id: '1', name: 'Yennefer', race: 'human', location: 'Vengerberg' };
    inventoryRepository.addClient(client);
    expect(mockDb.clients).toContain(client);
  });

  it('should get clients', () => {
    const client: Client = { id: '1', name: 'Yennefer', race: 'human', location: 'Vengerberg' };
    mockDb.clients.push(client);
    const clients = inventoryRepository.getClients();
    expect(clients).toContain(client);
  });

  it('should add a transaction', () => {
    const transaction: Transaction = { id: '1', date: new Date(), items: [], total: 0, type: 'sale', merchantId: '1', clientId: '1' };
    inventoryRepository.addTransaction(transaction);
    expect(mockDb.transactions).toContain(transaction);
  });

  it('should get transactions', () => {
    const transaction: Transaction = { id: '1', date: new Date(), items: [], total: 0, type: 'sale', merchantId: '1', clientId: '1' };
    mockDb.transactions.push(transaction);
    const transactions = inventoryRepository.getTransactions();
    expect(transactions).toContain(transaction);
  });
});

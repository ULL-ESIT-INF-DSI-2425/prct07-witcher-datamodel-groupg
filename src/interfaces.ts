// Importación de módulos
import inquirer from 'inquirer';
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';

// Interfaces y Modelos
export interface Item {
    id: string;
    name: string;
    description: string;
    material: string;
    weight: number;
    value: number;
}

export interface Merchant {
    id: string;
    name: string;
    type: string;
    location: string;
}

export interface Client {
    id: string;
    name: string;
    race: string;
    location: string;
}

export interface Transaction {
    id: string;
    date: Date;
    clientId?: string;
    merchantId?: string;
    items: Item[];
    total: number;
    type: "sale" | "purchase" | "return";
}

// Configuración de Lowdb
export interface DatabaseSchema {
    items: Item[];
    merchants: Merchant[];
    clients: Client[];
    transactions: Transaction[];
}


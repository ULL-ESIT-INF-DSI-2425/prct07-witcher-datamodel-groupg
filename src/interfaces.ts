// Importación de módulos
import inquirer from 'inquirer';
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';

/**
 * Representa un ítem en el inventario.
 */
export interface Item {
    /**
     * Identificador único del ítem.
     */
    id: string;

    /**
     * Nombre del ítem.
     */
    name: string;

    /**
     * Descripción del ítem.
     */
    description: string;

    /**
     * Material del que está hecho el ítem.
     */
    material: string;

    /**
     * Peso del ítem.
     */
    weight: number;

    /**
     * Valor del ítem.
     */
    value: number;
}

/**
 * Representa un comerciante.
 */
export interface Merchant {
    /**
     * Identificador único del comerciante.
     */
    id: string;

    /**
     * Nombre del comerciante.
     */
    name: string;

    /**
     * Tipo de comerciante (e.g., herrero, alquimista).
     */
    type: string;

    /**
     * Ubicación del comerciante.
     */
    location: string;
}

/**
 * Representa un cliente.
 */
export interface Client {
    /**
     * Identificador único del cliente.
     */
    id: string;

    /**
     * Nombre del cliente.
     */
    name: string;

    /**
     * Raza del cliente (e.g., humano, elfo).
     */
    race: string;

    /**
     * Ubicación del cliente.
     */
    location: string;
}

/**
 * Representa una transacción.
 */
export interface Transaction {
    /**
     * Identificador único de la transacción.
     */
    id: string;

    /**
     * Fecha de la transacción.
     */
    date: Date;

    /**
     * Identificador del cliente asociado a la transacción (opcional).
     */
    clientId?: string;

    /**
     * Identificador del comerciante asociado a la transacción (opcional).
     */
    merchantId?: string;

    /**
     * Lista de ítems involucrados en la transacción.
     */
    items: Item[];

    /**
     * Total de la transacción.
     */
    total: number;

    /**
     * Tipo de transacción (venta, compra, devolución).
     */
    type: "sale" | "purchase" | "return";
}

/**
 * Esquema de la base de datos para Lowdb.
 */
export interface DatabaseSchema {
    /**
     * Lista de ítems en la base de datos.
     */
    items: Item[];

    /**
     * Lista de comerciantes en la base de datos.
     */
    merchants: Merchant[];

    /**
     * Lista de clientes en la base de datos.
     */
    clients: Client[];

    /**
     * Lista de transacciones en la base de datos.
     */
    transactions: Transaction[];
}
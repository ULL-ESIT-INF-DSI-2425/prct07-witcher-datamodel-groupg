import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initDB, db } from '../src/database';

// Mocking LowSync and JSONFileSync to check constructor arguments
vi.mock('lowdb', () => {
  const mockLowSync = vi.fn().mockImplementation((adapter) => {
    return {
      read: vi.fn(),
      write: vi.fn(),
      data: null,
    };
  });

  return {
    LowSync: mockLowSync,
    JSONFileSync: vi.fn().mockImplementation(() => ({ file: 'database-test.json' })),
  };
});

describe('Database Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize the database with empty data if none exists', async () => {
    db.read = vi.fn();
    db.write = vi.fn();
    db.data = null;

    await initDB();

    expect(db.read).toHaveBeenCalled();
    expect(db.data).toEqual({
      bienes: [],
      mercaderes: [],
      clientes: [],
      transacciones: [],
    });
    expect(db.write).toHaveBeenCalled();
  });

  it('should not overwrite existing data during initialization', async () => {
    const existingData = {
      bienes: [
        {
          id: "1",
          nombre: "Bien1",
          descripcion: "Descripción del Bien1",
          material: "Material1",
          peso: 10,
          valor: 100
        }
      ],
      mercaderes: [
        {
          id: "1",
          nombre: "Mercader1",
          tipo: "Tipo1",
          ubicacion: "Ubicacion1"
        }
      ],
      clientes: [
        {
          id: "1",
          nombre: "Cliente1",
          raza: "Humano",
          ubicacion: "Ciudad1"
        }
      ],
      transacciones: [
        {
          id: "1",
          tipo: "venta" as "venta",
          fecha: new Date(),
          bienes: [
            {
              id: "1",
              nombre: "Bien1",
              descripcion: "Descripción del Bien1",
              material: "Material1",
              peso: 10,
              valor: 100
            }
          ],
          cantidadCoronas: 100,
          involucrado: {
            id: "1",
            nombre: "Cliente1",
            raza: "Humano",
            ubicacion: "Ciudad1"
          }
        }
      ]      
    };

    db.read = vi.fn();
    db.write = vi.fn();
    db.data = existingData;

    await initDB();

    expect(db.read).toHaveBeenCalled();
    expect(db.data).toEqual(existingData);
    expect(db.write).not.toHaveBeenCalled();
  });
});

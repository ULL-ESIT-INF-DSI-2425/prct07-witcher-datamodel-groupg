import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Inventario } from '../src/inventario';
import { Cliente } from '../src/cliente';

describe('ClienteManager', () => {
  let inventario: Inventario;
  const cliente1 = new Cliente('Cliente1', 'Raza1', 'Ciudad1');
  const cliente2 = new Cliente('Cliente2', 'Raza2', 'Ciudad2');

  beforeEach(() => {
    inventario = new Inventario('test-clientes.json');
    inventario.getClienteManager().addCliente(cliente1);
    inventario.getClienteManager().addCliente(cliente2);
  });

  afterEach(() => {
    const clientes = inventario.getClienteManager().getClientes();
    if (clientes.some((c) => c.id === cliente1.id)) {
      inventario.getClienteManager().removeCliente(cliente1.id);
    }
    if (clientes.some((c) => c.id === cliente2.id)) {
      inventario.getClienteManager().removeCliente(cliente2.id);
    }
  });

  it('should find a cliente by name', () => {
    const result = inventario.getClienteManager().searchClienteNombre('Cliente1');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(cliente1);
  });

  it('should return an empty array if no cliente with the given name exists', () => {
    const result = inventario.getClienteManager().searchClienteNombre('ClienteInexistente');
    expect(result).toEqual([]);
  });

  it('should find a cliente by race', () => {
    const result = inventario.getClienteManager().searchClienteRaza('Raza1');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(cliente1);
  });

  it('should return an empty array if no cliente with the given race exists', () => {
    const result = inventario.getClienteManager().searchClienteRaza('RazaInexistente');
    expect(result).toEqual([]);
  });

  it('should find a cliente by location', () => {
    const result = inventario.getClienteManager().searchClienteUbicacion('Ciudad1');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(cliente1);
  });

  it('should return an empty array if no cliente with the given location exists', () => {
    const result = inventario.getClienteManager().searchClienteUbicacion('CiudadInexistente');
    expect(result).toEqual([]);
  });

  it('should prevent adding a duplicate cliente', () => {
    expect(() => inventario.getClienteManager().addCliente(cliente1)).toThrowError("El cliente ya existe.");
  });

  it('should display clientes in console', () => {
    const consoleSpy = vi.spyOn(console, 'table');
    inventario.getClienteManager().showClientes();
    expect(consoleSpy).toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it('should handle showClientes with no clientes', () => {
    inventario.getClienteManager().removeCliente(cliente1.id);
    inventario.getClienteManager().removeCliente(cliente2.id);

    const consoleSpy = vi.spyOn(console, 'log');
    inventario.getClienteManager().showClientes();
    expect(consoleSpy).toHaveBeenCalledWith("No hay clientes registrados.");
    vi.restoreAllMocks();
  });

  it('should update a cliente by id', () => {
    const result = inventario.getClienteManager().updateCliente(cliente1.id, { ubicacion: 'NuevaCiudad' });
    expect(result).toBe(true);
    const clientes = inventario.getClienteManager().getClientes();
    expect(clientes.find((c) => c.id === cliente1.id)?.ubicacion).toBe('NuevaCiudad');
  });

  it('should handle updating a non-existent cliente gracefully', () => {
    const result = inventario.getClienteManager().updateCliente('non-existent-id', { ubicacion: 'NuevaCiudad' });
    expect(result).toBe(false);
  });

  it('should handle removing a non-existent cliente gracefully', () => {
    const result = inventario.getClienteManager().removeCliente('non-existent-id');
    expect(result).toBe(false);
  });

  it('should handle search when database is not initialized', () => {
    inventario['db'].data = null;
    const result = inventario.getClienteManager().searchClienteNombre('ClienteInexistente');
    expect(result).toEqual([]);
  });

  it('should throw an error when the database is not initialized (getClientes)', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() => inventario.getClienteManager().getClientes()).toThrowError("La base de datos no está inicializada.");
    vi.restoreAllMocks();
  });

  it('should throw an error when the database is not initialized (addCliente)', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    const cliente = { nombre: 'Juan', raza: 'Humano', ubicacion: 'Novigrado' };
    expect(() => inventario.getClienteManager().addCliente(cliente1)).toThrowError("La base de datos no está inicializada.");
    vi.restoreAllMocks();
  });

  it('should throw an error when the database is not initialized (removeCliente)', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() => inventario.getClienteManager().removeCliente('123')).toThrowError("La base de datos no está inicializada.");
    vi.restoreAllMocks();
  });

  it('should throw an error when the database is not initialized (updateCliente)', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    const updateData = { nombre: 'Carlos' };
    expect(() => inventario.getClienteManager().updateCliente('123', updateData)).toThrowError("La base de datos no está inicializada.");
    vi.restoreAllMocks();
  });

  it('should throw an error when the database is not initialized (searchClienteNombre)', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() => inventario.getClienteManager().searchClienteNombre('Juan')).toThrowError("La base de datos no está inicializada.");
    vi.restoreAllMocks();
  });

  it('should throw an error when database is not initialized', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() => inventario.getClienteManager().getClientes()).toThrowError("La base de datos no está inicializada.");
    expect(() => inventario.getClienteManager().addCliente(cliente1)).toThrowError("La base de datos no está inicializada.");
    expect(() => inventario.getClienteManager().removeCliente(cliente1.id)).toThrowError("La base de datos no está inicializada.");
    vi.restoreAllMocks();
  });
  
});

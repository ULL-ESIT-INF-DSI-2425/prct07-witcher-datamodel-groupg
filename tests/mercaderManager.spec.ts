import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Inventario } from '../src/inventario';
import { Mercader } from '../src/mercader';

describe('MercaderManager', () => {
  let inventario: Inventario;
  const mercader1 = new Mercader('Mercader1', 'Tipo1', 'Ciudad1');
  const mercader2 = new Mercader('Mercader2', 'Tipo2', 'Ciudad2');
  let mercader3: Mercader;

  beforeEach(() => {
    inventario = new Inventario('test-mercaderes.json');
    inventario.getMercaderManager().addMercader(mercader1);
    inventario.getMercaderManager().addMercader(mercader2);
  });

  afterEach(() => {
    const mercaderes = inventario.getMercaderManager().getMercaderes();
    if (mercaderes.some((m) => m.id === mercader1.id)) {
      inventario.getMercaderManager().removeMercader(mercader1.id);
    }
    if (mercaderes.some((m) => m.id === mercader2.id)) {
      inventario.getMercaderManager().removeMercader(mercader2.id);
    }
    if (mercader3 && mercaderes.some((m) => m.id === mercader3.id)) {
      inventario.getMercaderManager().removeMercader(mercader3.id);
    }
  });

  it('should add a new mercader', () => {
    mercader3 = new Mercader('Mercader3', 'Tipo3', 'Ciudad3');
    inventario.getMercaderManager().addMercader(mercader3);
    const mercaderes = inventario.getMercaderManager().getMercaderes();
    expect(mercaderes).toContainEqual(mercader3);
  });

  it('should get all mercaderes', () => {
    const mercaderes = inventario.getMercaderManager().getMercaderes();
    expect(mercaderes.length).toBeGreaterThanOrEqual(0);
    expect(mercaderes).toContainEqual(mercader1);
    expect(mercaderes).toContainEqual(mercader2);
  });

  it('should update a mercader by id', () => {
    const result = inventario.getMercaderManager().updateMercader(mercader1.id, { ubicacion: 'NuevaCiudad' });
    expect(result).toBe(true);
    const mercaderes = inventario.getMercaderManager().getMercaderes();
    expect(mercaderes.find((m) => m.id === mercader1.id)?.ubicacion).toBe('NuevaCiudad');
  });

  it('should remove a mercader by id', () => {
    inventario.getMercaderManager().removeMercader(mercader1.id);
    const mercaderes = inventario.getMercaderManager().getMercaderes();
    expect(mercaderes).not.toContainEqual(mercader1);
  });

  it('should handle removing a non-existent mercader gracefully', () => {
    const result = inventario.getMercaderManager().removeMercader('non-existent-id');
    expect(result).toBe(false);
  });

  it('should handle adding a mercader when the database is not initialized', () => {
    inventario['db'].data = null;
    expect(() => inventario.getMercaderManager().addMercader(mercader1)).toThrowError(
      "La base de datos no está inicializada."
    );
  });

  it('should handle getting mercaderes when the database is not initialized', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() => inventario.getMercaderManager().getMercaderes()).toThrowError(
      "La base de datos no está inicializada."
    );
    vi.restoreAllMocks();
  });

  it('should handle removing a mercader when the database is not initialized', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() => inventario.getMercaderManager().removeMercader(mercader1.id)).toThrowError(
      "La base de datos no está inicializada."
    );
    vi.restoreAllMocks();
  });

  it('should handle updating a mercader when the database is not initialized', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() =>
      inventario.getMercaderManager().updateMercader(mercader1.id, { ubicacion: 'NuevaCiudad' })
    ).toThrowError("La base de datos no está inicializada.");
    vi.restoreAllMocks();
  });

  it('should find a mercader by name', () => {
    const result = inventario.getMercaderManager().searchMercaderNombre('Mercader1');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mercader1);
  });

  it('should return empty array if no mercader with given name exists', () => {
    const result = inventario.getMercaderManager().searchMercaderNombre('MercaderInexistente');
    expect(result).toEqual([]);
  });

  it('should find a mercader by location', () => {
    const result = inventario.getMercaderManager().searchMercaderUbicacion('Ciudad1');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mercader1);
  });

  it('should return empty array if no mercader with given location exists', () => {
    const result = inventario.getMercaderManager().searchMercaderUbicacion('CiudadInexistente');
    expect(result).toEqual([]);
  });

  it('should find a mercader by type', () => {
    const result = inventario.getMercaderManager().searchMercaderTipo('Tipo1');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mercader1);
  });

  it('should return empty array if no mercader with given type exists', () => {
    const result = inventario.getMercaderManager().searchMercaderTipo('TipoInexistente');
    expect(result).toEqual([]);
  });

  it('should prevent adding a duplicate mercader', () => {
    expect(() => inventario.getMercaderManager().addMercader(mercader1)).toThrow();
  });

  it('should display mercaderes in console', () => {
    const consoleSpy = vi.spyOn(console, 'table');
    inventario.getMercaderManager().showMercaderes();
    expect(consoleSpy).toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it('should handle showMercaderes with no mercaderes', () => {
    inventario.getMercaderManager().removeMercader(mercader1.id);
    inventario.getMercaderManager().removeMercader(mercader2.id);

    const consoleSpy = vi.spyOn(console, 'log');
    inventario.getMercaderManager().showMercaderes();
    expect(consoleSpy).toHaveBeenCalledWith("No hay mercaderes registrados.");
    vi.restoreAllMocks();
  });

  it('should handle search when database is not initialized', () => {
    inventario['db'].data = null;
    const result = inventario.getMercaderManager().searchMercaderNombre('TipoInexistente');
    expect(result).toEqual([]);
  });
});
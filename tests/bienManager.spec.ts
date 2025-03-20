import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Inventario } from '../src/inventario';
import { Bien } from '../src/bien';
import path from 'path';

describe('BienManager', () => {
  let inventario: Inventario;
  const bien1 = new Bien('Bien1', 'desc1', 'mat1', 1, 1);
  const bien2 = new Bien('Bien2', 'desc2', 'mat2', 2, 2);
  let bien3: Bien;

  beforeEach(() => {
    inventario  = new Inventario(path.resolve(__dirname, '../databases/test-bienes.json'));
    inventario.getBienManager().addBien(bien1);
    inventario.getBienManager().addBien(bien2);
  });

  afterEach(() => {
    const bienes = inventario.getBienManager().getBienes();
    if (bienes.some((b) => b.id === bien1.id)) {
      inventario.getBienManager().removeBien(bien1.id);
    }
    if (bienes.some((b) => b.id === bien2.id)) {
      inventario.getBienManager().removeBien(bien2.id);
    }
    if (bien3 && bienes.some((b) => b.id === bien3.id)) {
      inventario.getBienManager().removeBien(bien3.id);
    }
  });

  it('should add a new bien', () => {
    bien3 = new Bien('Bien3', 'desc3', 'mat3', 3, 3);
    inventario.getBienManager().addBien(bien3);
    const bienes = inventario.getBienManager().getBienes();
    expect(bienes).toContainEqual(bien3);
  });

  it('should get all bienes', () => {
    const bienes = inventario.getBienManager().getBienes();
    expect(bienes.length).toBeGreaterThanOrEqual(0);
    expect(bienes).toContainEqual(bien1);
    expect(bienes).toContainEqual(bien2);
  });

  it('should update a bien by id', () => {
    const result = inventario.getBienManager().updateBien(bien1.id, { valor: 150 });
    expect(result).toBe(true);
    const bienes = inventario.getBienManager().searchBienNombre(bien1.nombre, 'nombre', 'desc');
    expect(bienes[0].valor).toBe(150);
  });

  it('should remove a bien by id', () => {
    inventario.getBienManager().removeBien(bien1.id);
    const bienes = inventario.getBienManager().getBienes();
    expect(bienes).not.toContainEqual(bien1);
  });

  it('should search bienes by nombre', () => {
    const bienes = inventario.getBienManager().searchBienNombre(bien1.nombre, 'nombre', 'asc');
    expect(bienes[0].nombre).toBe(bien1.nombre);
  });

  it('should search bienes by descripcion', () => {
    const bienes = inventario.getBienManager().searchBienDescripcion(bien1.descripcion, 'descripcion', 'asc');
    expect(bienes[0].descripcion).toBe(bien1.descripcion);
  });

  it('should search bienes by material', () => {
    const bienes = inventario.getBienManager().searchBienMaterial(bien1.material, 'material', 'asc');
    expect(bienes[0].material).toBe(bien1.material);
  });

  it('should return an empty list when searching for a non-existent bien by nombre', () => {
    const bienes = inventario.getBienManager().searchBienNombre('NonExistent', 'nombre', 'asc');
    expect(bienes).toHaveLength(0);
  });

  it('should handle removing a non-existent bien gracefully', () => {
    const result = inventario.getBienManager().removeBien('non-existent-id');
    expect(result).toBe(false);
  });

  it('should show all bienes in the console', () => {
    const consoleSpy = vi.spyOn(console, 'table');
    inventario.getBienManager().showBienes("Alfabeticamente", "Ascendente");
    expect(consoleSpy).toHaveBeenCalledWith(expect.arrayContaining([bien1, bien2]));
    consoleSpy.mockRestore();
  });

  it('should return an empty list when searching by descripcion with no matches', () => {
    const bienes = inventario.getBienManager().searchBienDescripcion('NonExistentDesc', 'descripcion', 'asc');
    expect(bienes).toHaveLength(0);
  });

  it('should return an empty list when searching by material with no matches', () => {
    const bienes = inventario.getBienManager().searchBienMaterial('NonExistentMaterial', 'material', 'asc');
    expect(bienes).toHaveLength(0);
  });

  it('should sort bienes by valor in ascending order', () => {
    const bienes = inventario.getBienManager().searchBienNombre(bien1.nombre, 'valor', 'asc');
    expect(bienes).toEqual(expect.arrayContaining([bien1]));
  });

  it('should sort bienes by valor in descending order', () => {
    const bienes = inventario.getBienManager().searchBienNombre(bien1.nombre, 'valor', 'desc');
    expect(bienes).toEqual(expect.arrayContaining([bien1]));
  });

  it('should remove all bienes', () => {
    inventario.getBienManager().removeBien(bien1.id);
    inventario.getBienManager().removeBien(bien2.id);
    const bienes = inventario.getBienManager().getBienes();
    expect(bienes).toHaveLength(0);
  });

  it('should handle adding a bien when the database is not initialized', () => {
    inventario.getBienManager().removeBien(bien1.id);
    inventario.getBienManager().removeBien(bien2.id);
    inventario.getBienManager().removeBien(bien3?.id || '');
    inventario['db'].data = null;
    expect(() => inventario.getBienManager().addBien(bien1)).toThrowError(
      "La base de datos no está inicializada."
    );
  });

  it('should handle getting bienes when the database is not initialized', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() => inventario.getBienManager().getBienes()).toThrowError(
      "La base de datos no está inicializada."
    );
    vi.restoreAllMocks();
  });

  it('should handle removing a bien when the database is not initialized', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() => inventario.getBienManager().removeBien(bien1.id)).toThrowError(
      "La base de datos no está inicializada."
    );
    vi.restoreAllMocks();
  });

  it('should handle getting bienes when the database is not initialized', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() => inventario.getBienManager().getBienes()).toThrowError(
      "La base de datos no está inicializada."
    );
    vi.restoreAllMocks();
  });

  it('should handle searching bienes by nombre when the database is not initialized', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() =>
      inventario.getBienManager().searchBienNombre('Bien1', 'nombre', 'asc')
    ).toThrowError("La base de datos no está inicializada.");
    vi.restoreAllMocks();
  });

  it('should handle searching bienes by descripcion when the database is not initialized', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() =>
      inventario.getBienManager().searchBienDescripcion('desc1', 'descripcion', 'asc')
    ).toThrowError("La base de datos no está inicializada.");
    vi.restoreAllMocks();
  });

  it('should handle searching bienes by material when the database is not initialized', () => {
    inventario['db'].data = null;
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() =>
      inventario.getBienManager().searchBienMaterial('mat1', 'material', 'asc')
    ).toThrowError("La base de datos no está inicializada.");
    vi.restoreAllMocks();
  });
  
});

describe('BienManager - Additional Tests', () => {
  let inventario: Inventario;
  const bien1 = new Bien('Bien1', 'desc1', 'mat1', 1, 1);
  const bien2 = new Bien('Bien2', 'desc2', 'mat2', 2, 2);

  beforeEach(() => {
    inventario = new Inventario(path.resolve(__dirname, '../databases/test-bienes.json'));
    inventario.getBienManager().addBien(bien1);
    inventario.getBienManager().addBien(bien2);
  });

  afterEach(() => {
    const bienes = inventario.getBienManager().getBienes();
    bienes.forEach((b) => inventario.getBienManager().removeBien(b.id));
  });

  it('should throw an error if bienes property is missing in the database when adding a bien', () => {
    inventario['db'].data = { 
      ...inventario['db'].data, 
      bienes: undefined as any, 
      mercaderes: inventario['db'].data?.mercaderes || [], 
      clientes: inventario['db'].data?.clientes || [], 
      transacciones: inventario['db'].data?.transacciones || [] 
    };
    expect(() => inventario.getBienManager().addBien(bien1)).toThrowError(
      "La base de datos no contiene la propiedad 'bienes."
    );
  });

  it('should throw an error if bienes property is missing in the database when getting bienes', () => {
    inventario['db'].data = { 
      ...inventario['db'].data, 
      bienes: undefined as any, 
      mercaderes: inventario['db'].data?.mercaderes || [], 
      clientes: inventario['db'].data?.clientes || [], 
      transacciones: inventario['db'].data?.transacciones || [] 
    };
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() => inventario.getBienManager().getBienes()).toThrowError(
      "La base de datos no contiene la propiedad 'bienes'."
    );
    vi.restoreAllMocks();
  });

  it('should throw an error if bienes property is missing in the database when removing a bien', () => {
    inventario['db'].data = { 
      ...inventario['db'].data, 
      bienes: undefined as any, 
      mercaderes: inventario['db'].data?.mercaderes || [], 
      clientes: inventario['db'].data?.clientes || [], 
      transacciones: inventario['db'].data?.transacciones || [] 
    };
    vi.spyOn(inventario['db'], 'read').mockImplementation(() => {});
    expect(() => inventario.getBienManager().removeBien(bien1.id)).toThrowError(
      "La base de datos no contiene la propiedad 'bienes'."
    );
    vi.restoreAllMocks();
  });

  it('should handle sorting bienes by material in ascending order', () => {
    const bienes = inventario.getBienManager().searchBienMaterial('mat1', 'material', 'asc');
    expect(bienes[0].material).toBe('mat1');
  });

  it('should handle sorting bienes by material in descending order', () => {
    const bienes = inventario.getBienManager().searchBienMaterial('mat1', 'material', 'desc');
    expect(bienes[0].material).toBe('mat1');
  });

  it('should handle sorting bienes by valor in ascending order when searching by material', () => {
    const bienes = inventario.getBienManager().searchBienMaterial('mat1', 'valor', 'asc');
    expect(bienes[0].valor).toBe(1);
  });

  it('should handle sorting bienes by valor in descending order when searching by material', () => {
    const bienes = inventario.getBienManager().searchBienMaterial('mat1', 'valor', 'desc');
    expect(bienes[0].valor).toBe(1);
  });
});
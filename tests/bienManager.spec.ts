import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Inventario } from '../src/inventario';
import { Bien } from '../src/bien';

describe('BienManager', () => {
  let inventario: Inventario;
  const bien1 = new Bien('Bien1', 'desc1', 'mat1', 1, 1);
  const bien2 = new Bien('Bien2', 'desc2', 'mat2', 2, 2);
  let bien3: Bien;

  beforeEach(() => {
    inventario = new Inventario();
    inventario.getBienManager().addBien(bien1);
    inventario.getBienManager().addBien(bien2);
  });

  afterEach(() => {
    inventario.getBienManager().removeBien(bien1.id);
    inventario.getBienManager().removeBien(bien2.id);
    if (bien3) {
      inventario.getBienManager().removeBien(bien3.id);
    }
  });

  // REVISAR AFTEREACH. SIEMPRE IMRPRIME: No se encontró el bien especificado en la base de datos.

  it('should add a new bien', () => {
    bien3 = new Bien('Bien3', 'desc3', 'mat3', 3, 3);
    inventario.getBienManager().addBien(bien3);
    const bienes = inventario.getBienManager().getBienes();
    expect(bienes).toContainEqual(bien3);
  });

  /* it('should get all bienes', () => {
    const bienes = inventario.getBienManager().getBienes();
    expect(bienes.length).toBeGreaterThanOrEqual(2);
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
  }); */
});
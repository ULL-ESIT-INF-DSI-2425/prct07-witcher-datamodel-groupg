import { describe, it, expect } from 'vitest';
import { Cliente } from '../src/cliente';

describe('Cliente', () => {
  it('should create a Cliente instance with correct properties', () => {
    const cliente = new Cliente('1', 'Geralt', 'Humano', 'Rivia');
    expect(cliente.id).toBe('1');
    expect(cliente.nombre).toBe('Geralt');
    expect(cliente.raza).toBe('Humano');
    expect(cliente.ubicacion).toBe('Rivia');
  });

  it('should update the nombre property', () => {
    const cliente = new Cliente('2', 'Yennefer', 'Humano', 'Vengerberg');
    cliente.nombre = 'Triss';
    expect(cliente.nombre).toBe('Triss');
  });

  it('should update the ubicacion property', () => {
    const cliente = new Cliente('3', 'Ciri', 'Humano', 'Cintra');
    cliente.ubicacion = 'Novigrad';
    expect(cliente.ubicacion).toBe('Novigrad');
  });

  it('should update the raza property', () => {
    const cliente = new Cliente('4', 'Dandelion', 'Humano', 'Oxenfurt');
    cliente.raza = 'Bardo';
    expect(cliente.raza).toBe('Bardo');
  });
});
import { describe, it, expect } from 'vitest';
import { Cliente } from '../src/cliente';

describe('Cliente', () => {
  it('should create a Cliente instance with correct properties', () => {
    const cliente = new Cliente('Geralt', 'Humano', 'Rivia');
    expect(cliente.nombre).toBe('Geralt');
    expect(cliente.raza).toBe('Humano');
    expect(cliente.ubicacion).toBe('Rivia');
  });

  it('should update the nombre property', () => {
    const cliente = new Cliente('Yennefer', 'Humano', 'Vengerberg');
    cliente.nombre = 'Triss';
    expect(cliente.nombre).toBe('Triss');
  });

  it('should update the ubicacion property', () => {
    const cliente = new Cliente('Ciri', 'Humano', 'Cintra');
    cliente.ubicacion = 'Novigrad';
    expect(cliente.ubicacion).toBe('Novigrad');
  });

  it('should update the raza property', () => {
    const cliente = new Cliente('Dandelion', 'Humano', 'Oxenfurt');
    cliente.raza = 'Bardo';
    expect(cliente.raza).toBe('Bardo');
  });
});
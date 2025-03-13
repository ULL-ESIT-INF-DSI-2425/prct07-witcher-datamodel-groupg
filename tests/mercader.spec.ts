import { describe, it, expect } from 'vitest';
import { Mercader } from '../src/mercader';

describe('Mercader', () => {
  it('should create a mercader instance', () => {
    const mercader = new Mercader('1', 'Juan', 'Armero', 'Novigrado');
    expect(mercader).toBeInstanceOf(Mercader);
    expect(mercader.id).toBe('1');
    expect(mercader.nombre).toBe('Juan');
    expect(mercader.tipo).toBe('Armero');
    expect(mercader.ubicacion).toBe('Novigrado');
  });

  it('should have correct properties', () => {
    const mercader = new Mercader('2', 'Pedro', 'Herrero', 'Oxenfurt');
    expect(mercader.id).toBe('2');
    expect(mercader.nombre).toBe('Pedro');
    expect(mercader.tipo).toBe('Herrero');
    expect(mercader.ubicacion).toBe('Oxenfurt');
  });

  it('should allow updating properties', () => {
    const mercader = new Mercader('3', 'Luis', 'Alquimista', 'Vizima');
    mercader.nombre = 'Carlos';
    mercader.tipo = 'Herbolario';
    mercader.ubicacion = 'Kaer Morhen';
    expect(mercader.nombre).toBe('Carlos');
    expect(mercader.tipo).toBe('Herbolario');
    expect(mercader.ubicacion).toBe('Kaer Morhen');
  });
});
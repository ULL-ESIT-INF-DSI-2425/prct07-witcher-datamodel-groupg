import { describe, it, expect } from 'vitest';
import { Bien } from '../src/bien';

describe('Bien', () => {
  it('should create an instance of Bien', () => {
    const bien = new Bien('1', 'Espada', 'Espada de acero', 'Acero', 3.5, 150);
    expect(bien).toBeInstanceOf(Bien);
  });

  it('should have correct properties', () => {
    const bien = new Bien('1', 'Espada', 'Espada de acero', 'Acero', 3.5, 150);
    expect(bien.id).toBe('1');
    expect(bien.nombre).toBe('Espada');
    expect(bien.descripcion).toBe('Espada de acero');
    expect(bien.material).toBe('Acero');
    expect(bien.peso).toBe(3.5);
    expect(bien.valor).toBe(150);
  });

  it('should allow updating properties', () => {
    const bien = new Bien('1', 'Espada', 'Espada de acero', 'Acero', 3.5, 150);
    bien.nombre = 'Espada de plata';
    bien.descripcion = 'Espada de plata para monstruos';
    bien.material = 'Plata';
    bien.peso = 4.0;
    bien.valor = 200;

    expect(bien.nombre).toBe('Espada de plata');
    expect(bien.descripcion).toBe('Espada de plata para monstruos');
    expect(bien.material).toBe('Plata');
    expect(bien.peso).toBe(4.0);
    expect(bien.valor).toBe(200);
  });

  it('should handle negative values for peso and valor', () => {
    const bien = new Bien('1', 'Espada', 'Espada de acero', 'Acero', -3.5, -150);
    expect(bien.peso).toBe(-3.5);
    expect(bien.valor).toBe(-150);
  });
});
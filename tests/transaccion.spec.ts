import { describe, it, expect } from 'vitest';
import { Transaccion } from '../src/transaccion';
import { Bien } from '../src/bien';
import { Mercader } from '../src/mercader';
import { Cliente } from '../src/cliente';

describe('Transaccion', () => {
  it('should create a transaccion instance', () => {
    const bien = new Bien('Espada', 'Una espada afilada', 'Acero', 2.5, 100);
    const mercader = new Mercader('Juan', 'Armero', 'Novigrado');
    const transaccion = new Transaccion('compra', new Date(), [bien], 100, mercader);
    expect(transaccion).toBeInstanceOf(Transaccion);
    expect(transaccion.id).toBe('1');
    expect(transaccion.tipo).toBe('compra');
    expect(transaccion.fecha).toBeInstanceOf(Date);
    expect(transaccion.bienes).toEqual([bien]);
    expect(transaccion.cantidadCoronas).toBe(100);
    expect(transaccion.involucrado).toBe(mercader);
  });

  it('should have correct properties', () => {
    const bien = new Bien('Escudo', 'Un escudo resistente', 'Hierro', 5.0, 150);
    const cliente = new Cliente('Pedro', 'Humano', 'Oxenfurt');
    const transaccion = new Transaccion('venta', new Date(), [bien], 150, cliente);
    expect(transaccion.id).toBe('2');
    expect(transaccion.tipo).toBe('venta');
    expect(transaccion.fecha).toBeInstanceOf(Date);
    expect(transaccion.bienes).toEqual([bien]);
    expect(transaccion.cantidadCoronas).toBe(150);
    expect(transaccion.involucrado).toBe(cliente);
  });

  it('should allow updating properties', () => {
    const bien = new Bien('Poción', 'Una poción curativa', 'Vidrio', 0.5, 50);
    const cliente = new Cliente('Luis', 'Vizima', 'Novigrad');
    const transaccion = new Transaccion('devolución', new Date(), [bien], 50, cliente);
    transaccion.tipo = 'compra';
    transaccion.cantidadCoronas = 75;
    expect(transaccion.tipo).toBe('compra');
    expect(transaccion.cantidadCoronas).toBe(75);
  });
});
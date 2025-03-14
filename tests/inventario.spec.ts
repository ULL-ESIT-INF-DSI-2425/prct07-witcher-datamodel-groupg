import { describe, it, expect, beforeEach } from 'vitest';
import { Inventario } from '../src/inventario';
import { Bien } from '../src/bien';
import { Mercader } from '../src/mercader';
import { Cliente } from '../src/cliente';
import { Transaccion } from '../src/transaccion';

describe('Inventario', () => {
  let inventario: Inventario;

  beforeEach(() => {
    inventario = new Inventario();
  });

  it('should add and get bienes', () => {
    const bien = new Bien('1', 'Bien1', 'desc1', 'mat1', 1, 1);
    inventario.addBien(bien);
    const bienes = inventario.getBienes();
    expect(bienes).toContainEqual(bien);
  });

 /*  it('should remove a bien', () => {
    const bien = new Bien('1', 'Bien1', 'desc1', 'mat1', 1, 1);
    inventario.addBien(bien);
    inventario.removeBien(bien);
    const bienes = inventario.getBienes();
    expect(bienes).not.toContainEqual(bien);
  }); */

  it('should add and get mercaderes', () => {
    const mercader = new Mercader('1', 'Mercader1', 'tipo1', 'ubi1');
    inventario.addMercader(mercader);
    const mercaderes = inventario.getMercaderes();
    expect(mercaderes).toContainEqual(mercader);
  });

 /*  it('should remove a mercader', () => {
    const mercader = new Mercader('1', 'Mercader1', 'tipo1', 'ubi1');
    inventario.addMercader(mercader);
    inventario.removeMercader(mercader);
    const mercaderes = inventario.getMercaderes();
    expect(mercaderes).not.toContainEqual(mercader);
  }); */

  it('should add and get clientes', () => {
    const cliente = new Cliente('1', 'Cliente1', 'raza1', 'uni1');
    inventario.addCliente(cliente);
    const clientes = inventario.getClientes();
    expect(clientes).toContainEqual(cliente);
  });

 /*  it('should remove a cliente', () => {
    const cliente = new Cliente('1', 'Cliente1', 'raza1', 'uni1');
    inventario.addCliente(cliente);
    inventario.removeCliente(cliente);
    const clientes = inventario.getClientes();
    expect(clientes).not.toContainEqual(cliente);
  }); */

  /* it('should add and get transacciones', () => {
    const bien = new Bien('1', 'Bien1', 'desc1', 'mat1', 1, 1);
    const mercader = new Mercader('1', 'Mercader1', 'tipo1', 'ubi1');
    const transaccion = new Transaccion('1', 'compra', new Date(), [bien], 1, mercader);
    inventario.addTransaccion(transaccion);
    const transacciones = inventario.getTransacciones();
    expect(transacciones).toContainEqual(transaccion);
  }); */

  it('should remove a transaccion', () => {
    const bien = new Bien('1', 'Bien1', 'desc1', 'mat1', 1, 1);
    const mercader = new Mercader('1', 'Mercader1', 'tipo1', 'ubi1');
    const transaccion = new Transaccion('1', 'compra', new Date(), [bien], 1, mercader)
    inventario.addTransaccion(transaccion);
    inventario.removeTransaccion(transaccion);
    const transacciones = inventario.getTransacciones();
    expect(transacciones).not.toContainEqual(transaccion);
  });
});
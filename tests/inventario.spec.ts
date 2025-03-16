import { describe, it, expect } from 'vitest';
import { Inventario } from '../src/inventario';
import { BienManager } from '../src/bienManager';
import { MercaderManager } from '../src/mercaderManager';
import { ClienteManager } from '../src/clienteManager';
import { TransaccionManager } from '../src/transaccionManager';

describe('Inventario Class', () => {
  it('should return an instance of BienManager', () => {
    const inventario = new Inventario();
    const bienManager = inventario.getBienManager();
    expect(bienManager).toBeInstanceOf(BienManager);
  });

  it('should return an instance of MercaderManager', () => {
    const inventario = new Inventario();
    const mercaderManager = inventario.getMercaderManager();
    expect(mercaderManager).toBeInstanceOf(MercaderManager);
  });

  it('should return an instance of ClienteManager', () => {
    const inventario = new Inventario();
    const clienteManager = inventario.getClienteManager();
    expect(clienteManager).toBeInstanceOf(ClienteManager);
  });

  it('should return an instance of TransaccionManager', () => {
    const inventario = new Inventario();
    const transaccionManager = inventario.getTransaccionManager();
    expect(transaccionManager).toBeInstanceOf(TransaccionManager);
  });
});
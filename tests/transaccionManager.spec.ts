import { TransaccionManager } from "../src/transaccionManager.js";
import { Transaccion } from "../src/transaccion.js";
import { db, initDB } from "../src/database.js";
import { describe, expect, vi, beforeEach, it, afterEach } from "vitest";
import { after } from "node:test";
import { Inventario } from "../src/inventario.js";
import path from "path";

describe("TransaccionManager", () => {
  let transaccionManager: TransaccionManager;
  const transaccion1: Transaccion = new Transaccion(
    "compra",
    new Date(),
    [],
    100,
    { id: "cliente1", nombre: "Cliente1" } as any,
  );
  const transaccion2: Transaccion = new Transaccion(
    "venta",
    new Date(),
    [],
    200,
    { id: "mercader1", nombre: "Mercader1" } as any,
  );

  beforeEach(async () => {
    transaccionManager = new TransaccionManager(db);
    await initDB();
    transaccionManager.addTransaccion(transaccion1);
    transaccionManager.addTransaccion(transaccion2);
  });

  afterEach(() => {
    const transacciones = transaccionManager.getTransacciones();
    if (transacciones.some((c) => c.id === transaccion1.id)) {
      transaccionManager.removeTransaccion(transaccion1.id);
    }
    if (transacciones.some((c) => c.id === transaccion2.id)) {
      transaccionManager.removeTransaccion(transaccion2.id);
    }
  });

  it("should add a new transaction", () => {
    const transaccion3 = new Transaccion("devolución", new Date(), [], 50, {
      id: "cliente2",
      nombre: "Cliente2",
    } as any);
    transaccionManager.addTransaccion(transaccion3);
    const transacciones = transaccionManager.getTransacciones();
    expect(transacciones).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tipo: "compra",
          cantidadCoronas: 100,
          involucrado: { id: "cliente1", nombre: "Cliente1" },
        }),
        expect.objectContaining({
          tipo: "venta",
          cantidadCoronas: 200,
          involucrado: { id: "mercader1", nombre: "Mercader1" },
        }),
        expect.objectContaining({
          tipo: "devolución",
          cantidadCoronas: 50,
          involucrado: { id: "cliente2", nombre: "Cliente2" },
        }),
      ]),
    );
    transaccionManager.removeTransaccion(transaccion3.id);
  });

  it("should retrieve all transactions", () => {
    const transacciones = transaccionManager.getTransacciones();
    expect(transacciones).toHaveLength(2);
    expect(transacciones).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tipo: "compra",
          cantidadCoronas: 100,
          involucrado: { id: "cliente1", nombre: "Cliente1" },
        }),
        expect.objectContaining({
          tipo: "venta",
          cantidadCoronas: 200,
          involucrado: { id: "mercader1", nombre: "Mercader1" },
        }),
      ]),
    );
  });

  it("should remove a transaction by id", () => {
    const result = transaccionManager.removeTransaccion(transaccion1.id);
    expect(result).toBe(true);
    const transacciones = transaccionManager.getTransacciones();
    expect(transacciones).not.toContainEqual(transaccion1);
  });

  it("should return false when trying to remove a non-existent transaction", () => {
    const result = transaccionManager.removeTransaccion("non-existent-id");
    expect(result).toBe(false);
  });

  it("should update a transaction by id", () => {
    const result = transaccionManager.updateTransaccion(transaccion1.id, {
      cantidadCoronas: 150,
    });
    expect(result).toBe(true);
    const transacciones = transaccionManager.getTransacciones();
    expect(
      transacciones.find((t) => t.id === transaccion1.id)?.cantidadCoronas,
    ).toBe(150);
  });

  it("should return false when trying to update a non-existent transaction", () => {
    const result = transaccionManager.updateTransaccion("non-existent-id", {
      cantidadCoronas: 150,
    });
    expect(result).toBe(false);
  });

  it("should display transactions in console", () => {
    const consoleSpy = vi.spyOn(console, "table");
    transaccionManager.showTransacciones();
    expect(consoleSpy).toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it("should handle showTransacciones with no transactions", () => {
    transaccionManager.removeTransaccion(transaccion1.id);
    transaccionManager.removeTransaccion(transaccion2.id);

    const consoleSpy = vi.spyOn(console, "log");
    transaccionManager.showTransacciones();
    expect(consoleSpy).toHaveBeenCalledWith(
      "No hay transacciones registradas.",
    );
    vi.restoreAllMocks();
  });

  it("should throw an error when the database is not initialized (addTransaccion)", () => {
    db.data = null;
    vi.spyOn(db, "read").mockImplementation(() => {});
    expect(() => transaccionManager.addTransaccion(transaccion1)).toThrowError(
      "La base de datos no está inicializada.",
    );
    vi.restoreAllMocks();
  });

  it("should throw an error when the database is not initialized (getTransacciones)", () => {
    db.data = null;
    vi.spyOn(db, "read").mockImplementation(() => {});
    expect(() => transaccionManager.getTransacciones()).toThrowError(
      "La base de datos no está inicializada.",
    );
    vi.restoreAllMocks();
  });

  it("should throw an error when the database is not initialized (removeTransaccion)", () => {
    db.data = null;
    vi.spyOn(db, "read").mockImplementation(() => {});
    expect(() =>
      transaccionManager.removeTransaccion(transaccion1.id),
    ).toThrowError("La base de datos no está inicializada.");
    vi.restoreAllMocks();
  });

  it("should throw an error when the database is not initialized (updateTransaccion)", () => {
    db.data = null;
    vi.spyOn(db, "read").mockImplementation(() => {});
    expect(() =>
      transaccionManager.updateTransaccion(transaccion1.id, {
        cantidadCoronas: 150,
      }),
    ).toThrowError("La base de datos no está inicializada.");
    vi.restoreAllMocks();
  });
});

describe("TransaccionManager - additional tests", () => {
  let inventario: Inventario;
  const transaccion1: Transaccion = new Transaccion(
    "compra",
    new Date(),
    [],
    100,
    { id: "cliente1", nombre: "Cliente1" } as any,
  );
  const transaccion2: Transaccion = new Transaccion(
    "venta",
    new Date(),
    [],
    200,
    { id: "mercader1", nombre: "Mercader1" } as any,
  );

  beforeEach(() => {
    inventario = new Inventario(
      path.resolve(__dirname, "../databases/test-transacciones.json"),
    );
    inventario.getTransaccionManager().addTransaccion(transaccion1);
    inventario.getTransaccionManager().addTransaccion(transaccion2);
  });

  afterEach(() => {
    const transacciones = inventario.getTransaccionManager().getTransacciones();
    transacciones.forEach((t) =>
      inventario.getTransaccionManager().removeTransaccion(t.id),
    );
  });

  it("should throw an error when propety transacciones is missing when adding a transaction", () => {
    inventario.getTransaccionManager().removeTransaccion(transaccion1.id);
    inventario["db"].data = {
      ...inventario["db"].data,
      transacciones: undefined as any,
      mercaderes: inventario["db"].data?.mercaderes || [],
      bienes: inventario["db"].data?.bienes || [],
      clientes: inventario["db"].data?.clientes || [],
    };
    vi.spyOn(inventario["db"], "read").mockImplementation(() => {});
    expect(() =>
      inventario.getTransaccionManager().addTransaccion(transaccion1),
    ).toThrowError(
      "La base de datos no contiene la propiedad 'transacciones'.",
    );
    vi.restoreAllMocks();
  });

  it("should throw an error when propety transacciones is missing when getting transactions", () => {
    inventario.getTransaccionManager().removeTransaccion(transaccion1.id);
    inventario["db"].data = {
      ...inventario["db"].data,
      transacciones: undefined as any,
      mercaderes: inventario["db"].data?.mercaderes || [],
      bienes: inventario["db"].data?.bienes || [],
      clientes: inventario["db"].data?.clientes || [],
    };
    vi.spyOn(inventario["db"], "read").mockImplementation(() => {});
    expect(() =>
      inventario.getTransaccionManager().getTransacciones(),
    ).toThrowError(
      "La base de datos no contiene la propiedad 'transacciones'.",
    );
    vi.restoreAllMocks();
  });

  it("should throw an error when propety transacciones is missing when removing a transaction", () => {
    inventario.getTransaccionManager().removeTransaccion(transaccion1.id);
    inventario["db"].data = {
      ...inventario["db"].data,
      transacciones: undefined as any,
      mercaderes: inventario["db"].data?.mercaderes || [],
      bienes: inventario["db"].data?.bienes || [],
      clientes: inventario["db"].data?.clientes || [],
    };
    vi.spyOn(inventario["db"], "read").mockImplementation(() => {});
    expect(() =>
      inventario.getTransaccionManager().removeTransaccion(transaccion1.id),
    ).toThrowError(
      "La base de datos no contiene la propiedad 'transacciones'.",
    );
    vi.restoreAllMocks();
  });

  it("should throw an error when propety transacciones is missing when updating a transaction", () => {
    inventario.getTransaccionManager().removeTransaccion(transaccion1.id);
    inventario["db"].data = {
      ...inventario["db"].data,
      transacciones: undefined as any,
      mercaderes: inventario["db"].data?.mercaderes || [],
      bienes: inventario["db"].data?.bienes || [],
      clientes: inventario["db"].data?.clientes || [],
    };
    vi.spyOn(inventario["db"], "read").mockImplementation(() => {});
    expect(() =>
      inventario.getTransaccionManager().updateTransaccion(transaccion1.id, {
        cantidadCoronas: 150,
      }),
    ).toThrowError(
      "La base de datos no contiene la propiedad 'transacciones'.",
    );
    vi.restoreAllMocks();
  });
});

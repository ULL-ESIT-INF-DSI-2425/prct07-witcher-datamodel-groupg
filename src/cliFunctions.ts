import { Bien } from "./bien.js";
import { Transaccion } from "./transaccion.js";
import { Cliente } from "./cliente.js";
import { Mercader } from "./mercader.js";
import inquirer from "inquirer";
import { mainMenu, inventario } from "./cli.js";
import { MercaderManager } from "./mercaderManager.js";
import { ClienteManager } from "./clienteManager.js";

/**
 * Añade un nuevo bien al inventario.
 */
export async function addBien() {
  const answers = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del bien:" },
    { type: "input", name: "descripcion", message: "Descripción del bien:" },
    { type: "input", name: "material", message: "Material del bien:" },
    { type: "number", name: "peso", message: "Peso del bien:" },
    { type: "number", name: "valor", message: "Valor del bien:" },
    {
      type: "list",
      name: "exit",
      message: "¿Desea continuar o salir al menú principal?",
      choices: ["Continuar", "Salir al menú principal y no añadir bien"],
    },
  ]);

  if (answers.exit === "Volver y no añadir bien") {
    return;
  }

  const bien = new Bien(
    answers.nombre,
    answers.descripcion,
    answers.material,
    answers.peso,
    answers.valor,
  );

  inventario.getBienManager().addBien(bien);
  console.log("Bien añadido con éxito.");
}

/**
 * Elimina un bien del inventario.
 */
export async function removeBien() {
  const bienes = inventario.getBienManager().getBienes();
  if (!bienes || bienes.length === 0) {
    console.log("No hay bienes en el inventario para eliminar.");
    return;
  }

  const { bienId } = await inquirer.prompt([
    {
      type: "list",
      name: "bienId",
      message: "Seleccione el bien a eliminar:",
      choices: [
        ...bienes.map((b) => ({ name: b.nombre, value: b.id })),
        { name: "Salir al menú principal", value: "exit" },
      ],
    },
  ]);

  if (bienId === "exit") {
    return;
  }

  const bien = bienes.find((b) => b.id === bienId);
  if (bien) {
    inventario.getBienManager().removeBien(bien.id);
    console.log("Bien eliminado con éxito.");
  } else {
    console.log("No se encontró el bien especificado.");
  }
}

/**
 * Editar un bien del inventario
 */
export async function updateBien() {
  const bienes = inventario.getBienManager().getBienes();
  if (!bienes || bienes.length === 0) {
    console.log("No hay bienes disponibles para actualizar.");
    return;
  }

  const { bienId, nombre, descripcion, material, peso, valor } =
    await inquirer.prompt([
      {
        type: "list",
        name: "bienId",
        message: "Seleccione el bien a actualizar:",
        choices: bienes.map((b) => ({ name: b.nombre, value: b.id })),
      },
      {
        type: "input",
        name: "nombre",
        message: "Nuevo nombre:",
      },
      {
        type: "input",
        name: "descripcion",
        message: "Nueva descripción:",
      },
      {
        type: "input",
        name: "material",
        message: "Nuevo material:",
      },
      {
        type: "number",
        name: "peso",
        message: "Nuevo peso:",
      },
      {
        type: "number",
        name: "valor",
        message: "Nuevo valor:",
      },
    ]);

  const datosActualizados = {
    nombre,
    descripcion,
    material,
    peso,
    valor,
  };

  const actualizado = inventario
    .getBienManager()
    .updateBien(bienId, datosActualizados);
  if (actualizado) {
    console.log("Bien actualizado con éxito.");
  } else {
    console.log("No se encontró el bien a actualizar.");
  }
}

/**
 * Añade un nuevo cliente al registro.
 */
export async function addCliente() {
  const answers = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del cliente:" },
    { type: "input", name: "raza", message: "Raza del cliente:" },
    { type: "input", name: "ubicacion", message: "Ubicación del cliente:" },
    {
      type: "list",
      name: "exit",
      message:
        "¿Desea continuar o salir al menú principal sin añadir el cliente?",
      choices: ["Continuar", "Salir al menú principal y no añadir cliente"],
    },
  ]);

  if (answers.exit === "Volver y no añadir cliente") {
    return;
  }

  const cliente = new Cliente(answers.nombre, answers.raza, answers.ubicacion);

  try {
    inventario.getClienteManager().addCliente(cliente);
    console.log("Cliente añadido con éxito.");
  } catch (error) {
    console.error("Error al añadir el cliente:", error.message);
  }
}

/**
 * Elimina un cliente del inventario.
 */
export async function removeCliente() {
  const clientes = inventario.getClienteManager().getClientes();
  if (!clientes || clientes.length === 0) {
    console.log("No hay clientes en el inventario para eliminar.");
    return;
  }

  const { clienteId } = await inquirer.prompt([
    {
      type: "list",
      name: "clienteId",
      message: "Seleccione al cliente a eliminar:",
      choices: [
        ...clientes.map((b) => ({ name: b.nombre, value: b.id })),
        { name: "Salir al menú principal", value: "exit" },
      ],
    },
  ]);

  if (clienteId === "exit") {
    return;
  }

  const cliente = clientes.find((b) => b.id === clienteId);
  if (cliente) {
    inventario.getClienteManager().removeCliente(cliente.id);
    console.log("Cliente eliminado con éxito.");
  } else {
    console.log("No se encontró al cliente especificado.");
  }
}

/**
 * Editar un cliente del inventario
 */
export async function updateCliente() {
  const clientes = inventario.getClienteManager().getClientes();
  if (!clientes || clientes.length === 0) {
    console.log("No hay clientes disponibles para actualizar.");
    return;
  }

  const { clienteId, nombre, raza, ubicacion } = await inquirer.prompt([
    {
      type: "list",
      name: "clienteId",
      message: "Seleccione al cliente a actualizar:",
      choices: clientes.map((b) => ({ name: b.nombre, value: b.id })),
    },
    {
      type: "input",
      name: "nombre",
      message: "Nuevo nombre:",
    },
    {
      type: "input",
      name: "raza",
      message: "Nueva raza:",
    },
    {
      type: "input",
      name: "ubicacion",
      message: "Nueva ubicación:",
    },
  ]);

  const datosActualizados = {
    nombre,
    raza,
    ubicacion,
  };

  const actualizado = inventario
    .getClienteManager()
    .updateCliente(clienteId, datosActualizados);
  if (actualizado) {
    console.log("Cliente actualizado con éxito.");
  } else {
    console.log("No se encontró al cliente a actualizar.");
  }
}

/**
 * Añade un nuevo mercader al registro.
 */
export async function addMercader() {
  const answers = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del mercader:" },
    { type: "input", name: "raza", message: "Tipo del mercader:" },
    { type: "input", name: "ubicacion", message: "Ubicación del mercader:" },
    {
      type: "list",
      name: "exit",
      message:
        "¿Desea continuar o salir al menú principal sin añadir el mercader?",
      choices: ["Continuar", "Salir al menú principal y no añadir mercader"],
    },
  ]);

  if (answers.exit === "Volver y no añadir mercader") {
    return;
  }

  const mercader = new Mercader(
    answers.nombre,
    answers.raza,
    answers.ubicacion,
  );

  try {
    inventario.getMercaderManager().addMercader(mercader);
    console.log("Mercader añadido con éxito.");
  } catch (error) {
    console.error("Error al añadir el mercader:", error.message);
  }
}

/**
 * Elimina un mercader del inventario.
 */
export async function removeMercader() {
  const mercaderes = inventario.getMercaderManager().getMercaderes();
  if (!mercaderes || mercaderes.length === 0) {
    console.log("No hay mercaderes en el inventario para eliminar.");
    return;
  }

  const { mercaderId } = await inquirer.prompt([
    {
      type: "list",
      name: "mercaderId",
      message: "Seleccione al mercader a eliminar:",
      choices: [
        ...mercaderes.map((b) => ({ name: b.nombre, value: b.id })),
        { name: "Salir al menú principal", value: "exit" },
      ],
    },
  ]);

  if (mercaderId === "exit") {
    return;
  }

  const mercader = mercaderes.find((b) => b.id === mercaderId);
  if (mercader) {
    inventario.getMercaderManager().removeMercader(mercader.id);
    console.log("Mercader eliminado con éxito.");
  } else {
    console.log("No se encontró al mercader especificado.");
  }
}

/**
 * Editar un cliente del inventario
 */
export async function updateMercader() {
  const mercaderes = inventario.getMercaderManager().getMercaderes();
  if (!mercaderes || mercaderes.length === 0) {
    console.log("No hay mercaderes disponibles para actualizar.");
    return;
  }

  const { mercaderId, nombre, tipo, ubicacion } = await inquirer.prompt([
    {
      type: "list",
      name: "mercaderId",
      message: "Seleccione el mercader a actualizar:",
      choices: mercaderes.map((b) => ({ name: b.nombre, value: b.id })),
    },
    {
      type: "input",
      name: "nombre",
      message: "Nuevo nombre:",
    },
    {
      type: "input",
      name: "tipo",
      message: "Nuevo tipo:",
    },
    {
      type: "input",
      name: "ubicacion",
      message: "Nueva ubicación:",
    },
  ]);

  const datosActualizados = {
    nombre,
    tipo,
    ubicacion,
  };

  const actualizado = inventario
    .getMercaderManager()
    .updateMercader(mercaderId, datosActualizados);
  if (actualizado) {
    console.log("Mercader actualizado con éxito.");
  } else {
    console.log("No se encontró al mercader a actualizar.");
  }
}

/**
 * Filtra los clientes por su nombre, raza o locaclizacion
 */
export async function filtrarClientes() {
  const choices = ["Nombre", "Raza", "Localización", "No filtrar"];

  const { filter } = await inquirer.prompt([
    {
      type: "list",
      name: "filter",
      message: "¿Cómo desea filtrar los clientes?",
      choices,
    },
  ]);

  if (filter === "No filtrar") {
    inventario.getClienteManager().showClientes();
    return;
  }

  const { value } = await inquirer.prompt([
    {
      type: "input",
      name: "value",
      message: `Ingrese el valor para filtrar:`,
    },
  ]);

  let clientes: Cliente[] = [];

  switch (filter) {
    case "Nombre":
      clientes = inventario.getClienteManager().searchClienteNombre(value);
      break;
    case "Raza":
      clientes = inventario.getClienteManager().searchClienteRaza(value);
      break;
    case "Localización":
      clientes = inventario.getClienteManager().searchClienteUbicacion(value);
      break;
  }

  if (clientes.length === 0) {
    console.log("No se encontraron clientes con ese criterio.");
    return;
  } else {
    console.table(clientes);
  }
}

/**
 * Filtra los mercaderes por su nombre, raza o locaclizacion
 */
export async function filtrarMercaderes() {
  const choices = ["Nombre", "Tipo", "Localización", "No filtrar"];

  const { filter } = await inquirer.prompt([
    {
      type: "list",
      name: "filter",
      message: "¿Cómo desea filtrar los mercaderes?",
      choices,
    },
  ]);

  if (filter === "No filtrar") {
    inventario.getMercaderManager().showMercaderes();
    return;
  }

  const { value } = await inquirer.prompt([
    {
      type: "input",
      name: "value",
      message: `Ingrese el valor para filtrar:`,
    },
  ]);

  let mercaderes: Mercader[] = [];

  switch (filter) {
    case "Nombre":
      mercaderes = inventario.getMercaderManager().searchMercaderNombre(value);
      break;
    case "Tipo":
      mercaderes = inventario.getMercaderManager().searchMercaderTipo(value);
      break;
    case "Localización":
      mercaderes = inventario
        .getMercaderManager()
        .searchMercaderUbicacion(value);
      break;
  }

  if (mercaderes.length === 0) {
    console.log("No se encontraron mercaderes con ese criterio.");
    return;
  } else {
    console.table(mercaderes);
  }
}

/**
 * Registra transacciones de compra, venta o devolución de bienes y gestiona el inventario.
 */
export async function registerTransaction() {
  try {
    const tipo = await promptTransactionType();

    if (tipo === "devolución") {
      await handleDevolucion();
    } else {
      await handleCompraVenta(tipo);
    }

    console.log("Transacción registrada con éxito.");
  } catch (error) {
    console.error("Error al registrar la transacción:", error.message);
  } finally {
    await mainMenu();
  }
}

/**
 * Muestra un menú para seleccionar el tipo de transacción a registrar.
 * @returns El tipo de transacción seleccionado.
 */
async function promptTransactionType(): Promise<"compra" | "venta" | "devolución"> {
  const { tipo } = await inquirer.prompt([
    {
      type: "list",
      name: "tipo",
      message: "Seleccione el tipo de transacción:",
      choices: ["compra", "venta", "devolución"],
    },
  ]);
  return tipo;
}

/**
 * Gestiona la creación de una transacción de compra o venta de bienes.
 * @param tipo si es compra o venta
 */
async function handleCompraVenta(tipo: "compra" | "venta") {
  const involucrado = await promptInvolucrado(tipo);
  const bienes: Bien[] = [];
  let cantidadCoronas = 0;

  if (tipo === "compra") {
    let continuar = true;
    while (continuar) {
      const nuevoBien = await promptNuevoBien();
      bienes.push(nuevoBien);

      const { agregarOtro } = await inquirer.prompt([
        {
          type: "confirm",
          name: "agregarOtro",
          message: "¿Desea añadir otro bien a la compra?",
        },
      ]);
      continuar = agregarOtro;
    }
  } else {
    const bienesSeleccionados = await promptBienes();
    bienes.push(...bienesSeleccionados);
  }

  // Solicitar el monto total de la transacción (compra o venta)
  const { montoTotal } = await inquirer.prompt([
    {
      type: "number",
      name: "montoTotal",
      message: `Ingrese el monto total de la ${tipo} (en coronas):`,
      validate: (value) =>
        (value ?? 0) > 0 ? true : "El monto total debe ser mayor a 0.",
    },
  ]);
  cantidadCoronas = montoTotal;

  const transaccion = new Transaccion(
    tipo,
    new Date(),
    bienes,
    cantidadCoronas,
    involucrado,
  );

  inventario.getTransaccionManager().addTransaccion(transaccion);

  if (tipo === "compra") {
    bienes.forEach((bien) => inventario.getBienManager().addBien(bien));
  } else if (tipo === "venta") {
    bienes.forEach((bien) => inventario.getBienManager().removeBien(bien.id));
  }

  console.log(
    `Transacción de ${tipo} registrada con éxito. Monto total: ${cantidadCoronas} coronas.`,
  );
}

/**
 * Gestiona una transaccion de devolución de bienes.
 */
async function handleDevolucion() {
  const transacciones = inventario
    .getTransaccionManager()
    .getTransacciones()
    .filter((t) => t.tipo === "compra" || t.tipo === "venta"); // Filtrar solo compras y ventas

  if (transacciones.length === 0) {
    console.log("No hay transacciones de compra o venta registradas para realizar devoluciones.");
    return;
  }

  const { transaccionId } = await inquirer.prompt([
    {
      type: "list",
      name: "transaccionId",
      message: "Seleccione la transacción a devolver:",
      choices: [
        ...transacciones.map((t) => ({
          name: `${t.tipo.toUpperCase()} - ${t.involucrado.nombre} - ${t.fecha.toLocaleString()} - Bienes: ${t.bienes
            .map((b) => b.nombre)
            .join(", ")}`,
          value: t.id,
        })),
        { name: "Retroceder", value: "back" },
      ],
    },
  ]);

  if (transaccionId === "back") {
    return;
  }

  const transaccion = transacciones.find((t) => t.id === transaccionId)!;

  const { devolverTodo } = await inquirer.prompt([
    {
      type: "confirm",
      name: "devolverTodo",
      message: "¿Desea devolver toda la transacción?",
    },
  ]);

  if (devolverTodo) {
    processFullDevolucion(transaccion);
  } else {
    await processPartialDevolucion(transaccion);
  }
}

/**
 * Procesa una devolución completa de una transacción de compra o venta.
 * @param transaccion - La transacción a devolver.
 */
function processFullDevolucion(transaccion: Transaccion) {
  if (transaccion.tipo === "compra") {
    // Validar que los bienes existan en el inventario antes de eliminarlos
    const bienesNoDisponibles = transaccion.bienes.filter(
      (bien) => !inventario.getBienManager().getBienes().some((b) => b.id === bien.id),
    );

    if (bienesNoDisponibles.length > 0) {
      console.log(
        "No se puede realizar la devolución completa. Los siguientes bienes no están disponibles en el inventario:",
      );
      console.table(bienesNoDisponibles.map((b) => b.nombre));
      return;
    }

    transaccion.bienes.forEach((bien) =>
      inventario.getBienManager().removeBien(bien.id),
    );
  } else if (transaccion.tipo === "venta") {
    transaccion.bienes.forEach((bien) =>
      inventario.getBienManager().addBien(bien),
    );
  }

  inventario.getTransaccionManager().removeTransaccion(transaccion.id);

  // Registrar la devolución como una nueva transacción
  const devolucion = new Transaccion(
    "devolución",
    new Date(),
    transaccion.bienes,
    transaccion.cantidadCoronas,
    transaccion.involucrado,
  );
  inventario.getTransaccionManager().addTransaccion(devolucion);

  console.log("Devolución completa registrada con éxito.");
}

/**
 * Procesa una devolución parcial de una transacción de compra o venta.
 * @param transaccion - La transacción a devolver.
 */
async function processPartialDevolucion(transaccion: Transaccion) {
  const { bienesSeleccionados } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "bienesSeleccionados",
      message: "Seleccione los bienes a devolver:",
      choices: transaccion.bienes.map((b) => ({ name: b.nombre, value: b.id })),
    },
  ]);

  const bienesDevueltos = transaccion.bienes.filter((b) =>
    bienesSeleccionados.includes(b.id),
  );

  // Validar que los bienes seleccionados existan en el inventario
  const bienesNoDisponibles = bienesDevueltos.filter(
    (bien) => !inventario.getBienManager().getBienes().some((b) => b.id === bien.id),
  );

  if (bienesNoDisponibles.length > 0) {
    console.log(
      "No se puede realizar la devolución parcial. Los siguientes bienes no están disponibles en el inventario:",
    );
    console.table(bienesNoDisponibles.map((b) => b.nombre));
    return;
  }

  if (bienesDevueltos.length === transaccion.bienes.length) {
    // Si todos los bienes son seleccionados, procesar como devolución completa
    processFullDevolucion(transaccion);
    return;
  }

  if (transaccion.tipo === "compra") {
    bienesDevueltos.forEach((bien) =>
      inventario.getBienManager().removeBien(bien.id),
    );
  } else if (transaccion.tipo === "venta") {
    bienesDevueltos.forEach((bien) =>
      inventario.getBienManager().addBien(bien),
    );
  }

  // Actualizar la transacción original
  transaccion.bienes = transaccion.bienes.filter(
    (b) => !bienesSeleccionados.includes(b.id),
  );
  transaccion.cantidadCoronas -= bienesDevueltos.reduce(
    (total, bien) => total + bien.valor,
    0,
  );

  if (transaccion.bienes.length === 0) {
    inventario.getTransaccionManager().removeTransaccion(transaccion.id);
  } else {
    inventario.getTransaccionManager().updateTransaccion(transaccion.id, {
      bienes: transaccion.bienes,
      cantidadCoronas: transaccion.cantidadCoronas,
    });
  }

  // Registrar la devolución parcial como una nueva transacción
  const devolucion = new Transaccion(
    "devolución",
    new Date(),
    bienesDevueltos,
    bienesDevueltos.reduce((total, bien) => total + bien.valor, 0),
    transaccion.involucrado,
  );
  inventario.getTransaccionManager().addTransaccion(devolucion);

  console.log("Devolución parcial registrada con éxito.");
}

/**
 * 
 * @param tipo si es compra o venta
 * @returns los involucrados
 */
async function promptInvolucrado(tipo: "compra" | "venta"): Promise<Cliente | Mercader> {
  const manager =
    tipo === "compra"
      ? inventario.getMercaderManager()
      : inventario.getClienteManager();

  const involucrados =
    tipo === "compra"
      ? (manager as MercaderManager).getMercaderes()
      : (manager as ClienteManager).getClientes();

  if (!involucrados || involucrados.length === 0) {
    throw new Error(`No hay ${tipo === "compra" ? "mercaderes" : "clientes"} registrados.`);
  }

  const { involucradoId } = await inquirer.prompt([
    {
      type: "list",
      name: "involucradoId",
      message: `Seleccione el ${tipo === "compra" ? "mercader" : "cliente"} involucrado:`,
      choices: involucrados.map((i) => ({ name: i.nombre, value: i.id })),
    },
  ]);

  return involucrados.find((i) => i.id === involucradoId)!;
}

/**
 * Prompt para seleccionar los bienes involucrados en una transacción de venta.
 * @returns los bienes seleccionados
 */
async function promptBienes(): Promise<Bien[]> {
  const bienes = inventario.getBienManager().getBienes();

  if (!bienes || bienes.length === 0) {
    throw new Error("No hay bienes registrados en el inventario.");
  }

  const { bienesSeleccionados } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "bienesSeleccionados",
      message: "Seleccione los bienes involucrados en la transacción:",
      choices: bienes.map((b) => ({ name: b.nombre, value: b.id })),
    },
  ]);

  if (bienesSeleccionados.length === 0) {
    throw new Error("Debe seleccionar al menos un bien para la transacción.");
  }

  return bienes.filter((b) => bienesSeleccionados.includes(b.id));
}

/**
 * Prompt para añadir un nuevo bien al inventario.
 * @returns el nuevo bien
 */
async function promptNuevoBien(): Promise<Bien> {
  const answers = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del bien:" },
    { type: "input", name: "descripcion", message: "Descripción del bien:" },
    { type: "input", name: "material", message: "Material del bien:" },
    { type: "number", name: "peso", message: "Peso del bien (kg):" },
    { type: "number", name: "valor", message: "Valor del bien (coronas):" },
  ]);

  return new Bien(
    answers.nombre,
    answers.descripcion,
    answers.material,
    answers.peso,
    answers.valor,
  );
}

/**
 * Genera un informe del estado del stock de un tipo de bien o de un artículo en particular.
 * @param nombre - Nombre del bien a consultar.
 */
export function reportStockEstado(nombre: string) {
  const bienes = inventario.getBienManager().searchBienNombre(nombre);
  if (bienes.length === 0) {
    console.log(`No se encontraron bienes con el nombre "${nombre}".`);
  } else {
    console.table(bienes);
  }
}

/**
 * Genera un informe de los bienes más vendidos o más demandados.
 * @param tipo - Tipo de informe: "vendidos" o "demandados".
 */
export function reportBienesPopulares(tipo: "vendidos" | "demandados") {
  const transacciones = inventario.getTransaccionManager().getTransacciones();
  const conteo: Record<string, number> = {};

  transacciones.forEach((t) => {
    if (
      (tipo === "vendidos" && t.tipo === "venta") ||
      (tipo === "demandados" && t.tipo === "compra")
    ) {
      t.bienes.forEach((b) => {
        conteo[b.nombre] = (conteo[b.nombre] || 0) + 1;
      });
    }
  });

  const populares = Object.entries(conteo).sort((a, b) => b[1] - a[1]);
  console.table(populares.map(([nombre, cantidad]) => ({ nombre, cantidad })));
}

/**
 * Calcula el total de ingresos por ventas a clientes y gastos en adquisiciones a mercaderes.
 */
export function reportIngresosGastos() {
  const transacciones = inventario.getTransaccionManager().getTransacciones();
  let ingresos = 0;
  let gastos = 0;

  transacciones.forEach((t) => {
    if (t.tipo === "venta") {
      ingresos += t.cantidadCoronas;
    } else if (t.tipo === "compra") {
      gastos += t.cantidadCoronas;
    }
  });

  console.log("Informe de ingresos y gastos:");
  console.log(`Total de ingresos por ventas: ${ingresos} coronas`);
  console.log(`Total de gastos por adquisiciones: ${gastos} coronas`);
}

/**
 * Genera un histórico de transacciones de un cliente o mercader específico.
 * @param nombre - Identificador único del cliente o mercader.
 */
export function reportHistoricoTransacciones(nombre: string) {
  const transacciones = inventario.getTransaccionManager().getTransacciones();
  const historico = transacciones.filter(
    (t) => t.involucrado.nombre === nombre,
  );

  if (historico.length === 0) {
    console.log(
      `No se encontraron transacciones para el cliente o mercader "${nombre}".`,
    );
  } else {
    console.table(
      historico.map((t) => ({
        tipo: t.tipo,
        fecha: new Date(t.fecha).toLocaleString(),
        bienes: t.bienes.map((b) => b.nombre).join(", "),
        cantidadCoronas: t.cantidadCoronas,
      })),
    );
  }
}

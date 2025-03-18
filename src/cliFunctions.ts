import { Inventario } from "./inventario.js";
import { Bien } from "./bien.js";
import { Transaccion } from "./transaccion.js";
import { Cliente } from "./cliente.js";
import { Mercader } from "./mercader.js";
import inquirer from "inquirer";
import { mainMenu, inventario } from "./cli.js";

export async function addBien() {

  const answers = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del bien:" },
    { type: "input", name: "descripcion", message: "Descripción del bien:" },
    { type: "input", name: "material", message: "Material del bien:" },
    { type: "number", name: "peso", message: "Peso del bien:" },
    { type: "number", name: "valor", message: "Valor del bien:" },
    { type: "list", name: "exit", message: "¿Desea continuar o salir al menú principal?", choices: ["Continuar", "Salir al menú principal"] },
  ]);

  if (answers.exit === "Salir al menú principal y no añadir bien") {
    return mainMenu();
  }

  const bien = new Bien(
    answers.nombre,
    answers.descripcion,
    answers.material,
    answers.peso,
    answers.valor
  );

  //inventario.addBien(bien);
  inventario.getBienManager().addBien(bien);
  console.log("Bien añadido con éxito.");
  mainMenu();
}

export async function removeBien() {
  const bienes = inventario.getBienManager().getBienes();
  if (!bienes || bienes.length === 0) {
    console.log("No hay bienes en el inventario para eliminar.");
    return mainMenu();
  }

  const { bienId } = await inquirer.prompt([
    {
      type: "list",
      name: "bienId",
      message: "Seleccione el bien a eliminar:",
      choices: [...bienes.map((b) => ({ name: b.nombre, value: b.id })), { name: "Salir al menú principal", value: "exit" }],
    },
  ]);

  if (bienId === "exit") {
    return mainMenu();
  }

  const bien = bienes.find((b) => b.id === bienId);
  if (bien) {
    inventario.getBienManager().removeBien(bien.id);
    console.log("Bien eliminado con éxito.");
  } else {
    console.log("No se encontró el bien especificado.");
  }
  mainMenu();
}

export async function addCliente() {
  const answers = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del cliente:" },
    { type: "input", name: "raza", message: "Raza del cliente:" },
    { type: "input", name: "ubicacion", message: "Ubicación del cliente:" },
    { type: "list", name: "exit", message: "¿Desea continuar o salir al menú principal?", choices: ["Continuar", "Salir al menú principal"] },
  ]);

  if (answers.exit === "exit") {
    return mainMenu();
  }

  const cliente = new Cliente(answers.nombre, answers.raza, answers.ubicacion);

  try {
    inventario.getClienteManager().addCliente(cliente);
    console.log("Cliente añadido con éxito.");
  } catch (error) {
    console.error("Error al añadir el cliente:", error.message);
  }

  mainMenu();
}

export async function addMercader() {
  const answers = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del mercader:" },
    { type: "input", name: "raza", message: "Raza del mercader:" },
    { type: "input", name: "ubicacion", message: "Ubicación del mercader:" },
    { type: "list", name: "exit", message: "¿Desea continuar o salir al menú principal?", choices: ["Continuar", "Salir al menú principal"] },
  ]);

  if (answers.exit === "exit") {
    return mainMenu();
  }

  const mercader = new Mercader(answers.nombre, answers.raza, answers.ubicacion);

  try {
    inventario.getMercaderManager().addMercader(mercader);
    console.log("Mercader añadido con éxito.");
  } catch (error) {
    console.error("Error al añadir el mercader:", error.message);
  }

  mainMenu();
}

export async function registerTransaction() {
  const bienes = inventario.getBienManager().getBienes();
  const clientes = inventario.getClienteManager().getClientes();
  const mercaderes = inventario.getMercaderManager().getMercaderes();
  const transacciones = inventario.getTransaccionManager().getTransacciones();

  // Preguntar el tipo de transacción
  const { tipo } = await inquirer.prompt([
    {
      type: "list",
      name: "tipo",
      message: "Tipo de transacción:",
      choices: ["venta", "compra", "devolución", "Salir al menú principal"],
    },
  ]);

  if (tipo === "Salir al menú principal") {
    return mainMenu();
  }

  // Determinar el tipo de involucrado
  let involucradoTipo: string | undefined;

  if (tipo === "venta" && clientes.length > 0) {
    involucradoTipo = "cliente";
  } else if (tipo === "compra" && mercaderes.length > 0) {
    involucradoTipo = "mercader";
  } else if (tipo === "devolución") {
    involucradoTipo = "devolución"; // No se necesita cliente o mercader para devolución
  } else {
    console.log(`No hay ${tipo === "venta" ? "clientes" : "mercaderes"} disponibles para esta transacción.`);
    return mainMenu();
  }

  // Caso especial: devolución
  if (involucradoTipo === "devolución") {
    const transaccionesValidas = transacciones.filter(
      (t) => t.tipo === "compra" || t.tipo === "venta"
    );

    if (!transaccionesValidas || transaccionesValidas.length === 0) {
      console.log("No hay transacciones de compra o venta disponibles para devolución.");
      return mainMenu();
    }

    const { transaccionId } = await inquirer.prompt([
      {
        type: "list",
        name: "transaccionId",
        message: "Seleccione la transacción para la devolución:",
        choices: transaccionesValidas.map((t) => ({
          name: `${t.tipo} - ${new Date(t.fecha).toLocaleString()} - ${t.bienes.map((b) => b.nombre).join(", ")}`,
          value: t.id,
        })).concat({ name: "Salir al menú principal", value: "exit" }),
      },
    ]);

    if (transaccionId === "exit") {
      return mainMenu();
    }

    const transaccionOriginal = transacciones.find((t) => t.id === transaccionId);
    if (!transaccionOriginal) {
      console.log("Transacción no encontrada.");
      return mainMenu();
    }

    const bienesDevueltos = transaccionOriginal.bienes;

    if (transaccionOriginal.tipo === "compra") {
      bienesDevueltos.forEach((bien) => {
        inventario.getBienManager().removeBien(bien.id);
      });
    } else if (transaccionOriginal.tipo === "venta") {
      bienesDevueltos.forEach((bien) => {
        inventario.getBienManager().addBien(bien);
      });
    }

    const transaccionDevolucion = new Transaccion(
      "devolución",
      new Date(),
      bienesDevueltos,
      transaccionOriginal.cantidadCoronas,
      transaccionOriginal.involucrado
    );

    inventario.getTransaccionManager().addTransaccion(transaccionDevolucion);
    inventario.getTransaccionManager().removeTransaccion(transaccionOriginal.id);

    console.log("Devolución registrada con éxito.");
    return mainMenu();
  }

  // Seleccionar cliente o mercader para venta o compra
  const { involucradoId } = await inquirer.prompt([
    {
      type: "list",
      name: "involucradoId",
      message: `Seleccione el ${involucradoTipo}:`,
      choices: (involucradoTipo === "cliente" ? clientes : mercaderes).map((i) => ({
        name: i.nombre,
        value: i.id,
      })).concat({ name: "Salir al menú principal", value: "exit" }),
    },
  ]);

  if (involucradoId === "exit") {
    return mainMenu();
  }

  const involucrado =
    involucradoTipo === "cliente"
      ? clientes.find((c) => c.id === involucradoId)
      : mercaderes.find((m) => m.id === involucradoId);

  if (!involucrado) {
    console.log("Involucrado no encontrado.");
    return mainMenu();
  }

  // Manejar compra
  if (tipo === "compra") {
    const answers = await inquirer.prompt([
      { type: "input", name: "nombre", message: "Nombre del bien:" },
      { type: "input", name: "descripcion", message: "Descripción del bien:" },
      { type: "input", name: "material", message: "Material del bien:" },
      { type: "number", name: "peso", message: "Peso del bien:" },
      { type: "number", name: "valor", message: "Valor del bien:" },
      { type: "number", name: "cantidadCoronas", message: "Cantidad de coronas:" },
      { type: "list", name: "exit", message: "¿Desea continuar o salir al menú principal?", choices: ["Continuar", "Salir al menú principal"] },
    ]);

    if (answers.exit === "Salir al menú principal") {
      return mainMenu();
    }

    const bien = new Bien(
      answers.nombre,
      answers.descripcion,
      answers.material,
      answers.peso,
      answers.valor
    );

    inventario.getBienManager().addBien(bien);

    const transaccion = new Transaccion(
      tipo,
      new Date(),
      [bien],
      answers.cantidadCoronas,
      involucrado
    );

    inventario.getTransaccionManager().addTransaccion(transaccion);
    console.log("Transacción de compra registrada con éxito.");
  }

  // Manejar venta
  else if (tipo === "venta") {
    if (!bienes || bienes.length === 0) {
      console.log("No hay bienes disponibles para la venta.");
      return mainMenu();
    }

    const { bienId, cantidadCoronas } = await inquirer.prompt([
      {
        type: "list",
        name: "bienId",
        message: "Seleccione el bien a vender:",
        choices: bienes.map((b) => ({ name: b.nombre, value: b.id })).concat({ name: "Salir al menú principal", value: "exit" }),
      },
      {
        type: "number",
        name: "cantidadCoronas",
        message: "Cantidad de coronas:",
      },
    ]);

    if (bienId === "exit") {
      return mainMenu();
    }

    const bien = bienes.find((b) => b.id === bienId);
    if (!bien) {
      console.log("Bien no encontrado.");
      return mainMenu();
    }

    inventario.getBienManager().removeBien(bien.id);

    const transaccion = new Transaccion(
      tipo,
      new Date(),
      [bien],
      cantidadCoronas,
      involucrado
    );

    inventario.getTransaccionManager().addTransaccion(transaccion);
    console.log("Transacción de venta registrada con éxito.");
  }

  mainMenu();
}
import inquirer from "inquirer";
import { Inventario } from "./inventario.js";
import { Bien } from "./bien.js";
import { Transaccion } from "./transaccion.js";
import { Cliente } from "./cliente.js";
import { Mercader } from "./mercader.js";

// Inicializar el inventario
const inventario = new Inventario();

async function mainMenu() {
  const choices = [
    "Mostrar bienes",
    "Añadir bien",
    "Añadir mercader",
    "Añadir cliente",
    "Registrar transacción",
    "Eliminar bien",
    "Mostrar transacciones",
    "Salir",
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Seleccione una acción:",
      choices,
    },
  ]);

  switch (action) {
    case "Mostrar bienes":
      //inventario.showBienes();
      inventario.getBienManager().showBienes();
      mainMenu();
      break;
    case "Añadir bien":
      addBien();
      break;
    case "Eliminar bien":
      removeBien();
      break;
    case "Registrar transacción":
      registerTransaction();
      break;
    case "Añadir cliente":
      addCliente();
      break;
    case "Añadir mercader":
      addMercader();
      break;
    case "Mostrar transacciones":
      //inventario.showTransacciones();
      inventario.getTransaccionManager().showTransacciones();
      mainMenu();
      break;
    case "Salir":
      console.log("Saliendo...");
      process.exit(0);
  }
}

/* function showBienes() {
  const bienes = inventario.getBienes();
  if (bienes && bienes.length > 0) {
    console.table(bienes);
  } else {
    console.log("No hay bienes en el inventario.");
  }
  mainMenu();
} */

async function addBien() {
  const answers = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del bien:" },
    { type: "input", name: "descripcion", message: "Descripción del bien:" },
    { type: "input", name: "material", message: "Material del bien:" },
    { type: "number", name: "peso", message: "Peso del bien:" },
    { type: "number", name: "valor", message: "Valor del bien:" },
  ]);

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

async function removeBien() {
  //const bienes = inventario.getBienes();
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
      choices: bienes.map((b) => ({ name: b.nombre, value: b.id })),
    },
  ]);

  const bien = bienes.find((b) => b.id === bienId);
  if (bien) {
    //inventario.removeBien(bien.id);
    inventario.getBienManager().removeBien(bien.id);
    console.log("Bien eliminado con éxito.");
  } else {
    console.log("No se encontró el bien especificado.");
  }
  mainMenu();
}

async function addCliente() {
  const answers = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del cliente:" },
    { type: "input", name: "raza", message: "Raza del cliente:" },
    { type: "input", name: "ubicacion", message: "Ubicación del cliente:" },
  ]);

  const cliente = new Cliente(answers.nombre, answers.raza, answers.ubicacion);

  try {
    inventario.getClienteManager().addCliente(cliente);
    console.log("Cliente añadido con éxito.");
  } catch (error) {
    console.error("Error al añadir el cliente:", error.message);
  }

  mainMenu();
}

async function addMercader() {
  const answers = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre del mercader:" },
    { type: "input", name: "raza", message: "Raza del mercader:" },
    { type: "input", name: "ubicacion", message: "Ubicación del mercader:" },
  ]);

  const mercader = new Mercader(answers.nombre, answers.raza, answers.ubicacion);

  try {
    inventario.getMercaderManager().addMercader(mercader);
    console.log("Mercader añadido con éxito.");
  } catch (error) {
    console.error("Error al añadir el mercader:", error.message);
  }

  mainMenu();
}

async function registerTransaction() {
  const bienes = inventario.getBienManager().getBienes();
  const clientes = inventario.getClienteManager().getClientes();
  const mercaderes = inventario.getMercaderManager().getMercaderes();
  const transacciones = inventario.getTransaccionManager().getTransacciones();

  if ((!clientes || clientes.length === 0) && (!mercaderes || mercaderes.length === 0)) {
    console.log("No hay clientes ni mercaderes disponibles para la transacción.");
    return mainMenu();
  }

  const { tipo, involucradoTipo } = await inquirer.prompt([
    {
      type: "list",
      name: "tipo",
      message: "Tipo de transacción:",
      choices: ["compra", "venta", "devolución"],
    },
    {
      type: "list",
      name: "involucradoTipo",
      message: "Seleccione el tipo de involucrado:",
      choices: [
        ...(clientes.length > 0 ? ["cliente"] : []),
        ...(mercaderes.length > 0 ? ["mercader"] : []),
      ],
    },
  ]);

  let involucradoId: string | undefined;
  if (involucradoTipo === "cliente") {
    if (clientes.length === 0) {
      console.log("No hay clientes disponibles.");
      return mainMenu();
    }
    ({ involucradoId } = await inquirer.prompt([
      {
        type: "list",
        name: "involucradoId",
        message: "Seleccione el cliente:",
        choices: clientes.map((c) => ({ name: c.nombre, value: c.id })),
      },
    ]));
  } else if (involucradoTipo === "mercader") {
    if (mercaderes.length === 0) {
      console.log("No hay mercaderes disponibles.");
      return mainMenu();
    }
    ({ involucradoId } = await inquirer.prompt([
      {
        type: "list",
        name: "involucradoId",
        message: "Seleccione el mercader:",
        choices: mercaderes.map((m) => ({ name: m.nombre, value: m.id })),
      },
    ]));
  }

  const involucrado =
    involucradoTipo === "cliente"
      ? clientes.find((c) => c.id === involucradoId)
      : mercaderes.find((m) => m.id === involucradoId);

  if (!involucrado) {
    console.log("Involucrado no encontrado.");
    return mainMenu();
  }

  if (tipo === "compra") {
    const answers = await inquirer.prompt([
      { type: "input", name: "nombre", message: "Nombre del bien:" },
      { type: "input", name: "descripcion", message: "Descripción del bien:" },
      { type: "input", name: "material", message: "Material del bien:" },
      { type: "number", name: "peso", message: "Peso del bien:" },
      { type: "number", name: "valor", message: "Valor del bien:" },
      { type: "number", name: "cantidadCoronas", message: "Cantidad de coronas:" },
    ]);

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
  } else if (tipo === "venta") {
    if (!bienes || bienes.length === 0) {
      console.log("No hay bienes disponibles para la venta.");
      return mainMenu();
    }

    const { bienId, cantidadCoronas } = await inquirer.prompt([
      {
        type: "list",
        name: "bienId",
        message: "Seleccione el bien a vender:",
        choices: bienes.map((b) => ({ name: b.nombre, value: b.id })),
      },
      {
        type: "number",
        name: "cantidadCoronas",
        message: "Cantidad de coronas:",
      },
    ]);

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
  } else if (tipo === "devolución") {
    // Filtrar transacciones válidas para devolución según el involucrado seleccionado
    const transaccionesValidas = transacciones.filter(
      (t) =>
        (t.tipo === "compra" || t.tipo === "venta") &&
        t.involucrado.id === involucrado.id // Solo transacciones del mismo cliente o mercader
    );
  
    if (!transaccionesValidas || transaccionesValidas.length === 0) {
      console.log("No hay transacciones de compra o venta disponibles para devolución con este involucrado.");
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
        })),
      },
    ]);
  
    const transaccionOriginal = transacciones.find((t) => t.id === transaccionId);
    if (!transaccionOriginal) {
      console.log("Transacción no encontrada.");
      return mainMenu();
    }
  
    const bienesDevueltos = transaccionOriginal.bienes;
  
    if (transaccionOriginal.tipo === "compra") {
      // Si es una devolución de compra, eliminar los bienes del inventario
      bienesDevueltos.forEach((bien) => inventario.getBienManager().removeBien(bien.id));
    } else if (transaccionOriginal.tipo === "venta") {
      // Si es una devolución de venta, añadir los bienes al inventario
      bienesDevueltos.forEach((bien) => inventario.getBienManager().addBien(bien));
    }
  
    const transaccionDevolucion = new Transaccion(
      "devolución",
      new Date(),
      bienesDevueltos,
      transaccionOriginal.cantidadCoronas,
      involucrado
    );
  
    inventario.getTransaccionManager().addTransaccion(transaccionDevolucion);

    const eliminado = inventario.getTransaccionManager().removeTransaccion(transaccionOriginal.id);
    if (eliminado) {
      console.log("Transacción original eliminada después de la devolución.");
    } else {
      console.log("Error al eliminar la transacción original.");
    }
    console.log("Devolución registrada con éxito.");
  } else {
    console.log("Tipo de transacción no soportado.");
  }

  mainMenu();
}

/* function showTransacciones() {
  const transacciones = inventario.getTransacciones();
  if (transacciones && transacciones.length > 0) {
    console.table(transacciones);
  } else {
    console.log("No hay transacciones registradas.");
  }
  mainMenu();
} */

// Iniciar el CLI
mainMenu();
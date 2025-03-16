import inquirer from "inquirer";
import { Inventario } from "./inventario.js";
import { Bien } from "./bien.js";
import { Transaccion } from "./transaccion.js";

// Inicializar el inventario
const inventario = new Inventario();

async function mainMenu() {
  const choices = [
    "Mostrar bienes",
    "Añadir bien",
    "Eliminar bien",
    "Registrar transacción",
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

async function registerTransaction() {
  //const bienes = inventario.getBienes();
  //const clientes = inventario.getClientes();
  const bienes = inventario.getBienManager().getBienes();
  const clientes = inventario.getClienteManager().getClientes();

  if (!bienes || bienes.length === 0) {
    console.log("No hay bienes disponibles para la transacción.");
    return mainMenu();
  }

  if (!clientes || clientes.length === 0) {
    console.log("No hay clientes disponibles para la transacción.");
    return mainMenu();
  }

  const { tipo, clienteId, bienIds, cantidadCoronas } = await inquirer.prompt([
    {
      type: "list",
      name: "tipo",
      message: "Tipo de transacción:",
      choices: ["compra", "venta", "devolución"],
    },
    {
      type: "list",
      name: "clienteId",
      message: "Seleccione el cliente involucrado:",
      choices: clientes.map((c) => ({ name: c.nombre, value: c.id })),
    },
    {
      type: "checkbox",
      name: "bienIds",
      message: "Seleccione los bienes involucrados:",
      choices: bienes.map((b) => ({ name: b.nombre, value: b.id })),
    },
    {
      type: "number",
      name: "cantidadCoronas",
      message: "Cantidad de coronas:",
    },
  ]);

  const bienesInvolucrados = bienes.filter((b) => bienIds.includes(b.id));
  const cliente = clientes.find((c) => c.id === clienteId);

  if (!cliente) {
    console.log("Cliente no encontrado.");
    return mainMenu();
  }

  const transaccion = new Transaccion(
    tipo,
    new Date(),
    bienesInvolucrados,
    cantidadCoronas,
    cliente
  );

  //inventario.addTransaccion(transaccion);
  inventario.getTransaccionManager().addTransaccion(transaccion);
  console.log("Transacción registrada con éxito.");
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
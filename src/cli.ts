import inquirer from "inquirer";
import { Inventario } from "./inventario.js";
import { Bien } from "./bien.js";
import { Transaccion } from "./transaccion.js";
import { Cliente } from "./cliente.js";
import { Mercader } from "./mercader.js";
import { addBien, removeBien, addCliente, addMercader, registerTransaction } from "./cliFunctions.js";

// Inicializar el inventario
export const inventario = new Inventario();

export async function mainMenu() {
  const choices = [
    "Mostrar bienes",
    "Mostrar transacciones",
    "Añadir bien",
    "Añadir mercader",
    "Añadir cliente",
    "Registrar transacción",
    "Eliminar bien",
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
      inventario.getTransaccionManager().showTransacciones();
      mainMenu();
      break;
    case "Salir":
      console.log("Saliendo...");
      process.exit(0);
  }
}

// Iniciar el CLI
mainMenu();
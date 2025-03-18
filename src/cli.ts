import inquirer from "inquirer";
import { Inventario } from "./inventario.js";
import { Bien } from "./bien.js";
import { Transaccion } from "./transaccion.js";
import { Cliente } from "./cliente.js";
import { Mercader } from "./mercader.js";
import { addBien, removeBien, addCliente, addMercader, registerTransaction, reportBienesPopulares, reportIngresosGastos, reportHistoricoTransacciones, reportStockEstado } from "./cliFunctions.js";

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
    "Generar informes",
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
    // Agregar opción en el menú principal
    case "Generar informes":
      await reportMenu();
      break;

      // Submenú de informes
      async function reportMenu() {
        const choices = [
          "Estado del stock",
          "Bienes más vendidos",
          "Bienes más demandados",
          "Ingresos y gastos",
          "Histórico de transacciones",
          "Volver al menú principal",
        ];

        const { report } = await inquirer.prompt([
          {
            type: "list",
            name: "report",
            message: "Seleccione un informe:",
            choices,
          },
        ]);

        switch (report) {
          case "Estado del stock":
            const { bienNombre } = await inquirer.prompt([
              { type: "input", name: "bienNombre", message: "Nombre del bien:" },
            ]);
            reportStockEstado(bienNombre);
            break;
          case "Bienes más vendidos":
            reportBienesPopulares("vendidos");
            break;
          case "Bienes más demandados":
            reportBienesPopulares("demandados");
            break;
          case "Ingresos y gastos":
            reportIngresosGastos();
            break;
          case "Histórico de transacciones":
            const { id } = await inquirer.prompt([
              { type: "input", name: "id", message: "ID del cliente o mercader:" },
            ]);
            reportHistoricoTransacciones(id);
            break;
          case "Volver al menú principal":
            mainMenu();
            return;
        }

        await reportMenu();
      }
    case "Salir":
      console.log("Saliendo...");
      process.exit(0);
  }
}

// Iniciar el CLI
mainMenu();
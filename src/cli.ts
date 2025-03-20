import inquirer from "inquirer";
import { Inventario } from "./inventario.js";
import { addBien, removeBien, addCliente, addMercader, registerTransaction, reportBienesPopulares, reportIngresosGastos, reportHistoricoTransacciones, reportStockEstado, updateBien, filtrarClientes, filtrarMercaderes, removeCliente, removeMercader, updateCliente, updateMercader } from "./cliFunctions.js";

// Inicializar el inventario
export const inventario = new Inventario();

export async function mainMenu() {
  const choices = [
    "Mostrar bienes",
    "Gestionar bienes",
    "Mostrar clientes/mercaderes",
    "Gestionar clientes/mercaderes",
    "Mostrar transacciones",
    "Registrar transacción",
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
      mostrarBienesMenu();
      break;

      async function mostrarBienesMenu() {
        const choices = [
          "Por coronas", 
          "Alfabeticamente", 
          "Volver al menú principal",
        ];

        const { criterio } = await inquirer.prompt([
          {
            type: "list",
            name: "criterio",
            message: "¿Cómo desea ordenar los bienes?",
            choices,
          },
        ]);
      
        if (criterio === "Volver al menú principal") {
          return mainMenu();
        }
      
        const { orden } = await inquirer.prompt([
          {
            type: "list",
            name: "orden",
            message: "Seleccione el orden:",
            choices: ["Ascendente", "Descendente"],
          },
        ]);
      
        inventario.getBienManager().showBienes(criterio, orden);
        await mostrarBienesMenu();
      }
    case "Gestionar bienes":
      gestionarBienesMenu();
      break;
      
      async function gestionarBienesMenu() {
        const choices = [
          "Añadir bien", 
          "Eliminar bien", 
          "Editar bien", 
          "Volver al menú principal",
        ];

        const { action } = await inquirer.prompt([
          {
            type: "list",
            name: "action",
            message: "¿Qué desea hacer?",
            choices,
          },
        ]);

        switch (action) {
          case "Añadir bien":
            await addBien();
            break;
          case "Eliminar bien":
            await removeBien();
            break;
          case "Editar bien":
            await updateBien();
            break;
          case "Volver al menú principal":
            mainMenu();
            return;
        }
        await gestionarBienesMenu();
      }
    case "Mostrar clientes/mercaderes":
      mostrarClientesMercaderesMenu();
      break;
      
      async function mostrarClientesMercaderesMenu() {
        const choices = [
          "Clientes", 
          "Mercaderes", 
          "Volver al menú principal",
        ];

        const { action } = await inquirer.prompt([
          {
            type: "list",
            name: "action",
            message: "¿Qué desea mostrar?",
            choices,
          },
        ]);

        switch (action) {
          case "Clientes":
            await filtrarClientes();
            break;
          case "Mercaderes":
            await filtrarMercaderes();
            break;
          case "Volver al menú principal":
            mainMenu();
            return;
        }
        await mostrarClientesMercaderesMenu();
      }
    case "Gestionar clientes/mercaderes":
      gestionarClientesMercaderesMenu();
      break;

      async function gestionarClientesMercaderesMenu() {
        const choices = [
          "Añadir cliente",
          "Añadir mercader",
          "Eliminar cliente",
          "Eliminar mercader",
          "Editar cliente",
          "Editar mercader",
          "Volver al menú principal",
        ];

        const { action } = await inquirer.prompt([
          {
            type: "list",
            name: "action",
            message: "¿Qué desea hacer?",
            choices,
          },
        ]);

        switch (action) {
          case "Añadir cliente":
            await addCliente();
            break;
          case "Añadir mercader":
            await addMercader();
            break;
          case "Eliminar cliente":
            await removeCliente();
            break;
          case "Eliminar mercader":
            await removeMercader();
            break;
          case "Editar cliente":
            await updateCliente();
            break;
          case "Editar mercader":
            await updateMercader();
            break;
          case "Volver al menú principal":
            mainMenu();
            return;
        }
        await gestionarClientesMercaderesMenu();
      }
    case "Registrar transacción":
      registerTransaction();
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
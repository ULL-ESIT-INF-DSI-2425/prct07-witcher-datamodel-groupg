import { Bien } from "./bien.js";
import { Transaccion } from "./transaccion.js";
import { Cliente } from "./cliente.js";
import { Mercader } from "./mercader.js";
import inquirer from "inquirer";
import { mainMenu, inventario } from "./cli.js";

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
  } else {
    console.table(mercaderes);
  }
}

/**
 * Registra tansacciones de compra, venta o devolución de bienes y gestiona el inventario.
 */
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
    console.log(
      `No hay ${tipo === "venta" ? "clientes" : "mercaderes"} disponibles para esta transacción.`,
    );
    return mainMenu();
  }

  if (involucradoTipo === "devolución") {
    const transaccionesValidas = transacciones.filter(
      (t) => t.tipo === "compra" || t.tipo === "venta",
    );

    if (!transaccionesValidas || transaccionesValidas.length === 0) {
      console.log(
        "No hay transacciones de compra o venta disponibles para devolución.",
      );
      return mainMenu();
    }

    const { transaccionId } = await inquirer.prompt([
      {
        type: "list",
        name: "transaccionId",
        message: "Seleccione la transacción para la devolución:",
        choices: transaccionesValidas
          .map((t) => ({
            name: `${t.tipo} - ${new Date(t.fecha).toLocaleString()} - ${t.bienes.map((b) => b.nombre).join(", ")}`,
            value: t.id,
          }))
          .concat({ name: "Salir al menú principal", value: "exit" }),
      },
    ]);

    if (transaccionId === "exit") {
      return mainMenu();
    }

    const transaccionOriginal = transacciones.find(
      (t) => t.id === transaccionId,
    );
    if (!transaccionOriginal) {
      console.log("Transacción no encontrada.");
      return mainMenu();
    }

    const { devolverTodos } = await inquirer.prompt([
      {
        type: "confirm",
        name: "devolverTodos",
        message: "¿Desea devolver todos los bienes de esta transacción?",
      },
    ]);

    const bienesDevueltos: Bien[] = devolverTodos
      ? transaccionOriginal.bienes
      : await inquirer
          .prompt([
            {
              type: "checkbox",
              name: "bienesSeleccionados",
              message: "Seleccione los bienes a devolver:",
              choices: transaccionOriginal.bienes
                .map((b) => ({ name: b.nombre, value: b.id }))
                .concat({ name: "Salir al menú principal", value: "exit" }),
            },
          ])
          .then((res) =>
            transaccionOriginal.bienes.filter((b) =>
              res.bienesSeleccionados.includes(b.id),
            ),
          );

    if (bienesDevueltos.some((bien) => bien.id === "exit")) {
      return mainMenu();
    }

    if (bienesDevueltos.length === 0) {
      console.log("No se seleccionaron bienes para devolver.");
      return mainMenu();
    }

    // Calcular el valor total de los bienes devueltos
    const valorDevuelto = bienesDevueltos.reduce(
      (total, bien) => total + bien.valor,
      0,
    );

    // Actualizar inventario según el tipo de transacción original
    if (transaccionOriginal.tipo === "compra") {
      for (const bien of bienesDevueltos) {
        await inventario.getBienManager().removeBien(bien.id);
      }
    } else if (transaccionOriginal.tipo === "venta") {
      for (const bien of bienesDevueltos) {
        await inventario.getBienManager().addBien(bien);
      }
    }

    // Actualizar la transacción original eliminando los bienes devueltos
    transaccionOriginal.bienes = transaccionOriginal.bienes.filter(
      (bien) => !bienesDevueltos.some((bDevuelto) => bDevuelto.id === bien.id),
    );

    // Actualizar la cantidad total de la transacción original
    transaccionOriginal.cantidadCoronas -= valorDevuelto;

    if (transaccionOriginal.bienes.length === 0) {
      await inventario
        .getTransaccionManager()
        .removeTransaccion(transaccionOriginal.id);
      console.log(
        "Todos los bienes fueron devueltos. La transacción original ha sido eliminada.",
      );
    } else {
      // Si quedan bienes, actualizar la transacción original
      const actualizado = await inventario
        .getTransaccionManager()
        .updateTransaccion(transaccionOriginal.id, {
          bienes: transaccionOriginal.bienes,
          cantidadCoronas: transaccionOriginal.cantidadCoronas,
        });

      if (actualizado) {
        console.log(
          `La transacción original ahora tiene un valor total de ${transaccionOriginal.cantidadCoronas} coronas.`,
        );
        console.log(
          `Los bienes restantes en la transacción original son: ${transaccionOriginal.bienes.map((b) => b.nombre).join(", ")}`,
        );
      } else {
        console.error("Error al actualizar la transacción original.");
      }
    }

    // Registrar la nueva transacción de devolución
    const transaccionDevolucion = new Transaccion(
      "devolución",
      new Date(),
      bienesDevueltos,
      valorDevuelto,
      transaccionOriginal.involucrado,
    );

    // Verificar si ya existe una devolución idéntica
    const transaccionesExistentes = inventario
      .getTransaccionManager()
      .getTransacciones();
    const devolucionDuplicada = transaccionesExistentes.some(
      (t) =>
        t.tipo === "devolución" &&
        t.cantidadCoronas === valorDevuelto &&
        t.involucrado.id === transaccionOriginal.involucrado.id &&
        t.bienes.length === bienesDevueltos.length &&
        t.bienes.every((b, index) => b.id === bienesDevueltos[index].id),
    );

    if (devolucionDuplicada) {
      console.log("Esta devolución ya ha sido registrada previamente.");
    } else {
      await inventario
        .getTransaccionManager()
        .addTransaccion(transaccionDevolucion);
      console.log("Devolución registrada con éxito.");
      console.log(
        `Se devolvieron bienes por un valor total de ${valorDevuelto} coronas.`,
      );
    }
    return mainMenu();
  }

  // Seleccionar cliente o mercader para venta o compra
  const { involucradoId } = await inquirer.prompt([
    {
      type: "list",
      name: "involucradoId",
      message: `Seleccione el ${involucradoTipo}:`,
      choices: (involucradoTipo === "cliente" ? clientes : mercaderes)
        .map((i) => ({
          name: i.nombre,
          value: i.id,
        }))
        .concat({ name: "Salir al menú principal", value: "exit" }),
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
    const bienesComprados: Bien[] = [];
    let continuar = true;

    while (continuar) {
      const answers = await inquirer.prompt([
        { type: "input", name: "nombre", message: "Nombre del bien:" },
        {
          type: "input",
          name: "descripcion",
          message: "Descripción del bien:",
        },
        { type: "input", name: "material", message: "Material del bien:" },
        { type: "number", name: "peso", message: "Peso del bien:" },
        { type: "number", name: "valor", message: "Valor del bien:" },
        {
          type: "confirm",
          name: "continuar",
          message: "¿Desea añadir otro bien?",
        },
      ]);

      const bien = new Bien(
        answers.nombre,
        answers.descripcion,
        answers.material,
        answers.peso,
        answers.valor,
      );

      inventario.getBienManager().addBien(bien);
      bienesComprados.push(bien);

      continuar = answers.continuar;
    }

    const { cantidadCoronas } = await inquirer.prompt([
      {
        type: "number",
        name: "cantidadCoronas",
        message: "Cantidad total de coronas pagadas:",
      },
    ]);

    const transaccion = new Transaccion(
      tipo,
      new Date(),
      bienesComprados,
      cantidadCoronas,
      involucrado,
    );

    inventario.getTransaccionManager().addTransaccion(transaccion);
    console.log("Transacción de compra registrada con éxito.");
  } else if (tipo === "venta") {
    if (!bienes || bienes.length === 0) {
      console.log("No hay bienes disponibles para la venta.");
      return mainMenu();
    }

    const { bienesSeleccionados } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "bienesSeleccionados",
        message: "Seleccione los bienes a vender:",
        choices: bienes.map((b) => ({ name: b.nombre, value: b.id })),
      },
    ]);

    if (bienesSeleccionados.length === 0) {
      console.log("No se seleccionaron bienes para la venta.");
      return mainMenu();
    }

    const bienesVendidos: Bien[] = [];
    for (const bienId of bienesSeleccionados) {
      const { precio } = await inquirer.prompt([
        {
          type: "number",
          name: "precio",
          message: `Ingrese el precio de venta para el bien con id ${bienId}:`,
        },
      ]);

      const bien = bienes.find((b) => b.id === bienId);
      if (bien) {
        inventario.getBienManager().removeBien(bien.id);
        bienesVendidos.push({ ...bien, valor: precio });
      }
    }

    const { cantidadCoronas } = await inquirer.prompt([
      {
        type: "number",
        name: "cantidadCoronas",
        message: "Cantidad total de coronas recibidas:",
      },
    ]);

    const transaccion = new Transaccion(
      tipo,
      new Date(),
      bienesVendidos,
      cantidadCoronas,
      involucrado,
    );

    inventario.getTransaccionManager().addTransaccion(transaccion);
    console.log("Transacción de venta registrada con éxito.");
    mainMenu();
  }

  mainMenu();
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

# Práctica 7 - The Witcher

## Autores
- **Jonathan Martínez Pérez - alu0101254098@ull.edu.es**
- **José Ángel Mederos Rivas - alu0101368832@ull.edu.es**
- **Joel Saavedra Páez - alu0101437415@ull.edu.es**

## Descripción del Proyecto  
Este sistema se encarga de gestionar el inventario de la Posada del Lobo Blanco, del mundo de The Witcher. Su objetivo es facilitar la administración de recursos, permitiendo el registro, consulta y control de bienes, mercaderes, clientes y transacciones.   
Se utiliza **Inquirer.js** para ofrecer una interfaz interactiva en la que el usuario puede gestionar el inventario, gestionar las transacciones y generar informes.   
Se hace uso de **LowDB** para ofrecer una base de datos ligera donde almacenar el inventario y las transacciones.

## Elementos del Sistema
### Inventario
El inventario almacena bienes, mercaderes y clientes. A través de este se gestionarán los elementos del sistema.  
El inventario se encarga de:
- Generar **informes**:
  - Informes del estado del stock de un bien.
  - Informes de bienes más vendidos.
  - Informes que muestren el total de ingresos de compras y ventas.
  - Informes con el historial de transacciones de un cliente o mercader.
- Registrar **transacciones**. 
- Gestionar los **bienes**.

### Bien
Un bien consta de los siguientes atributos:
- Un **ID** único que permita identificarlo.
- Su **nombre**.
- Una **descripción** que refleje la historia y utilidad del bien.
- El **material** de que está hecho.
- Su **peso**.
- Su **valor** en coronas.

### Cliente
Un cliente tiene los siguientes atributos:
- Un **ID** único que permita identificarlo.
- Su **nombre**.
- Su **raza**(humano, elfo, enano...).
- La **ubicación** en la que se encuentra.

### Mercader
Un mercader tiene los siguientes atributos:
- Un **ID** único que permita identificarlo.
- Su **nombre**.
- Su **tipo**(herrero, alquimista, general...).
- La **ubicación** en la que se encuentra.

### Transacción
Una transacción deberá contemplar los siguientes atributos:
- El **tipo** de transacción. Podemos diferenciar 3 tipos:
  - Compra realizada a un mercader.
  - Venta realizada a un cliente.
  - Devoluciones, tanto de bienes defectuosos por parte de un mercader, como de un cliente insastisfecho.
- La **fecha** en la que se realiza la transacción.
- La lista de **bienes** intercambiados.
- La cantidad de **coronas** involucradas en la transacción.
- El **involucrado**, siendo este el mercader en caso de compra, el cliente en caso de venta y el cliente o mercader de la devolución. 

## Requisitos del Sistema  
Antes de proceder con la instalación, asegúrate de contar con los siguientes requisitos:  

- **Node.js**
- **npm** 
- **TypeScript**  

---

## Obtener el Código 
Para obtener el código fuente debes clonar este repositorio, para ello ejecuta el siguiente comando:  

```sh
git clone https://github.com/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupg.git
cd prct07-witcher-datamodel-groupg
```

---

## Dependencias 
Este programa necesita una serie de dependencias para funcionar, entre ellas se encuentran: TSDoc, Inquirer.js, Vitest, LowDB, entre otras.
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:  

```sh
npm install
```

---

## Base de Datos
En el fichero `database.json` encontraremos todos los elementos de nuestro sistema, siendo estos: clientes, mercaderes, bienes y transacciones.

## Ejecución
Para compilar y ejecutar el sistema ejecuta el siguiente comando:  

```sh
npm run dev
```

Esto ejecutará automáticamente el archivo `dist/cli.js` cada vez que se compile el código.

---

## Menú Interactivo
Una vez ejecutemos el programa nos encontraremos con el menú interactivo que nos permitirá gestionar el inventario. Para movernos en este menú tenemos que usar las flechas de nuestro teclado.  
La estructura de este menú es:
- Mostrar bienes:
  - Por coronas:
    - Ascendente: muestra todos los bienes ordenados de menor a mayor valor en coronas.
    - Descendente: muestra todos los bienes ordenados de mayor a menor valor en coronas.
  - Alfabeticamente:
    - Ascendente: muestra todos los bienes ordenados alfabéticamente de manera ascendente(A-Z).
    - Descendente: muestra todos los bienes ordenados alfabéticamente de manera descendente(Z-A).
  - Volver al menú principal: vuelve al menú principal con las 8 opciones.
- Gestionar bienes:
  - Añadir bien: en esta opción se pedirá introducir todos los [datos del bien](#bien) a añadir.
  - Eliminar bien: seleccionamos el bien que queremos eliminar de la lista con los bienes disponibles que nos aparecerá.
  - Editar bien: seleccionamos el bien que queremos modificar de la lista con los bienes disponibles que nos aparecerá, a continuación introducimos los nuevos datos del bien.
  - Volver al menú principal: vuelve al menú principal con las 8 opciones.
- Mostrar clientes/mercaderes:
  - Clientes:
    - Nombre: introducimos el nombre a buscar y nos mostrará todas las coincidencias.
    - Raza: introducimos la raza a buscar y nos mostrará todas las coincidencias.
    - Localización: introducimos la localización a buscar y nos mostrará todas las coincidencias.
    - No filtrar: muestra todos los clientes.
  - Mercaderes:
    - Nombre: introducimos el nombre a buscar y nos mostrará todas las coincidencias.
    - Tipo: introducimos el tipo de mercader a buscar y nos mostrará todas las coincidencias.
    - Localización: introducimos la localización a buscar y nos mostrará todas las coincidencias.
    - No filtrar: muestra todos los clientes.
  - Volver al menú principal: vuelve al menú principal con las 8 opciones.
- Gestionar clientes/mercaderes
  - Añadir cliente: en esta opción se pedirá introducir todos los [datos del cliente](#cliente) a añadir.
  - Añadir mercader: en esta opción se pedirá introducir todos los [datos del mercader](#mercader) a añadir.
  - Eliminar cliente: seleccionamos el cliente que queremos eliminar de la lista con los clientes disponibles que nos aparecerá.
  - Eliminar mercader: seleccionamos el mercader que queremos eliminar de la lista con los mercaderes disponibles que nos aparecerá.
  - Editar cliente: seleccionamos el cliente que queremos modificar de la lista con los clientes disponibles que nos aparecerá, a continuación introducimos los nuevos datos del cliente.
  - Editar mercader: seleccionamos el mercader que queremos modificar de la lista con los mercaderes disponibles que nos aparecerá, a continuación introducimos los nuevos datos del mercader.
  - Volver al menú principal: vuelve al menú principal con las 8 opciones.
- Mostrar transacciones: muestra todas las transacciones(compras, ventas y devoluciones) de nuestro sistema.
- Gestionar transacciones:
  - Venta: Paso 1: seleccionamos el cliente involucrado en la transacción de la lista de clientes que nos aparecerá. Paso 2: seleccionamos los bienes involucrados en la transacción de la lista de bienes que nos aparecerá(*NOTA: para seleccionar presionamos la tecla SPACE de nuestro teclado, los bienes seleccionados tendrán la casilla marcada*). Paso 3: introducimos el resto de [datos de la transacción](#transacción) que se nos solicita.
  - Compra: Paso 1: seleccionamos el mercader involucrado en la transacción de la lista de mercaderes que nos aparecerá. Paso 2: introducimos los datos del bien a comprar.
  - Devolución: Paso 1: seleccionamos la compra o venta que queramos devolver de la lista de compras/ventas que nos aparecerá. Paso 2: se nos preguntará si queremos devolver todos los bienes involucrados, si esto no es así podemos elegir los bienes deseados de la lista de bienes que nos aparecerá(*NOTA: para seleccionar presionamos la tecla SPACE de nuestro teclado, los bienes seleccionados tendrán la casilla marcada*).
  - Salir al menú principal: vuelve al menú principal con las 8 opciones.
- Generar informes:
  - Estado del stock: se nos solicita el nombre del bien a mostrar y muestra su información si la hubiera.
  - Bienes más vendidos: muestra la cantidad de ventas de cada bien.
  - Bienes más demandados: muestra la cantidad de compras de cada bien.
  - Ingresos y gastos: muestra la cantidad de ingresos por ventas y gastos por compras en coronas.
  - Histórico de transacciones: solicita el ID de un mercader o cliente y muestra sus transacciones.
  - Volver al menú principal: vuelve al menú principal con las 8 opciones.
- Salir: sale del menú interactivo.

---

## Documentación  
El proyecto utiliza **TypeDoc** para generar documentación automática. Para generarla, ejecuta:  

```sh
npm run doc
```

Los archivos generados se almacenarán en el directorio `docs/`.

---

## Pruebas  
Para ejecutar las pruebas con **Vitest**, usa:  

```sh
npm run test
```

## Cubrimiento de Código
Para generar un informe de cubrimiento ejecute:  

```sh
npm run coverage
``` 

---

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupg/actions/workflows/ci.yml/badge.svg?branch=desarrollo)](https://github.com/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupg/actions/workflows/ci.yml?query=branch:desarrollo)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupg/badge.svg?branch=desarrollo)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupg?branch=desarrollo) 
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2425_prct07-witcher-datamodel-groupg&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2425_prct07-witcher-datamodel-groupg)

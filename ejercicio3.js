const prompt = require("prompt-sync")();

function Tarea(id, titulo, descripcion, estado, dificultad, vencimiento) {
  this.id = id;
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.estado = estado || "pendiente";
  this.dificultad = dificultad || "baja";
  this.vencimiento = vencimiento || null;
  this.creacion = new Date().toLocaleString();
}

Tarea.prototype.mostrarDetalles = function () {
  console.log("\n=== DETALLES DE TAREA ===");
  console.log("Titulo:", this.titulo || "Sin datos");
  console.log("Descripcion:", this.descripcion || "Sin datos");
  console.log("Estado:", this.estado);
  console.log("Dificultad:", this.dificultad);
  console.log("Vencimiento:", this.vencimiento || "Sin datos");
  console.log("Creacion:", this.creacion);
};

Tarea.prototype.editar = function () {
  this.titulo = prompt("Nuevo titulo: ") || this.titulo;
  this.descripcion = prompt("Nueva descripcion: ") || this.descripcion;
  console.log("1. Pendiente  2. En curso  3. Terminada");
  const est = prompt("Nuevo estado: ");
  if (est === "1") this.estado = "pendiente";
  else if (est === "2") this.estado = "en curso";
  else if (est === "3") this.estado = "terminada";
  console.log("1. Baja  2. Media  3. Alta");
  const dif = prompt("Nueva dificultad: ");
  if (dif === "1") this.dificultad = "baja";
  else if (dif === "2") this.dificultad = "media";
  else if (dif === "3") this.dificultad = "alta";
  const venc = prompt("Nueva fecha de vencimiento: ");
  if (venc) this.vencimiento = venc;
};

function ListaTareas() {
  this.tareas = [];
  this.idCounter = 1;
}

ListaTareas.prototype.agregarTarea = function () {
  const titulo = prompt("Titulo: ");
  const descripcion = prompt("Descripcion: ");
  console.log("1. Pendiente  2. En curso  3. Terminada");
  const est = prompt("Estado: ");
  let estado = "pendiente";
  if (est === "2") estado = "en curso";
  else if (est === "3") estado = "terminada";
  console.log("1. Baja  2. Media  3. Alta");
  const dif = prompt("Dificultad: ");
  let dificultad = "baja";
  if (dif === "2") dificultad = "media";
  else if (dif === "3") dificultad = "alta";
  const vencimiento = prompt("Fecha de vencimiento (opcional): ");
  const tarea = new Tarea(this.idCounter++, titulo, descripcion, estado, dificultad, vencimiento);
  this.tareas.push(tarea);
};

ListaTareas.prototype.listarTareas = function (filtro) {
  let lista = this.tareas;
  if (filtro !== "todas") lista = this.tareas.filter(t => t.estado === filtro);
  if (lista.length === 0) {
    console.log("No hay tareas para mostrar");
    return;
  }
  console.log("\n=== LISTADO DE TAREAS ===");
  lista.forEach(t => console.log(`${t.id}. ${t.titulo} [${t.estado}]`));
  console.log("0. Volver");
  const id = prompt("Elige una tarea por ID: ");
  if (id !== "0") {
    const tarea = this.tareas.find(t => t.id == id);
    if (tarea) tarea.mostrarDetalles();
  }
};

ListaTareas.prototype.buscarTarea = function () {
  const clave = prompt("Ingrese palabra clave: ");
  const resultados = this.tareas.filter(t => t.titulo.includes(clave) || t.descripcion.includes(clave));
  if (resultados.length === 0) {
    console.log("No se encontraron tareas");
    return;
  }
  resultados.forEach(t => console.log(`${t.id}. ${t.titulo} [${t.estado}]`));
  const id = prompt("Elige una tarea por ID: ");
  const tarea = this.tareas.find(t => t.id == id);
  if (tarea) tarea.mostrarDetalles();
};

function mainMenu() {
  const lista = new ListaTareas();
  while (true) {
    console.log("\n=== MENU PRINCIPAL ===");
    console.log("1. Ver Mis Tareas");
    console.log("2. Buscar una Tarea");
    console.log("3. Agregar una Tarea");
    console.log("0. Salir");
    const opcion = prompt("Elige una opcion: ");
    if (opcion === "1") verTareasMenu(lista);
    else if (opcion === "2") lista.buscarTarea();
    else if (opcion === "3") lista.agregarTarea();
    else if (opcion === "0") break;
  }
}

function verTareasMenu(lista) {
  while (true) {
    console.log("\n=== VER MIS TAREAS ===");
    console.log("1. Todas");
    console.log("2. Pendientes");
    console.log("3. En curso");
    console.log("4. Terminadas");
    console.log("0. Volver");
    const opcion = prompt("Elige una opcion: ");
    if (opcion === "0") break;
    let filtro;
    if (opcion === "1") filtro = "todas";
    else if (opcion === "2") filtro = "pendiente";
    else if (opcion === "3") filtro = "en curso";
    else if (opcion === "4") filtro = "terminada";
    else continue;
    lista.listarTareas(filtro);
  }
}

mainMenu();
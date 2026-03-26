//  Guardar sesión y mostrar usuario activo
(function() {
  const sesion = sessionStorage.getItem("sesionActiva");
  if (!sesion) {
    window.location.href = "login.html";
  } else {
    document.getElementById("usuarioActivo").textContent = "👤 " + sesion;
  }
})();

function cerrarSesion() {
  sessionStorage.removeItem("sesionActiva");
  window.location.href = "login.html";
}

//  Expresiones regulares para validación
const REGEX = {
  nombre:   /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,60}$/,
  correo:   /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  whatsapp: /^\+?[\d\s\-()]{7,20}$/,
  fecha:    /^\d{4}-\d{2}-\d{2}$/
};

const MENSAJES = {
  nombre:   "Solo letras y espacios, entre 3 y 60 caracteres.",
  correo:   "Ingresa un correo electrónico válido.",
  whatsapp: "Número inválido. Ej: +57 300 123 4567 (7-20 dígitos).",
  fecha:    "Selecciona una fecha válida."
};

//  Datos
let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
mostrarEstudiantes();

//  Validacion de un campo
function validarCampo(fieldId, inputId, errId, regex, msg) {
  const field = document.getElementById(fieldId);
  const valor = document.getElementById(inputId).value.trim();
  const err   = document.getElementById(errId);

  if (!valor) {
    field.className = "field invalid";
    err.textContent = "Este campo es obligatorio.";
    return false;
  }
  if (!regex.test(valor)) {
    field.className = "field invalid";
    err.textContent = msg;
    return false;
  }
  field.className = "field valid";
  err.textContent = "";
  return true;
}

function validarTodo() {
  const v1 = validarCampo("fNombre",  "nombre",          "eNombre",   REGEX.nombre,   MENSAJES.nombre);
  const v2 = validarCampo("fCorreo",  "correo",          "eCorreo",   REGEX.correo,   MENSAJES.correo);
  const v3 = validarCampo("fWhatsapp","whatsapp",        "eWhatsapp", REGEX.whatsapp, MENSAJES.whatsapp);
  const v4 = validarCampo("fFecha",   "fechaNacimiento", "eFecha",    REGEX.fecha,    MENSAJES.fecha);
  return v1 && v2 && v3 && v4;
}

// Validar en tiempo real al salir del campo
["nombre","correo","whatsapp","fechaNacimiento"].forEach(id => {
  document.getElementById(id)?.addEventListener("blur", () => {
    const map = {
      nombre: ["fNombre","nombre","eNombre", REGEX.nombre, MENSAJES.nombre],
      correo: ["fCorreo","correo","eCorreo", REGEX.correo, MENSAJES.correo],
      whatsapp: ["fWhatsapp","whatsapp","eWhatsapp", REGEX.whatsapp, MENSAJES.whatsapp],
      fechaNacimiento: ["fFecha","fechaNacimiento","eFecha", REGEX.fecha, MENSAJES.fecha],
    };
    const args = map[id];
    if (args) validarCampo(...args);
  });
});

//  Calcular edad
function calcularEdad(fechaStr) {
  if (!fechaStr) return "—";
  const hoy  = new Date();
  const nac  = new Date(fechaStr + "T00:00:00");
  let edad   = hoy.getFullYear() - nac.getFullYear();
  const m    = hoy.getMonth() - nac.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
  return edad >= 0 ? edad + " años" : "—";
}

//  Guardar (Crear o Actualizar)
function guardarEstudiante() {
  if (!validarTodo()) return;

  const idInput  = document.getElementById("estudianteId").value;
  const nombre   = document.getElementById("nombre").value.trim();
  const correo   = document.getElementById("correo").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const fechaNac = document.getElementById("fechaNacimiento").value;

  if (idInput === "") {
    estudiantes.push({
      id:              Date.now(),
      nombre,
      correo,
      whatsapp,
      fechaNacimiento: fechaNac
    });
  } else {
    const index = estudiantes.findIndex(e => e.id == idInput);
    if (index !== -1) {
      estudiantes[index] = { ...estudiantes[index], nombre, correo, whatsapp, fechaNacimiento: fechaNac };
    }
  }

  guardarEnStorage();
  limpiarFormulario();
  mostrarEstudiantes();
}

//  Mostrar estudiantes en la tabla
function mostrarEstudiantes() {
  const cuerpoTabla = document.getElementById("tablaBody");

  if (estudiantes.length === 0) {
    cuerpoTabla.innerHTML = `
      <tr><td colspan="7" class="empty-msg">No hay estudiantes registrados todavía.</td></tr>`;
    return;
  }

  cuerpoTabla.innerHTML = estudiantes.map(est => `
    <tr>
      <td data-label="ID">${est.id}</td>
      <td data-label="Nombre">${est.nombre}</td>
      <td data-label="Correo">${est.correo}</td>
      <td data-label="WhatsApp">${est.whatsapp}</td>
      <td data-label="F. Nacimiento">${est.fechaNacimiento}</td>
      <td data-label="Edad">${calcularEdad(est.fechaNacimiento)}</td>
      <td data-label="Acciones">
        <button class="btn-edit"   onclick="editarEstudiante(${est.id})">✏️ Editar</button>
        <button class="btn-delete" onclick="eliminarEstudiante(${est.id})">🗑️ Eliminar</button>
      </td>
    </tr>
  `).join("");  
}

//  Editar estudiante (cargar datos en el formulario)
function editarEstudiante(id) {
  const est = estudiantes.find(e => e.id === id);
  if (!est) return;

  document.getElementById("estudianteId").value    = est.id;
  document.getElementById("nombre").value          = est.nombre;
  document.getElementById("correo").value          = est.correo;
  document.getElementById("whatsapp").value        = est.whatsapp;
  document.getElementById("fechaNacimiento").value = est.fechaNacimiento;
  document.getElementById("btnCancelar").style.display = "block";

  // Limpiar estilos de validación al cargar en edición
  ["fNombre","fCorreo","fWhatsapp","fFecha"].forEach(id =>
    document.getElementById(id).className = "field"
  );

  document.querySelector(".form-section").scrollIntoView({ behavior: "smooth" });
}

//  Elimnar estudiante
function eliminarEstudiante(id) {
  if (!confirm("¿Seguro que deseas eliminar este estudiante?")) return;
  estudiantes = estudiantes.filter(e => e.id !== id);
  guardarEnStorage();
  mostrarEstudiantes();
}

//  Auxiliares
function guardarEnStorage() {
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

function limpiarFormulario() {
  ["estudianteId","nombre","correo","whatsapp","fechaNacimiento"]
    .forEach(id => document.getElementById(id).value = "");
  document.getElementById("btnCancelar").style.display = "none";
  ["fNombre","fCorreo","fWhatsapp","fFecha"]
    .forEach(id => document.getElementById(id).className = "field");
}

function cancelarEdicion() {
  limpiarFormulario();
}

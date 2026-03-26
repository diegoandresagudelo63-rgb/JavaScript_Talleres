// Cargar datos desde localStorage al iniciar
// Si no hay nada guardado, empieza con un array vacío.
let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

// Mostrar la tabla al cargar la página
mostrarEstudiantes();



// GUARDAR (Crear o Actualizar)
function guardarEstudiante() {

  // Leer los valores del formulario
  const idInput      = document.getElementById("estudianteId").value;
  const nombre       = document.getElementById("nombre").value.trim();
  const correo       = document.getElementById("correo").value.trim();
  const fechaNac     = document.getElementById("fechaNacimiento").value;

  // Validar que todos los campos estén llenos
  if (!nombre || !correo || !fechaNac) {
    alert("⚠️ Por favor completa todos los campos.");
    return;
  }

  if (idInput === "") {

    // CREAR: no hay id en el campo oculto
    const nuevoEstudiante = {
      id:              Date.now(),   // id único basado en la hora
      nombre:          nombre,
      correo:          correo,
      fechaNacimiento: fechaNac
    };
    estudiantes.push(nuevoEstudiante);       // agregar al array

  } else {
    // ── EDITAR: hay un id guardado, buscar y actualizar ──
    const index = estudiantes.findIndex(e => e.id == idInput);

    if (index !== -1) {
      // Reemplazar los datos del estudiante encontrado
      estudiantes[index].nombre          = nombre;
      estudiantes[index].correo          = correo;
      estudiantes[index].fechaNacimiento = fechaNac;
    }
  }

  // Guardar el array actualizado en localStorage
  guardarEnStorage();

  // Limpiar el formulario y actualizar la tabla
  limpiarFormulario();
  mostrarEstudiantes();
}


// ════════════════════════════════════════════════
//  MOSTRAR (Leer desde localStorage y pintar tabla)
// ════════════════════════════════════════════════
function mostrarEstudiantes() {
  const cuerpoTabla = document.getElementById("tablaBody");

  // Si no hay estudiantes, mostrar mensaje
  if (estudiantes.length === 0) {
    cuerpoTabla.innerHTML = `
      <tr>
        <td colspan="5" class="empty-msg">No hay estudiantes registrados todavía.</td>
      </tr>`;
    return;
  }

  // Generar una fila HTML por cada estudiante
  cuerpoTabla.innerHTML = estudiantes.map(est => `
    <tr>
      <td>${est.id}</td>
      <td>${est.nombre}</td>
      <td>${est.correo}</td>
      <td>${est.fechaNacimiento}</td>
      <td>
        <button class="btn-edit"   onclick="editarEstudiante(${est.id})">✏️ Editar</button>
        <button class="btn-delete" onclick="eliminarEstudiante(${est.id})">🗑️ Eliminar</button>
      </td>
    </tr>
  `).join("");
}


// ════════════════════════════════════════════════
//  EDITAR (cargar datos del estudiante en el form)
// ════════════════════════════════════════════════
function editarEstudiante(id) {

  // Buscar el estudiante por su id
  const estudiante = estudiantes.find(e => e.id === id);
  if (!estudiante) return;

  // Llenar el formulario con sus datos
  document.getElementById("estudianteId").value   = estudiante.id;
  document.getElementById("nombre").value         = estudiante.nombre;
  document.getElementById("correo").value         = estudiante.correo;
  document.getElementById("fechaNacimiento").value = estudiante.fechaNacimiento;

  // Mostrar botón "Cancelar" para salir del modo edición
  document.getElementById("btnCancelar").style.display = "block";
}


// ════════════════════════════════════════════════
//  ELIMINAR
// ════════════════════════════════════════════════
function eliminarEstudiante(id) {

  if (!confirm("¿Seguro que deseas eliminar este estudiante?")) return;

  // Filtrar: quedarse con todos EXCEPTO el que tiene ese id
  estudiantes = estudiantes.filter(e => e.id !== id);

  // Guardar el array actualizado y refrescar la tabla
  guardarEnStorage();
  mostrarEstudiantes();
}


// ════════════════════════════════════════════════
//  FUNCIONES AUXILIARES
// ════════════════════════════════════════════════

// Guardar el array en localStorage (siempre se llama después de modificar)
function guardarEnStorage() {
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

// Vaciar el formulario y ocultar el botón Cancelar
function limpiarFormulario() {
  document.getElementById("estudianteId").value    = "";
  document.getElementById("nombre").value          = "";
  document.getElementById("correo").value          = "";
  document.getElementById("fechaNacimiento").value = "";
  document.getElementById("btnCancelar").style.display = "none";
}

// Salir del modo edición sin guardar cambios
function cancelarEdicion() {
  limpiarFormulario();
}

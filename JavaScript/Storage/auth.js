// Usuarios (credenciales almacenadas en array)
const USUARIOS = [
  { usuario: "Admin",    clave: "Admin123!" },
  { usuario: "Profesor", clave: "Profe456#" },
  { usuario: "Soporte",  clave: "Soporte789$" }
];

// Expresiones regulares 
const REGEX = {
  usuario: /^[a-zA-Z0-9_]{3,20}$/,          // 3-20 chars, letras, números o _
  clave:   /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/  // mín 6, 1 mayúscula, 1 número, 1 especial
};


//  VALIDAR CAMPO INDIVIDUAL
function validarCampoLogin(fieldId, inputId, errId, regex, mensajeError) {
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
    err.textContent = mensajeError;
    return false;
  }
  field.className = "field valid";
  err.textContent = "";
  return true;
}


//  Intentar login al hacer clic en el botón

function intentarLogin() {
  const globalError = document.getElementById("globalError");
  globalError.classList.remove("show");

  const okUser = validarCampoLogin(
    "fieldUser", "loginUser", "errUser",
    REGEX.usuario,
    "Solo letras, números o _, entre 3 y 20 caracteres."
  );
  const okPass = validarCampoLogin(
    "fieldPass", "loginPass", "errPass",  
    REGEX.clave,
    "Mín. 6 caracteres, 1 mayúscula, 1 número y 1 especial."
  );

  if (!okUser || !okPass) return;

  const usuario = document.getElementById("loginUser").value.trim();
  const clave   = document.getElementById("loginPass").value.trim();

  // Buscar en el array de usuarios
  const encontrado = USUARIOS.find(
    u => u.usuario === usuario && u.clave === clave
  );

  if (encontrado) {
    // Guardar sesión y redirigir
    sessionStorage.setItem("sesionActiva", usuario);
    window.location.href = "index.html";
  } else {
    // Mostrar error global con animación
    globalError.classList.remove("show");
    void globalError.offsetWidth; // reflow para reiniciar animación
    globalError.classList.add("show");
  }
}

// ── Validar en tiempo real al salir del campo ──
document.getElementById("loginUser")?.addEventListener("blur", () =>
  validarCampoLogin("fieldUser","loginUser","errUser", REGEX.usuario, "Solo letras, números y caracteres especiales, entre 3 y 20 caracteres.")
);
document.getElementById("loginPass")?.addEventListener("blur", () =>
  validarCampoLogin("fieldPass","loginPass","errPass", REGEX.clave, "Mín. 6 caracteres, 1 mayúscula, 1 número y 1 especial.")
);

// ── Enviar con Enter ──
document.addEventListener("keydown", e => {
  if (e.key === "Enter") intentarLogin();
});

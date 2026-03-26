// Seleccionamos del index
const formReg = document.querySelector("#formReg");
const btnEnviar = document.querySelector("#btnEnviar");
const list = document.querySelector("#list");

// Array para guardar los usuarios
const database = [];

const fields = ["name", "email", "phone", "password"];
fields.forEach(id => {
    const input = document.querySelector(`#${id}`);
    const errorSpan = document.createElement("small");
    errorSpan.id = `error-${id}`;
    errorSpan.style.color = "#e74c3c";
    errorSpan.style.display = "none";
    errorSpan.style.fontSize = "12px";
    errorSpan.style.marginTop = "5px";

    // Insertamos el error después del input
    input.insertAdjacentElement("afterend", errorSpan);
});

const userValid = () => {

    // Obtenemos los valores

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const password = document.querySelector("#password").value;

    const regEx = {
        name: /^[A-Za-z\s]+$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\d{10}$/,
        password: /^(?=.*[\d]).{8,}$/
    };

    // Validamos cada campo
    const isNameValid = regEx.name.test(name);
    const isEmailValid = regEx.email.test(email);
    const isPhoneValid = regEx.phone.test(phone);
    const isPassValid = regEx.password.test(password);

    // Funcion para los mensajes de error
    const toggleError = (id, isValid, msg) => {
        const ErrorElement = document.querySelector(`#error-${id}`);
        if (!isValid && document.querySelector(`#${id}`).value !== "") {
            ErrorElement.textContent = msg;
            ErrorElement.style.display = "block";
        } else {
            ErrorElement.style.display = "none";
        }
    };

    toggleError("name", isNameValid, "Nombre inválido (solo letras)");
    toggleError("email", isEmailValid, "Formato de email incorrecto.");
    toggleError("phone", isPhoneValid, "El teléfono debe tener 10 números.");
    toggleError("password", isPassValid, "Mínimo 8 caracteres y un número.");

    // Retorno para validación
    return isNameValid && isEmailValid && isPhoneValid && isPassValid;
}

// Evento de validación en tiempo real
formReg.addEventListener("input", () => {
    const isValid = userValid();
    btnEnviar.disabled = !isValid; 
});

// Evento de envío
formReg.addEventListener("submit", (e) => {
    e.preventDefault();

    // Crear el objeto y guardarlo
    const newUser = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        phone: document.querySelector("#phone").value
    };
    
    database.push(newUser);

    // Mostrar en la tabla
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${newUser.name}</td>
        <td>${newUser.email}</td>
        <td>${newUser.phone}</td>
    `;
    list.appendChild(row);

    // Limpiar formulario y resetear estado
    formReg.reset();
    btnEnviar.disabled = true;

    // Limpiar mensajes de error si los hubiera
    fields.forEach(id => {
        document.querySelector(`#error-${id}`).style.display = "none";
    });

    alert("¡Usuario registrado con éxito!");
});
const formReg = document.querySelector("#formReg");
const btnEnviar = document.querySelector("#btnEnviar");
const list = document.querySelector("#list");
const database = [];

// Función para revisar si todo está bien escrito
const validate = () => {
    // 1. Guardar lo que escribió el usuario
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const password = document.querySelector("#password").value;

    // 2. Revisar con las reglas (true o false)
    const checkName = /^[A-Za-z\s]+$/.test(name);
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const checkPhone = /^\d{10}$/.test(phone);
    const checkPassword = /^(?=.*[\d]).{8,}$/.test(password);

    // 3. Mostrar u ocultar mensajes de error con If
    
    // Validar Nombre
    const errorName = document.querySelector("#error-name");
    if (checkName || name === "") {
        errorName.className = "error-message hidden";
    } else {
        errorName.className = "error-message visible";
    }

    // Validar Email
    const errorEmail = document.querySelector("#error-email");
    if (checkEmail || email === "") {
        errorEmail.className = "error-message hidden";
    } else {
        errorEmail.className = "error-message visible";
    }

    // Validar Telefono
    const errorPhone = document.querySelector("#error-phone");
    if (checkPhone || phone === "") {
        errorPhone.className = "error-message hidden";
    } else {
        errorPhone.className = "error-message visible";
    }

    // Validar Contraseña
    const errorPassword = document.querySelector("#error-password");
    if (checkPassword || password === "") {
        errorPassword.className = "error-message hidden";
    } else {
        errorPassword.className = "error-message visible";
    }

    // 4. Devolver resultado final (¿Todo es verdad?)
    return checkName && checkEmail && checkPhone && checkPassword;
};

// Revisar cada vez que el usuario escriba algo
formReg.addEventListener("input", () => {
    btnEnviar.disabled = !validate();
});

// Guardar los datos
formReg.addEventListener("submit", (e) => {
    // "e" detiene la recarga automática de la página
    e.preventDefault();

    // Crear objeto del nuevo usuario
    const newUser = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        phone: document.querySelector("#phone").value
    };

    database.push(newUser);

    // Crear la fila de la tabla paso a paso
    const row = list.insertRow(); // Crea <tr>
    
    const cell1 = row.insertCell(0); // Crea <td>
    cell1.textContent = newUser.name;
    
    const cell2 = row.insertCell(1); // Crea <td>
    cell2.textContent = newUser.email;
    
    const cell3 = row.insertCell(2); // Crea <td>
    cell3.textContent = newUser.phone;

    // Limpiar todo al terminar
    formReg.reset();
    btnEnviar.disabled = true;
    alert("Registrado!");
});
 async function obtenerProductos() {
  try {
   const response = await fetch("https://fakestoreapi.com/products");
    const datos = await response.json();
    console.log(datos);
    

    const productos = datos.map(({ id, title, price, category, description }) => {

      const precioDolares = price / 4000; // conversion ejemplo a dolares
      return { 
          id,
          title,
          price,
          category,
          description,

          precioDolares: precioDolares.toFixed(2) // redondear a 2 decimales
      };
    });

    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();

  } catch (error) {
    console.log("Error:", error);
  }
}

function mostrarProductos() {
    const guardados = JSON.parse(localStorage.getItem("productos"));
    const contenedor = document.getElementById("contenedor");
    
    if (!guardados) return;

    contenedor.innerHTML = ""; // Limpiar el contenedor antes de mostrar los productos

    const tabla = document.createElement("table");
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Titulo</th>
          <th>Precio</th>
          <th>Precio en Dolares</th>
          <th>Categoria</th>
          <th>Descripcion</th>
        </tr>
      </thead>
      <tbody id="cuerpo"></tbody>
    `;
    contenedor.appendChild(tabla);

    const cuerpo = document.getElementById("cuerpo");

    guardados.forEach(({ id, title, price, category, precioDolares, description}) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td>$${price}</td>
        <td>$${precioDolares}</td>
        <td>${category}</td>
        <td>${description}</td>
      `;
      cuerpo.appendChild(tr);
    });
}

if (localStorage.getItem("productos")) {
  mostrarProductos();
} else {
  obtenerProductos();
}

obtenerProductos();

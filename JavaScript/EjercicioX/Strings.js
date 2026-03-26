const ShowString = () => {
    const message = "Hoy es jueves";
    for(let index = 0; index < message.length; index++){
        console.log(message[i].toUpperCase());

        //Contar las vocales.
        if(message[i] === "a" || message[i] === "e" ||
            message[i] === "i" || message[i] === "o" || message[i] === "u"
        ){
            countVocals++;
        }
    }
    return countVocals;
}

const btn = document.getElementById("btnShowString")

btn.addEventListener("click", () => {
    console.log("vocales: " + countVocals("Hoy es jueves"));
    console.log("No vocales:" + NoVocals());

    // Definicion de un objeto.
    const Product = {
        id : 1,
        name : "Laptop",
        price : 1500,
    }
    console.log(Product);
    console.log(Product.name);
    console.log("Vocales:" + countVocals(Product.name));
})

// Investigar otros eventos de Javascript: click
// Crear un programa en Javascript que capture un string de una caja de texto y
// reemplace las vocales tildadas por no tildadas y el @ lo elimine.
// Imprimir la nueva cadena.
// Ejemplo:
// éstudie Javascript @Hoy
// estudie Javascript Hoy

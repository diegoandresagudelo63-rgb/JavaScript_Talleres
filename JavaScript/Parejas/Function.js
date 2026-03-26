const productos=()=>{
    let productos = ["Manzana", "Pera", "Naranja", "Plátano", "Fresa"];
    let precios = [10, 20, 30, 40, 50];
    let daata = "";
    for (i = 0; i < productos.length; i++){
        console.log(precios[i] + " " + productos[i]);
        daata += "<tr><td>" + productos[i] + "</td><td>" + precios[i] + "</td></tr>";
    }

    document.getElementById('tabla1').innerHTML = daata;
}

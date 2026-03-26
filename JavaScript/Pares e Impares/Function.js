const ShowDataFor = () => {
    let numbers = [3,7,9,5,4]
    let add = 0;
    let Daata = "";
    console.log("Example For");
    for(i = 0; i < numbers.length; i++){
        console.log(numbers[i])
        add += numbers[i];
        Daata += "<tr><td>" + i + "</td><td>" + numbers[i] + "</td></tr>";
    }
    console.log("Sum of numbers:", add);
    document.getElementById('tableBody').innerHTML = Daata;
}

const ShowDataForEach = () => {
    let numbers = [2,7,9,5,4];
    console.log("Example for Each");
    numbers.forEach(Element => {
        console.log(Element);
    })
}

//Calcular el promedio y mostrarlo.
//Calcular y mostrar cantidad de pares y cantidad de numero impares.
const promedioParesImpares = () => {
    let numbers = [2,7,9,5,4];
    let add = 0;
    let countPares = 0;
    let countImpares = 0;
    
    numbers.forEach(Element => {
        add += Element;
        if(Element % 2 === 0){
            countPares++;
        } else {
            countImpares++;
        }
    })
    console.log("Promedio:", add / numbers.length);
    console.log("Cantidad de pares:", countPares);
    console.log("Cantidad de impares:", countImpares);
}
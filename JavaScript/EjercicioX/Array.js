// Definicion del array de objetos
const students = [
    {nombre: "tan", edad: 20, carrera: "Ingenieria"},
    {nombre: "Lu", edad: 22, carrera: "Diseño"},
    {nombre: "Maríana", edad: 21, carrera: "Programación"}
];

// Usamos un ciclo para poder listar los datos del array
console.log("--- Lista de Estudiantes ---");

students.forEach((student, index) =>{
    console.log(`${index + 1}. Nombre: ${student.nombre} | Carrera: ${student.carrera}`);
});yº1q
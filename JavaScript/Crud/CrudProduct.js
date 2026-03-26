let product = []

let CountProducts = 0

const CreateProduct = (name, price) => {
    const Username = document.getElementById('name').value;
    const Userprice = document.getElementById('price').value;
    CountProducts++
    const newProduct = {
        id: CountProducts,
        name: Username,
        price: Userprice
    }
    product.push(newProduct)
}

const ListAllProducts = () => { // List the all products
    let message = '<table class="" border="2">'+
                  '<thead>'+
                  '<tr>'+
                  '<th>Id</th>'+
                  '<th>Name</th>'+
                  '<th>Price</th>'+
                  '</tr>'+
                  '</thead>'+
                  '<tbody>';


    product.forEach((item) => {
        message += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td></tr>`;
    });
    message += '</tbody></table>';
    document.getElementById('result').innerHTML = message;
}


const btnCreate = document.getElementById('create');

btnCreate.addEventListener('click', () => {
    CreateProduct();
    ListAllProducts();
})


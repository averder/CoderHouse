const socketClient = io();

socketClient.on('saludoDesdeBack', (message) => {
    console.log(message);
    socketClient.emit('respuestaDesdeFront', 'Muchas gracias')
})


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')
    const inputTitle = document.getElementById('title')
    const inputPrice = document.getElementById('price')
    const btnCreate = document.getElementById('btnCreate')
    socketClient.emit('getProducts', null);
    btnCreate.addEventListener('click', () => {
        const title = inputTitle.value;
        const price = inputPrice.value;
        const product = {
            title,
            price
        };
        socketClient.emit('newProduct', product);
        console.log(product);
    })
})



socketClient.on('showProducts', (arrayProducts) => {
    let infoProducts = '';
    arrayProducts.map((prod) => {
        infoProducts += `${prod.title} - $${prod.price} <div class='btn-delete' onclick='deleteProd("${prod.title}")'>X</div></br>`
    })
    document.getElementById('products').innerHTML = infoProducts
})

socketClient.on('message', (message) => {
    console.log(message);
})



function deleteProd(title) {
    console.log(`Deleting: ${title}`)
    socketClient.emit('deleteProduct', {
        title
    });
}













const products = [{
        id: 1,
        name: 'prod1',
        price: 10
    },
    {
        id: 2,
        name: 'prod2',
        price: 34
    },
    {
        id: 3,
        name: 'prod3',
        price: 15
    },
    {
        id: 4,
        name: 'prod4',
        price: 18
    },
    {
        id: 5,
        name: 'prod5',
        price: 21
    },
]
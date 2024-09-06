// productos.js

// Array para el carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para cargar productos desde un archivo JSON
async function cargarProductos() {
    try {
        // Obtener datos del archivo JSON
        const response = await fetch('productos.json');
        const productos = await response.json();

        // Seleccionar el contenedor de productos
        const productList = document.querySelector('.product-list');
        productList.innerHTML = ''; // Limpiar el contenido existente

        // Crear elementos para cada producto
        productos.forEach(producto => {
            const productElement = document.createElement('div');
            productElement.className = 'product';

            productElement.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <p class="price">$${producto.precio.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${producto.id}">Añadir al carrito</button>
            `;

            productList.appendChild(productElement);
        });

        // Añadir eventos a los botones de añadir al carrito
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Función para agregar un producto al carrito
function addToCart(event) {
    const button = event.target;
    const productoId = parseInt(button.getAttribute('data-id'));

    // Buscar el producto por ID
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            const productoSeleccionado = productos.find(p => p.id === productoId);

            // Añadir el producto al carrito
            carrito.push(productoSeleccionado);

            // Guardar el carrito en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Mostrar mensaje o actualizar el ícono del carrito
           
        })
        .catch(error => console.error('Error al agregar producto al carrito:', error));
}

// Cargar productos cuando la página se carga
window.addEventListener('DOMContentLoaded', cargarProductos);
